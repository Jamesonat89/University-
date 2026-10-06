# Procon SBP: review of v12 and suggested improvements

Reviewed against the Part B assessment brief and rubric, the SBP report-format guidance, the CMI checklist and the gateway scoping document. Prepared 6 October 2026.

**Files in this folder and the repository root**

| File | What it is |
|---|---|
| `Procon_SBP_Submission_v13_suggested_edits.docx` (repo root) | v12 with every suggested edit as a **tracked change** (author "Claude (suggested edit)") and 30 **comments** (author "Claude (review)") at the points that need your data or decisions. Accept or reject each one in Word (Review → Track Changes). |
| `review/v12_review_and_improvements.md` | This note: the rubric assessment, what changed and why, drafted passages that were *not* inserted, the word budget, the model check and the placeholder register. |
| `review/Figure_A14.1_project_gantt_planned.png` | A planned 12-week project Gantt chart built from Part 2 of your scoping document, for Appendix 14. |
| `review/make_project_gantt.py` | Script that regenerates the chart. Fill in `ACTUAL` to show planned v. actual. |

**On AI use.** The brief classes this assessment as AI-Assisted: AI may help you develop ideas, improve structure and proofread, but you must not present AI-generated text as your own. Treat every drafted sentence here and in v13 as a suggestion to rewrite in your own words. Add this session (prompt and link) to your prompt list. The passages reserved for your own voice (§3.5, §5.6, the reflexivity paragraph, progress to date) have prompts only, not text: they have to describe what actually happened.

---

## 1. Where v12 stands

The analytical core is strong. Location theory (Weber, Hotelling, Church & ReVelle), cost-volume-profit analysis, pecking order, Higgins, real options, B2B brand theory tested against your own declined-work logs, and a board model you rebuilt and corrected: that is the kind of critical application the distinction descriptors ask for. I rebuilt the financial model independently and its figures check out (section 6).

What holds it back is that it is still a shell. Option B is unnamed and its columns are empty, the primary-research findings are placeholders, the negotiation section is empty, and four mandatory items are missing. A few sentences also claimed more than the evidence showed.

| Criterion (weight) | Strengths in v12 | What holds it back | Biggest lever |
|---|---|---|---|
| Problem / opportunity justification (40%) | Three evidenced drivers; 5 Whys, VRIO and limits-to-growth; §3.4 is genuinely critical on brand (theory-transfer tested against primary data) | [MARGIN_MULTIPLE] appears 6 times and carries the case; §3.1's binding force is unstated; the perishability argument contradicted the volumetric model (fixed in v13) | Fill [MARGIN_MULTIPLE] from the management accounts. Keep the new local brand-risk point (§3.4, R9). |
| Research, methodology and analysis (30%) | Table 2 defends every choice; positionality is unusually honest; model review (Table A9.4) is excellent critical evaluation of financial strategy | Option B is never named; Tables 4–5 are mostly empty; §4.3 findings are placeholders; who made the AHP judgements is not stated; objective O2 promises the payload effect in the model and it is not there | Name and complete Option B; write §4.3 from the interviews; model the payload effect or state it as a G4 condition. |
| Communication (20%) | Stakeholder salience by gate; principled negotiation and commitment sequencing named; brand thread runs through to implementation | §5.5 is about 80 words; §5.6 is all placeholders; no account of Procon's leadership structure; Appendix 1 messages are empty | Write §5.6 from real events; add leadership structure and the Leeds-vehicle decision to §5.5 (draft in 4.2). |
| Style and structure (10%) | Clear structure matching the guidance; wide, well-chosen reading; APA mostly right | Placeholder residue; missing appendices; contents out of date; AI prompt list not yet "with your references" | Mechanical: section 8 and the checklist in section 9. |

These are indicative judgements, not a predicted mark: markers vary, and the result depends on what the placeholders turn into. With real evidence in place, the framework is capable of distinction on the Problem, Research and Style criteria. **Communication is the criterion most at risk**, because it carries 20% of the mark and currently has the least written content.

## 2. Priority actions, in order

1. **Name Option B and complete its columns** (Tables 4 and 5, §5.1 [ADVANTAGE_OVER_B]). The guidance requires at least two options, and B is never identified (comment in §4.4). Optional simplification: score only A and B in Table 4, and compare the winner with C and the baseline in Table 5 alone. That is more defensible than scoring "defer" on land cost, and it halves the empty cells.
2. **Write §4.3 from the interviews.** This is where the primary research shows it changed (or confirmed) something. Also state who made the pairwise AHP judgements and the scoring scale.
3. **Write §5.6 and §3.5 from what happened** (prompts in 4.3 and 4.4). These evidence K12, S20 and the Communication criterion.
4. **Mandatory items:** Appendix 13 (board minute, for S2), Appendix 17 (employer statement), and the AI prompt list placed with the references (section 9).
5. **Show the base business can fund £274,303.** One figure from the management accounts, now a placeholder sentence in §5.2. The distinction descriptor (critical evaluation of financial strategy) rests on this paragraph.
6. **Model the 2028 payload effect, or keep it as a G4 condition.** Objective O2 says the model incorporates it; Table 5, the Appendix 8 note and Table A9.4 #10 say it does not. The method is in the §2 comment: use the load-size mix, because most logged enquiries are 2–5 m³ and may sit under the new payload anyway. That could be an original finding.
7. **Clarify who built the board model** and whether the board saw the Table A9.4 corrections before approving. The scoping document says you would build and own the model. If the workbook is yours, say so: finding and fixing its faults is strong evidence. The corrected full downside is NO-GO under the board's own rule, so this is also a governance point (K9, K14).
8. **Insert the missing appendices** (2, 3, 6, 7, 11, 13, 17, 18), the Appendix 14 Gantt charts and the Appendix 1 matrix, then update the contents (F9).
9. **Fill the remaining placeholders** using the register in section 7. Several have suggested values.
10. **Re-count words** after filling (section 5). The ceiling is 4,400.

## 3. What v13 changes (all tracked)

| # | Where | Change | Why |
|---|---|---|---|
| 1 | §2, §3.2 | Removed "perishable"; added that Procon's volumetric mixers batch on site, so travel time on small loads (not setting time) sets the radius | The argument contradicted §3.1's own point that on-site batching cuts waste. A specialist marker would notice. (B3, K3) |
| 2 | §3.3 | [CAPITAL_AT_RISK] → £280,000 in plant, fleet and yard and £105,000 in working capital (Table 7) | Derivable from your own budget |
| 3 | §3.4 | New sentence: a rival trading as 24/7 Concrete & Aggregates serves the whole target corridor, so buyers may confuse the two; distinct livery and a trade-mark check precede entry. New RAID row R9. | The Table A4.4 note cross-referred to §3.4, but §3.4 said nothing about it. Specific, evidenced brand risk with a mitigation is the K15 distinction descriptor almost word for word. |
| 4 | §4.2 | Optimism-bias claim now says the model's later-year volumes still outrun the Leeds ramp and are re-tested at G7 | It said the bias "was countered", but Table A9.4 finding 5 shows it was not fully countered |
| 5 | §4.4, RAID R8 | "a quarter more volume" → "about 23% more" | (£130.75 − £67.26) ÷ (£119 − £67.26) = 1.227 |
| 6 | §5.1 | "remains viable under post-2028 payload limits" → its 29% margin of safety must absorb the payload effect, modelled before the fleet is ordered (G4) | Unsupported claim: the payload effect is not modelled anywhere |
| 7 | §5.2 | Higgins named as the **sustainable growth rate** | The CMI Communication distinction descriptor asks for strategies that "maximise opportunities for sustainable growth" |
| 8 | §5.2 | New sentence with placeholders: the existing depots' free cash in [FY], and whether they can carry £274,303 | The self-funding case was asserted, not shown |
| 9 | §5.2, Table 6 | [OPPORTUNITY_COST] → about £88,000 for each year a viable catchment waits (10%), or the whole £967,841 NPV if a competitor takes it | NPV × r/(1+r) at 10%. At 8% it is about £78,000; at 12%, about £95,000. Uses Table A9.3. |
| 10 | §5.2 | Option C volume test: every logged capacity decline comes to about 225 m³ a year, roughly £12,000 of contribution, against £100,240 a year for another wagon and driver | 75 m³ in four months, annualised. It sharpens why consolidation's case rests on reputation, not volume. |
| 11 | §5.3, Table 8 G2, RAID D2, references | Part B environmental permit for bulk cement storage and loading (Environmental Permitting (England and Wales) Regulations 2016) | A legal requirement missing from K9. Volumetric operators with a depot silo hold these permits from their local authority. |
| 12 | §5.6 | Why principled negotiation fits: both are repeated relationships (four more depots to approve; cement is a Kraljic strategic item) | The Pass descriptor says *justifies* how influencing strategies were used, not just names them |
| 13 | §5.7 | Pre-sell gate linked to the full downside failing the board's own GO rule (Table A9.1) | Ties the stage-gate design to your own evidence |
| 14 | §6 | "sustains the self-funding chain through the 2028 payload change" → "keeps expansion self-funded"; added the key synthesis that no depot funds its successor a year later, so the existing depots underwrite £274,303 | Removes an overclaim and states the proposal's most important finding |
| 15 | Table 1 | KPI 3 target 23 → 24 months; KPI 5 baseline shown as 5.5 a month | The board model's own 23.1 months failed a "23 or fewer" target |
| 16 | Table A9.4 | "the author's own note" → "the workbook author's own note" | Elsewhere "the author" means you |
| 17 | Appendix 16 | K12 now covers outwards influence too | K12 is "upwards and outwards" |
| 18 | References | DOIs for Hogan & ReVelle (1986) and Higgins (1977); SAGE spelled consistently; EPR 2016 added | APA consistency |
| 19 | Word budget | Trimmed: §4.1 opening, the Harvey sentence, "That leaves a tension…", "and the board's instinct should be tested…", the asset-finance sentence that repeats Table 6, and the closing sentence of §5.2 | Makes room for 3–14 |

The 30 comments cover every placeholder with a suggested value or method (section 7), and every consistency question I couldn't resolve without your information.

## 4. Drafted passages to adapt (not inserted)

### 4.1 Executive summary: alternative (~198 words)

The guidance asks for scope (with KPIs), importance, objectives, methodology, and findings and recommendations. v12 has no objectives, and it states the strongest finding only as arithmetic.

> This proposal recommends that Procon 24/7 open its 2027 depot in South Yorkshire (Option A) at a capital cost of £278,520, and adopt the site-selection framework behind it as standard investment governance. The board approved both on [APPROVAL_DATE] (Appendix 13).
>
> Procon's five-year plan opens one self-funded depot a year, yet sites have been chosen by judgement: gross margin per cubic metre varies [MARGIN_MULTIPLE]-fold across its three depots, ready-mixed volumes are the lowest since 1963, and from 2028 volumetric mixers lose the weight allowance their payload depends on. The aim was a repeatable, evidence-based way to choose and fund sites, delivered through five objectives from demand baseline to board approval.
>
> A weighted framework was built from industrial location theory, tested through [N] semi-structured interviews and Procon's declined-work records, and applied to four options, including deferral, with service capacity weighted to protect Procon's reputation for reliability. Option A breaks even at 596 cubic metres a month against 842 planned and repays its capital in 23 months. That exposes the plan's weak point: no depot funds its successor a year later, so the existing depots must underwrite about £274,000 of the 2028 opening. Six indicators (Table 1), led by a minimum margin of £[TARGET_MARGIN_M3] per cubic metre, track delivery.

### 4.2 §5.5 Stakeholder engagement: fuller version (+~65 words)

Insert before the existing first sentence, and replace the existing last clause about depot teams:

> Procon's decision rights are concentrated: [BOARD MAKE-UP, e.g. the Managing Director and two shareholder directors] approve capital above £[DELEGATED LIMIT], so the Managing Director sponsored the work from week 1 and the board followed it through fortnightly reviews rather than meeting it only at the end.
>
> … Depot teams' fear of capacity dilution is legitimate, given Leeds's morning shortages (Appendix 19), so the new depot's wagons are [additional rather than transferred from Leeds (RAID A6)], and capacity-related declines are reported to them monthly (KPI 5).

The bracketed decision on Leeds vehicles also settles Table A9.4 #6 and RAID A6. Make it once and carry it through.

### 4.3 §5.6 Negotiation: structure for your own account

For each negotiation, one short paragraph:

1. **Stated position:** what they said, quoted or paraphrased.
2. **Underlying interest:** what they were protecting, and how you found out (a question you asked, a document).
3. **Your move and why:** the tactic, justified. Principled negotiation (Fisher et al., 2012) is already justified by the new sentence; add the specific tactic (reframing, a contingent agreement, an objective criterion such as the market quotes, your BATNA).
4. **Outcome and evidence:** what changed in the proposal, quantified, and where the evidence is (minute, email, revised paper, supplier quote).

Two cautions. The commitment-sequencing sentence (Cialdini) can read as manipulative unless you add that the board remained free to reject the site. And if the third negotiation duplicates §3.5, delete the placeholder sentence as it instructs.

### 4.4 §3.5 Resistance: prompts only

Who disagreed (role, not name)? What did they say? What were they protecting? What did you do, and what changed in the proposal? If nobody resisted outright, use a conflict of views instead: lease v. freehold, pricing below market v. competing on reliability, or vehicle transfer from Leeds. Each is already visible in the evidence. A Lewin force-field clause is optional.

### 4.5 Planning-stage paragraph for §5.7 (~50 words)

The brief asks for "the activities you have done during the planning stage … and your rationale … evidence of Gantt charts, risk analysis, and/or RACI". The body describes implementation planning well but says little about how the 12-week project itself ran.

> The proposal itself ran as a twelve-week project (Figure A14.1). [What ran to plan; what slipped, why, and how it was absorbed.] Fortnightly sponsor reviews were the control point: [one decision taken at a review]. The RAID log (Appendix 15) carried project risks as well as implementation ones.

`Figure_A14.1_project_gantt_planned.png` gives the planned timeline. Add actuals in the script if anything moved.

### 4.6 Objectives: number them and close the loop

In §2, list the objectives as O1–O5:

- O1 Establish the demand and competitive baseline for candidate catchments (Table 3; Appendices 3–4).
- O2 Build a validated cost and break-even model incorporating the 2028 payload reduction (Appendices 5, 8, 9).
- O3 Design and weight selection criteria with operational input (Table 4; Appendix 2).
- O4 Appraise the options against a do-nothing baseline (Tables 4–5).
- O5 Secure board approval (Appendix 13).

Then add one line to §6, for example: "O1, O3, O4 and O5 were met; O2 was met except for the payload effect, which is now a G4 condition". Change it if you do model the payload effect. Saying this plainly is better than letting a marker find it.

### 4.7 Appendix 1: key messages for Table A1.1

Each is drawn from content already in the proposal. Adapt as needed.

| Stakeholder | Key message |
|---|---|
| MD and board | A repeatable, evidence-based site decision: Option A breaks even at 596 m³ a month against 842 planned, and capital is released only gate by gate. |
| Operations Manager | Capacity headroom is a selection criterion and a gate: the new depot opens only with its own drivers, maintenance and spare cover in place (G5). |
| Business Development Manager | Pre-selling at agreed rates gates the fleet order (G3); the proposition is reliability, not discount. |
| Scheduler | Morning capacity at Leeds is the constraint the plan must not worsen; coded decline logs (R01–R08 with postcodes) are how it will be seen. |
| Material suppliers | A second site means more volume over a [TERM] agreement, in return for price stability and lower-clinker cement and GGBS supply. |
| Depot teams | Capacity-related declines at your depot are tracked monthly (KPI 5); the new depot opens only with its own crew and maintenance cover. |
| Target catchment customers | A local volumetric depot with Procon's reliability at agreed rates, clearly distinct from similarly named rivals. |
| Planning authority | A low-impact yard use with dust suppression, managed wash-bay water and a Part B permit; traffic and hours as applied for. |

Customer contact frequency [FREQ]: fortnightly during pre-sell (G1–G3), then monthly.

### 4.8 Reflexivity paragraph: prompts only

The shell's suggestion (deferral first seen as a procedural alternative, then valued as a real option) works only if it is true for you. Other candidates the evidence supports: expecting the declined-work logs to show price losses and finding capacity losses dominate by count; or discovering that the board's model, not the market, was the main source of uncertainty (Table A9.4).

## 5. Word budget

| | Body words (excl. tables, figures, notes, references, appendices) |
|---|---|
| v12 as received | ~4,203, of which ~440 are placeholder text |
| v13 with all tracked changes accepted | ~4,378 |
| Likely after placeholders are filled | ~4,450–4,500 (the §5.6, §5.8, §6 and §3.5 placeholders grow; the §4.3 instructions shrink) |
| Ceiling (4,000 + 10%) | 4,400 |

These counts come from a script that mirrors Word's rules. Before submitting, check in Word by selecting the body only (§1 to the end of §6) and excluding tables.

**Cut menu, if you need about 80–110 more words.** Each item loses little:

| Cut | Saves |
|---|---|
| §4.4: move the ARR/IRR sentence into the Table 5 note (only if your programme treats table notes as outside the count) | ~33 |
| §3.4: "In resource-based terms (Barney, 1991)…" (§3.2 already makes the VRIO point) | ~23 |
| §3.2: the Einstellung sentence (then also drop Luchins from the references and the S3 line in Appendix 16) | ~18 |
| §3.1: the Chorley Concrete sentence (the SWOT and §3.4 keep the price-loss evidence) | ~17 |
| §4.2: "It gave access to the management accounts and to candid colleagues, but three hazards needed structural mitigation." → "It gave access to the accounts and candid colleagues but carried three hazards." | ~6 |

If you would rather drop one of my additions, drop the §2 volumetric clause first and keep only the deletion of "perishable".

## 6. Financial model check

I rebuilt the board workbook from Table A5.1 (269.5 days; price and variable cost +2.5% a year; fixed and fleet +3%; tax at 25% after ten-year depreciation; working capital = (45 × revenue − 23 × variable cost) ÷ 365; maintenance at 1% of revenue).

- **Table A5.2** matches to the pound in every year: revenue, EBITDA, tax, working capital, free cash flow and cumulative cash.
- **Appendix 8** break-evens (26.5, 26.7, 33.9 and 30.6 m³ a day) and margins of safety all match.
- **Tables A9.1–A9.3** match, including NPV at 8/10/12% (1,053,412 / 967,841 / 889,618) and discounted payback (24.7 / 25.1 / 25.5 months).
- **Two small differences, both immaterial.** Downside payback is 44.5 months in v12 and 43.7 here; five-year downside cash is £304,342 against £319,581. v12's rebuild gives no relief for first-year tax losses. If the depot trades inside Procon 24/7 Ltd, its losses reduce the company's tax in the same year, so v12 is slightly conservative. Say so in the Table A9.1 note, or leave it.
- **Figures I derived for the v13 edits.** The 23% volume uplift; the £88,000 cost of a year's delay (NPV × r/(1+r)); 225 m³ and about £11,600 for the logged capacity declines; and £280,000 + £105,000 capital at risk.

One point worth making explicitly in your presentation and questioning: the 2027 depot contributes £4,217 of free cash in its first year, so the existing depots supply **98.5%** of the 2028 depot's capital. "Each depot funded by its predecessor" holds only at an interval of about 24 months, not 12.

## 7. Placeholder register

About 210 placeholders remain, grouped here by where the answer comes from. Suggested values are shown where your own evidence supports one.

| Source | Placeholders | Notes / suggested value |
|---|---|---|
| Management accounts, sales ledger | [MARGIN_MULTIPLE] (§1, §2, §3.2, §3.3, W4); [INTERNAL SOURCE: FY20XX]; [CROSS_DEPOT_SHARE]; [BASE_FCF], [FY] (new); [TARGET_MARGIN_M3] (§1, Table 1); load sizes for the payload calculation | If the cross-depot share is hard to get, use the two Leeds accounts with South Yorkshire sites (Table 3) and Appendix 19's finding that no customer appears in both logs |
| Fleet and technical | [PAYLOAD_LOSS_PCT]; [COST_PER_M3_DELTA] (§2, §4.3, Table 3, A9.4 #10, R2); A9.4 #6, #7, #9 CONFIRMs | Payload at 32 t = 32 t − unladen weight (plating certificate), ÷ ~2.4 t/m³. Weight the cost by the share of volume in loads above it. |
| Interviews | [N] ×4; Table 2 conduct row; all §4.3 bracketed items; Table 3 [FINDING] and weights; [SCHEDULER_FINDING] | [N] = 5 if §4.2's "three of five interviewees" is right |
| Competitor and demand analysis | [CATCHMENT], [POSITION] ×2, [RANKING_EFFECT]; [BINDING_FORCE], [REASON]; Table 3 infrastructure effect; ONS reference | Candidate binding force: direct volumetric rivalry (Table A4.4 lists five volumetric operators, one working from all four corridor towns). Complete the ONS reference or remove the citation from Table 3. |
| MCDA | Table 4 weights and scores; [CR]; [MCDA_SCORE_A/B]; [ADVANTAGE_OVER_B] | CR = CI ÷ RI, CI = (λmax − n)/(n − 1), RI = 1.41 for 8 criteria; below 0.10 is acceptable |
| Options B and C | Table 5 columns; Table 6 [INTEREST_COST] | Interest ≈ rate × (capital + working capital) = rate × ~£384,000 |
| Decisions | [X]% discount rate and basis; [TRIGGER]; [TERM] ×3; KPI targets and dates; Table 8 dates; Table 7 months and recruitment cost; G3 [XX]%; RAID ratings | Discount 10% (midpoint of the range tested). Trigger: monthly volume ≥ 596 m³ for three consecutive months by month 9. G3: 50% of break-even (~300 m³ a month) committed. KPI 5: ≤ 2 a month by month 12. KPI 6: within 15%. |
| Events (your own voice) | [RESISTANCE_NARRATIVE]; §5.6 ×11; [REFLEXIVITY_NARRATIVE]; [EARLY_ACTIONS]; [STEPS]; [MONTH]; [APPROVAL_DATE]/[DATE]; [YEAR]; [REVIEWER_ROLE]; [ETHICS_ROUTE] | Keep [REVIEWER_ROLE] consistent with §6's "external review next time" |
| Appendices to insert | 1 (matrix and messages), 2, 3, 4 (map), 6, 7, 11, 12 (slides 5–6 still say "add screenshot"), 13, 14 (Gantt charts), 17, 18; Appendix 19 week [X] | See section 9 |
| Front matter | [NAME]; [WORD_COUNT] | Check whether submission is anonymous before adding your name |

## 8. Referencing and presentation

- APA fixes made in v13: two DOIs, consistent "SAGE", and the new legislation entry. Check the legislation format against Exeter's APA guide, which may prefer the title in italics.
- Still to do: complete or remove the ONS (2026) reference; cite Julia Dhar's TED talk only if you use it; keep Maylor and Turner as a secondary citation (they are correctly not in the list).
- Update the contents table (F9) after adding appendices. The 5.2 entry also looks malformed in the field code.
- The guidance asks for each appendix to be "referenced back to the page in your report that it was used/introduced". The schedule gives sections. Adding page numbers once pagination is final would follow the guidance literally.

## 9. Brief and CMI checklist

| Requirement | Status in v13 |
|---|---|
| Executive summary (in word count) | Present; alternative in 4.1 |
| Problem with supporting evidence | Present; [MARGIN_MULTIPLE] needed |
| Scope; KPIs and intended impact | Present (§2, Table 1); targets and dates to fill |
| Aim, objectives, outcomes | Present; number them (4.6) |
| Planning-stage activities and rationale; Gantt, risk, RACI | RAID and RACI present; **Gantt charts missing** (planned project chart supplied); planning narrative thin (4.5) |
| Negotiation and influence with stakeholders | **Placeholders only** (§5.6) |
| Budget and resources | Present (Table 7); months and recruitment cost to fill |
| Implementation plan with communication and stakeholder plans and timeline | Present; dates and messages to fill (4.7) |
| Options analysis (at least two options) | **Option B unnamed; Tables 4–5 mostly empty** |
| Recommendations, conclusions, what is implemented so far | Present; **§5.8 empty** |
| Senior leader or board approval evidence | **Appendix 13 missing** |
| Employer statement of own work | **Appendix 17 missing** |
| KSB mapping document | Present (Appendix 16) |
| AI prompts with links, "with your references, at the end of your work" | **Missing.** Put the list directly under the AI statement after the references, not only in Appendix 18. |
| APA 7 | Largely correct (section 8) |
| 4,000 words ±10% | On track; recount after filling (section 5) |

## Sources checked for this review

- Department for Transport, *Volumetric concrete mixers: fact sheet March 2025* (updated 26 June 2025): https://www.gov.uk/government/calls-for-evidence/volumetric-concrete-mixers-review/outcome/volumetric-concrete-mixers-fact-sheet-march-2025. This confirms the 38.4 t and 44 t allowances end in 2028 or at a vehicle's 12th registration anniversary, whichever is sooner, and that both revert to 32 t.
- Local authority Part B permits for volumetric depots storing and loading bulk cement (EPR 2016, Sch. 1, Pt 2, s. 3.1 Part B), for example Telford & Wrekin's register (https://www.telford.gov.uk/media/dxhj5hes/business-pez-concrete-ltd.pdf), and Sheffield City Council's PG3/01 guidance (https://www.sheffield.gov.uk/sites/default/files/docs/public-health/pollution/3-01%20Bulk%20Cement.pdf).
- Hogan & ReVelle (1986) DOI: https://pubsonline.informs.org/doi/10.1287/mnsc.32.11.1434. Higgins (1977): https://www.jstor.org/stable/3665251.
