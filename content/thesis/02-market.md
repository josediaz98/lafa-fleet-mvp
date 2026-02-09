# 02 -- Market

> *Mexico driver economics detail: [analysis/market/gig-driver-economics.md](../analysis/market/gig-driver-economics.md) | LatAm EV market: [analysis/market/ev-market-latam.md](../analysis/market/ev-market-latam.md)*

**VC Question:** "How big is the opportunity? Is this a $1B market or a $10B market?"

---

## TAM / SAM / SOM

### TAM (Total Addressable Market) -- Mexico Vehicle Access for Gig Drivers

We size the TAM using two independent approaches -- top-down (market layers) and bottom-up (per-vehicle economics) -- and cross-check against VEMO's public targets.

#### Top-Down: Driver Funnel

```
658K registered platform workers (SAT 2025)
  → 250-500K are car-based ride-hailing drivers (exclude delivery, bikes, motos)
  → 40-60% lack vehicle access or depend on third-party vehicles
    (IDB-Uber LatAm survey: 47% don't personally own, but 22% use family vehicles)
  → The vast majority cannot qualify for traditional auto loans
    (70% of Mexicans lack bank credit access; gig drivers face even higher rejection)
  = 100K-300K addressable drivers in Mexico
```

#### Bottom-Up: Per-Vehicle Revenue

The $340/month figure often cited (from Kovi's blended ARR across 12K used ICE cars in Brazil) does not apply to Mexico EV leasing. Actual market pricing:

| Reference point | Weekly rate | Annual revenue per vehicle |
|----------------|------------|---------------------------|
| VEMO Impulso (LTO, Mexico) | MXN $4,500-5,300/week | ~$12,000-14,000/year |
| LAFA DaE (employee model) | MXN $6,000+/week billing | ~$14,600+/year |
| Kovi Brazil (used ICE, for context) | ~$80/week ($340/mo) | ~$4,100/year |

#### Mexico TAM

| Approach | Calculation | Result |
|----------|-------------|--------|
| Conservative | 100K drivers × $10K/year | $1.0B/year |
| Mid-range | 175K drivers × $12K/year | $2.1B/year |
| Aggressive | 300K drivers × $14K/year | $4.2B/year |
| **Recommended range** | | **$1.0-4.2B/year** |

#### LatAm TAM (Context, Not Primary)

Applying a similar framework to Brazil and Colombia, with adjustments for local pricing and fleet mix (mostly ICE in Brazil, mixed in Colombia), total LatAm TAM is **$3-10B/year** -- the wide range reflects honest uncertainty across different markets, vehicle types, and pricing models.

*--> For detailed regional market data, see [biz-model-research.md](../analysis/market/biz-model-research.md).*

#### Sanity Check: VEMO as SOM Benchmark

VEMO's 5-year plan targets 50,000 vehicles at ~$13K annual revenue = **~$650M/year**. If the best-funded player in Mexico (>$500M raised) targets $650M, a Mexico TAM of $1-4B implies room for 2-6 operators at VEMO scale. This is consistent with the current landscape (VEMO, OCN, LAFA, Planet42, Leasy all active).

**The constraint is not market size -- it's capital and execution.**

### SAM (Serviceable Addressable Market) -- Mexico EV Gig Fleet

LAFA only operates in Mexico, only with EVs, only for gig drivers:

| Metric | Value |
|--------|-------|
| Platform workers registered (2025 reform) | ~658,000 (includes delivery, bikes, motos) |
| Car-based ride-hailing drivers (estimated) | 250,000-500,000 |
| DiDi drivers + delivery | 350,000+ |
| Uber active partners | 250,000-300,000+ |
| Addressable drivers in CDMX (realistic) | 20,000-50,000 |
| Mexico TAM (see above) | $1.0-4.2B/year |
| Credit-eligible for traditional auto loans | Very low (70%+ of Mexicans lack bank credit) |

### SOM (Serviceable Obtainable Market) -- What LAFA Can Capture

| Scenario | Vehicles | % of CDMX pool (20-50K) | Estimated annual revenue |
|----------|----------|--------------------------|--------------------------|
| Current (Feb 2026) | 150 | 0.3-0.8% | MXN $19-32M |
| 2026 target | 2,000 | 4-10% | MXN $252-432M |
| 2027 target (speculative) | 5,000 | 10-25% | MXN $630M-1.1B |

**At 2,000 vehicles, LAFA would serve 4-10% of the addressable pool in CDMX** -- significant but far from saturation. The market is not winner-take-all; VEMO, OCN, and LAFA can coexist in CDMX, differentiating by product (100% EV vs mixed), service (DaE vs LTO vs subscription), and niche (DiDi Premier vs Uber vs delivery).

---

## Market Timing: The S-Curve

Mexico is at the earliest point of the EV adoption S-curve:

| Year | Mexico BEV+PHEV Sales | Market Share |
|------|----------------------|-------------|
| 2024 | ~70,000 | ~1.6% BEV |
| 2025 | **96,636** (+38% YoY) | ~2.5% BEV+PHEV |

**2.5% penetration = pre-inflection point.** Historically, adoption accelerates after 5%. This means LAFA is building before the inflection -- higher risk but potential first-mover advantage if it survives the period from 2.5% to 5-8%.

**LatAm as reference:** The region went from ~35K units in 2022 to **400,000+ in 2025**. Brazil (~9%) and Colombia (~10%) have already crossed the 5% threshold that marks the beginning of acceleration. Mexico is next.

**What drives adoption:** It's not regulation -- it's **price**. Chinese OEMs collapsed the EV-to-ICE price premium from >100% to 25-50%. BYD Dolphin Mini at MXN $358,800 (~$19K USD). The pitch to drivers is financial (fuel savings), not ideological (green).

*--> For EV market data, Chinese OEM strategy, and charging infrastructure, see [ev-market-latam.md](../analysis/market/ev-market-latam.md).*

---

## Gig Driver Economics

The market's foundation is the EV vs ICE savings for a high-mileage driver: **MXN $8,000-15,000/month** in total advantage (MXN $5-10K in fuel + MXN $3-5K from Hoy No Circula (driving restriction) exemption). For an LTO driver with a lease of ~MXN $16,000/month, the savings cover 50-90% of the payment -- **the EV partially pays for itself.**

Regulatory incentives (ISAN (new vehicle tax) exemption, tenencia (vehicle ownership tax) for 5 years, 86% ISR (income tax) deduction) reinforce the value proposition, although there are signs of erosion (refrendo (annual registration renewal) limited to first year in 2026).

*--> For detailed economics tables, ICE vs EV comparison, and regulatory incentives, see [gig-driver-economics.md](../analysis/market/gig-driver-economics.md).*

---

## Winner-Take-All or Winner-Take-Most?

The gig fleet market in Mexico **is NOT winner-take-all.** Reasons:

1. **Fragmented demand:** DiDi and Uber are separate platforms with separate drivers. A fleet operator can focus on one.
2. **Product differentiation:** 100% EV (LAFA, VEMO) vs mixed (OCN). DaE (employment) vs subscription (OCN). Different driver profiles prefer different models.
3. **Different geographies:** CDMX, Monterrey, Guadalajara are distinct markets. VEMO operates in 18 states, OCN in 22 -- LAFA only in CDMX.
4. **Charging infrastructure as differentiator:** With only 187 DC chargers in all of Mexico and 41 vehicles per public charger (15x worse than the global average), whoever controls charging controls the ecosystem. But building charging is capital-intensive and local.

**Conclusion:** There's room for 3-5 relevant operators in Mexico. But the market is consolidating (Moove acquired Kovi). Standalone players without sufficient capital face a growth ceiling.

---

*Market size based on official reform data, platform disclosures, IDB data, and industry estimates. EV sales from AMIA/EMA. Fuel prices as of Feb 2026.*
