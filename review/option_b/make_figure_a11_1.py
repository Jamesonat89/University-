"""Figure A11.1: cumulative cash, Option A v Option B (Hull and the Humber). Run: python3 review/option_b/make_figure_a11_1.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager
from depot_model import A, B, run

for f in font_manager.findSystemFonts():
    if "Carlito" in f:
        font_manager.fontManager.addfont(f)
plt.rcParams["font.family"] = "Carlito" if any("Carlito" in f.name for f in font_manager.fontManager.ttflist) else "DejaVu Sans"

NAVY, ACCENT, GREY, INK, MUTED, GRID = "#1F4E79", "#B4532A", "#6B7B8C", "#222222", "#5A5A5A", "#E3E3E3"

def series(p, **kw):
    cap, rows = run(p, **kw)
    return [-cap / 1000] + [r["cum"] / 1000 for r in rows]

x = [0, 12, 24, 36, 48, 60]
a = series(A)
b = series(B)
b_eq = series(B, vols=A["vols"])

fig, ax = plt.subplots(figsize=(9, 4.6), dpi=200)
ax.axhline(0, color="#444444", linewidth=1)
ax.axvline(12, color="#9A9A9A", linewidth=1, linestyle=(0, (4, 3)))
ax.text(12.6, 1550, "2028 depot due", fontsize=9, color=MUTED, va="top")
ax.plot(x, a, color=NAVY, linewidth=2.6, marker="o", markersize=5, label="Option A, South Yorkshire: payback 23 months")
ax.plot(x, b, color=ACCENT, linewidth=2.2, linestyle=(0, (6, 3)), marker="o", markersize=5, label="Option B, Hull, same market share as A: no payback within five years")
ax.plot(x, b_eq, color=GREY, linewidth=2, linestyle=(0, (1.5, 2)), marker="o", markersize=5, label="Option B if it matched Option A's volumes (2.2 times A's share): payback 22 months")
for series_, col, txt, dy in [(a, NAVY, "A", 0), (b, ACCENT, "B", 0), (b_eq, GREY, "B at A's volumes", 0)]:
    ax.text(61.2, series_[-1] + dy, txt, color=col, fontsize=9, va="center", fontweight="bold")
ax.set_xticks(x)
ax.set_xticklabels(["Open", "12", "24", "36", "48", "60"], fontsize=10, color=INK)
ax.tick_params(axis="y", labelsize=10, colors=INK, length=0)
ax.tick_params(axis="x", length=0)
ax.set_xlabel("Months from opening", fontsize=10.5, color=INK)
ax.set_ylabel("Cumulative cash (£000)", fontsize=10.5, color=INK)
ax.set_xlim(-2, 72)
ax.grid(axis="y", color=GRID, linewidth=0.8)
for s in ("top", "right"):
    ax.spines[s].set_visible(False)
ax.legend(loc="upper left", bbox_to_anchor=(0, -0.16), fontsize=9, frameon=False, ncol=1)
fig.tight_layout()
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Figure_A11.1_cumulative_cash_A_v_B.png")
fig.savefig(out, bbox_inches="tight", facecolor="white")
print("wrote", out, [round(v) for v in a], [round(v) for v in b], [round(v) for v in b_eq])
