# 03 -- The Solution

**VC Question:** "What does LAFA build, and how does it solve the problem?"

---

## What LAFA Builds

LAFA is an electric vehicle fleet operator that leases Chinese EVs to platform drivers (Uber, DiDi) in Mexico City. It's not a pure fintech, not an OEM, not a ride-hailing app -- it's the **bridge between the driver who needs a vehicle and the Chinese OEM that manufactures it**, financed through a leasing structure that doesn't require traditional credit history.

Mission: **"Effective mobility and ecological mobility"** (Levi Garcia, Feb 2026).

---

## Two Products

### Driver-as-Employee (DaE)

LAFA formally employs the driver with full benefits (IMSS (social security), vacation, aguinaldo (annual bonus)). The driver just drives.

| Aspect | Detail |
|--------|--------|
| Vehicle ownership | LAFA owns and assigns |
| Charging | LAFA pays (~$300 MXN/week per vehicle) |
| Maintenance | LAFA maintains |
| Shifts | LAFA assigns |
| Minimum billing | $6,000 MXN/week |
| Relationship with driver | Formal employee |

### Lease-to-Own (LTO)

Launched December 2025 (~2 months of operation). The driver rents a vehicle with the option to purchase after 4 years, building equity with each payment.

| Aspect | Detail |
|--------|--------|
| Vehicle ownership | LAFA retains title until final payment |
| Charging | Driver pays |
| Maintenance | LAFA maintains |
| Driver earnings | Up to $40,000 MXN/month |
| Relationship with driver | Independent contractor (lease) |
| Contract structure | Financial leasing |

### Comparison

| Metric | DaE | LTO |
|--------|-----|-----|
| Billing per vehicle | ~$24,000 MXN/month (min) | Higher (premium segment) |
| Credit risk | Low (LAFA controls vehicle + shifts) | Higher (independent driver) |
| Operational complexity | High (payroll, shifts, charging) | Lower (driver self-manages) |
| Scalability | Medium (requires ops infrastructure) | Higher (less management per driver) |
| Launched | ~Early-Mid 2025 | December 2025 |

---

## The Flywheel: DaE --> LTO

LAFA's most intelligent design is that the two products aren't independent -- they're stages of the same pathway:

```
Driver without vehicle or credit
     |
     v
DaE: enters as employee --> drives --> generates payment history
     |                                and driving data (6+ months)
     v
Graduation: proven driver --> LAFA has warm-start data
     |
     v
LTO: leases own vehicle --> builds equity --> owner in 4 years
```

**Why this matters:**
1. **Reduces cold-start problem:** A DaE driver with 6 months has payment history, telematics, and a proven relationship. No bureau or open banking needed for the initial LTO decision.
2. **Self-selecting for quality:** Only the best DaE drivers graduate -- those who meet billing targets, take care of the vehicle, and have good conduct.
3. **OCN doesn't have this:** OCN approves drivers cold (ML + bureau + open banking in 90 min). LAFA can approve DaE graduates warm with superior internal data.

---

## Customer Profiles

| Dimension | Driver-as-Employee (DaE) | Lease-to-Own (LTO) |
|-----------|--------------------------|---------------------|
| Profile | Entry-level, seeks stability | Experienced, high earner, entrepreneurial |
| Relationship | Formal employee (IMSS, benefits) | Independent contractor (lease) |
| Minimum billing / earning | $6,000 MXN/week (billing to LAFA) | Up to $40,000 MXN/month (driver retains earnings) |
| Vehicle control | LAFA assigns vehicle + shifts | Driver manages independently |
| Charging | LAFA pays | Driver pays |
| Risk to LAFA | Low (full control) | Higher (credit + operational risk) |
| Pathway | Entry point --> can graduate to LTO | Direct entry for qualified drivers |

---

## Value Proposition (Quantified)

Why gig drivers choose EVs over ICE vehicles:

- **Fuel savings:** MXN $5,000-10,000/month (EV electricity vs gasoline at MXN $23.58-23.80/liter)
- **Hoy No Circula (driving restriction) exemption:** MXN $3,000-5,000/month in income not lost (EVs exempt from driving restrictions)
- **Total economic advantage:** MXN $8,000-15,000/month vs ICE -- covers 50-90% of an LTO lease payment (fuel savings alone cover 30-60%; Hoy No Circula adds the rest)
- **Vehicle access:** <3% of ride-hail drivers qualify for traditional auto loans; LAFA provides an alternative path to vehicle access and ownership (LTO)

For DaE drivers, fuel savings go to LAFA (competitive cost structure vs ICE fleets). For LTO drivers, savings go directly to the driver -- the central selling point.

*--> For detailed EV vs ICE driver economics, see [gig-driver-economics.md](../analysis/market/gig-driver-economics.md).*
*--> For LAFA unit economics, see [04-business-model.md](04-business-model.md).*

---

## Future Ecosystem Vision

Per Levi Garcia (Feb 2026), LAFA plans to expand beyond vehicle leasing into a vertically integrated ecosystem:

1. **Owned charging centers** (not just depot -- public-facing)
2. **Specialized maintenance** for Chinese EV models
3. **Tire distribution** for Chinese EVs in Mexico (supply chain niche)
4. **Additional OEM partnerships** beyond Geely, JAC, GAC

This vision is aspirational -- it depends on capital and execution. But the vertical logic is sound: whoever controls charging + maintenance + vehicle has real switching costs.

*--> For the full product ecosystem map (5 user types, 67 items), see [product-ecosystem.md](../strategy/product-ecosystem.md).*

---

*Product data confirmed by Levi Garcia (interview Feb 6, 2026). Value proposition quantified based on Feb 2026 fuel prices and economics estimates.*
