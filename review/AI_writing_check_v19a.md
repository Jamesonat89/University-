# AI-writing check of v19a

Checked against Wikipedia's [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) (WikiProject AI Cleanup). Prepared 8 October 2026.

**File:** `Procon_SBP_Submission_v19b_AI_writing_check.docx` (repository root). This is v19a with:

- **106 comments** (author "Claude (AI-writing check)"). Each names the pattern, says why it reads as AI-drafted, and describes what to change.
- **3 proofreading fixes** as tracked changes (author "Claude (proofreading)").

**What this pass does and doesn't do.** Your brief puts the assessment in the AI-Assisted category. It allows AI for proofreading, and for improving plan and structure. It rules out presenting AI-generated text as your own. So I haven't rewritten anything to remove AI traces. The comments locate each problem and describe the fix; the wording has to be yours.

## Headline

**The vocabulary tells are already gone.** The body has none of the common AI words: crucial, underscore, ensure, enhance, landscape, align, robust, leverage (except once) or pivotal. Your own body prose has no em dashes at all; the only ones are inside placeholders and the Table 5 caption. Sentence length varies well (mean 23 words, range 3 to 85), so rhythm is not a document-wide problem.

**What remains is rhetorical structure.** The same few moves recur, usually at the end of paragraphs, and they make the document read as drafted by AI:

| Pattern | Body (§1–6) | Appendix prose | Tables | Total |
|---|---|---|---|---|
| Contrastive framing ("X, not Y"; "less A than B") | 12 | 5 | 3 | 20 |
| Passive or subjectless fragment | 5 | 6 | 3 | 14 |
| Aphoristic closer (slogan-like last sentence) | 11 | 0 | 2 | 13 |
| Colon pivot (set-up, colon, reveal) | 4 | 3 | 4 | 11 |
| Significance inflation | 6 | 1 | 1 | 8 |
| Elegant variation (switching names for the same thing) | 6 | 2 | 0 | 8 |
| Rule of three | 4 | 0 | 2 | 6 |
| Nominalisation stacking | 2 | 0 | 4 | 6 |
| Em dash overuse | 0 | 0 | 5 | 5 |
| Signposting | 4 | 0 | 0 | 4 |
| Uniform rhythm | 1 | 0 | 2 | 3 |
| Superficial -ing analysis | 2 | 0 | 0 | 2 |
| Copula avoidance | 1 | 1 | 0 | 2 |
| Vague attribution; persuasive authority trope; formulaic challenges; filler | 3 | 1 | 0 | 4 |
| **Total** | **61** | **19** | **26** | **106** |

| Severity | Body | Appendix prose | Tables |
|---|---|---|---|
| High | 5 | 2 | 2 |
| Medium | 26 | 7 | 11 |
| Low | 30 | 10 | 13 |

**Where to start.** Fix the 9 high items first. Then the 26 medium items in the body, which is the marked, word-counted part. Appendix and table items come last. The low items are optional unless the same pattern keeps recurring in your rewrite.

## The 9 high-priority items

| Where | Pattern | Text | What to change |
|---|---|---|---|
| §2 | Colon pivot | "It depends on something Procon has never had: a repeatable way of deciding where to expand" | State the dependency plainly; avoid repeating "repeatable way" from the executive summary |
| §4.4 | Aphoristic closer | "The board can challenge a written weighting in a way it cannot challenge a director's intuition." | Cut it, or end on a real instance of the board questioning a weighting |
| §5.2 | Aphoristic closer | "A preference can be rational, however, and still cost the business something." | Cut it, or end on the specific cost Higgins lets you measure |
| §5.2 | Contrastive framing | "That figure, more than the board's preference, sets the true pace of self-funded growth." | Drop the "more than…" comparison and "true"; say which opening the £274,303 constrains, and when |
| §5.6 | Contrastive framing | "What the directors were protecting was less the capital sum than [BOARD_INTEREST]…" | When you fill the placeholders, state the interest and your restructure directly, without the "less…than" and "turned…into" contrasts |
| Appendix 11 | Contrastive framing | "support the new ratio by volume but not by breadth…, so the base case tests catchment size rather…" | Give the HU figures plainly and state what the base case assumes |
| Appendix 11 | Contrastive framing | "so the case against Option B is demand, not cost" | State the demand conclusion with its numbers; cut the "not cost" tail |
| Table A1.1 | Contrastive framing | "the offer is reliability, not discount" | Say what reliability means for the customer (guaranteed slots, backup cover) |
| Table A16.1 | Colon pivot | "how it was reached: a costed ask the board can act on" | Drop the tagline; name the section or table where the costed recommendation sits |

The 26 medium items in the body are all in the Word file. They cluster in §2 (paragraph openers and closers), §3.2 to §3.4, the last two paragraphs of §4.4, and §5.2.

## How to fix each recurring pattern, in your own voice

- **Contrastive framing.** State what is true and give its evidence. Keep a contrast only where a reader would otherwise assume the opposite, and no more than once per section. "Payback, not NPV" is a genuine methodological choice, so keep one version of it. Several "X, not Y" endings across §4.4 to §5.2 are what make it read as a pattern.
- **Aphoristic closers.** End a paragraph on evidence or a consequence with a number or a source, or just stop. Test: if the last sentence would work as a LinkedIn post, cut it.
- **Colon pivots.** Use colons for lists and definitions, not for reveals. Write the claim as an ordinary sentence.
- **Passive or subjectless fragments.** Name who did it: you, the board, the Operations Manager. The brief wants your role visible.
- **Elegant variation.** Pick one term per thing and stick to it. Use "site" for the yard and "catchment" for the demand area. "Existing depots" and "base business" refer to the same thing, so choose one.
- **Signposting and ordinal openers.** In §2, drop "The first/second/third is that…" and "three reasons why that gap matters now". Lead each paragraph with its point.
- **Nominalisation stacking (mostly Table A16.1).** Use verbs: "I explained why the gap persists…" rather than "The capability gap's persistence explained".
- **Em dashes (Table A16.1).** Use commas or brackets.
- **Rule of three.** Keep a list only where every item carries evidence.

**A practical test.** Read each paragraph aloud as if presenting to Damien and the board. Anything you wouldn't say in that room is likely to read as machine-written.

## Proofreading changes (tracked)

| Where | Change | Reason |
|---|---|---|
| Table A11.1 (infrastructure pipeline row) | "no longer pipeline" → "no longer in the pipeline" | Missing words |
| Table A16.1 (K8 row) | "cost benefit analysis" → "cost-benefit analysis" | Matches §4.4's spelling |
| Table A16.1 (B3 row) | "(Weber; Hotelling; Church & ReVelle)" → "(Church & ReVelle, 1974; Hotelling, 1929; Weber, 1909/1929)" | APA 7 in-text citations need years |

**Deliberately left alone:**

- "§4.4" v. "Section 4.4": the tables use § throughout, so changing one or two notes would create a new inconsistency. Choose one style and apply it everywhere if you want.
- "32t-compliant" in tables v. "32-tonne-compliant" in prose: the same reasoning applies.

## Word count

The body is 4,325 words, including 331 words of placeholder text, and the ceiling is 4,400. Cutting aphoristic closers and signposting sentences will free about 100 to 150 words, which helps as you fill the placeholders.

## How the check was run

1. **Catalogue.** The patterns on the Wikipedia page, plus four common in AI business prose: aphoristic closers, colon pivots, nominalisation stacking and uniform rhythm. Context rules stopped correct British academic style being flagged: UK spelling, terms of art (KPI, net present value, break-even), hyphenated compound modifiers, Word's curly quotes, numbers and quotations, and your placeholders.
2. **Finding.** The document was split into eight chunks: body §1–2, §3, §4, §5–6, two of appendix prose, and two of table cells over 15 words. Two finders read each chunk independently, one for wording and proofreading, one for sentence and paragraph structure.
3. **Verification.** An adversarial verifier per chunk tried to refute every flag. It checked the quote character by character and rejected false positives. A completeness critic then re-read each chunk for misses, and its additions were verified the same way.
4. **Result.** 226 candidate flags were raised and 109 survived verification. I removed three more: one on placeholder text, one single em dash in a caption, and one the verifiers disagreed on. That leaves 106.

## AI-use log

Add this session to your prompt list (date, tool, prompt as entered, link). The work falls under the permitted uses: "proofread and correct spelling or grammar errors" and "improve the plan or structure". The rewrites that follow from the comments are yours to write.
