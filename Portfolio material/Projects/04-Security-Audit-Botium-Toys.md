# Security Audit: Botium Toys

<p class="meta"><b>Course:</b> Play It Safe: Manage Security Risks &nbsp;|&nbsp; <b>Type:</b> Practice scenario (fictional company) &nbsp;|&nbsp; <b>Tools:</b> Controls and compliance checklist, NIST CSF &nbsp;|&nbsp; <b>Skills:</b> Security auditing, controls, compliance (PCI DSS, GDPR, SOC), risk assessment</p>

## The scenario

::: scenario
Botium Toys is a small US toy company that sells in a store and online, including to customers in the EU. Its IT manager wanted an internal audit of the whole security program: assets, controls and compliance. I was given a scope, goals and risk assessment report (risk score **8 out of 10**) and asked to complete a controls checklist and a compliance checklist, then give recommendations.
:::

## Part 1: Controls checklist

::: q
Does Botium Toys have each of these controls in place right now?
:::

::: a
| Control | In place? | Why |
|---|---|---|
| Least privilege | No | All employees can reach internal data, including cardholder data and customer PII |
| Disaster recovery plans | No | No plan exists |
| Password policies | No | A policy exists, but its rules are weak |
| Separation of duties | No | Not implemented |
| Firewall | **Yes** | It blocks traffic using a defined set of rules |
| Intrusion detection system (IDS) | No | Not installed |
| Backups | No | No backups of critical data |
| Antivirus software | **Yes** | Installed and checked regularly |
| Legacy system monitoring | No | Systems are watched, but there is no schedule or clear procedure |
| Encryption | No | Credit card data is not encrypted |
| Password management system | No | None, so password resets create tickets for IT |
| Locks (office, store, warehouse) | **Yes** | Physical locations are locked |
| CCTV | **Yes** | In place |
| Fire detection and prevention | **Yes** | In place |
:::

## Part 2: Compliance checklist

::: q
Does the company follow each of these compliance best practices?
:::

::: a
**PCI DSS (payment card data):** No on all four. Everyone can reach card data, it is not stored and sent in a secure environment, it is not encrypted, and there is no secure password management.

**GDPR (EU customer data):**

| Best practice | Followed? |
|---|---|
| EU customers' data is kept private and secure | No |
| A plan to notify EU customers within 72 hours of a breach | **Yes** |
| Data is classified and inventoried | No (assets are inventoried but not classified) |
| Privacy policies are enforced and documented | **Yes** |

**SOC 1 / SOC 2:**

| Best practice | Followed? |
|---|---|
| User access policies are set up | No |
| Sensitive data (PII/SPII) is confidential | No |
| Data integrity is checked | **Yes** |
| Data is available to authorized people | No |
:::

## Part 3: My recommendations

::: a
The risk score is high because many basic controls are missing and compliance is weak. In order of priority:

1. **Least privilege and separation of duties.** Give each person only the access their job needs.
2. **Encrypt credit card data**, both stored and in transit.
3. **Disaster recovery plan and backups** for critical data.
4. **Install an IDS** to detect intrusions.
5. **Stronger password policy and a password manager** for the company.
6. **A schedule and clear steps** for monitoring legacy systems.
7. **Classify assets** so the company knows which data is the most sensitive.

What already works and should stay: the firewall, antivirus, physical security, the 72-hour breach notification plan, and the privacy policies.
:::

## What I learned

- An audit is about comparing what exists against a standard, one control at a time.
- Many fixes come from two ideas: limit who can reach the data (least privilege) and protect the data itself (encryption).
- Putting the fixes in priority order is as important as finding them.
