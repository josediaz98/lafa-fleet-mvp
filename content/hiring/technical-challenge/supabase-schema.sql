-- ============================================================
-- LAFA Fleet Intelligence & Payroll MVP — Supabase Schema
-- ============================================================
--
-- Copy-paste into Supabase SQL Editor to set up the database.
-- Run this AFTER creating auth users (see Section 4 notes).
--
-- Sections:
--   1. DDL (CREATE TABLE + Indexes)
--   2. Row Level Security (RLS)
--   3. Helper Functions
--   4. Seed Data
--
-- UUID Convention (deterministic for FK references):
--   Centers:  00000000-0000-0000-0000-00000000c001 .. c003
--   Users:    00000000-0000-0000-0000-00000000u001 .. u004
--   Drivers:  00000000-0000-0000-0000-0000000d0001 .. d0030
--   Vehicles: 00000000-0000-0000-0000-0000000v0001 .. v0012
-- ============================================================


-- ============================================================
-- 1. DDL — CREATE TABLE + Indexes
-- ============================================================

-- 1.1 Centers
-- Operational bases where vehicles are parked and shifts dispatched.
-- LAFA currently has 3 centers in CDMX.
CREATE TABLE centers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL UNIQUE,
  address    TEXT,
  lat        NUMERIC(9,6),
  lng        NUMERIC(9,6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 1.2 Profiles
-- Extends Supabase Auth (auth.users). Every authenticated user gets a row
-- here with their role and optional center assignment.
-- Admin users have center_id = NULL (access to all centers).
CREATE TABLE profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  role       TEXT NOT NULL CHECK (role IN ('admin', 'supervisor')),
  center_id  UUID REFERENCES centers(id),
  status     TEXT NOT NULL DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE profiles IS 'User profiles linked to Supabase Auth. Admin has no center_id; supervisors are scoped to one center.';


-- 1.3 Drivers
-- DiDi drivers employed or leased through LAFA.
-- didi_driver_id is their identifier in the DiDi platform (used for CSV matching).
CREATE TABLE drivers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  didi_driver_id  INTEGER NOT NULL UNIQUE,
  center_id       UUID NOT NULL REFERENCES centers(id),
  default_shift   TEXT NOT NULL CHECK (default_shift IN ('diurno', 'nocturno')),
  start_date      DATE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'activo' CHECK (status IN ('activo', 'inactivo')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 1.4 Vehicles
-- EV fleet: Geely Geometry C, JAC E10X, GAC Aion S.
CREATE TABLE vehicles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plate      TEXT NOT NULL UNIQUE,
  model      TEXT NOT NULL,
  oem        TEXT NOT NULL CHECK (oem IN ('Geely', 'JAC', 'GAC')),
  center_id  UUID NOT NULL REFERENCES centers(id),
  status     TEXT NOT NULL DEFAULT 'disponible'
             CHECK (status IN ('disponible', 'en_turno', 'cargando', 'mantenimiento', 'fuera_de_servicio')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 1.5 Shifts
-- Tracks driver check-in / check-out per vehicle.
-- Shifts open as 'en_turno' and close as 'completado' or 'pendiente_revision' (>12h).
CREATE TABLE shifts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id    UUID NOT NULL REFERENCES drivers(id),
  vehicle_id   UUID NOT NULL REFERENCES vehicles(id),
  check_in     TIMESTAMPTZ NOT NULL DEFAULT now(),
  check_out    TIMESTAMPTZ,
  hours_worked NUMERIC(5,2),
  status       TEXT NOT NULL DEFAULT 'en_turno'
               CHECK (status IN ('en_turno', 'completado', 'pendiente_revision')),
  created_by   UUID REFERENCES profiles(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_shifts_driver_checkin ON shifts(driver_id, check_in);


-- 1.6 CSV Uploads
-- Metadata for each DiDi trip CSV file uploaded by an admin.
CREATE TABLE csv_uploads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename      TEXT NOT NULL,
  uploaded_by   UUID NOT NULL REFERENCES profiles(id),
  uploaded_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  record_count  INTEGER NOT NULL DEFAULT 0,
  valid_count   INTEGER NOT NULL DEFAULT 0,
  warning_count INTEGER NOT NULL DEFAULT 0,
  error_count   INTEGER NOT NULL DEFAULT 0,
  status        TEXT NOT NULL DEFAULT 'procesado'
                CHECK (status IN ('procesado', 'error')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- 1.7 Trips
-- Individual trip records parsed from DiDi CSV exports.
-- Linked to a driver via didi_driver_id lookup and to the upload batch.
CREATE TABLE trips (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id     UUID NOT NULL REFERENCES drivers(id),
  didi_trip_id  TEXT NOT NULL UNIQUE,
  date          DATE NOT NULL,
  initial_time  TIME NOT NULL,
  final_time    TIME NOT NULL,
  cost          NUMERIC(10,2) NOT NULL,
  tip           NUMERIC(10,2) NOT NULL DEFAULT 0,
  initial_lat   NUMERIC(9,6),
  initial_lng   NUMERIC(9,6),
  final_lat     NUMERIC(9,6),
  final_lng     NUMERIC(9,6),
  upload_id     UUID REFERENCES csv_uploads(id),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_trips_driver_date ON trips(driver_id, date);


-- 1.8 Weekly Payroll
-- Calculated payroll records per driver per week.
-- Supports versioning: when a payroll is recalculated, previous version
-- is marked 'superseded' and a new row with version+1 is inserted.
CREATE TABLE weekly_payroll (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id           UUID NOT NULL REFERENCES drivers(id),
  week_start          DATE NOT NULL,
  week_end            DATE NOT NULL,
  hours_worked        NUMERIC(5,2)  NOT NULL DEFAULT 0,
  total_billed        NUMERIC(10,2) NOT NULL DEFAULT 0,
  tips_total          NUMERIC(10,2) NOT NULL DEFAULT 0,
  hours_threshold     NUMERIC(5,2)  NOT NULL DEFAULT 40,
  revenue_threshold   NUMERIC(10,2) NOT NULL DEFAULT 6000,
  goal_met            BOOLEAN NOT NULL DEFAULT false,
  base_salary         NUMERIC(10,2) NOT NULL DEFAULT 0,
  productivity_bonus  NUMERIC(10,2) NOT NULL DEFAULT 0,
  overtime_pay        NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_pay           NUMERIC(10,2) NOT NULL DEFAULT 0,
  status              TEXT NOT NULL DEFAULT 'borrador'
                      CHECK (status IN ('borrador', 'cerrado', 'superseded')),
  version             INTEGER NOT NULL DEFAULT 1,
  ai_explanation      TEXT,
  closed_by           UUID REFERENCES profiles(id),
  closed_at           TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(driver_id, week_start, version)
);

CREATE INDEX idx_payroll_driver_week ON weekly_payroll(driver_id, week_start);


-- ============================================================
-- 2. ROW LEVEL SECURITY (RLS)
-- ============================================================
-- Policy pattern:
--   Admin (role = 'admin')  → full access to all rows
--   Supervisor              → SELECT only, filtered by their center_id
--
-- The helper function get_user_role() reads the current user's profile.
-- ============================================================

-- Enable RLS on every table
ALTER TABLE centers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE drivers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE shifts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE csv_uploads    ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips          ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_payroll ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 3. HELPER FUNCTIONS (used by RLS policies)
-- ============================================================

-- Returns the role of the currently authenticated user.
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- Returns the center_id of the currently authenticated user.
-- Returns NULL for admins (they have access to all centers).
CREATE OR REPLACE FUNCTION get_user_center_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT center_id FROM profiles WHERE id = auth.uid();
$$;


-- ----------------------------------------------------------
-- 2.1 centers — Policies
-- ----------------------------------------------------------
-- All authenticated users can read centers.
-- Only admins can create, update, or delete.

CREATE POLICY "centers: anyone can read"
  ON centers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "centers: admin full access (insert)"
  ON centers FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "centers: admin full access (update)"
  ON centers FOR UPDATE
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "centers: admin full access (delete)"
  ON centers FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ----------------------------------------------------------
-- 2.2 profiles — Policies
-- ----------------------------------------------------------
-- Users can read their own profile.
-- Admins can read all profiles and manage them.

CREATE POLICY "profiles: users read own"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid() OR get_user_role() = 'admin');

CREATE POLICY "profiles: admin insert"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "profiles: admin update"
  ON profiles FOR UPDATE
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "profiles: admin delete"
  ON profiles FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ----------------------------------------------------------
-- 2.3 drivers — Policies
-- ----------------------------------------------------------
-- Admin: full CRUD on all drivers.
-- Supervisor: SELECT only, scoped to their center.

CREATE POLICY "drivers: admin full access (select)"
  ON drivers FOR SELECT
  TO authenticated
  USING (
    get_user_role() = 'admin'
    OR center_id = get_user_center_id()
  );

CREATE POLICY "drivers: admin insert"
  ON drivers FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "drivers: admin update"
  ON drivers FOR UPDATE
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "drivers: admin delete"
  ON drivers FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ----------------------------------------------------------
-- 2.4 vehicles — Policies
-- ----------------------------------------------------------
-- Same pattern as drivers: admin full, supervisor read own center.

CREATE POLICY "vehicles: read by role"
  ON vehicles FOR SELECT
  TO authenticated
  USING (
    get_user_role() = 'admin'
    OR center_id = get_user_center_id()
  );

CREATE POLICY "vehicles: admin insert"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "vehicles: admin update"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "vehicles: admin delete"
  ON vehicles FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ----------------------------------------------------------
-- 2.5 shifts — Policies
-- ----------------------------------------------------------
-- Admin: full CRUD.
-- Supervisor: SELECT + INSERT + UPDATE on shifts for their center.
-- (Supervisors dispatch and close shifts for their center's drivers.)

CREATE POLICY "shifts: read by role"
  ON shifts FOR SELECT
  TO authenticated
  USING (
    get_user_role() = 'admin'
    OR EXISTS (
      SELECT 1 FROM drivers d
      WHERE d.id = shifts.driver_id
        AND d.center_id = get_user_center_id()
    )
  );

CREATE POLICY "shifts: admin insert"
  ON shifts FOR INSERT
  TO authenticated
  WITH CHECK (
    get_user_role() = 'admin'
    OR EXISTS (
      SELECT 1 FROM drivers d
      WHERE d.id = driver_id
        AND d.center_id = get_user_center_id()
    )
  );

CREATE POLICY "shifts: admin update"
  ON shifts FOR UPDATE
  TO authenticated
  USING (
    get_user_role() = 'admin'
    OR EXISTS (
      SELECT 1 FROM drivers d
      WHERE d.id = shifts.driver_id
        AND d.center_id = get_user_center_id()
    )
  )
  WITH CHECK (
    get_user_role() = 'admin'
    OR EXISTS (
      SELECT 1 FROM drivers d
      WHERE d.id = shifts.driver_id
        AND d.center_id = get_user_center_id()
    )
  );

CREATE POLICY "shifts: admin delete"
  ON shifts FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ----------------------------------------------------------
-- 2.6 csv_uploads — Policies
-- ----------------------------------------------------------
-- Admin only: INSERT + SELECT. Supervisors have no access.
-- (Only admins upload DiDi CSVs.)

CREATE POLICY "csv_uploads: admin read"
  ON csv_uploads FOR SELECT
  TO authenticated
  USING (get_user_role() = 'admin');

CREATE POLICY "csv_uploads: admin insert"
  ON csv_uploads FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "csv_uploads: admin update"
  ON csv_uploads FOR UPDATE
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "csv_uploads: admin delete"
  ON csv_uploads FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ----------------------------------------------------------
-- 2.7 trips — Policies
-- ----------------------------------------------------------
-- Admin: full CRUD.
-- Supervisor: SELECT only, scoped to drivers in their center.

CREATE POLICY "trips: read by role"
  ON trips FOR SELECT
  TO authenticated
  USING (
    get_user_role() = 'admin'
    OR EXISTS (
      SELECT 1 FROM drivers d
      WHERE d.id = trips.driver_id
        AND d.center_id = get_user_center_id()
    )
  );

CREATE POLICY "trips: admin insert"
  ON trips FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "trips: admin update"
  ON trips FOR UPDATE
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "trips: admin delete"
  ON trips FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ----------------------------------------------------------
-- 2.8 weekly_payroll — Policies
-- ----------------------------------------------------------
-- Admin: full CRUD (creates, closes, and supersedes payroll).
-- Supervisor: SELECT only, scoped to drivers in their center.

CREATE POLICY "payroll: read by role"
  ON weekly_payroll FOR SELECT
  TO authenticated
  USING (
    get_user_role() = 'admin'
    OR EXISTS (
      SELECT 1 FROM drivers d
      WHERE d.id = weekly_payroll.driver_id
        AND d.center_id = get_user_center_id()
    )
  );

CREATE POLICY "payroll: admin insert"
  ON weekly_payroll FOR INSERT
  TO authenticated
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "payroll: admin update"
  ON weekly_payroll FOR UPDATE
  TO authenticated
  USING (get_user_role() = 'admin')
  WITH CHECK (get_user_role() = 'admin');

CREATE POLICY "payroll: admin delete"
  ON weekly_payroll FOR DELETE
  TO authenticated
  USING (get_user_role() = 'admin');


-- ============================================================
-- 4. SEED DATA
-- ============================================================
--
-- IMPORTANT: Auth users must be created FIRST via one of:
--   a) Supabase Dashboard → Authentication → Users → Add User
--   b) supabase.auth.admin.createUser() from a server script
--   c) The SQL approach below (inserts directly into auth.users)
--
-- Auth user UUIDs must match the profile UUIDs below.
-- ============================================================

-- ----------------------------------------------------------
-- 4.0 Auth Users (Supabase Auth)
-- ----------------------------------------------------------
-- NOTE: In production, create these via the Supabase Dashboard or
-- supabase.auth.admin.createUser(). The INSERT below works in the
-- SQL Editor but is NOT the recommended approach — it bypasses
-- Supabase's auth hooks (password hashing, email confirmation, etc.).
--
-- If you prefer the Dashboard approach, create 4 users with these
-- emails and UUIDs, then skip to Section 4.1:
--
--   UUID: 00000000-0000-0000-0000-00000000u001  admin@lafa.mx   password: admin123
--   UUID: 00000000-0000-0000-0000-00000000u002  maria@lafa.mx   password: super123
--   UUID: 00000000-0000-0000-0000-00000000u003  carlos@lafa.mx  password: super123
--   UUID: 00000000-0000-0000-0000-00000000u004  ana@lafa.mx     password: super123


-- ----------------------------------------------------------
-- 4.1 Centers
-- ----------------------------------------------------------
INSERT INTO centers (id, name, address, lat, lng) VALUES
  ('00000000-0000-0000-0000-00000000c001', 'Vallejo',  'Calz. Vallejo 1020, Gustavo A. Madero, CDMX',  19.4890, -99.1480),
  ('00000000-0000-0000-0000-00000000c002', 'Granada',  'Av. Ejército Nacional 453, Granada, CDMX',      19.4400, -99.1870),
  ('00000000-0000-0000-0000-00000000c003', 'Roma',     'Av. Insurgentes Sur 364, Roma Norte, CDMX',     19.4170, -99.1620);


-- ----------------------------------------------------------
-- 4.2 Profiles (must match auth.users UUIDs)
-- ----------------------------------------------------------
-- NOTE: These INSERTs will fail if the matching auth.users rows
-- don't exist yet. Create auth users first (see Section 4.0).
INSERT INTO profiles (id, name, email, role, center_id, status) VALUES
  ('00000000-0000-0000-0000-00000000u001', 'Admin LAFA',        'admin@lafa.mx',   'admin',      NULL,                                          'activo'),
  ('00000000-0000-0000-0000-00000000u002', 'María Supervisor',  'maria@lafa.mx',   'supervisor', '00000000-0000-0000-0000-00000000c001',        'activo'),
  ('00000000-0000-0000-0000-00000000u003', 'Carlos Supervisor', 'carlos@lafa.mx',  'supervisor', '00000000-0000-0000-0000-00000000c002',        'activo'),
  ('00000000-0000-0000-0000-00000000u004', 'Ana Supervisor',    'ana@lafa.mx',     'supervisor', '00000000-0000-0000-0000-00000000c003',        'activo');


-- ----------------------------------------------------------
-- 4.3 Drivers (30 total: 10 per center)
-- ----------------------------------------------------------
-- Maps exactly to MOCK_DRIVERS in mockData.ts.
-- DiDi driver IDs: 114958–114987.

-- Vallejo (c1) — 10 drivers
INSERT INTO drivers (id, full_name, didi_driver_id, center_id, default_shift, start_date, status) VALUES
  ('00000000-0000-0000-0000-0000000d0001', 'Carlos Mendoza',   114958, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-10-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0002', 'Luis Hernández',   114959, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-10-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0003', 'Miguel Torres',    114960, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2025-11-01', 'activo'),
  ('00000000-0000-0000-0000-0000000d0009', 'Andrés Morales',   114966, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2026-01-05', 'activo'),
  ('00000000-0000-0000-0000-0000000d0011', 'Jorge Castillo',   114968, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2025-10-25', 'inactivo'),
  ('00000000-0000-0000-0000-0000000d0013', 'Héctor Juárez',    114970, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-11-05', 'activo'),
  ('00000000-0000-0000-0000-0000000d0014', 'Óscar Navarro',    114971, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2025-11-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0015', 'Eduardo Ríos',     114972, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2025-12-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0016', 'Daniel Ortiz',     114973, '00000000-0000-0000-0000-00000000c001', 'nocturno', '2026-01-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0017', 'Sergio Guzmán',    114974, '00000000-0000-0000-0000-00000000c001', 'diurno',   '2026-02-10', 'activo');

-- Granada (c2) — 10 drivers
INSERT INTO drivers (id, full_name, didi_driver_id, center_id, default_shift, start_date, status) VALUES
  ('00000000-0000-0000-0000-0000000d0004', 'Roberto Díaz',      114961, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2025-11-10', 'activo'),
  ('00000000-0000-0000-0000-0000000d0005', 'Fernando López',    114962, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2025-11-15', 'activo'),
  ('00000000-0000-0000-0000-0000000d0006', 'Alejandro Ramírez', 114963, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2025-12-01', 'activo'),
  ('00000000-0000-0000-0000-0000000d0012', 'Raúl Vargas',       114969, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2026-01-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0018', 'Manuel Peña',       114975, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2025-10-18', 'activo'),
  ('00000000-0000-0000-0000-0000000d0019', 'Arturo Delgado',    114976, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2025-11-25', 'activo'),
  ('00000000-0000-0000-0000-0000000d0020', 'Iván Contreras',    114977, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2025-12-08', 'activo'),
  ('00000000-0000-0000-0000-0000000d0021', 'Pablo Herrera',     114978, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2026-01-12', 'activo'),
  ('00000000-0000-0000-0000-0000000d0022', 'Gustavo Salazar',   114979, '00000000-0000-0000-0000-00000000c002', 'nocturno', '2026-01-28', 'activo'),
  ('00000000-0000-0000-0000-0000000d0023', 'Enrique Medina',    114980, '00000000-0000-0000-0000-00000000c002', 'diurno',   '2026-02-14', 'activo');

-- Roma (c3) — 10 drivers
INSERT INTO drivers (id, full_name, didi_driver_id, center_id, default_shift, start_date, status) VALUES
  ('00000000-0000-0000-0000-0000000d0007', 'Juan García',       114964, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2025-12-05', 'activo'),
  ('00000000-0000-0000-0000-0000000d0008', 'Pedro Sánchez',     114965, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2025-12-10', 'activo'),
  ('00000000-0000-0000-0000-0000000d0010', 'Ricardo Flores',    114967, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2026-01-10', 'activo'),
  ('00000000-0000-0000-0000-0000000d0024', 'Francisco Mora',    114981, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2025-10-22', 'activo'),
  ('00000000-0000-0000-0000-0000000d0025', 'Alberto Cruz',      114982, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2025-11-12', 'activo'),
  ('00000000-0000-0000-0000-0000000d0026', 'Javier Reyes',      114983, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2025-12-03', 'activo'),
  ('00000000-0000-0000-0000-0000000d0027', 'Diego Luna',        114984, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2025-12-20', 'activo'),
  ('00000000-0000-0000-0000-0000000d0028', 'Ramón Aguilar',     114985, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2026-01-08', 'activo'),
  ('00000000-0000-0000-0000-0000000d0029', 'Tomás Vega',        114986, '00000000-0000-0000-0000-00000000c003', 'diurno',   '2026-02-01', 'activo'),
  ('00000000-0000-0000-0000-0000000d0030', 'Gabriel Estrada',   114987, '00000000-0000-0000-0000-00000000c003', 'nocturno', '2026-02-12', 'activo');


-- ----------------------------------------------------------
-- 4.4 Vehicles (12)
-- ----------------------------------------------------------
-- Maps exactly to MOCK_VEHICLES in mockData.ts.
-- OEM distribution: 5 Geely Geometry C, 4 JAC E10X, 3 GAC Aion S.
INSERT INTO vehicles (id, plate, model, oem, center_id, status) VALUES
  ('00000000-0000-0000-0000-0000000v0001', 'ABC-1234', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c001', 'disponible'),
  ('00000000-0000-0000-0000-0000000v0002', 'DEF-5678', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000v0003', 'GHI-9012', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000v0004', 'JKL-3456', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c002', 'en_turno'),
  ('00000000-0000-0000-0000-0000000v0005', 'MNO-7890', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c002', 'en_turno'),
  ('00000000-0000-0000-0000-0000000v0006', 'PQR-1235', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c002', 'cargando'),
  ('00000000-0000-0000-0000-0000000v0007', 'STU-4567', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c003', 'en_turno'),
  ('00000000-0000-0000-0000-0000000v0008', 'VWX-8901', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c003', 'disponible'),
  ('00000000-0000-0000-0000-0000000v0009', 'YZA-2345', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c001', 'mantenimiento'),
  ('00000000-0000-0000-0000-0000000v0010', 'BCD-6789', 'Aion S',     'GAC',   '00000000-0000-0000-0000-00000000c003', 'en_turno'),
  ('00000000-0000-0000-0000-0000000v0011', 'EFG-0123', 'Geometry C', 'Geely', '00000000-0000-0000-0000-00000000c001', 'en_turno'),
  ('00000000-0000-0000-0000-0000000v0012', 'HIJ-4560', 'E10X',       'JAC',   '00000000-0000-0000-0000-00000000c002', 'en_turno');


-- ----------------------------------------------------------
-- 4.5 Trips (60 records — current week: 16–22 Feb 2026)
-- ----------------------------------------------------------
-- Maps exactly to MOCK_TRIPS in mockData.ts.
-- Each row is a daily billing aggregate from DiDi.
-- driver_id references the drivers table UUID (resolved via didi_driver_id).

-- d1 — Carlos Mendoza (114958, Vallejo) — High earner ~$9,500
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0001', 'k3m8n2', '2026-02-16', '05:30', '17:30', 1520.00, 80.00),
  ('00000000-0000-0000-0000-0000000d0001', 'p4q9r1', '2026-02-17', '05:15', '17:00', 1680.00, 120.00),
  ('00000000-0000-0000-0000-0000000d0001', 'v2w7x5', '2026-02-18', '05:45', '17:15', 1450.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0001', 'b6c1d8', '2026-02-19', '05:30', '17:30', 1590.00, 60.00),
  ('00000000-0000-0000-0000-0000000d0001', 'h9j3k7', '2026-02-20', '05:00', '17:45', 1720.00, 90.00),
  ('00000000-0000-0000-0000-0000000d0001', 'n5p0q4', '2026-02-21', '06:00', '17:00', 1540.00, 0.00);

-- d4 — Roberto Díaz (114961, Granada) — High earner ~$8,540
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0004', 't8u2v6', '2026-02-16', '05:30', '17:30', 1680.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0004', 'z3a7b1', '2026-02-17', '05:15', '17:15', 1750.00, 100.00),
  ('00000000-0000-0000-0000-0000000d0004', 'f5g9h3', '2026-02-18', '05:45', '17:00', 1590.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0004', 'l7m1n5', '2026-02-19', '05:30', '17:30', 1820.00, 80.00),
  ('00000000-0000-0000-0000-0000000d0004', 'r9s3t7', '2026-02-20', '05:00', '17:00', 1700.00, 0.00);

-- d7 — Juan García (114964, Roma) — High earner ~$8,040
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0007', 'x1y5z9', '2026-02-16', '05:30', '17:00', 1550.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0007', 'd3e7f1', '2026-02-17', '05:15', '17:30', 1680.00, 90.00),
  ('00000000-0000-0000-0000-0000000d0007', 'j5k9l3', '2026-02-18', '05:45', '17:15', 1720.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0007', 'p7q1r5', '2026-02-19', '05:30', '17:00', 1490.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0007', 'v9w3x7', '2026-02-20', '05:00', '17:45', 1600.00, 60.00);

-- d18 — Manuel Peña (114975, Granada) — Top earner ~$10,750
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0018', 'b1c5d9', '2026-02-16', '19:00', '07:00', 1920.00, 150.00),
  ('00000000-0000-0000-0000-0000000d0018', 'h3j7k1', '2026-02-17', '19:00', '07:00', 1850.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0018', 'n5p9q3', '2026-02-18', '19:00', '07:00', 1780.00, 80.00),
  ('00000000-0000-0000-0000-0000000d0018', 't7u1v5', '2026-02-19', '19:00', '07:00', 1690.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0018', 'z9a3b7', '2026-02-20', '19:00', '07:00', 1930.00, 100.00),
  ('00000000-0000-0000-0000-0000000d0018', 'f1g5h9', '2026-02-21', '19:00', '07:00', 1580.00, 0.00);

-- d2 — Luis Hernández (114959, Vallejo) — Medium ~$6,500
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0002', 'l3m7n1', '2026-02-16', '05:30', '17:30', 1650.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0002', 'r5s9t3', '2026-02-17', '05:15', '17:00', 1580.00, 40.00),
  ('00000000-0000-0000-0000-0000000d0002', 'x7y1z5', '2026-02-18', '05:45', '17:15', 1720.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0002', 'd9e3f7', '2026-02-19', '05:30', '17:30', 1550.00, 0.00);

-- d5 — Fernando López (114962, Granada) — Medium ~$6,250
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0005', 'j1k5l9', '2026-02-16', '19:00', '07:00', 1620.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0005', 'p3q7r1', '2026-02-17', '19:00', '07:00', 1540.00, 60.00),
  ('00000000-0000-0000-0000-0000000d0005', 'v5w9x3', '2026-02-18', '19:00', '07:00', 1580.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0005', 'b7c1d5', '2026-02-19', '19:00', '07:00', 1510.00, 0.00);

-- d6 — Alejandro Ramírez (114963, Granada) — Medium ~$6,900
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0006', 'h9j3k7a', '2026-02-16', '05:30', '17:30', 1750.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0006', 'n1p5q9',  '2026-02-17', '05:15', '17:00', 1680.00, 80.00),
  ('00000000-0000-0000-0000-0000000d0006', 't3u7v1',  '2026-02-18', '05:45', '17:15', 1620.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0006', 'z5a9b3',  '2026-02-19', '05:30', '17:30', 1850.00, 0.00);

-- d8 — Pedro Sánchez (114965, Roma) — Medium ~$6,220
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0008', 'f7g1h5', '2026-02-16', '19:00', '07:00', 1580.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0008', 'l9m3n7', '2026-02-17', '19:00', '07:00', 1520.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0008', 'r1s5t9', '2026-02-18', '19:00', '07:00', 1640.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0008', 'x3y7z1', '2026-02-19', '19:00', '07:00', 1480.00, 0.00);

-- d13 — Héctor Juárez (114970, Vallejo) — Medium-high ~$7,200
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0013', 'd5e9f3', '2026-02-16', '05:30', '17:30', 1850.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0013', 'j7k1l5', '2026-02-17', '05:15', '17:00', 1920.00, 100.00),
  ('00000000-0000-0000-0000-0000000d0013', 'p9q3r7', '2026-02-18', '05:45', '17:15', 1780.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0013', 'v1w5x9', '2026-02-19', '05:30', '17:30', 1650.00, 0.00);

-- d25 — Alberto Cruz (114982, Roma) — Medium ~$6,250
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0025', 'b3c7d1', '2026-02-16', '05:30', '17:00', 1620.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0025', 'h5j9k3', '2026-02-17', '05:15', '17:30', 1580.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0025', 'n7p1q5', '2026-02-18', '05:45', '17:15', 1540.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0025', 't9u3v7', '2026-02-19', '05:30', '17:00', 1510.00, 0.00);

-- d3 — Miguel Torres (114960, Vallejo) — Low ~$4,450
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0003', 'z1a5b9', '2026-02-16', '19:00', '07:00', 1520.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0003', 'f3g7h1', '2026-02-17', '19:00', '07:00', 1480.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0003', 'l5m9n3', '2026-02-18', '19:00', '07:00', 1450.00, 0.00);

-- d9 — Andrés Morales (114966, Vallejo) — Low ~$3,800
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0009', 'r7s1t5', '2026-02-16', '05:30', '17:30', 1950.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0009', 'x9y3z7', '2026-02-17', '05:15', '17:00', 1850.00, 0.00);

-- d10 — Ricardo Flores (114967, Roma) — Low, just missed ~$5,950
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0010', 'd1e5f9', '2026-02-16', '05:30', '17:00', 1520.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0010', 'j3k7l1', '2026-02-17', '05:15', '17:30', 1480.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0010', 'p5q9r3', '2026-02-18', '05:45', '17:15', 1510.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0010', 'v7w1x5', '2026-02-19', '05:30', '17:00', 1440.00, 0.00);

-- d14 — Óscar Navarro (114971, Vallejo) — Low ~$3,200
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0014', 'b9c3d7', '2026-02-16', '19:00', '07:00', 1680.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0014', 'h1j5k9', '2026-02-17', '19:00', '07:00', 1520.00, 0.00);

-- d24 — Francisco Mora (114981, Roma) — Low ~$4,950
INSERT INTO trips (driver_id, didi_trip_id, date, initial_time, final_time, cost, tip) VALUES
  ('00000000-0000-0000-0000-0000000d0024', 'n3p7q1', '2026-02-16', '19:00', '07:00', 1720.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0024', 't5u9v3', '2026-02-17', '19:00', '07:00', 1680.00, 0.00),
  ('00000000-0000-0000-0000-0000000d0024', 'z7a1b5', '2026-02-18', '19:00', '07:00', 1550.00, 0.00);


-- ----------------------------------------------------------
-- 4.6 Weekly Payroll — Previous week (10–16 Feb 2026, closed)
-- ----------------------------------------------------------
-- 30 records matching MOCK_PAYROLL: 18 goal met + 12 goal not met.
-- All status = 'cerrado', version = 1, closed by admin.
--
-- Payroll rules (from payroll.ts):
--   - Goal met: hours >= 40 AND billed >= $6,000 MXN
--   - Base salary: $2,500 MXN (if goal met)
--   - Productivity bonus: floor((billed - 6000) / 500) * $100
--   - Overtime: min(hours - 40, 8) * $50/hr (requires prev week >= 40h)
--   - Goal not met: $1,000 MXN support payment

-- Goal met (18 drivers)
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0001', '2026-02-10', '2026-02-16', 45.00, 9200.00, 0, true,  2500.00, 600.00, 250.00, 3350.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0002', '2026-02-10', '2026-02-16', 42.00, 6800.00, 0, true,  2500.00, 100.00, 100.00, 2700.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0004', '2026-02-10', '2026-02-16', 44.00, 8500.00, 0, true,  2500.00, 500.00, 200.00, 3200.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0005', '2026-02-10', '2026-02-16', 41.00, 6100.00, 0, true,  2500.00,   0.00,  50.00, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0006', '2026-02-10', '2026-02-16', 43.00, 7800.00, 0, true,  2500.00, 300.00, 150.00, 2950.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0007', '2026-02-10', '2026-02-16', 46.00, 9500.00, 0, true,  2500.00, 700.00, 300.00, 3500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0008', '2026-02-10', '2026-02-16', 40.00, 6000.00, 0, true,  2500.00,   0.00,   0.00, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0012', '2026-02-10', '2026-02-16', 41.00, 6300.00, 0, true,  2500.00,   0.00,  50.00, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0013', '2026-02-10', '2026-02-16', 44.00, 8400.00, 0, true,  2500.00, 400.00, 200.00, 3100.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0014', '2026-02-10', '2026-02-16', 41.00, 6500.00, 0, true,  2500.00, 100.00,  50.00, 2650.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0018', '2026-02-10', '2026-02-16', 48.00, 10200.00, 0, true, 2500.00, 800.00, 400.00, 3700.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0019', '2026-02-10', '2026-02-16', 41.00, 6200.00, 0, true,  2500.00,   0.00,  50.00, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0021', '2026-02-10', '2026-02-16', 43.00, 7100.00, 0, true,  2500.00, 200.00, 150.00, 2850.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0024', '2026-02-10', '2026-02-16', 42.00, 7400.00, 0, true,  2500.00, 200.00, 100.00, 2800.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0025', '2026-02-10', '2026-02-16', 45.00, 8800.00, 0, true,  2500.00, 500.00, 250.00, 3250.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0026', '2026-02-10', '2026-02-16', 40.00, 6050.00, 0, true,  2500.00,   0.00,   0.00, 2500.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0027', '2026-02-10', '2026-02-16', 43.00, 6900.00, 0, true,  2500.00, 100.00, 150.00, 2750.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0028', '2026-02-10', '2026-02-16', 41.00, 6400.00, 0, true,  2500.00,   0.00,  50.00, 2550.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00');

-- Goal not met (12 drivers) — receive $1,000 MXN support payment
INSERT INTO weekly_payroll (driver_id, week_start, week_end, hours_worked, total_billed, tips_total, goal_met, base_salary, productivity_bonus, overtime_pay, total_pay, status, version, closed_by, closed_at) VALUES
  ('00000000-0000-0000-0000-0000000d0003', '2026-02-10', '2026-02-16', 38.00, 7200.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0009', '2026-02-10', '2026-02-16', 42.00, 5800.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0010', '2026-02-10', '2026-02-16', 40.00, 5999.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0011', '2026-02-10', '2026-02-16', 30.00, 3500.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0015', '2026-02-10', '2026-02-16', 36.00, 5500.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0016', '2026-02-10', '2026-02-16', 32.00, 3200.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0017', '2026-02-10', '2026-02-16', 20.00, 2800.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0020', '2026-02-10', '2026-02-16', 39.00, 6800.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0022', '2026-02-10', '2026-02-16', 40.00, 5200.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0023', '2026-02-10', '2026-02-16', 10.00, 1500.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0029', '2026-02-10', '2026-02-16', 35.00, 4800.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00'),
  ('00000000-0000-0000-0000-0000000d0030', '2026-02-10', '2026-02-16', 18.00, 2200.00, 0, false, 0, 0, 0, 1000.00, 'cerrado', 1, '00000000-0000-0000-0000-00000000u001', '2026-02-16T20:00:00+00:00');


-- ============================================================
-- Done. Verify with:
--   SELECT 'centers' AS t, count(*) FROM centers
--   UNION ALL SELECT 'profiles', count(*) FROM profiles
--   UNION ALL SELECT 'drivers', count(*) FROM drivers
--   UNION ALL SELECT 'vehicles', count(*) FROM vehicles
--   UNION ALL SELECT 'trips', count(*) FROM trips
--   UNION ALL SELECT 'weekly_payroll', count(*) FROM weekly_payroll;
--
-- Expected: centers=3, profiles=4, drivers=30, vehicles=12,
--           trips=60, weekly_payroll=30
-- ============================================================
