#!/usr/bin/env python3
"""
Build the editable UnClick investor overview deck (.pptx).

Brand: Apple-calm, near-black background, one teal accent (#61c1c4), Inter type.
Content mirrors presentation/index.html. Placeholders like [ ... ] are kept so
the numbers can be dropped in later (see PLACEHOLDERS.md).

Run:  /tmp/deckvenv/bin/python build_pptx.py
Out:  UnClick-Investor-Overview.pptx
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.oxml.ns import qn
import copy

# ---- palette ----
BG        = RGBColor(0x0A, 0x0A, 0x0A)
CARD      = RGBColor(0x16, 0x18, 0x18)
CARD2     = RGBColor(0x1C, 0x1F, 0x1E)
BORDER    = RGBColor(0x2C, 0x2E, 0x2E)
FG        = RGBColor(0xEA, 0xEB, 0xEA)
BODY      = RGBColor(0xB7, 0xBB, 0xBA)
MUTED     = RGBColor(0x8A, 0x8F, 0x8E)
TEAL      = RGBColor(0x61, 0xC1, 0xC4)
TEAL_BRT  = RGBColor(0x86, 0xDD, 0xE0)
TEAL_DIM  = RGBColor(0x3F, 0x8F, 0x92)
XMARK     = RGBColor(0x9A, 0x6B, 0x6B)

FONT      = "Inter"
MONO      = "JetBrains Mono"

prs = Presentation()
prs.slide_width  = Inches(13.333)
prs.slide_height = Inches(7.5)
BLANK = prs.slide_layouts[6]
SW, SH = 13.333, 7.5
LX = 0.78          # standard left margin


# ============================ low-level helpers ============================
def slide():
    s = prs.slides.add_slide(BLANK)
    s.background.fill.solid()
    s.background.fill.fore_color.rgb = BG
    return s

def _no_line(shape):
    shape.line.fill.background()

def set_alpha(shape, opacity):
    """opacity 0..1 (1 = opaque). Operates on a solid-filled shape."""
    sp = shape.fill._xPr.find(qn('a:solidFill'))
    srgb = sp.find(qn('a:srgbClr'))
    a = srgb.makeelement(qn('a:alpha'), {'val': str(int(opacity * 100000))})
    srgb.append(a)

def halo(s, cx=11.4, cy=-1.0, r=6.0, op=0.10):
    o = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(cx - r), Inches(cy - r),
                           Inches(r * 2), Inches(r * 2))
    o.fill.solid(); o.fill.fore_color.rgb = TEAL; _no_line(o); set_alpha(o, op)
    o.shadow.inherit = False
    return o

def rect(s, l, t, w, h, fill=None, line=None, lw=1.0, radius=True):
    shp = s.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE,
        Inches(l), Inches(t), Inches(w), Inches(h))
    if radius:
        try: shp.adjustments[0] = 0.06
        except Exception: pass
    if fill is None:
        shp.fill.background()
    else:
        shp.fill.solid(); shp.fill.fore_color.rgb = fill
    if line is None:
        _no_line(shp)
    else:
        shp.line.color.rgb = line; shp.line.width = Pt(lw)
    shp.shadow.inherit = False
    return shp

def text(s, l, t, w, h, runs, size=18, color=FG, bold=False, font=FONT,
         align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, line_spacing=1.12,
         space_after=0, letter=None):
    """runs: str OR list of (txt, {opts}) OR list of paragraphs(list of runs)."""
    tb = s.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = tb.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor

    if isinstance(runs, str):
        paras = [[(runs, {})]]
    elif runs and isinstance(runs[0], tuple):
        paras = [runs]
    else:
        paras = runs

    for pi, para in enumerate(paras):
        p = tf.paragraphs[0] if pi == 0 else tf.add_paragraph()
        p.alignment = align
        if line_spacing: p.line_spacing = line_spacing
        if space_after:  p.space_after = Pt(space_after)
        for (txt, opt) in para:
            r = p.add_run(); r.text = txt
            f = r.font
            f.size = Pt(opt.get("size", size))
            f.bold = opt.get("bold", bold)
            f.name = opt.get("font", font)
            f.color.rgb = opt.get("color", color)
            if opt.get("italic"): f.italic = True
            ls = opt.get("letter", letter)
            if ls is not None:
                r._r.get_or_add_rPr().set('spc', str(int(ls)))
    return tb

def eyebrow(s, label, t=0.58):
    pill = rect(s, LX, t, 0.30 + len(label) * 0.092, 0.42,
                fill=RGBColor(0x10, 0x18, 0x18), line=TEAL_DIM, lw=1.0)
    pill.adjustments[0] = 0.5
    dot = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(LX + 0.16), Inches(t + 0.165),
                             Inches(0.09), Inches(0.09))
    dot.fill.solid(); dot.fill.fore_color.rgb = TEAL; _no_line(dot); dot.shadow.inherit = False
    text(s, LX + 0.34, t, 6.0, 0.42, label.upper(), size=11.5, color=TEAL,
         font=MONO, anchor=MSO_ANCHOR.MIDDLE, letter=180)

def logo(s, lx, ly, size, wordmark=True, wm_size=24):
    """Cursor-bot mark (teal) drawn as vector shapes, in a 100-unit frame."""
    per = Inches(size) / 100.0          # EMU per local unit (float)
    def ax(px): return Emu(int(Inches(lx) + px * per))
    def ay(py): return Emu(int(Inches(ly) + py * per))
    def al(v):  return Emu(int(v * per))
    # arrow (freeform polygon)
    try:
        ox = Inches(lx) / per
        oy = Inches(ly) / per
        fb = s.shapes.build_freeform(ox + 18, oy + 10, scale=per)
        fb.add_line_segments([(ox + 18, oy + 72), (ox + 33, oy + 57), (ox + 46, oy + 84),
                              (ox + 54, oy + 80), (ox + 41, oy + 53), (ox + 62, oy + 53)],
                             close=True)
        arrow = fb.convert_to_shape()
        arrow.fill.solid(); arrow.fill.fore_color.rgb = TEAL; _no_line(arrow)
        arrow.shadow.inherit = False
    except Exception as e:
        tri = s.shapes.add_shape(MSO_SHAPE.ISOCELES_TRIANGLE, ax(18), ay(10), al(40), al(74))
        tri.rotation = 200; tri.fill.solid(); tri.fill.fore_color.rgb = TEAL; _no_line(tri)
    # robot head
    head = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, ax(52), ay(4), al(28), al(22))
    head.adjustments[0] = 0.35
    head.fill.solid(); head.fill.fore_color.rgb = TEAL; _no_line(head); head.shadow.inherit = False
    for ex in (58, 70):
        e = s.shapes.add_shape(MSO_SHAPE.OVAL, ax(ex), ay(11), al(7), al(7))
        e.fill.solid(); e.fill.fore_color.rgb = BG; _no_line(e); e.shadow.inherit = False
    ant = s.shapes.add_shape(MSO_SHAPE.OVAL, ax(63), ay(-2), al(6), al(6))
    ant.fill.solid(); ant.fill.fore_color.rgb = TEAL; _no_line(ant); ant.shadow.inherit = False
    if wordmark:
        text(s, lx + size + 0.12, ly - 0.02, 5, size + 0.1,
             [("Un", {"color": FG, "bold": True, "size": wm_size}),
              ("Click", {"color": TEAL, "bold": True, "size": wm_size})],
             anchor=MSO_ANCHOR.MIDDLE)

def footer(s, name, idx, total):
    # progress bar
    base = rect(s, 0, 0, SW, 0.045, fill=BORDER, radius=False)
    if total > 1:
        seg = rect(s, 0, 0, max(0.02, SW * idx / (total - 1)), 0.045, fill=TEAL, radius=False)
    logo(s, LX, 7.06, 0.20, wordmark=False)
    text(s, LX + 0.30, 7.0, 6, 0.35,
         [("Un", {"color": FG, "bold": True, "size": 10}),
          ("Click", {"color": TEAL, "bold": True, "size": 10}),
          ("   ·   " + name, {"color": MUTED, "size": 10})],
         anchor=MSO_ANCHOR.MIDDLE, font=MONO)
    text(s, SW - 2.3, 7.0, 1.5, 0.35, "%02d / %02d" % (idx, total - 1),
         size=10, color=MUTED, font=MONO, align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE)

def card(s, l, t, w, h, title=None, body=None, kicker=None, accent=False,
         title_size=18, body_size=12.5):
    c = rect(s, l, t, w, h, fill=CARD, line=(TEAL_DIM if accent else BORDER),
             lw=(1.4 if accent else 1.0))
    pad = 0.26
    y = t + pad - 0.04
    if kicker:
        text(s, l + pad, y, w - 2 * pad, 0.3, kicker.upper(), size=10.5,
             color=(TEAL if accent else MUTED), font=MONO, letter=120)
        y += 0.36
    if title:
        text(s, l + pad, y, w - 2 * pad, 0.9, title, size=title_size, color=FG, bold=True,
             line_spacing=1.05)
        y += 0.30 + 0.30 * (title_size / 18.0) * (1 + title.count(" ") // 6)
    if body:
        text(s, l + pad, y, w - 2 * pad, h - (y - t) - pad + 0.1, body, size=body_size,
             color=BODY, line_spacing=1.32)
    return c

def stat_tile(s, l, t, w, h, number, label, num_size=40):
    card(s, l, t, w, h)
    text(s, l + 0.26, t + 0.22, w - 0.5, 0.8, number, size=num_size, color=TEAL,
         bold=True, font=MONO)
    text(s, l + 0.27, t + h - 0.78, w - 0.5, 0.6, label, size=11.5, color=MUTED,
         line_spacing=1.1)

def chips(s, l, t, items, on_first=0):
    x = l
    for i, it in enumerate(items):
        w = 0.34 + len(it) * 0.092
        on = i < on_first
        p = rect(s, x, t, w, 0.40,
                 fill=(RGBColor(0x10, 0x18, 0x18) if on else RGBColor(0x13, 0x14, 0x14)),
                 line=(TEAL_DIM if on else BORDER))
        p.adjustments[0] = 0.5
        text(s, x, t, w, 0.40, it, size=11.5, color=(TEAL if on else BODY),
             font=MONO, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        x += w + 0.14

def title_block(s, parts, t=1.18, size=40, w=11.6, ls=1.04):
    text(s, LX, t, w, 1.8, [parts] if isinstance(parts, list) else parts,
         size=size, bold=True, line_spacing=ls)

def connector(s, x1, y1, x2, y2, color=TEAL_DIM, w=1.2, dash=True):
    cn = s.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1),
                                Inches(x2), Inches(y2))
    cn.line.color.rgb = color; cn.line.width = Pt(w)
    if dash:
        ln = cn.line._get_or_add_ln()
        d = ln.makeelement(qn('a:prstDash'), {'val': 'dash'}); ln.append(d)
    cn.shadow.inherit = False
    return cn


# ================================ slides ===================================
SLIDES = []   # collect names for count
def total(): return 17

# ---- 0 Cover ----
s = slide(); halo(s, 11.0, 0.4, 6.5, 0.12); halo(s, 1.0, 8.0, 5.0, 0.06)
eyebrow(s, "Investor overview  ·  2026", t=1.05)
logo(s, LX, 1.95, 0.55, wordmark=True, wm_size=26)
title_block(s, [("Where AI ", {"color": FG, "bold": True, "size": 66}),
                ("belongs.", {"color": TEAL, "bold": True, "size": 66})], t=2.75, size=66)
text(s, LX, 4.15, 9.4, 1.2,
     "The operating system for AI agents. One install gives any AI a memory that never "
     "forgets, 450+ tools to act, and a safe way to get real work done.",
     size=18, color=BODY, line_spacing=1.4)
chips(s, LX, 5.35, ["Works with Claude", "ChatGPT", "Copilot", "Cursor", "Windsurf"], on_first=5)
text(s, LX, 6.45, 10, 0.4, "unclick.world   ·   Transparent. Trusted. Traceable.",
     size=12, color=MUTED, font=MONO, letter=80)
footer(s, "Cover", 0, total())

# ---- 1 Big idea ----
s = slide(); halo(s)
eyebrow(s, "The big idea")
title_block(s, [("AI is a genius. On its own, it is a genius ", {"color": FG, "bold": True, "size": 38}),
                ("locked in an empty room.", {"color": TEAL, "bold": True, "size": 38})],
            t=1.45, size=38, ls=1.08)
text(s, LX, 3.05, 10.8, 0.9,
     "It can think brilliantly, but it forgets you the moment you close the chat, and it "
     "cannot touch any of your real tools.", size=19, color=BODY, line_spacing=1.4)
card(s, LX, 4.15, 11.3, 1.85, accent=True)
text(s, LX + 0.4, 4.45, 10.5, 1.3,
     [[("UnClick", {"color": FG, "bold": True, "size": 23}),
       (" gives any AI a ", {"color": FG, "size": 23}),
       ("memory that never forgets", {"color": TEAL, "bold": True, "size": 23}),
       (" and ", {"color": FG, "size": 23}),
       ("hands that actually do the work", {"color": TEAL, "bold": True, "size": 23}),
       (" - while your data stays yours.", {"color": FG, "size": 23})]],
     line_spacing=1.32, anchor=MSO_ANCHOR.MIDDLE)
footer(s, "The big idea", 1, total())

# ---- 2 Problem ----
s = slide(); halo(s)
eyebrow(s, "The problem")
title_block(s, [("Today's AI has three problems.", {"color": FG, "bold": True, "size": 40})], t=1.15)
cw, gap = 3.62, 0.22
probs = [("Amnesia", "Close the chat and it forgets everything. Your preferences, your projects, "
                     "last week's decisions, gone. You re-explain yourself every single time."),
         ("No hands", "It can write the email but not send it. Plan the trip but not book it. "
                      "Suggest the code but not ship it. You are still the one clicking."),
         ("Locked in a box", "It only knows what is in the chat window. It cannot see your calendar, "
                             "your files, or your tools. Brilliant, but cut off from your real life.")]
for i, (tt, bb) in enumerate(probs):
    l = LX + i * (cw + gap)
    card(s, l, 2.35, cw, 3.5, title=tt, body=bb, title_size=20)
footer(s, "The problem", 2, total())

# ---- 3 Why now ----
s = slide(); halo(s)
eyebrow(s, "Why now")
title_block(s, [("Everyone just got a genius. ", {"color": FG, "bold": True, "size": 40}),
                ("Nobody connected it to their life.", {"color": TEAL, "bold": True, "size": 40})],
            t=1.7, ls=1.08)
text(s, LX, 3.5, 11.0, 1.2,
     "In two years, AI assistants went from novelty to everywhere. Claude, ChatGPT, Copilot, "
     "Cursor, Windsurf. But each one is its own island: separate memory, separate login, no "
     "shared brain, no hands.", size=19, color=BODY, line_spacing=1.42)
chips(s, LX, 5.0, ["brains added  ✓", "the wiring is missing", "← that is the opportunity"], on_first=0)
# recolor last two chips teal handled by on flag? keep simple: add teal accents
footer(s, "Why now", 3, total())

# ---- 4 Solution / pillars ----
s = slide(); halo(s)
eyebrow(s, "What UnClick is")
title_block(s, [("One layer that sits behind ", {"color": FG, "bold": True, "size": 38}),
                ("every AI.", {"color": TEAL, "bold": True, "size": 38})], t=1.12)
text(s, LX, 1.95, 6.4, 1.8,
     "Picture a brilliant new hire on day one. UnClick is everything they need to be useful: "
     "a filing cabinet, a toolbox, the keys, and a foreman who checks the work.",
     size=17, color=BODY, line_spacing=1.4)
chips(s, LX, 3.95, ["One install", "No code", "Any device"], on_first=1)
# pillar cards (right)
px, pw, ph, pg = 7.05, 2.95, 1.55, 0.2
pill_data = [("Memory", "A shared brain. Remembers across every chat, tool, and device."),
             ("Apps", "450+ tools. Email, calendar, money, code, and more."),
             ("Connections", "Sign in once. Your AI safely uses everything else."),
             ("Autopilot", "Plans, builds, checks, and proves real work, with safety gates.")]
for i, (tt, bb) in enumerate(pill_data):
    l = px + (i % 2) * (pw + pg)
    t = 1.15 + (i // 2) * (ph + pg)
    card(s, l, t, pw, ph, title=tt, body=bb, title_size=16, body_size=11.5)
core = rect(s, px + 0.7, 4.35, pw * 2 + pg - 1.4, 0.95, fill=RGBColor(0x10, 0x1A, 0x1A), line=TEAL, lw=1.4)
text(s, px, 4.5, pw * 2 + pg, 0.7,
     [[("Your data island", {"color": TEAL, "bold": True, "size": 15})],
      [("Your data stays yours. AI only touches what you allow.", {"color": BODY, "size": 11.5})]],
     align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, line_spacing=1.15)
footer(s, "What UnClick is", 4, total())

# ---- 5 How it works ----
s = slide(); halo(s)
eyebrow(s, "How it works")
title_block(s, [("Three steps. No code.", {"color": FG, "bold": True, "size": 40})], t=1.15)
steps = [("1", "Connect once", "Sign in to the accounts you choose. It takes minutes, and you decide what is shared."),
         ("2", "Your AI levels up", "It instantly gains memory and 450+ tools. Nothing to install for each app."),
         ("3", "Just ask", "Talk normally. It remembers, acts, and proves it, on any AI and any device.")]
cw = 3.62
for i, (nstep, tt, bb) in enumerate(steps):
    l = LX + i * (cw + 0.22)
    card(s, l, 2.35, cw, 3.0)
    text(s, l + 0.26, 2.55, 1, 0.9, nstep, size=44, color=TEAL, bold=True, font=MONO)
    text(s, l + 0.26, 3.55, cw - 0.5, 0.5, tt, size=19, color=FG, bold=True)
    text(s, l + 0.26, 4.05, cw - 0.5, 1.1, bb, size=12.5, color=BODY, line_spacing=1.32)
text(s, LX, 5.75, 11, 0.6, "Like giving a new employee the keys to the office, a phone, and a filing cabinet.",
     size=17, color=MUTED, line_spacing=1.3)
footer(s, "How it works", 5, total())

# ---- 6 Memory ----
s = slide(); halo(s)
eyebrow(s, "Deep dive  ·  Memory")
title_block(s, [("Tell it once. It remembers ", {"color": FG, "bold": True, "size": 36}),
                ("forever, everywhere.", {"color": TEAL, "bold": True, "size": 36})],
            t=1.12, w=6.6, ls=1.08)
text(s, LX, 2.6, 6.3, 2.0,
     "Normal AI forgets between chats. UnClick is the notebook that carries over: your "
     "preferences, decisions, and projects. And it is shared, so what you tell Claude in the "
     "morning, ChatGPT knows in the afternoon.", size=17, color=BODY, line_spacing=1.42)
card(s, LX, 4.85, 6.3, 1.15, accent=True,
     body=None)
text(s, LX + 0.28, 5.05, 5.8, 0.8,
     [[("The point: ", {"color": TEAL, "bold": True, "size": 14}),
       ("native AI memory is volatile. UnClick is the one place your context actually lives.",
        {"color": FG, "size": 14})]], line_spacing=1.3, anchor=MSO_ANCHOR.MIDDLE)
# diagram: brain core + 3 clients
ccx, ccy = 10.35, 3.5
core = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(ccx - 0.95), Inches(ccy - 0.95), Inches(1.9), Inches(1.9))
core.fill.solid(); core.fill.fore_color.rgb = RGBColor(0x10, 0x1E, 0x1E); core.line.color.rgb = TEAL; core.line.width = Pt(1.4)
core.shadow.inherit = False
text(s, ccx - 0.95, ccy - 0.5, 1.9, 1.0, [[("One brain", {"color": FG, "bold": True, "size": 15})],
     [("read + write", {"color": TEAL, "size": 11, "font": MONO})]], align=PP_ALIGN.CENTER,
     anchor=MSO_ANCHOR.MIDDLE)
clients = [("Claude", "writes a decision", 8.5, 1.35),
           ("ChatGPT", "reads it instantly", 11.5, 2.9),
           ("Cursor", "picks up the project", 8.7, 5.0)]
for nm, sub, cx, cy in clients:
    connector(s, cx + 0.85, cy + 0.35, ccx, ccy)
for nm, sub, cx, cy in clients:
    card(s, cx, cy, 1.85, 0.95)
    text(s, cx + 0.18, cy + 0.13, 1.6, 0.7,
         [[(nm, {"color": FG, "bold": True, "size": 14})], [(sub, {"color": BODY, "size": 11})]],
         line_spacing=1.15)
footer(s, "Deep dive · Memory", 6, total())

# ---- 7 Apps & connections ----
s = slide(); halo(s)
eyebrow(s, "Deep dive  ·  Apps and connections")
title_block(s, [("Every tool your agent needs, ", {"color": FG, "bold": True, "size": 36}),
                ("in one install.", {"color": TEAL, "bold": True, "size": 36})], t=1.1)
stnums = [("450+", "callable endpoints"), ("178+", "tools"), ("20+", "secure connections"),
          ("weekly", "new tools, auto-picked up")]
for i, (nn, ll) in enumerate(stnums):
    stat_tile(s, LX + i * 2.85, 2.05, 2.6, 1.25, nn, ll, num_size=34)
cats = ["Email and messaging", "Calendar and tasks", "Money and payments", "Developer tools",
        "Social and media", "Shopping and travel", "Security and data", "Knowledge and web"]
chips(s, LX, 3.6, cats[:4]); chips(s, LX, 4.1, cats[4:])
card(s, LX, 4.85, 5.55, 1.5)
text(s, LX + 0.28, 5.05, 5.0, 1.1, [[("MCP is the universal adapter", {"color": TEAL, "bold": True, "size": 14}),
     (" - like USB-C for AI. It lets any tool plug into any AI, so one install covers everything.",
      {"color": FG, "size": 14})]], line_spacing=1.32, anchor=MSO_ANCHOR.MIDDLE)
card(s, LX + 5.75, 4.85, 5.55, 1.5)
text(s, LX + 6.03, 5.05, 5.0, 1.1, [[("Like a translator, not a spy. ", {"color": TEAL, "bold": True, "size": 14}),
     ("Tools pass information between you and the services you already use. They do not store or sell it.",
      {"color": FG, "size": 14})]], line_spacing=1.32, anchor=MSO_ANCHOR.MIDDLE)
footer(s, "Deep dive · Apps", 7, total())

# ---- 8 Autopilot ----
s = slide(); halo(s)
eyebrow(s, "Deep dive  ·  Autopilot")
title_block(s, [("A factory floor for AI work, ", {"color": FG, "bold": True, "size": 34}),
                ("with a big red stop button.", {"color": TEAL, "bold": True, "size": 34})], t=1.05)
text(s, LX, 1.85, 11.3, 0.8,
     "For bigger jobs, Autopilot runs work down an assembly line. Every stage checks the one "
     "before it. Nothing ships until it passes.", size=16, color=BODY, line_spacing=1.35)
stages = ["Intake", "Plan", "Build", "Test", "QC", "Safety", "Merge", "Publish"]
sw_ = 1.30; sg = 0.115; sx = LX; sy = 2.85
for i, st in enumerate(stages):
    l = sx + i * (sw_ + sg)
    b = rect(s, l, sy, sw_, 0.85, fill=CARD, line=BORDER)
    led = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(l + sw_ - 0.24), Inches(sy + 0.13), Inches(0.1), Inches(0.1))
    led.fill.solid(); led.fill.fore_color.rgb = (RGBColor(0xD8, 0xA1, 0x3A) if st == "Test" else TEAL)
    _no_line(led); led.shadow.inherit = False
    text(s, l, sy, sw_, 0.85, st, size=12.5, color=FG, bold=True, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    if i < len(stages) - 1:
        text(s, l + sw_ - 0.02, sy, sg + 0.06, 0.85, "›", size=18, color=TEAL_DIM,
             align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
foot = [("Launchpad", "Your control desk. Pause or stop anything, at any moment.", False),
        ("Boardroom", "Where the AI workers coordinate, out in the open.", False),
        ("The promise", "Autonomy with observability. You stay in command.", True)]
fw = 3.62
for i, (k, b, ac) in enumerate(foot):
    card(s, LX + i * (fw + 0.22), 4.15, fw, 1.7, kicker=k, body=b, accent=ac, body_size=13)
footer(s, "Deep dive · Autopilot", 8, total())

# ---- 9 Trust ----
s = slide(); halo(s)
eyebrow(s, "Trust")
title_block(s, [("Transparent. Trusted. ", {"color": FG, "bold": True, "size": 40}),
                ("Traceable.", {"color": TEAL, "bold": True, "size": 40})], t=1.15)
tr = [("Your data stays yours", "Processed in real time, not stored or sold. Connections are encrypted. You choose exactly what is shared."),
      ("Every action is logged", "An audit trail records who asked, who approved, the exact scope, the proof, and how it can be stopped."),
      ("You hold the kill switch", "High-impact actions need permission. If anything drifts, one switch stops it immediately.")]
cw = 3.62
for i, (tt, bb) in enumerate(tr):
    card(s, LX + i * (cw + 0.22), 2.35, cw, 3.05, title=tt, body=bb, title_size=18)
text(s, LX, 5.75, 11.5, 0.5,
     "Five questions, always answerable:  who requested it  ·  who approved it  ·  what scope  ·  what proof  ·  how to stop it",
     size=13, color=MUTED, font=MONO, line_spacing=1.2)
footer(s, "Trust", 9, total())

# ---- 10 Moat ----
s = slide(); halo(s)
eyebrow(s, "Why UnClick wins  ·  the moat")
title_block(s, [("We do not compete with ChatGPT or Claude. ", {"color": FG, "bold": True, "size": 30}),
                ("We make all of them better.", {"color": TEAL, "bold": True, "size": 30})], t=1.0, ls=1.06)
# comparison columns
colL, colR, cy, rwh = 6.4, 5.0, 2.0, 0.52
hdrL = rect(s, LX, cy, colL, 0.46, fill=RGBColor(0x14, 0x15, 0x15), line=BORDER)
text(s, LX + 0.2, cy, colL, 0.46, "AI ON ITS OWN", size=11.5, color=MUTED, font=MONO, anchor=MSO_ANCHOR.MIDDLE, letter=100)
rows = [("Forgets between sessions", "Remembers forever"),
        ("Memory trapped in one vendor", "One brain across all AIs"),
        ("Cannot touch your tools", "450+ tools to act"),
        ("No safety trail", "Full audit + kill switch"),
        ("Re-setup everywhere", "Set up once, works everywhere")]
hdrR = rect(s, LX + colL + 0.15, cy, colR, 0.46, fill=RGBColor(0x10, 0x1A, 0x1A), line=TEAL_DIM)
text(s, LX + colL + 0.35, cy, colR, 0.46, "AI + UNCLICK", size=11.5, color=TEAL, font=MONO, anchor=MSO_ANCHOR.MIDDLE, letter=100)
for i, (a, b) in enumerate(rows):
    y = cy + 0.46 + i * rwh
    rect(s, LX, y, colL, rwh, fill=RGBColor(0x0F, 0x10, 0x10), line=BORDER)
    text(s, LX + 0.2, y, colL - 0.3, rwh, [[("✕  ", {"color": XMARK, "size": 13}), (a, {"color": MUTED, "size": 13})]], anchor=MSO_ANCHOR.MIDDLE)
    rect(s, LX + colL + 0.15, y, colR, rwh, fill=RGBColor(0x0E, 0x16, 0x16), line=BORDER)
    text(s, LX + colL + 0.35, y, colR - 0.3, rwh, [[("✓  ", {"color": TEAL, "size": 13}), (b, {"color": FG, "size": 13})]], anchor=MSO_ANCHOR.MIDDLE)
text(s, LX, 5.95, 11.5, 0.5, "The more you connect, the more it does. That is the moat.",
     size=18, color=TEAL, bold=True)
footer(s, "Why UnClick wins", 10, total())

# ---- 11 Market ----
s = slide(); halo(s)
eyebrow(s, "The opportunity")
title_block(s, [("Every AI needs a ", {"color": FG, "bold": True, "size": 38}),
                ("memory and hands.", {"color": TEAL, "bold": True, "size": 38})], t=1.15, w=6.5)
text(s, LX, 2.4, 6.3, 2.3,
     "Every knowledge worker is getting an AI assistant. Every one of them is amnesiac and "
     "tool-less out of the box. UnClick is the layer that fixes that, for individuals first, "
     "then teams, then enterprises.", size=17, color=BODY, line_spacing=1.45)
card(s, LX, 4.95, 6.3, 0.95)
text(s, LX + 0.28, 5.05, 5.8, 0.7, "Sizing to confirm with live figures  →  see PLACEHOLDERS.md",
     size=12.5, color=MUTED, font=MONO, anchor=MSO_ANCHOR.MIDDLE)
# rings
rcx, rcy = 10.0, 3.7
for r, fill, op, lab in [(2.0, TEAL, 0.05, None), (1.4, TEAL, 0.09, None), (0.82, TEAL, 0.2, None)]:
    o = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(rcx - r), Inches(rcy - r), Inches(r * 2), Inches(r * 2))
    o.fill.solid(); o.fill.fore_color.rgb = fill; set_alpha(o, op)
    o.line.color.rgb = (TEAL if r < 1 else BORDER); o.line.width = Pt(1.2 if r < 1 else 1.0)
    o.shadow.inherit = False
text(s, rcx - 1.9, rcy - 1.85, 3.8, 0.4, "TAM  [ all AI users worldwide ]", size=11, color=MUTED, font=MONO, align=PP_ALIGN.CENTER)
text(s, rcx - 1.9, rcy - 1.2, 3.8, 0.4, "SAM  [ AI subscribers you reach ]", size=11, color=MUTED, font=MONO, align=PP_ALIGN.CENTER)
text(s, rcx - 0.8, rcy - 0.22, 1.6, 0.5, [[("SOM", {"color": TEAL, "bold": True, "size": 12, "font": MONO})], [("[ year 1 ]", {"color": TEAL, "size": 10, "font": MONO})]], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
footer(s, "The opportunity", 11, total())

# ---- 12 Traction ----
s = slide(); halo(s)
eyebrow(s, "Where we are")
title_block(s, [("The product is real, live, and ", {"color": FG, "bold": True, "size": 36}),
                ("shipping.", {"color": TEAL, "bold": True, "size": 36})], t=1.15)
real = [("450+", "callable endpoints, live"), ("178+", "tools across 21 groups"), ("5+", "AI clients supported")]
for i, (nn, ll) in enumerate(real):
    stat_tile(s, LX + i * 3.78, 2.3, 3.55, 1.35, nn, ll, num_size=40)
phs = [("[ users ]", "active users"), ("[ # ]", "memories stored"), ("[ % ]", "weekly growth"), ("[ # ]", "sessions / week")]
for i, (nn, ll) in enumerate(phs):
    l = LX + i * 2.85
    card(s, l, 3.95, 2.6, 1.25)
    text(s, l + 0.24, 4.13, 2.2, 0.6, nn, size=20, color=TEAL_BRT, bold=True, font=MONO)
    text(s, l + 0.25, 4.85, 2.2, 0.5, ll, size=11, color=MUTED)
text(s, LX, 5.7, 11, 0.6, "Live at unclick.world. Built by an AI fleet that runs on UnClick itself.",
     size=16, color=MUTED, line_spacing=1.3)
footer(s, "Where we are", 12, total())

# ---- 13 Roadmap ----
s = slide(); halo(s)
eyebrow(s, "Where it is going")
title_block(s, [("From personal assistant to ", {"color": FG, "bold": True, "size": 34}),
                ("the standard layer for all AI.", {"color": TEAL, "bold": True, "size": 34})], t=1.12, ls=1.06)
road = [("Now", "Memory and 450+ tools, live across every major AI client. One install, any device."),
        ("Next", "Teams and Crews. Deeper Autopilot autonomy. More connectors, every week."),
        ("Later", "Enterprise-grade compliance and audit. The default memory and tool layer for AI.")]
cw = 3.62
for i, (k, b) in enumerate(road):
    card(s, LX + i * (cw + 0.22), 2.5, cw, 2.9, kicker=k, body=b, accent=(i == 0), body_size=14)
footer(s, "Where it is going", 13, total())

# ---- 14 Team ----
s = slide(); halo(s)
eyebrow(s, "Team")
title_block(s, [("Builders who ", {"color": FG, "bold": True, "size": 40}),
                ("dogfood their own product.", {"color": TEAL, "bold": True, "size": 40})], t=1.15)
text(s, LX, 2.3, 10.8, 1.1,
     "UnClick is built using UnClick. The same Autopilot, memory, and safety gates we offer "
     "are what we ship with every day. That is the strongest proof the system works.",
     size=18, color=BODY, line_spacing=1.4)
card(s, LX, 3.85, 5.55, 2.0, kicker="Founder")
text(s, LX + 0.26, 4.35, 5.0, 0.5, "[ Founder name ]", size=17, color=TEAL_BRT, bold=True, font=MONO)
text(s, LX + 0.26, 4.95, 5.0, 0.8, "[ one line on background and why you ]", size=13, color=MUTED)
card(s, LX + 5.75, 3.85, 5.55, 2.0, kicker="Team and advisors")
text(s, LX + 6.01, 4.35, 5.0, 0.5, "[ key people ]", size=17, color=TEAL_BRT, bold=True, font=MONO)
text(s, LX + 6.01, 4.95, 5.0, 0.8, "[ notable experience or advisors ]", size=13, color=MUTED)
footer(s, "Team", 14, total())

# ---- 15 Close ----
s = slide(); halo(s, 7.0, 3.5, 6.5, 0.10)
logo(s, LX, 1.7, 0.5, wordmark=True, wm_size=30)
title_block(s, [("Where AI belongs. ", {"color": FG, "bold": True, "size": 56}),
                ("Humans welcome.", {"color": TEAL, "bold": True, "size": 56})], t=2.7, ls=1.05)
text(s, LX, 4.2, 11, 0.8, "AI you can trust, that remembers you, and actually gets things done.",
     size=21, color=BODY, line_spacing=1.35)
chips(s, LX, 5.3, ["Let's talk  ·  [ your email ]", "unclick.world"], on_first=1)
footer(s, "Close", 15, total())

# ---- 16 Appendix glossary ----
s = slide(); halo(s)
eyebrow(s, "Appendix  ·  the words in plain English")
title_block(s, [("No jargon required.", {"color": FG, "bold": True, "size": 36})], t=1.05)
gloss = [("UnClick", "the whole platform. Memory, tools, and safe autonomy for any AI."),
         ("Memory", "the shared notebook your AI never forgets, across every device."),
         ("Apps", "the 450+ tools your AI can use to actually do things."),
         ("Connections", "sign in once, your AI safely uses the rest."),
         ("Autopilot", "the assembly line that plans, builds, checks, and proves work."),
         ("Launchpad", "the control desk, with the kill switch."),
         ("Boardroom", "where the AI workers coordinate in the open."),
         ("MCP", "the universal adapter for AI tools. USB-C for AI.")]
for i, (term, dfn) in enumerate(gloss):
    col = i % 2; rrow = i // 2
    l = LX + col * 5.85
    y = 2.1 + rrow * 1.02
    text(s, l, y, 5.6, 0.95, [[(term + "  ", {"color": TEAL, "bold": True, "size": 15}),
         (dfn, {"color": BODY, "size": 13})]], line_spacing=1.25)
    if i < len(gloss) - 2 or True:
        rect(s, l, y + 0.86, 5.5, 0.012, fill=BORDER, radius=False)
footer(s, "Appendix", 16, total())

prs.save("UnClick-Investor-Overview.pptx")
print("saved UnClick-Investor-Overview.pptx with", len(prs.slides.__iter__.__self__._sldIdLst), "slides")
