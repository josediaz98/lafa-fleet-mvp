# LAFA: Technology Stack Scaling

**Last updated:** February 7, 2026
**Scope:** Build vs buy matrix, recommended stacks at 500/2,000/10,000 vehicles, data network effects, technology flywheel. Aligned with the [AI roadmap](ai-roadmap.md)'s 3-track structure (Foundation, DaE, LTO).

---

## 1. Build vs Buy Matrix

| Layer | Verdict | Moat Value | Build Threshold | Track | Roadmap |
|-------|---------|------------|-----------------|-------|---------|
| Telematics hardware | **Always buy** | None -- commodity | Never | A | P4 (integration) |
| Driver app/portal | **Always build** | High -- primary driver touchpoint | Day one | -- | Horizon 2 |
| Alternative credit scoring | **Build** | Very high -- Moove's core IP | Day one | C | P2 (Mo 7-9) |
| Battery health analytics | **Build** | Very high -- data compounds | 1,000+ vehicles | A | P4 |
| Charging optimization | **Build** | High -- CFE tariff arbitrage | 500+ chargers | B | P5 |
| Demand forecasting/dispatch | **Build** | High -- data network effects | 2,000+ vehicles | B | P0.4 (basic) |
| Fleet management core | **Buy then build** | Medium-high | 2,000+ vehicles | A | P0.1-P0.3 |
| Maintenance management | **Buy** (Fleetio) | Low | Never (unless 5,000+) | A | P0.3 |
| Payment processing | **Buy** (Stripe/Conekta) | None -- commodity | Never | A | P3 |
| Analytics/BI | **Buy then build** | Medium | 5,000+ vehicles | A | P0.2, P7 |
| Insurance | **Buy/partner** | Low | Never | A | P0.5d |

---

## 2. Recommended Stack at Three Scales

### 500 Vehicles (~$840K-$1.0M/year total technology spend)

**Architecture:** Modular monolith on AWS (Mexico region), PostgreSQL, Redis, MQTT for telemetry.

**Roadmap mapping:** This is the Track A foundation (P0.1-P0.3, P0.5c-d) + Track B basics (P0.4, P0.5a) + Track C basics (P0.5b). The "operating system" that replaces spreadsheets.

**Stack:**
- Teltonika FMC130 hardware --> custom MQTT pipeline --> AWS
- Fleetio for maintenance
- Conekta/Stripe for payments
- Metabase + Grafana for analytics
- Custom driver app (React Native)
- OCPP-compliant CSMS (ChargeLab or open-source CitrineOS)
- Palenca + Truora for driver onboarding

**Team:** 5-7 engineers (CTO, 2 senior backend, 1 mobile, 1 DevOps, 0.5 data analyst, 0.5 QA). Engineering cost: ~$300K-420K/year in Mexico.

### 2,000 Vehicles (~$2.4M-$2.8M/year)

**Architecture:** Microservices with event-driven core, Apache Kafka for streaming, Kubernetes on AWS EKS. Begin building custom fleet management core, charging optimization engine, and battery health ML models.

**Roadmap mapping:** This is the full 3-track roadmap completed — Track A (P1, P3, P4, P6, P7, P8), Track B (P5 charging ops), Track C (P2 credit scoring). All 16 projects operational.

**Added:**
- Geotab Pro for EV-specific analytics
- Stratio for predictive maintenance
- Driivz for depot charging orchestration
- HERE API for EV-aware routing
- Google OR-Tools for dispatch optimization
- MLflow for ML operations
- Looker for executive dashboards

**Team:** 15-20 engineers including ML engineer, IoT specialist, data engineers, and product manager. Engineering cost: ~$840K-$1.2M/year in Mexico.

### 10,000 Vehicles (~$6.7M-$8.7M/year)

**Architecture:** Full enterprise event-driven architecture, CQRS, dedicated ML pipeline with feature store, multi-region deployment, edge computing at charging hubs.

**This is VEMO's scale.** Fully proprietary platform equivalent to ZEE. Custom everything: fleet management, charging optimization, battery analytics, demand forecasting, driver scoring, insurance data integration.

**Team:** 50-70 engineers across backend, frontend, mobile, data/ML, IoT, DevOps/SRE, security, and product. Engineering cost: ~$3.0M-$4.8M/year in Mexico. VEMO maintains ~150 engineers at similar scale.

---

## 3. Data Network Effects

At ~2,000-5,000 vehicles, data network effects create compounding advantage:

- **More vehicles** --> more battery degradation data --> better predictive models --> lower maintenance costs
- **More charging sessions** --> better energy optimization --> lower electricity costs
- **More driver data** --> better scoring models --> lower insurance and default rates
- **More route data** --> better demand prediction --> higher utilization

**Start collecting all data from day one**, even if processing it with commercial tools.

---

## 4. Technology Cost Per Vehicle at Scale

| Fleet Size | Annual Tech Spend | Per Vehicle/Year |
|-----------|-------------------|------------------|
| 500 | $840K-$1.0M | ~$1,700-2,000 |
| 2,000 | $2.4M-$2.8M | ~$1,200-1,400 |
| 10,000 | $6.7M-$8.7M | **~$670-870** |

Technology investment follows a **power law, not a linear curve**. At small scale, commercial SaaS tools suffice at ~$1,700/vehicle/year. At 10,000 vehicles with proprietary systems, costs drop to $670-870/vehicle/year while competitive differentiation increases exponentially.

---

## 5. The Technology Flywheel

The companies that will dominate EV fleet-for-drivers in LatAm are not the ones with the most vehicles, but the ones with the best data flywheel connecting:

1. **Battery analytics (Track A, P4)** -- accurate degradation models improve lease pricing and reduce reserve requirements
2. **Charging optimization (Track B, P5)** -- lower energy costs improve unit economics at every scale
3. **Driver scoring (Track C, P2)** -- better underwriting reduces defaults and insurance costs
4. **Demand forecasting (future)** -- higher utilization means more revenue per vehicle

Three technology decisions matter most:
1. **Build the driver app and credit scoring engine from day one** -- these define the customer relationship
2. **Own your data pipeline immediately** -- even if processed with commercial tools
3. **Choose multi-standard charging infrastructure** -- less than 2% of Mexico's public chargers support GBT, creating both a challenge and strategic opportunity

---

## Implications for LAFA

- **LAFA is at the 150-vehicle stage**, targeting 2,000 by end of 2026. The 500-vehicle stack is the immediate architecture target.
- **Track A foundation** (P0.1-P0.3, P0.5c-d) maps directly to the 500-vehicle stack: PostgreSQL, Metabase/Grafana, maintenance tracking, and incident/insurance management. Track B basics (P0.4 dispatch, P0.5a payroll) and Track C basics (P0.5b account statement) complete the operational layer.
- **Engineering team of 3** (per Levi interview) is below the 5-7 recommended for 500 vehicles. This means aggressive prioritization is essential -- Track A foundation only, no premature optimization.
- **Data collection starts now.** Even with spreadsheets being replaced by a database (P0.1), ensure every telematics reading, charging event, payment, and driver interaction is recorded in queryable form. Track A data becomes the foundation for Track B (P5 charging optimization) and Track C (P2 credit scoring).
- **The 2,000-vehicle architecture is the 14-month target.** By the time the roadmap completes all three tracks, LAFA should be transitioning from the 500-vehicle stack to the 2,000-vehicle architecture.

---

*Cost estimates based on publicly available pricing and Mexico engineering salary benchmarks as of 2025-2026. Actual costs depend on specific vendor agreements, team seniority mix, and infrastructure choices.*
