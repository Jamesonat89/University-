"""Generic rebuild of the board's depot model (same mechanics as Appendices 5, 8, 9).
Conventions match the v12-v17 rebuild: tax at 25% of (EBITDA - 10-year depreciation), floored at zero
with no loss relief; working capital = (45 x revenue - 23 x variable cost) / 365; maintenance capital 1%
of revenue; price and variable cost +2.5% a year; fixed and fleet +3% a year; 269.5 working days."""
DAYS = 269.5
A = dict(name='A', vols=[37.5, 62.5, 70, 74, 77], price=119.0, mat=61.26, other_var=6.00,
         rent=60000.0, rates=30000.0, labour=37440.0, office=72000.0, other_fixed=44900.0,
         fleet=125600.0, capital=278520.0)
BUA_HULL, BUA_SHEFF = 314018, 685368
SCALE = BUA_HULL / BUA_SHEFF
B = dict(A, name='B', vols=[v * SCALE for v in A['vols']], rent=40000.0, rates=20000.0)

def fixed_of(p):
    return p['rent'] + p['rates'] + p['labour'] + p['office'] + p['other_fixed']

def run(p, vm=1.0, pm=1.0, cm=1.0, capm=1.0, y1vm=1.0, fleet_y1=None, fixed_add=0.0, vols=None, price=None, mat=None):
    vols = [v * vm for v in (vols or p['vols'])]
    vols[0] *= y1vm
    p0 = (price if price is not None else p['price']) * pm
    v0 = ((mat if mat is not None else p['mat']) + p['other_var']) * cm
    f0 = fixed_of(p) + fixed_add
    cap = p['capital'] * capm
    dep = cap / 10
    rows, wc_prev, cum = [], 0.0, -cap
    for i, v in enumerate(vols):
        q = v * DAYS
        pr, vc = p0 * 1.025 ** i, v0 * 1.025 ** i
        rev, var = q * pr, q * vc
        fx = f0 * 1.03 ** i
        fl = (fleet_y1 if (i == 0 and fleet_y1 is not None) else p['fleet']) * 1.03 ** i
        ebitda = rev - var - fx - fl
        tax = max(0.0, 0.25 * (ebitda - dep))
        wc = (45 * rev - 23 * var) / 365
        dwc = wc - wc_prev; wc_prev = wc
        maint = 0.01 * rev
        fcf = ebitda - tax - dwc - maint
        cum += fcf
        rows.append(dict(vol=v, q=q, price=pr, rev=rev, var=var, fixed=fx, fleet=fl, ebitda=ebitda,
                         margin=ebitda / rev, tax=tax, dwc=dwc, maint=maint, fcf=fcf, cum=cum, contrib=pr - vc))
    return cap, rows

def payback(cap, rows, r=0.0, extrapolate=True):
    cum = -cap
    for i, x in enumerate(rows):
        f = x['fcf'] / (1 + r) ** (i + 1)
        if f > 0 and cum + f >= 0:
            return 12 * (i + (-cum) / f), False
        cum += f
    if extrapolate and rows[-1]['fcf'] > 0:
        # continue year-5 free cash flow flat (undiscounted case only) - indicative
        f = rows[-1]['fcf']
        n = len(rows); k = 0
        while cum < 0 and k < 30:
            ff = f / (1 + r) ** (n + k + 1)
            if cum + ff >= 0:
                return 12 * (n + k + (-cum) / ff), True
            cum += ff; k += 1
    return None, True

def npv(cap, rows, r):
    return -cap + sum(x['fcf'] / (1 + r) ** (i + 1) for i, x in enumerate(rows))

def go_rule(cap, rows):
    pb, ex = payback(cap, rows, extrapolate=False)
    if rows[0]['ebitda'] < 0: return 'NO-GO'
    if rows[-1]['cum'] > 0 and pb is not None and pb <= 48: return 'GO'
    return 'NO-GO'

def breakeven(p, year=0, contrib=None, fixed_extra=0.0):
    fx = fixed_of(p) * 1.03 ** year + p['fleet'] * 1.03 ** year + fixed_extra
    c = contrib if contrib is not None else (p['price'] - p['mat'] - p['other_var']) * 1.025 ** year
    m3yr = fx / c
    return fx, c, m3yr / DAYS, m3yr / 12
