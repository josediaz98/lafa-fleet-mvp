# LAFA: Route Optimization

**Last updated:** February 7, 2026
**Scope:** EV-aware routing APIs (HERE vs Google), open-source optimization engines (OR-Tools, Vroom), SoC-aware dispatch challenge for ride-hailing.

---

## 1. Why EV Routing Is Different

Standard routing engines ignore the critical EV constraint: remaining range versus trip distance, with weather, elevation, HVAC usage, and driving style creating up to **30% variation** in actual consumption.

---

## 2. Routing API Comparison

### HERE Routing API
- Strongest EV-specific capabilities with range-aware routing
- Up to 200 waypoints per request
- Generous free tier: 250,000 API calls/day (far more than Google's ~28,000)
- Supports offline routing (valuable for connectivity gaps)
- 108 languages

### Google Routes API
- Excellent traffic data and fleet routing capabilities
- Limited to 25 intermediate waypoints
- Limited native EV routing support

**Recommendation:** HERE for EV-aware map data, Google for traffic data where needed.

---

## 3. Optimization Engines

| Engine | License | Speed | Capabilities |
|--------|---------|-------|-------------|
| **Google OR-Tools** | Free, open-source | Good | Vehicle Routing Problems with time windows and capacity constraints |
| **Vroom** | C++, MIT license | Milliseconds | VRP solving at high speed |

Both require a separate routing data source. The recommended approach: use OR-Tools or Vroom for core dispatch optimization, HERE API for EV-aware map data, and build custom constraints for SoC-aware driver assignment.

---

## 4. The EV Dispatch Challenge for Ride-Hailing

Neither Uber nor DiDi publicly differentiate EV driver routing in their matching algorithms. The fleet operator must build this intelligence into their own dispatch layer:

1. **Check vehicle SoC before trip assignment** -- never assign low-SoC vehicles to long trips
2. **Factor round-trip range requirements** -- account for return to depot or next charging point
3. **Route to chargers during natural downtime** -- use shift breaks and low-demand periods
4. **Weather/HVAC adjustments** -- AC usage in summer can reduce range 15-20%

---

## Implications for LAFA

- **HERE API is the clear choice for LAFA** -- free tier covers early scale, EV-aware routing is native, and offline capability helps with connectivity gaps in CDMX periphery.
- **OR-Tools for shift dispatch optimization** aligns with Track B shift dispatch (P0.4 on the AI roadmap). Start with basic assignment, add SoC constraints as battery monitoring (P4, Track A) comes online.
- **SoC-aware dispatch is a Month 4-6 project** -- requires integration between telematics (vehicle SoC), HERE routing (distance/energy estimates), and the dispatch engine (assignment logic). This is where the data flywheel begins.
- **Don't build custom routing from scratch.** The combination of HERE + OR-Tools covers 90% of needs. Custom work should focus on the SoC-aware constraint layer on top.

---

*API pricing based on publicly available tiers as of 2025-2026. HERE free tier subject to change.*
