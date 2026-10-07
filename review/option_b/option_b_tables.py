"""Option B (Hull and the Humber): every figure used in Appendix 11, Table 5 and Section 5.1 of the SBP.
Run: python3 review/option_b/option_b_tables.py  (writes option_b_figures.json beside this file)
Change an input in depot_model.py (B = ...) and re-run to refresh the numbers."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from depot_model import A, B, SCALE, DAYS, run, payback, npv, go_rule, breakeven

def pb_text(cap, rows, r=0.0):
    pb, extrap = payback(cap, rows, r)
    if pb is None:
        return "Not within five years"
    if extrap:
        return f"Not within five years (about {pb:.0f} if 2031 cash continues)"
    return f"{pb:.1f}"

def case(p, **kw):
    cap, rows = run(p, **kw)
    return cap, rows

out = {"scale": SCALE}
cap, rows = case(B)
out["base_rows"] = rows
out["base_cap"] = cap
out["base_payback"] = pb_text(cap, rows)
out["npv"] = {str(r): npv(cap, rows, r) for r in (0, 0.08, 0.10, 0.12)}
out["disc_payback"] = {str(r): pb_text(cap, rows, r) for r in (0.08, 0.10, 0.12)}
out["share_2028"] = cap - rows[0]["fcf"]
out["go"] = go_rule(cap, rows)
out["tax_relief_2027"] = -0.25 * (rows[0]["ebitda"] - cap / 10)

# scenarios (board multipliers on every year)
scen = {}
for name, kw in [("Downside", dict(vm=0.75, pm=0.97, cm=1.05, capm=1.10)), ("Base", {}),
                 ("Upside", dict(vm=1.20, pm=1.02, cm=0.98, capm=0.95))]:
    c, r = case(B, **kw)
    scen[name] = dict(capital=c, ebitda1=r[0]["ebitda"], fcf1=r[0]["fcf"], cum12=-c + r[0]["fcf"],
                      payback=pb_text(c, r), cum5=r[-1]["cum"], rule=go_rule(c, r))
out["scenarios"] = scen

# break-even
be = []
for y, lab in [(0, "2027, two wagons"), (1, "2028, two wagons")]:
    fx, c, d, m = breakeven(B, y)
    be.append(dict(case=lab, fixed=fx, contrib=c, day=d, month=m, planned=B["vols"][y], mos=1 - d / B["vols"][y]))
fx, c, d, m = breakeven(B, 0, contrib=(119 * 0.97 - (61.26 + 6.0) * 1.05))
be.append(dict(case="2027, full downside", fixed=fx, contrib=c, day=d, month=m, planned=B["vols"][0] * 0.75,
               mos=1 - d / (B["vols"][0] * 0.75)))
out["breakeven"] = be
out["planned_month_2027"] = B["vols"][0] * DAYS / 12

# sensitivities
def solve(pred, lo=0.5, hi=4.0):
    for _ in range(80):
        mid = (lo + hi) / 2
        if pred(mid): hi = mid
        else: lo = mid
    return hi
def pb_num(m):
    c, r = run(B, vm=m); v, ex = payback(c, r, extrapolate=False); return v
m_ebitda = solve(lambda m: run(B, vm=m)[1][0]["ebitda"] >= 0)
m_48 = solve(lambda m: (pb_num(m) or 999) <= 48)
m_A = solve(lambda m: (pb_num(m) or 999) <= payback(*run(A), extrapolate=False)[0])
sens = []
def add(var, change, **kw):
    c, r = case(B, **{k: v for k, v in kw.items() if k != "p"}) if "p" not in kw else run(kw["p"])
    sens.append(dict(variable=var, change=change, payback=pb_text(c, r), cum5=r[-1]["cum"], rule=go_rule(c, r)))
add("Base case", "Same market share as Option A")
add("Volume", f"Equal to Option A's ({1 / SCALE:.2f} times A's share)", vols=A["vols"])
add("Volume", f"Enough for 2027 EBITDA of zero ({m_ebitda:.2f} times A's share; {m_ebitda * SCALE:.0%} of A's volume)", vm=m_ebitda)
add("Volume", f"Enough for payback within four years ({m_48:.2f} times A's share; {m_48 * SCALE:.0%} of A's volume)", vm=m_48)
add("Volume", f"Enough to match Option A's payback ({m_A:.2f} times A's share; {m_A * SCALE:.0%} of A's volume)", vm=m_A)
add("Volume", "25% above base, all years", vm=1.25)
add("First-year volume", "−25%", y1vm=0.75)
add("Fleet", "One wagon in 2027 (finance −£62,800 that year)", fleet_y1=62800.0)
add("Rent", "£30,000 a year (rates £15,000)", p=dict(B, rent=30000.0, rates=15000.0))
add("Rent", "£50,000 a year (rates £25,000)", p=dict(B, rent=50000.0, rates=25000.0))
add("Price", "−10%", pm=0.9)
add("Materials", "+10%", mat=61.26 * 1.1)
out["sensitivities"] = sens
out["multipliers"] = dict(ebitda0=m_ebitda, payback48=m_48, matchA=m_A)
caA, rA = run(A)
out["A"] = dict(payback=payback(caA, rA)[0], npv={str(r): npv(caA, rA, r) for r in (0.08, 0.10, 0.12)})
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "option_b_figures.json")
json.dump(out, open(path, "w"), indent=1)

def f0(v): return f"{v:,.0f}".replace("-", "−")
print("Scale", round(SCALE, 4))
print("Base: payback", out["base_payback"], "| y1 EBITDA", f0(rows[0]["ebitda"]), "| y1 FCF", f0(rows[0]["fcf"]),
      "| 5y cash", f0(rows[-1]["cum"]), "|", out["go"], "| share of 2028 depot", f0(out["share_2028"]))
print("NPV", {k: f0(v) for k, v in out["npv"].items()}, "disc payback", out["disc_payback"])
for k, s in scen.items(): print(k, {kk: (f0(v) if isinstance(v, float) else v) for kk, v in s.items()})
for b in be: print(b["case"], f0(b["fixed"]), round(b["contrib"], 2), round(b["day"], 1), round(b["month"]), round(b["planned"], 1), f"{b['mos']:.0%}")
for s in sens: print(f"{s['variable']:18s} {s['change']:82s} {s['payback']:48s} {f0(s['cum5']):>12s} {s['rule']}")
print("tax relief if group relief", f0(out["tax_relief_2027"]), "planned m3/month 2027", round(out["planned_month_2027"]))
