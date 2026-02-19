# Architecture Review: Fleet Intelligence

**Date:** 2026-02-19
**Scope:** Codebase — `fleet-intelligence/` + `server.js` + `server/`
**Reviewer:** Claude (arch-review skill)
**Context:** prototype (MVP, ~150 vehicles, 1-3 users, targeting 2,000 vehicles by EOY 2026)
**Focus:** Security, Scalability, and Bugs (requested scope)

---

## 1. Overview

| Metric | Value |
|--------|-------|
| Files analyzed | 110 (`.ts` + `.tsx`) + 2 (`.js` server) + 1 (`.sql` schema) |
| Estimated LOC | ~13,100 (fleet-intelligence/src) + ~470 (server) |
| Languages | TypeScript, JavaScript, SQL |
| Frameworks | React 18, Vite 6, Express 4, Supabase (PostgREST + Auth) |
| Tech stack | SPA (React Router v6) → Express proxy → Supabase (Postgres + Auth + RLS) |

**Scope description:** Full-stack security, scalability, and correctness review of the Fleet Intelligence MVP — the React SPA, Express API layer, Supabase integration, and database schema. The system manages fleet operations (shifts, vehicles, drivers) and weekly payroll for DaE (Driver-as-Employee) operations.

---

## 2. Health Score

| Category | Score | Rating |
|----------|-------|--------|
| SOLID Principles | 15/20 | Good |
| Design Principles | 14/20 | Good |
| Architecture Patterns | 13/20 | Good |
| Code Quality Signals | 14/20 | Good |
| Modern Practices | 10/20 | Fair |
| **Overall** | **66/100** | **Good** |

Modern Practices takes the biggest hit due to security gaps (input validation, rate limiting, error exposure) and missing operational resilience (no retries, no transactions, no monitoring). The codebase has a solid foundation — clean layer separation, optimistic UI with rollback, and shared business rules — but needs hardening before scaling to 2,000 vehicles.

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│  CLIENT (React SPA)                                                 │
│                                                                     │
│  ┌──────────┐  ┌──────────────┐  ┌─────────────┐  ┌────────────┐  │
│  │ Pages    │→ │ action*()    │→ │ mutations.ts│→ │ Supabase   │  │
│  │ (features│  │ (lib/actions)│  │ queries/    │  │ Client SDK │  │
│  │ /*.tsx)  │  │              │  │             │  │            │  │
│  └──────────┘  └──────────────┘  └─────────────┘  └─────┬──────┘  │
│       ↕              ↕                                    │         │
│  ┌──────────┐  ┌──────────────┐                          │         │
│  │AppState  │← │ app-reducer  │                          │         │
│  │(Context) │  │              │                          │         │
│  │ ⚠️ W5    │  └──────────────┘                          │         │
│  └──────────┘                                            │         │
│       ↕                                                  │         │
│  ┌──────────────────────┐                                │         │
│  │ LoginPage  ⚠️ W1,C4 │                                │         │
│  └──────────────────────┘                                │         │
└──────────────────────────────────────────────────────────┼─────────┘
                                                           │
                    ┌──────────────────────────────────────┘
                    ↓
┌───────────────────────────────────────────────────────────────┐
│  SERVER (Express)  ⚠️ C5, C6                                  │
│                                                               │
│  POST /api/invite-user  ⚠️ C2, C5     requireAdmin() guard   │
│  POST /api/payroll/auto-close          requireAdmin() guard   │
│  GET  /api/payroll/cron-status  ⚠️ C6  NO AUTH                │
│  GET  /api/health                      NO AUTH (expected)     │
│                                                               │
│  ┌─────────────────────┐                                      │
│  │ server/payroll-close │ ⚠️ W3 (timezone), W7 (no retry)    │
│  │ shared/payroll-rules │ ← single source of truth           │
│  └─────────────────────┘                                      │
└───────────────────────────┬───────────────────────────────────┘
                            ↓
┌───────────────────────────────────────────────────────────────┐
│  SUPABASE (Postgres + Auth + RLS)                             │
│                                                               │
│  Tables: centers, drivers, vehicles, shifts, trips,           │
│          weekly_payroll, profiles, csv_uploads                 │
│                                                               │
│  RLS: center-scoped for supervisors  ⚠️ W6 (missing indexes) │
│  Auth: email/password via Supabase Auth                       │
│  Seed: ⚠️ C1 (plaintext passwords in repo)                   │
└───────────────────────────────────────────────────────────────┘
```

---

## 4. Findings

### Critical — Must Fix

#### C1: Demo seed passwords committed to repo

- **Principle:** Hardcoded Secrets (3.7 Configuration)
- **Location:** `fleet-intelligence/db/supabase-setup.sql:221-228`
- **Description:** The demo seed SQL includes plaintext passwords in comments (`admin123`, `super123`) and in `crypt()` calls. Anyone with repo access can read these credentials and use them against the production Supabase instance if the demo users exist there.
- **Impact:** Credential exposure. If these demo users are active on the production Supabase project, anyone with read access to the repo (or a fork) can authenticate as admin.
- **Fix:** Move seed passwords to environment variables or a `.sql.example` with placeholder values. Add a `db/seed-local.sql` to `.gitignore`. For production, ensure demo users are deleted or passwords rotated.
- **Effort:** S

```sql
-- supabase-setup.sql:221-228
-- Passwords: admin@lafa-mx.com = admin123, all others = super123
INSERT INTO auth.users (..., encrypted_password, ...)
VALUES
  (..., crypt('admin123', gen_salt('bf')), ...),  -- ← visible to repo readers
  (..., crypt('super123', gen_salt('bf')), ...),
```

---

#### C2: Server input validation gaps on invite endpoint

- **Principle:** Input Validation at Boundary (3.8 API Design)
- **Location:** `server.js:52-63`
- **Description:** The `/api/invite-user` endpoint checks for presence of `email`, `name`, and `role`, and validates role against an allowlist. But it performs no email format validation (the `TODO` comment at line 57-60 confirms domain check is disabled) and no `name` sanitization. The `name` is passed directly to the Supabase profile insert and later rendered in the UI — potential stored XSS vector.
- **Impact:** (1) Invalid emails can be invited, wasting Supabase auth invites. (2) A malicious or malformed `name` value (e.g., `<script>alert(1)</script>`) would be stored in the `profiles` table and rendered when other admins view the user list. React escapes by default, but `dangerouslySetInnerHTML` or future non-React consumers would be vulnerable.
- **Fix:** Add email format validation (regex or `validator` library). Sanitize `name` — strip HTML tags and enforce max length (e.g., 100 chars). Re-enable domain check for production.
- **Effort:** S

```js
// server.js:52-63
const { email, name, role, centerId } = req.body;
if (!email || !name || !role) {
  return res.status(400).json({ error: 'email, name, and role are required' });
}
// TODO: re-enable for production      ← domain check disabled
// if (!email.endsWith('@lafa-mx.com')) { ... }
// No email format validation
// No name sanitization or length limit
```

---

#### C3: Non-atomic payroll rerun — partial failure leaves orphans

- **Principle:** Atomicity / Data Integrity (3.5 Error Boundaries)
- **Location:** `fleet-intelligence/src/lib/supabase/mutations.ts:262-284`
- **Description:** `persistRerunPayroll` performs two sequential Supabase operations without a transaction: (1) INSERT new payroll records, (2) UPDATE old records to `superseded`. If the INSERT succeeds but the UPDATE fails (line 275-280), the system has both old (`cerrado`) and new (`cerrado`) records for the same week — duplicate payroll. The code was deliberately ordered to be safe in the opposite direction (INSERT fails → old records untouched), but the UPDATE failure path creates data corruption.
- **Impact:** Duplicate active payroll records. The `deduplicatePayroll` defense in `hydrate.ts:64-76` mitigates this on the read side (keeps highest version), but the DB state is inconsistent and any direct SQL query or future consumer would see duplicates.
- **Fix:** Wrap both operations in a Supabase RPC (Postgres function) that runs as a single transaction. Alternative: add a compensating delete of the new records if the UPDATE fails.
- **Effort:** M

```ts
// mutations.ts:262-284
export async function persistRerunPayroll(...) {
  // Step 1: INSERT new records
  const insertResult = await persistClosePayroll(newRecords, closedById);
  if (insertResult.error) return insertResult;

  // Step 2: UPDATE old records — if THIS fails, duplicates exist ⚠️
  const { error: updateError } = await supabase
    .from('weekly_payroll')
    .update({ status: 'superseded' })
    .eq('week_start', weekStart)
    .eq('status', 'cerrado')
    .not('id', 'in', `(${newRecords.map((r) => r.id).join(',')})`);
  // No rollback of inserted records if update fails
}
```

---

#### C4: Hydration failure after login shows blank dashboard

- **Principle:** Error Boundaries / Graceful Degradation (3.5)
- **Location:** `fleet-intelligence/src/features/auth/LoginPage.tsx:78-86` → `fleet-intelligence/src/app/providers/AppProvider.tsx:53-74`
- **Description:** Two paths lead to a blank dashboard with no error feedback:
  1. **LoginPage (line 78-86):** After successful Supabase auth, `fetchAllData()` is called. If it throws (network error, RLS issue, Supabase downtime), the error is silently caught with `console.error`, and the user is navigated to `/dashboard` with empty state.
  2. **AppProvider (line 60-73):** On app mount, if `fetchAllData()` fails, it dispatches HYDRATE with empty arrays. `hydrated` becomes `true`, so the app renders — but with zero data and no error indicator.
- **Impact:** Users see an empty dashboard and assume the system has no data. No error toast, no retry button, no indication that something went wrong. At scale with intermittent Supabase issues, this becomes a recurring support problem.
- **Fix:** (1) In LoginPage, show an error toast and don't navigate if hydration fails (or retry). (2) In AppProvider, add a `hydrateError` state to `AppState` and render an error banner in `AppLayout` when set.
- **Effort:** M

```tsx
// LoginPage.tsx:78-86 — silent failure
try {
  const data = await fetchAllData();
  dispatch({ type: 'HYDRATE', payload: { ...data, dataSource: 'supabase' } });
} catch (err) {
  console.error('Failed to hydrate after login:', err); // ← only logged
}
showToast('success', `Bienvenido, ${profile.name}`);
navigate('/dashboard'); // ← proceeds regardless
```

---

#### C5: No rate limiting on invite endpoint

- **Principle:** Defense in Depth / Modern Practices (5.1)
- **Location:** `server.js:45-96`
- **Description:** The `POST /api/invite-user` endpoint has no rate limiting. While it requires admin authentication (Bearer token), a compromised admin token could be used to send unlimited Supabase invite emails, or an attacker could brute-force admin tokens against this endpoint without throttling.
- **Impact:** (1) Invite email abuse — Supabase auth has invite limits, but until hit, the system sends unlimited emails. (2) Token brute-force — without rate limiting, attackers can try many tokens per second. (3) At scale, this applies to all POST endpoints.
- **Fix:** Add `express-rate-limit` middleware. Example: 10 requests per minute per IP for `/api/invite-user`, 5 per minute for `/api/payroll/auto-close`.
- **Effort:** S

```js
// server.js — no rate limiting middleware
app.post('/api/invite-user', async (req, res) => {
  // Auth check exists, but no throttling
  try { await requireAdmin(req); } catch ...
  // Unlimited calls possible
});
```

---

#### C6: Cron-status endpoint exposes internal state without auth

- **Principle:** Principle of Least Privilege (3.8 API Design)
- **Location:** `server.js:134-143`
- **Description:** `GET /api/payroll/cron-status` is completely unauthenticated. It returns: whether Supabase is configured (`enabled`), the cron schedule, timezone, last run timestamp, and full result of the last payroll close (which includes record counts, week labels, or error messages).
- **Impact:** Information disclosure. An attacker can discover: (1) whether the system uses Supabase, (2) operational schedule, (3) last payroll close result including error details, (4) whether the cron ran recently (monitoring the system's health from outside).
- **Fix:** Add `requireAdmin(req)` guard, or at minimum limit the response to `{ enabled: true, lastRun: timestamp }` without detailed results.
- **Effort:** S

```js
// server.js:134-143 — no auth check
app.get('/api/payroll/cron-status', (_req, res) => {
  res.json({
    enabled: !!supabaseAdmin,
    schedule: 'Sunday 20:00 CDMX',
    cron: '0 20 * * 0',
    timezone: 'America/Mexico_City',
    lastRun: lastCronRun,
    lastResult: lastCronResult,  // ← full payroll result exposed
  });
});
```

---

### Warning — Should Fix

#### W1: Session dispatched to state before data hydration completes

- **Principle:** Data Consistency (3.4 Data Flow)
- **Location:** `fleet-intelligence/src/features/auth/LoginPage.tsx:75-86`
- **Description:** After successful Supabase auth, `LOGIN` is dispatched at line 76 (setting session in AppState), then `fetchAllData()` is called at line 79. If hydration fails, the session exists but data is empty. Any component that renders based on `session !== null` (like `RequireAuth`) will allow access, but `drivers`, `vehicles`, etc. are empty arrays.
- **Impact:** Race condition between auth state and data state. User is "logged in" but sees nothing. Downstream components that filter by `session.centerId` silently return empty results rather than erroring.
- **Fix:** Make LOGIN + HYDRATE a single atomic dispatch, or block navigation until hydration succeeds.
- **Effort:** S

---

#### W2: Uses `getSession()` instead of `getUser()` for token retrieval

- **Principle:** Security Best Practice (5.2 Error Handling)
- **Location:** `fleet-intelligence/src/lib/supabase/mutations.ts:294-298`
- **Description:** `persistNewUser` calls `supabase.auth.getSession()` to get the access token for the invite API call. Supabase docs warn that `getSession()` returns the cached session from local storage without verifying the JWT — the token may be expired. `getUser()` validates the token against the Supabase auth server.
- **Impact:** If the cached session token is expired but hasn't been refreshed (e.g., tab was in background), the invite API call fails with a 401 from the Express server. The error message ("Invalid or expired token") is returned but the root cause is non-obvious.
- **Fix:** Replace `getSession()` with `getUser()` for any call that uses the token for server-side auth. Alternatively, use `supabase.auth.getSession()` but add error handling for 401 with automatic retry after refresh.
- **Effort:** S

```ts
// mutations.ts:294-298
const {
  data: { session },
} = await supabase.auth.getSession(); // ← returns cached, possibly expired
const token = session?.access_token;
if (!token) return { error: new Error('No session token available') };
```

---

#### W3: Fragile timezone conversion in payroll-close

- **Principle:** KISS / Robustness (2.3)
- **Location:** `server/payroll-close.js:22`
- **Description:** Week bounds are calculated by converting to CDMX timezone using `new Date(now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }))`. The `toLocaleString` output format is implementation-dependent — it can vary across Node.js versions and OS locales, potentially producing an invalid Date.
- **Impact:** If the locale format changes, `getWeekBounds()` returns an invalid date, and the entire payroll auto-close fails silently (caught by the cron error handler and logged, but no retry). DST transitions in Mexico are also not handled explicitly.
- **Fix:** Use a proper timezone library (`date-fns-tz`, `luxon`, or `Temporal` API). Example: `Temporal.Now.zonedDateTimeISO('America/Mexico_City')`.
- **Effort:** S

```js
// payroll-close.js:22
const cdmx = new Date(
  now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' })
);  // ← locale-dependent parsing, fragile
```

---

#### W4: CSV import silently drops trips for unmapped drivers

- **Principle:** Principle of Least Astonishment (2.6 POLA)
- **Location:** `fleet-intelligence/src/lib/supabase/mutations.ts:184-195`
- **Description:** During CSV trip import, trips are mapped from DiDi driver IDs to internal driver IDs. If a trip's `didiDriverId` doesn't map to any known driver, the row gets `driver_id: ''` and is filtered out at line 195. The count of dropped rows is not reported to the caller — only the total `validCount` and `errorCount` from the parser are tracked, not mapping failures.
- **Impact:** Admin imports a CSV with 1,000 trips, 50 belong to drivers not in the system (new hires, typos in DiDi IDs). The import reports success but only imports 950 trips. The 50 missing trips are invisible. At scale with frequent driver turnover, this causes payroll discrepancies.
- **Fix:** Count the mapping failures separately and return them as warnings. Update the UI to show: "950 imported, 50 skipped (driver not found)".
- **Effort:** S

```ts
// mutations.ts:184-195
const rows = trips
  .map((t) => ({
    driver_id: didiToDriverId.get(t.didiDriverId) ?? '', // ← empty if not found
    ...
  }))
  .filter((r) => r.driver_id !== '');  // ← silently dropped, no count returned
```

---

#### W5: Single monolithic AppState context triggers global re-renders

- **Principle:** Architecture / State Management (3.6)
- **Location:** `fleet-intelligence/src/app/providers/AppProvider.tsx`
- **Description:** All application state — drivers, vehicles, shifts, trips, closedPayroll, users, session, hydrated, authChecked, dataSource, dataRange — lives in a single `StateContext`. Any state change (e.g., adding a shift) triggers re-renders for every component that calls `useAppState()`, even those that only read `session` or `vehicles`.
- **Impact:** At 150 vehicles, this is imperceptible. At 2,000 vehicles with frequent shift check-ins during peak hours, unnecessary re-renders could cause UI jank. The `PayrollPage` recalculates all payroll records when an unrelated vehicle status changes.
- **Fix:** Split into domain contexts (`ShiftContext`, `PayrollContext`, `AuthContext`) or use `useSyncExternalStore` with selectors. Short-term: memoize heavy child components with `React.memo`.
- **Effort:** L

---

#### W6: Missing database indexes for center-scoped RLS queries

- **Principle:** Scalability / Performance (3.8)
- **Location:** `fleet-intelligence/db/supabase-setup.sql` (schema definition)
- **Description:** RLS policies for supervisors use `center_id = get_user_center_id()` on `drivers`, `vehicles`, and `profiles` tables, and subqueries like `EXISTS (SELECT 1 FROM drivers d WHERE d.id = shifts.driver_id AND d.center_id = get_user_center_id())` on `shifts`, `trips`, and `weekly_payroll`. There are no indexes on `drivers(center_id)`, `vehicles(center_id)`, or `profiles(center_id)`.
- **Impact:** At 150 vehicles, full table scans are fast. At 2,000 vehicles across 10+ centers, every supervisor query on shifts/trips/payroll runs an unindexed subquery on the drivers table. The RLS check runs per-row, so each query that touches N rows performs N lookups.
- **Fix:** Add indexes:
  ```sql
  CREATE INDEX idx_drivers_center ON drivers(center_id);
  CREATE INDEX idx_vehicles_center ON vehicles(center_id);
  CREATE INDEX idx_profiles_center ON profiles(center_id);
  ```
- **Effort:** S

---

#### W7: No retry on cron payroll auto-close failure

- **Principle:** Operational Resilience (5.1 Twelve-Factor)
- **Location:** `server.js:223-234`
- **Description:** The `node-cron` job that triggers payroll auto-close on Sunday 20:00 CDMX catches errors and logs them, but has no retry mechanism. If the job fails (Supabase transient error, network timeout, connection pool exhausted), the payroll week stays open until manually closed.
- **Impact:** A single transient failure on Sunday evening means payroll is not closed for the week. The team discovers it Monday morning and must manually trigger the close. At scale with more centers and regulatory pressure, missed auto-closes become operationally costly.
- **Fix:** Add simple retry logic (e.g., 3 retries with exponential backoff). Alternatively, add an alert (Slack webhook, email) on failure so the team can manually trigger.
- **Effort:** S

---

#### W8: Supabase error messages leak to client responses

- **Principle:** Error Handling / Information Disclosure (5.2)
- **Location:** `server.js:74-75`, `server.js:89`
- **Description:** When Supabase operations fail, the raw error messages are returned directly in the JSON response. Line 75: `authError.message` is returned to the client. Line 89: `profileError.message` is prefixed and returned. These messages may contain internal details (table names, constraint names, Postgres error codes).
- **Impact:** Information disclosure to authenticated users. While currently only admins can call this endpoint, error messages like `duplicate key value violates unique constraint "profiles_pkey"` reveal database schema details.
- **Fix:** Map Supabase errors to user-friendly messages. Return internal details only in server logs, not in API responses.
- **Effort:** S

---

### Info — Nice to Fix

#### I1: No schema validation on persisted session

- **Principle:** Defensive Programming (5.2)
- **Location:** `fleet-intelligence/src/app/providers/app-reducer.ts:262-269`
- **Description:** `loadSession()` reads `lafa_session` from localStorage and parses it with `JSON.parse`. There's no validation that the parsed object has the expected shape (`userId`, `name`, `role`, `centerId`). If localStorage is corrupted (browser extension, manual edit, schema change between deploys), the session object could have unexpected properties or missing fields.
- **Fix:** Add a type guard that validates required fields before returning the session.
- **Effort:** S

---

#### I2: No bounds validation on payroll amounts

- **Principle:** Defensive Programming (5.2)
- **Location:** `fleet-intelligence/src/features/payroll/lib/payroll.ts:77-112`
- **Description:** Payroll calculations (`totalBilled`, `tipsTotal`, `baseSalary`, `productivityBonus`, `overtimePay`, `totalPay`) have no bounds validation. If trip data contains negative costs (CSV parsing error) or extremely large values (decimal point error), the payroll record will have nonsensical amounts. The same applies to `hoursWorked` — no maximum cap.
- **Fix:** Add `Math.max(0, ...)` guards on calculated amounts. Add a sanity-check flag for records exceeding reasonable bounds (e.g., `totalBilled > $100,000 MXN/week`).
- **Effort:** S

---

#### I3: `getWeekBounds()` recomputes on every render in payroll hook

- **Principle:** Performance Optimization (4.1)
- **Location:** `fleet-intelligence/src/features/payroll/lib/use-payroll-data.ts:13`
- **Description:** `getWeekBounds()` is called at the top of `usePayrollData()` without memoization. While the expensive `calculateWeeklyPay` computation IS properly memoized (line 43-67), the week bounds computation runs on every render. Additionally, `filterByCenter` from `useCenterFilter()` may change identity on re-renders, potentially invalidating the `livePayroll` memoization.
- **Fix:** Wrap `getWeekBounds()` in `useMemo(() => getWeekBounds(), [])`. Ensure `filterByCenter` returns a stable reference (via `useCallback`).
- **Effort:** S

---

#### I4: Fire-and-forget vehicle reconciliation during hydration

- **Principle:** Data Integrity (3.5 Error Boundaries)
- **Location:** `fleet-intelligence/src/lib/supabase/queries/hydrate.ts:194-206`
- **Description:** During hydration, if a vehicle is `en_turno` but has no active shift, the code corrects the status locally and fires a Supabase update without awaiting it. The `.then(({ error }) => ...)` handler only logs failures. If the DB update fails, the local state is "fixed" but the DB remains inconsistent — next hydration will re-reconcile.
- **Impact:** Low — the reconciliation is self-healing (runs on every hydrate). But at scale with many vehicles needing reconciliation, concurrent fire-and-forget updates could conflict.
- **Fix:** Collect all reconciliation updates and batch them in a single awaited call. Log the count of reconciled vehicles.
- **Effort:** S

---

#### I5: PostgREST filter string construction in payroll rerun

- **Principle:** Robustness (2.3 KISS)
- **Location:** `fleet-intelligence/src/lib/supabase/mutations.ts:280`
- **Description:** The `.not('id', 'in', ...)` filter constructs a raw string: `` `(${newRecords.map((r) => r.id).join(',')})` ``. While PostgREST sanitizes inputs (no SQL injection risk), this is a fragile pattern. If a record ID contained a comma or parenthesis (impossible for UUIDs, but brittle as a pattern), the filter would break silently.
- **Fix:** Use the Supabase array filter syntax: `.not('id', 'in', `(${ids})`)` is actually the correct PostgREST syntax. Document this pattern or extract to a helper for consistency.
- **Effort:** S

---

## 5. Recommendations

| # | Action | Sev | Effort | Finding | Expected Impact |
|---|--------|-----|--------|---------|-----------------|
| 1 | Add `express-rate-limit` to all API endpoints | C | S | C5 | Prevents brute-force and invite abuse |
| 2 | Add auth guard to `GET /api/payroll/cron-status` | C | S | C6 | Stops information disclosure |
| 3 | Validate + sanitize `email` and `name` in invite endpoint | C | S | C2 | Closes XSS vector and invalid invite path |
| 4 | Move seed passwords out of repo (env vars or `.gitignore`d file) | C | S | C1 | Eliminates credential exposure |
| 5 | Return generic error messages to clients, log details server-side | W | S | W8 | Stops leaking internal DB structure |
| 6 | Add `center_id` indexes to `drivers`, `vehicles`, `profiles` | W | S | W6 | Prevents RLS query degradation at 2K vehicles |
| 7 | Add retry logic to cron payroll auto-close (3x with backoff) | W | S | W7 | Prevents missed weekly payroll closes |
| 8 | Replace `toLocaleString` timezone hack with `date-fns-tz` | W | S | W3 | Eliminates cross-platform Date parsing risk |
| 9 | Use `getUser()` instead of `getSession()` for token retrieval | W | S | W2 | Prevents stale-token failures |
| 10 | Report unmapped driver count in CSV import results | W | S | W4 | Makes silent data loss visible to admins |
| 11 | Show error state when post-login hydration fails | C | M | C4, W1 | Users see error instead of blank dashboard |
| 12 | Wrap payroll rerun in Supabase RPC transaction | C | M | C3 | Eliminates duplicate payroll records |
| 13 | Split AppState into domain contexts | W | L | W5 | Prevents global re-renders at scale |

### Quick Wins (Effort: S) — Do This Week

1. **Rate limiting** (#1) — `npm install express-rate-limit`, 5 lines of config
2. **Cron-status auth** (#2) — Add `requireAdmin(req)` call, 3 lines
3. **Input validation** (#3) — Email regex + name length/HTML strip, ~15 lines
4. **Seed passwords** (#4) — Move to env var, update SQL to use `current_setting('app.seed_password')`
5. **Generic error messages** (#5) — Map errors in catch blocks
6. **DB indexes** (#6) — 3 `CREATE INDEX` statements
7. **Cron retry** (#7) — Simple retry loop with `setTimeout`
8. **Timezone fix** (#8) — Replace 1 line with `date-fns-tz` call
9. **getUser()** (#9) — Replace `getSession()` call
10. **CSV unmapped count** (#10) — Return count from filter

### Planned Improvements (Effort: M) — Next Sprint

11. **Hydration error handling** (#11) — Add `hydrateError` to AppState, error banner component, retry button
12. **Payroll transaction** (#12) — Create Supabase RPC function wrapping INSERT + UPDATE

### Strategic Refactors (Effort: L) — Plan for Month 3+

13. **State management split** (#13) — Requires architectural decision on context vs. external store, affects many files

---

## 6. Strengths

- **Clean layer separation** — Pages call `action*()` functions, never Supabase or dispatch directly. The action → mutation → Supabase pipeline is consistent across all 6 domains (shifts, drivers, vehicles, trips, payroll, users).

- **Optimistic UI with automatic rollback** — The `withOptimistic` pattern in `lib/actions/with-optimistic.ts` dispatches an optimistic state update, persists to Supabase, and auto-rolls back on failure. Every write operation has a corresponding `REMOVE_*` or `REVERT_*` reducer case.

- **Shared payroll business rules** — `shared/payroll-rules.js` is the single source of truth for payroll calculations, imported by both the frontend (`payroll.ts`) and server (`payroll-close.js`). This eliminates the common problem of frontend and backend disagreeing on business logic.

- **Self-healing data reconciliation** — `hydrate.ts` detects stale vehicle statuses (marked `en_turno` with no active shift) and auto-corrects them. `deduplicatePayroll()` handles duplicate payroll records on the read side. These defensive patterns compensate for eventual consistency gaps.

- **Feature-based code organization** — Each feature (`payroll`, `driver`, `shift`, etc.) has its own directory under `features/` with page, components, and business logic co-located. Barrel exports keep the public API clean.

- **RLS-first authorization** — Row-Level Security policies in Supabase enforce center-scoped access for supervisors at the database level, not just in application code. This is defense-in-depth — even if the SPA has a bug, supervisors can't access other centers' data.

---

## 7. Summary

Fleet Intelligence scores **66/100 (Good)** overall. The codebase has a solid architectural foundation — clean layer separation, optimistic UI, shared business rules, and RLS-first security — that will serve well as the fleet grows. The most pressing issues are **security gaps in the Express API layer** (no rate limiting, no input validation, unauthenticated endpoints, leaked error details), which should be addressed immediately with the 10 quick-win fixes listed above (all Effort: S, total ~2-3 hours of work). With those fixes applied plus the two medium-effort improvements (hydration error handling and payroll transactions), the score would rise to the 75-80 range, solidly positioning the system for the 2,000-vehicle scale target.
