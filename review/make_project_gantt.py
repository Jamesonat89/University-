"""Figure A14.1: the 12-week SBP project schedule, as planned in the gateway scoping document.

Planned weeks come from Part 2 of Procon_SBP_Scoping_Document_FINAL. To show planned v. actual,
fill ACTUAL with (first_week, last_week) for each activity that ran differently, then re-run:
    python3 review/make_project_gantt.py
"""
from datetime import date, timedelta
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Patch
from matplotlib.lines import Line2D

START = date(2026, 8, 13)          # week 1 begins (scoping document: 13 August to 5 November 2026)
NAVY, ACCENT, INK, MUTED, GRID = "#1F4E79", "#B4532A", "#222222", "#5A5A5A", "#E3E3E3"

# (activity, output, first_week, last_week)
PLAN = [
    ("Confirm scope; stakeholder map; begin secondary research", "Stakeholder map", 1, 1),
    ("Design framework criteria and weightings", "Criteria matrix", 2, 2),
    ("Market sizing and catchment demand analysis", "Demand baseline", 3, 3),
    ("Competitor coverage and positioning", "Competitor map", 4, 4),
    ("Build cost base (plant, yard, materials, overheads)", "Cost model", 5, 5),
    ("Interviews: operations, commercial, supply chain", "Validated assumptions", 6, 6),
    ("Profitability and break-even modelling", "Break-even model", 7, 7),
    ("Self-funding stress test; sensitivities", "Scenario pack", 8, 8),
    ("Land identification and feasibility", "Site long-list", 9, 9),
    ("Apply framework; options analysis", "Ranked shortlist", 10, 10),
    ("Draft recommendation; refine with stakeholders", "Draft board paper", 11, 11),
    ("Board review and approval", "Approved proposal", 12, 12),
    ("RAID log and stakeholder engagement (continuous)", "Appendix 15", 1, 12),
]
ACTUAL = {
    # "Interviews: operations, commercial, supply chain": (6, 7),
}
SPONSOR_REVIEWS = [2, 4, 6, 8, 10]   # fortnightly, end of week
BOARD_WEEK = 12

fig, ax = plt.subplots(figsize=(10, 5.6), dpi=200)
n = len(PLAN)
for i, (act, out, w0, w1) in enumerate(PLAN):
    y = n - 1 - i
    has_actual = act in ACTUAL
    h = 0.34 if has_actual else 0.56
    yo = 0.16 if has_actual else 0
    ax.barh(y + yo, w1 - w0 + 1, left=w0 - 1, height=h, color=NAVY, edgecolor="white", linewidth=1.5)
    if has_actual:
        a0, a1 = ACTUAL[act]
        ax.barh(y - 0.2, a1 - a0 + 1, left=a0 - 1, height=0.34, color="white",
                edgecolor=NAVY, hatch="////", linewidth=1)
    ax.text(w1 + 0.12, y, out, va="center", ha="left", fontsize=7.5, color=MUTED)

for w in SPONSOR_REVIEWS:
    ax.axvline(w, color=GRID, linewidth=1, zorder=0)
    ax.plot(w, n - 0.35, marker="D", markersize=7, color=ACCENT, clip_on=False, zorder=5)
ax.plot(BOARD_WEEK, n - 0.35, marker="*", markersize=13, color=ACCENT, clip_on=False, zorder=5)
ax.text(1.0, n + 0.25, "Sponsor reviews (fortnightly)", fontsize=7.5, color=INK, ha="left", va="bottom")
ax.text(BOARD_WEEK, n + 0.25, "Board approval", fontsize=7.5, color=INK, ha="right", va="bottom")

ax.set_yticks(range(n))
ax.set_yticklabels([p[0] for p in PLAN][::-1], fontsize=8, color=INK)
ticks = list(range(0, 13))
ax.set_xticks([t + 0.5 for t in range(12)])
ax.set_xticklabels([f"Wk {t + 1}\n{(START + timedelta(weeks=t)).strftime('%d %b')}" for t in range(12)],
                   fontsize=7, color=MUTED)
ax.set_xlim(0, 13.6)
ax.set_ylim(-0.7, n + 0.9)
for s in ("top", "right", "left"):
    ax.spines[s].set_visible(False)
ax.spines["bottom"].set_color("#9A9A9A")
ax.tick_params(axis="y", length=0)
ax.tick_params(axis="x", length=0)
ax.set_xlabel("Week of the 12-week EPA project (week commencing)", fontsize=8, color=MUTED)

handles = [Patch(facecolor=NAVY, label="Planned (scoping document)")]
if ACTUAL:
    handles.append(Patch(facecolor="white", edgecolor=NAVY, hatch="////", label="Actual"))
handles += [Line2D([], [], marker="D", color=ACCENT, linestyle="", markersize=6, label="Sponsor review"),
            Line2D([], [], marker="*", color=ACCENT, linestyle="", markersize=10, label="Board approval")]
ax.legend(handles=handles, loc="lower left", fontsize=7.5, frameon=False, ncol=len(handles),
          bbox_to_anchor=(0, -0.24))
fig.tight_layout()
out = __file__.replace("make_project_gantt.py", "Figure_A14.1_project_gantt_planned.png")
fig.savefig(out, bbox_inches="tight", facecolor="white")
print("wrote", out)
