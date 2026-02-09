# LAFA: Data Infrastructure

**Last updated:** February 7, 2026
**Scope:** 3-phase analytics stack evolution (Metabase to Kafka to Looker), cost scaling from $300 to $8,000/month, priority ML use cases ranked by ROI. Aligned with the [AI roadmap](ai-roadmap.md)'s 3-track structure (Foundation, DaE, LTO).

---

## 1. Analytics Stack by Fleet Size

### Phase 1: 0-1,000 Vehicles ($300-800/month)

**Stack:** Telematics API --> Google Pub/Sub --> Cloud Functions --> BigQuery --> dbt transforms --> Metabase/Grafana

| Component | Role | Cost |
|-----------|------|------|
| Metabase | BI dashboards (free, open-source) | $0 (self-hosted) |
| Grafana | Real-time operational dashboards | $0 (self-hosted) |
| BigQuery | Serverless data warehouse | $6.25/TB queried |
| **Total** | | **$300-800/month** |

This is the Track A (Foundation) target architecture. Metabase (P0.2) replaces the current spreadsheet-based operations with immediate dashboards.

### Phase 2: 1,000-5,000 Vehicles ($2,000-5,000/month)

**Added components:**
| Component | Role | Cost |
|-----------|------|------|
| Apache Kafka (Confluent Cloud) | Event streaming | From $200/month |
| Apache Superset | Advanced analytics | $0 (open-source) |
| MLflow | ML experiment tracking | $0 (open-source) |

Telematics data at this scale generates ~2.5 TB/month. Event streaming becomes necessary for real-time SoC monitoring, charging optimization, and automated alerts.

### Phase 3: 5,000+ Vehicles ($3,000-8,000/month)

**Added components:**
| Component | Role | Cost |
|-----------|------|------|
| Looker or Tableau | Enterprise BI | $3,000-5,000/month |
| SageMaker | Production ML platform | $500-5,000/month |
| Delta Lake / Apache Iceberg | Data lake format | Infrastructure cost |

Full data lake on S3/GCS. Dedicated ML platform for production model serving. This is VEMO's scale (150 engineers).

---

## 2. Priority ML Use Cases Ranked by ROI

| Priority | Use Case | Track | Roadmap | Business Impact | When to Build |
|----------|----------|-------|---------|-----------------|--------------|
| 1 | Credit risk scoring (LTO applicants) | C | P2 | Reduce default rate from industry 5-15% to <5% | Mo 7-9 (warm start with real data) |
| 2 | Driver churn prediction | -- | Gap | Proactive retention reduces reacquisition cost | Mo 8-10 |
| 3 | Battery SoH forecasting | A | P4 | Accurate residual value estimation for LTO pricing | Mo 3-5 (battery monitoring) |
| 4 | Demand prediction | -- | Gap | Fleet allocation optimization, reduce idle vehicles | Mo 10-12 |
| 5 | Maintenance prediction | -- | Gap | Downtime reduction, proactive parts ordering | Mo 10-12 |

**Start simple:** XGBoost, logistic regression on Jupyter notebooks. Graduate to production ML infrastructure only when models prove value.

---

## 3. Cost Scaling Summary

| Fleet Size | Monthly Data Cost | Annual Data Cost | Per Vehicle/Year |
|-----------|-------------------|------------------|------------------|
| 150 (current) | $300-500 | $3,600-6,000 | $24-40 |
| 500 | $500-800 | $6,000-9,600 | $12-19 |
| 2,000 | $2,000-5,000 | $24,000-60,000 | $12-30 |
| 5,000 | $3,000-8,000 | $36,000-96,000 | $7-19 |

Data infrastructure costs **decrease per vehicle** as scale increases -- a core part of the technology flywheel.

---

## Implications for LAFA

- **Analytics Phase 1 maps to Track A foundation (P0.2 on the AI roadmap).** Metabase + Grafana on BigQuery replaces spreadsheets within Month 1. This is the single highest-ROI technology investment at current scale.
- **Own the data pipeline from day one.** Even at 150 vehicles with Metabase, ensure all telematics, charging, payment, and driver data flows into BigQuery in structured, queryable form. The datasets accumulated in Track A become the foundation for every ML model in Tracks B and C.
- **Don't over-engineer early.** $300-500/month covers 150-500 vehicles. Kafka, Superset, and MLflow are analytics Phase 2 investments (1,000+ vehicles). Premature infrastructure is wasted capital.
- **BigQuery is the right choice** for LAFA's early stage -- serverless means zero ops overhead, pay-per-query is cheap at low volume, and it scales seamlessly to analytics Phase 2.
- **ML models before Month 6 would be premature.** With <150 observations, any statistical model is overfitting. Use heuristic rules until the portfolio is large enough for meaningful training data. The roadmap reflects this: P2 (Credit Scoring, Track C) is scheduled for Mo 7-9 after 6+ months of payment data collection.

---

*Cost estimates based on publicly available cloud pricing as of 2025-2026. Actual costs depend on query volume, data retention policies, and compute requirements.*
