# Data Generation Plan: DiDi Trip CSV Generator

> **Purpose:** Design doc for the dummy DiDi trip data used in the Fleet Intelligence & Payroll technical challenge.
> **Generator:** [`generate_didi_data.py`](./generate_didi_data.py)
> **Output:** [`data/`](./data/)

---

## Deliverables

```
content/hiring/technical-challenge/
    data-generation-plan.md     <- this document
    generate_didi_data.py       <- standalone generator (stdlib only)
    data/
        didi_week_01.csv        <- Feb 2-8 (no overtime possible)
        didi_week_02.csv        <- Feb 9-15 (new driver enters Wed; overtime testable)
        didi_week_03.csv        <- Feb 16-22 (full cycle)
        didi_all_trips.csv      <- All 3 weeks combined
        driver_manifest.csv     <- driver_id -> name -> center -> shift -> tier mapping
```

**Why Python:** The brief suggests Python as a backend option; payroll pseudocode is Python; zero dependencies needed (`csv`, `random`, `math`, `datetime` only).

---

## Data Sources Reused from Codebase

| Data | Source File | Lines |
|------|-------------|-------|
| 15 CDMX colonia coordinates | `tools/fleetmap.js` | 13-29 |
| 3 LAFA center coords (Vallejo, Granada, Roma) | `tools/fleetmap.js` | 32-36 |
| 5 charging station coords | `tools/fleetmap.js` | 39-45 |
| Mexican name arrays | `tools/shared.js` | 47-49 |
| Vehicle models by OEM | `tools/shared.js` | 54-58 |
| DiDi CSV format spec | `content/hiring/technical-challenge/brief.md` | 78-92 |
| Payroll pseudocode | `content/hiring/technical-challenge/brief.md` | 43-65 |

---

## Real-World Data Informing the Generator

### Traffic Speed Model (TomTom 2025 CDMX)

```
Hour:  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23
km/h: 25  28  32  36  40  35  25  20  15  17  22  23  24  23  22  20  17  13  14  16  22  27  30  27
```

- AM peak (8-9): 15 km/h -> a 10 km trip takes ~40 min
- PM peak (17-18): 13 km/h -> a 10 km trip takes ~46 min
- Off-peak (4 AM): 40 km/h -> a 10 km trip takes ~15 min

### DiDi Premier Fare Formula

```
fare = (10 + 6.50 * km + 1.50 * min) * 1.55
```

- Average trip (~10 km, ~30 min): ~$170-$210 MXN
- Airport run (~20 km, ~45 min): ~$320-$380 MXN

### Zone Demand Weights

| Zone | Weight | Notes |
|------|--------|-------|
| Polanco | 15 | Highest demand |
| Roma Norte | 14 | |
| Condesa | 13 | |
| Centro | 12 | |
| Reforma | 11 | |
| Del Valle | 10 | |
| Juarez | 9 | |
| Santa Fe | 8 | |
| Narvarte | 6 | |
| Coyoacan | 5 | |
| Roma Sur | 4 | |
| Tlalpan | 3 | |
| Azcapotzalco | 3 | |
| Iztapalapa | 2 | |
| Xochimilco | 1 | Lowest demand |

Airport trips = ~8% of total.

### Daily Trip Volume Multiplier

| Day | Multiplier | Notes |
|-----|-----------|-------|
| Mon-Wed | 1.0 | Baseline |
| Thu | 1.05 | Slight uptick |
| Fri | 1.15 | Weekend start |
| Sat | 0.85 | Lower volume |
| Sun | 0.70 | Lowest + 8 PM cutoff |

---

## Driver Pool Design (30 drivers)

| Tier | Count | Weekly Billing | Hours/Week | Payroll Test |
|------|-------|---------------|------------|--------------|
| High performer | 8 | $8K-$12K | 42-48h | Base + bonus + overtime |
| Solid performer | 10 | $6.2K-$8K | 40-44h | Base + small bonus |
| Threshold edge | 5 | $5.5K-$6.5K | 38-42h | Some weeks pass, some fail the AND |
| Below threshold | 4 | $3.5K-$5.5K | 30-38h | Always $1,000 only |
| New (enters Week 2 Wed) | 1 | $2K-$4K | 16-24h | Proration edge case |
| Weekend-only | 2 | $4K-$6K | 20-24h | Low hours + decent billing (turno diurno only) |

> **Nota turnos fin de semana:** Todos los conductores trabajan **solo turno diurno** los sábados y domingos (no hay turno nocturno en weekends). Los conductores weekend-only solo operan sáb-dom en turno diurno.

---

## Supervisor & Center Mapping

1 supervisor por centro operativo (3 total) + 1 Admin:

| Centro | Supervisor | Drivers aprox. | Vehículos aprox. |
|--------|-----------|---------------|-----------------|
| Vallejo | Supervisor 1 | 10 | ~5 |
| Granada | Supervisor 2 | 10 | ~5 |
| Roma | Supervisor 3 | 10 | ~5 |

- Los 30 drivers se distribuyen ~10 por centro
- Cada supervisor ve **solo** los conductores y vehículos de su centro
- El Admin tiene visibilidad global sobre los 3 centros
- El `driver_manifest.csv` incluye columna `center` (Vallejo / Granada / Roma)

---

## Generation Algorithm

### Per driver, per working day:

1. **Shift window**: **Weekdays (lun-vie):** Day (06:00-16:00) or Night (18:00-04:00). **Weekends (sáb-dom):** Day only (06:00-16:00) — no night shift
2. **Pick 10-15 trips** within the shift window, weighted by peak-hour demand
3. **First trip** originates near the driver's assigned LAFA center
4. **Subsequent trips** originate near the previous trip's destination (chain logic)
5. **Destination** picked from zone weights; 8% chance of airport
6. **Coordinates** jittered +/-0.005 deg (~500m) from colonia centroid
7. **Distance** = haversine between origin and destination
8. **Duration** = (distance / speed_at_hour * 60) + pickup_overhead (3-8 min)
9. **Fare** = DiDi Premier formula
10. **Tip** = 70% $0, 20% $10-30, 10% $30-80
11. **Gap** between trips = 5-15 min dead time
12. **Sunday**: no trips start after 19:45 (8 PM close)

### Post-generation adjustment:

For each driver+week, if total billing is outside tier range, add/remove lowest-fare trips to fit.

---

## Deliberate Edge Cases (22 total)

### Payroll edge cases:
1. Driver with exactly $6,000.00 billing (Week 2)
2. Driver with $5,999.xx billing (Week 2) -- misses by $1
3. Driver with 39.5h + $7,000 billing -- hours fail, billing passes
4. Driver with 42h + $5,800 billing -- hours pass, billing fails
5. All Week 1 -> no overtime (no previous_week data)
6. Driver with exactly 40h in Week 1, 45h in Week 2 -> overtime eligible
7. Driver with 50h in Week 2 -> tests overtime cap at 8h
8. New driver starts Wednesday Week 2 -> proration
9. Weekend-only drivers -> low hours + decent billing

### Trip data edge cases:
10. Very short trip: 1.2 km, 8 min, ~$28
11. Very long airport run: 25 km, 55 min, ~$380
12. Late-night trips at 1-3 AM (fast speeds)
13. Airport runs at ~8% frequency
14. Trip crossing midnight (23:50 -> 00:35)
15. Trip starting at 19:50 on Sunday (near weekly close)
16. Back-to-back trips with only 2-min gap
17. High-tip trips ($50-80) to test tip exclusion from $6K threshold
18. Origin = destination zone (short intra-colonia trip)
19. Cross-city trip: Xochimilco -> Azcapotzalco (~25 km)

---

## CSV Output Format

Matches the format from `brief.md` exactly:

```csv
Driver ID,Date,Trip ID,Initial time,Final time,Cost,Tip,Initial coordinates,Final coordinates
114958,11/02/2026,fd5g5h,4:56:00,5:41:00,$125.36,0,"19.394316, -99.166257","19.422497, -99.207150"
```

| Field | Format |
|-------|--------|
| Date | `DD/MM/YYYY` (Mexican convention) |
| Time | `H:MM:SS` (no leading zero on hour) |
| Cost | `$` prefix, 2 decimals |
| Tip | Plain number, no `$` |
| Coordinates | Quoted, 6 decimal places |

---

## Expected Volume

| Metric | Per Week | 3 Weeks |
|--------|----------|---------|
| Trips | ~2,100-2,800 | ~6,300-8,400 |
| Avg fare (Premier) | ~$190 MXN | -- |
| Drivers hitting $6K | ~18-23 of 30 | -- |
| Drivers below $6K | ~7-12 of 30 | -- |
| Airport trips | ~170-220 (~8%) | -- |

---

## Verification Checklist

After running `python generate_didi_data.py`:

- [ ] CSV header matches brief format exactly
- [ ] Date format DD/MM/YYYY, time format H:MM:SS
- [ ] Cost has `$` prefix, coordinates have 6 decimals
- [ ] No overlapping trips for the same driver
- [ ] At least 3 drivers within $500 of $6K threshold
- [ ] At least 2 drivers with 38-42h (hours edge)
- [ ] Sunday trips stop before 20:00
- [ ] Trip IDs unique across all weeks
- [ ] Average fare in $170-$220 range
- [ ] driver_manifest.csv maps all 30 drivers correctly
- [ ] Script runs with zero external dependencies (stdlib only)
