(function () {
  var tauri = window.__TAURI__;
  var invoke = tauri && tauri.core ? tauri.core.invoke : null;

  var tabstrip = document.getElementById("tabstrip");
  var newTabBtn = document.getElementById("newtab");
  var addr = document.getElementById("addr");
  var backBtn = document.getElementById("back");
  var fwdBtn = document.getElementById("fwd");
  var segZen = document.getElementById("segZen");
  var segNative = document.getElementById("segNative");
  var lockBtn = document.getElementById("lockBtn");
  var reader = document.getElementById("reader");
  var statusEl = document.getElementById("status");
  var themeBtn = document.getElementById("theme");
  var mainEl = document.querySelector("main");
  var root = document.documentElement;

  // Two reading modes:  zen = the calm UnClick read,  native = the raw live page.
  // Default is Zen-auto: try Zen, fall back to Native per-page, revert when able.
  // nativeLock = true pins Native on every site until the user unlocks it.
  var tabs = [];
  var activeId = 0;
  var seq = 0;
  var nativeLock = false;

  themeBtn.addEventListener("click", function () {
    var light = root.getAttribute("data-theme") === "light";
    root.setAttribute("data-theme", light ? "dark" : "light");
  });

  function setMode(mode) { root.setAttribute("data-mode", mode); }

  function normalizeUrl(input) {
    var u = (input || "").trim();
    if (!u) return "";
    var low = u.toLowerCase();
    if (low.indexOf("http://") !== 0 && low.indexOf("https://") !== 0) u = "https://" + u;
    return u;
  }
  function resolve(href, base) {
    if (!href) return "";
    try { return new URL(href, base).href; } catch (e) { return ""; }
  }
  function hostOf(u) {
    try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return ""; }
  }
  function originOf(u) {
    try { return new URL(u).origin; } catch (e) { return ""; }
  }
  function metaContent(doc, key) {
    var m = doc.querySelector('meta[property="' + key + '"]') || doc.querySelector('meta[name="' + key + '"]');
    return m ? (m.getAttribute("content") || "") : "";
  }
  function pageTitle(doc) {
    var t = metaContent(doc, "og:title");
    if (!t && doc.querySelector("title")) t = doc.querySelector("title").textContent;
    if (!t && doc.querySelector("h1")) t = doc.querySelector("h1").textContent;
    return (t || "").trim();
  }
  function faviconOf(doc, base) {
    var ic = doc.querySelector('link[rel~="icon"]') || doc.querySelector('link[rel="shortcut icon"]') || doc.querySelector('link[rel="apple-touch-icon"]');
    var href = (ic && ic.getAttribute("href")) ? resolve(ic.getAttribute("href"), base) : "";
    if (!href) { var o = originOf(base); if (o) href = o + "/favicon.ico"; }
    return href;
  }

  var DROP = { SCRIPT:1, STYLE:1, NOSCRIPT:1, IFRAME:1, SVG:1, FORM:1, TEMPLATE:1, NAV:1, HEADER:1, FOOTER:1, ASIDE:1, BUTTON:1, INPUT:1, SELECT:1, TEXTAREA:1, LINK:1, META:1, VIDEO:1, AUDIO:1, CANVAS:1 };
  var KEEP = { P:1, H1:1, H2:1, H3:1, H4:1, H5:1, H6:1, UL:1, OL:1, LI:1, BLOCKQUOTE:1, PRE:1, CODE:1, FIGURE:1, FIGCAPTION:1, IMG:1, TABLE:1, THEAD:1, TBODY:1, TR:1, TH:1, TD:1, STRONG:1, EM:1, B:1, I:1, BR:1, HR:1 };
  var JUNK = /(^|[-_ ])(ad|ads|advert|advertis\w*|promo|sponsor\w*|cookie|consent|gdpr|newsletter|subscrib\w*|signup|social|share|comment\w*|sidebar|footer|navbar|nav|menu|popup|modal|banner|breadcrumb|pagination|related|recommend\w*|widget|toolbar|masthead|skip-link|sr-only|visually-hidden)([-_ ]|$)/i;

  function textLen(el) { return (el.textContent || "").trim().length; }

  function looksJunk(el) {
    var id = el.id || "";
    var cls = (typeof el.className === "string") ? el.className : "";
    if (JUNK.test(id) || JUNK.test(cls)) return true;
    if (el.getAttribute && (el.getAttribute("aria-hidden") === "true" || el.hasAttribute("hidden"))) return true;
    var role = el.getAttribute ? el.getAttribute("role") : "";
    if (role && /navigation|banner|complementary|search|contentinfo/i.test(role)) return true;
    return false;
  }

  function stripJunk(docOrEl) {
    var all = docOrEl.querySelectorAll("*");
    for (var i = all.length - 1; i >= 0; i--) {
      var el = all[i];
      if (DROP[el.tagName] || looksJunk(el)) { if (el.parentNode) el.parentNode.removeChild(el); }
    }
  }

  function pickRoot(doc) {
    var named = doc.querySelectorAll("article, main, [role=main]");
    var best = null, bestLen = 0;
    for (var i = 0; i < named.length; i++) { var l = textLen(named[i]); if (l > bestLen) { bestLen = l; best = named[i]; } }
    if (best && bestLen >= 1200) return best;
    return doc.body || doc.documentElement;
  }

  // Cheap structured-data win: many modern sites ship the real article in JSON-LD.
  function jsonLdArticle(doc) {
    var blocks = doc.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < blocks.length; i++) {
      try {
        var data = JSON.parse(blocks[i].textContent);
        var arr = Array.isArray(data) ? data : (data["@graph"] ? data["@graph"] : [data]);
        for (var j = 0; j < arr.length; j++) {
          var t = arr[j] && arr[j]["@type"];
          var isArt = t && (t === "Article" || t === "NewsArticle" || t === "BlogPosting" || (Array.isArray(t) && (t.indexOf("Article") >= 0 || t.indexOf("NewsArticle") >= 0)));
          if (isArt && arr[j].articleBody && String(arr[j].articleBody).length > 400) {
            return { headline: arr[j].headline || "", body: String(arr[j].articleBody) };
          }
        }
      } catch (e) {}
    }
    return null;
  }

  function imgSrc(node, base) {
    var cand = node.getAttribute("src") || node.getAttribute("data-src") || node.getAttribute("data-original") || node.getAttribute("data-lazy-src") || node.getAttribute("data-lazy") || "";
    if (!cand) {
      var ss = node.getAttribute("srcset") || node.getAttribute("data-srcset") || "";
      if (ss) cand = ss.split(",")[0].trim().split(" ")[0];
    }
    if (!cand) return "";
    if (cand.indexOf("data:") === 0) return "";
    if (/(^|[\/_-])(pixel|spacer|blank|1x1|tracking|beacon|transparent)([._-]|$)/i.test(cand)) return "";
    var w = parseInt(node.getAttribute("width") || "0", 10);
    var h = parseInt(node.getAttribute("height") || "0", 10);
    if ((w && w <= 2) || (h && h <= 2)) return "";
    return resolve(cand, base);
  }

  var imgCount = 0;
  var IMG_MAX = 80;

  function clean(src, base, out) {
    var kids = src.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var node = kids[i];
      if (node.nodeType === 3) {
        var t = node.textContent;
        if (t && t.trim()) out.appendChild(document.createTextNode(t));
        continue;
      }
      if (node.nodeType !== 1) continue;
      var tag = node.tagName;
      if (DROP[tag] || looksJunk(node)) continue;
      if (tag === "A") {
        var a = document.createElement("a");
        var href = resolve(node.getAttribute("href"), base);
        if (href && href.indexOf("http") === 0) a.setAttribute("data-href", href);
        clean(node, base, a);
        if (a.textContent.trim() || a.querySelector("img")) out.appendChild(a);
        continue;
      }
      if (tag === "IMG") {
        if (imgCount >= IMG_MAX) continue;
        var isrc = imgSrc(node, base);
        if (!isrc) continue;
        var img = document.createElement("img");
        img.alt = node.getAttribute("alt") || "";
        img.loading = "lazy";
        img.decoding = "async";
        img.onerror = function () { if (this.parentNode) this.parentNode.removeChild(this); };
        img.src = isrc;
        out.appendChild(img);
        imgCount++;
        continue;
      }
      if (KEEP[tag]) {
        var el = document.createElement(tag.toLowerCase());
        clean(node, base, el);
        var keep = el.textContent.trim() || el.querySelector("img") || tag === "HR" || tag === "BR";
        if (keep) out.appendChild(el);
        continue;
      }
      clean(node, base, out);
    }
  }

  function tidy(rootEl) {
    var nodes = rootEl.querySelectorAll("p, li, h1, h2, h3, h4, h5, h6");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var txt = (el.textContent || "").trim();
      if (!el.querySelector("img") && txt.length <= 1) { if (el.parentNode) el.parentNode.removeChild(el); }
    }
  }

  // Fuse a "story unit" (eyebrow label + headline link + thumbnail + blurb) that
  // sits as separate sibling elements into one tidy card. This is what listing
  // pages (news.com.au etc.) ship: the picture, headline and summary are three
  // separate links, so without this they render as a tall scattered stack.
  function txtOf(n) { return (n && n.textContent || "").trim(); }
  function firstImg(n) { return n && (n.tagName === "IMG" ? n : (n.querySelector ? n.querySelector("img") : null)); }
  function isHeadline(n) { return n.tagName === "A" && n.getAttribute("data-href") && txtOf(n).length >= 14; }
  function isImageOnly(n) { return (n.tagName === "IMG") || (n.tagName === "A" && firstImg(n) && txtOf(n).length < 14); }
  function isBlurb(n) { return n.tagName === "P" && txtOf(n).length >= 28; }
  function isEyebrow(n) { return (n.tagName === "A" || n.tagName === "SPAN" || /^H[3-6]$/.test(n.tagName)) && txtOf(n).length > 0 && txtOf(n).length <= 26 && !firstImg(n); }

  function buildCard(u) {
    var card = document.createElement(u.href ? "a" : "div");
    card.className = "card" + (u.image ? "" : " card-text");
    if (u.href) card.setAttribute("data-href", u.href);
    if (u.image) {
      u.image.className = "card-thumb";
      u.image.removeAttribute("style");
      u.image.removeAttribute("width");
      u.image.removeAttribute("height");
      u.image.loading = "lazy";
      u.image.onerror = function () { if (this.parentNode) this.parentNode.removeChild(this); if (card.className.indexOf("card-text") < 0) card.className += " card-text"; };
      card.appendChild(u.image);
    }
    var body = document.createElement("div");
    body.className = "card-body";
    if (u.eyebrow) { var e = document.createElement("div"); e.className = "card-eyebrow"; e.textContent = u.eyebrow; body.appendChild(e); }
    var ti = document.createElement("div"); ti.className = "card-title"; ti.textContent = u.title; body.appendChild(ti);
    if (u.blurb) { var b = document.createElement("div"); b.className = "card-blurb"; b.textContent = u.blurb; body.appendChild(b); }
    card.appendChild(body);
    return card;
  }

  function restructureTeasers(article) {
    var src = [];
    for (var c = 0; c < article.childNodes.length; c++) { if (article.childNodes[c].nodeType === 1) src.push(article.childNodes[c]); }
    var used = new Array(src.length);
    var out = [];

    for (var i = 0; i < src.length; i++) {
      if (used[i]) continue;
      var n = src[i];
      if (isHeadline(n)) {
        var unit = { href: n.getAttribute("data-href"), title: txtOf(n), image: firstImg(n), blurb: null, eyebrow: null };
        // Look ahead a few siblings for this story's image and blurb.
        for (var f = i + 1; f < src.length && f <= i + 3; f++) {
          if (used[f]) continue;
          if (isHeadline(src[f])) break;
          if (!unit.image && isImageOnly(src[f])) { unit.image = firstImg(src[f]); used[f] = true; continue; }
          if (!unit.blurb && isBlurb(src[f])) { unit.blurb = txtOf(src[f]); used[f] = true; break; }
        }
        // Pull a short label sitting just above the headline up as the eyebrow.
        if (out.length && isEyebrow(out[out.length - 1])) { unit.eyebrow = txtOf(out.pop()); }
        out.push(buildCard(unit));
        used[i] = true;
        continue;
      }
      out.push(n);
    }

    // Only worth rebuilding if we actually formed cards.
    var made = 0;
    for (var k = 0; k < out.length; k++) { if (out[k].className && out[k].className.indexOf("card") === 0) made++; }
    if (!made) return;
    while (article.firstChild) article.removeChild(article.firstChild);
    for (var o = 0; o < out.length; o++) article.appendChild(out[o]);
  }

  // Same source banner on every page: site logo + name, left aligned.
  function masthead(doc, base) {
    var host = hostOf(base);
    var site = metaContent(doc, "og:site_name") || metaContent(doc, "application-name") || host;
    var iconHref = faviconOf(doc, base);
    var origin = originOf(base);
    // The site logo/name is a link home, like a real site header.
    var bar = document.createElement(origin ? "a" : "div");
    bar.className = "masthead";
    if (origin) bar.setAttribute("data-href", origin);
    if (iconHref) {
      var fav = document.createElement("img");
      fav.className = "fav"; fav.src = iconHref; fav.alt = "";
      fav.onerror = function () { this.style.display = "none"; };
      bar.appendChild(fav);
    }
    var name = document.createElement("span");
    name.className = "site"; name.textContent = site || host || "Source";
    bar.appendChild(name);
    if (host && site && site !== host) {
      var grow = document.createElement("span"); grow.className = "grow"; bar.appendChild(grow);
      var h = document.createElement("span"); h.className = "host"; h.textContent = host; bar.appendChild(h);
    }
    return bar;
  }

  // Same footer on every page: a clear way to the raw page.
  function footer(tab) {
    var base = tab.final || tab.url;
    var host = hostOf(base) || base;
    var f = document.createElement("div");
    f.className = "pagefoot";
    var src = document.createElement("a");
    src.setAttribute("data-href", base); src.textContent = host;
    var live = document.createElement("a");
    live.className = "live"; live.textContent = "Open in Native"; live.style.cursor = "pointer";
    live.addEventListener("click", function (e) { e.preventDefault(); setTabMode(tab, "native"); });
    f.appendChild(document.createTextNode("Source: "));
    f.appendChild(src);
    f.appendChild(document.createTextNode("  ·  "));
    f.appendChild(live);
    return f;
  }

  function injectBase(html, base) {
    var tag = '<base href="' + String(base).replace(/"/g, "&quot;") + '">';
    if (/<head[^>]*>/i.test(html)) return html.replace(/<head([^>]*)>/i, "<head$1>" + tag);
    if (/<html[^>]*>/i.test(html)) return html.replace(/<html([^>]*)>/i, "<html$1><head>" + tag + "</head>");
    return "<head>" + tag + "</head>" + html;
  }

  function setStatus(html) { statusEl.innerHTML = html || ""; }
  function scrollTop() { if (mainEl) mainEl.scrollTop = 0; }

  // ---------- tab model ----------
  function newTab(activate) {
    var t = { id: ++seq, url: "", mode: "zen", title: "New tab", host: "", favicon: "", html: "", final: "", hist: [], fwd: [] };
    tabs.push(t);
    if (activate !== false) activeId = t.id;
    return t;
  }
  function activeTab() { for (var i = 0; i < tabs.length; i++) if (tabs[i].id === activeId) return tabs[i]; return null; }

  function closeTab(id) {
    var idx = -1;
    for (var i = 0; i < tabs.length; i++) if (tabs[i].id === id) idx = i;
    if (idx < 0) return;
    tabs.splice(idx, 1);
    if (!tabs.length) newTab();
    if (activeId === id) activeId = tabs[Math.min(idx, tabs.length - 1)].id;
    renderTabs();
    showActive();
  }

  function chip(t) {
    var el = document.createElement("div");
    el.className = "tab" + (t.mode === "native" ? " native" : "") + (t.id === activeId ? " active" : "");
    if (t.mode === "native" && t.favicon) {
      var f = document.createElement("img"); f.className = "tfav"; f.src = t.favicon;
      f.onerror = function () { this.style.display = "none"; };
      el.appendChild(f);
    } else {
      var d = document.createElement("span"); d.className = "tdot"; el.appendChild(d);
    }
    var lab = document.createElement("span"); lab.className = "tlabel";
    lab.textContent = t.mode === "native" ? (t.host || hostOf(t.url) || "native") : (t.title || "New tab");
    el.appendChild(lab);
    if (t.mode === "native") { var p = document.createElement("span"); p.className = "pulse"; el.appendChild(p); }
    var x = document.createElement("span"); x.className = "tclose"; x.textContent = "×";
    x.addEventListener("click", function (e) { e.stopPropagation(); closeTab(t.id); });
    el.appendChild(x);
    el.addEventListener("click", function () { if (t.id !== activeId) { activeId = t.id; renderTabs(); showActive(); } });
    el.addEventListener("auxclick", function (e) { if (e.button === 1) { e.preventDefault(); closeTab(t.id); } });
    return el;
  }

  function renderTabs() {
    tabstrip.innerHTML = "";
    for (var i = 0; i < tabs.length; i++) tabstrip.appendChild(chip(tabs[i]));
  }

  // ---------- rendering ----------
  function renderWelcome() {
    setMode("zen");
    reader.innerHTML =
      '<div class="welcome">' +
      '<p class="kicker">UnClick / Browser</p>' +
      '<h1>The web, calm.</h1>' +
      '<p class="soft">Type any web address above and press Enter. UnClick rebuilds the page into Zen: one clean, calm, fast read. Flip to Native any time to see the raw live page.</p>' +
      '<p class="soft">Tabs: <kbd>Ctrl T</kbd> new, <kbd>Ctrl W</kbd> close, <kbd>Ctrl Tab</kbd> next. Move: <kbd>Alt &larr;</kbd> / <kbd>Alt &rarr;</kbd> and your mouse side buttons. <kbd>Ctrl L</kbd> address bar.</p>' +
      '</div>';
    setStatus("");
  }

  function buildReader(html, base) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    var title = pageTitle(doc);
    var article = document.createElement("article"); article.className = "doc";
    if (title) { var h0 = document.createElement("h1"); h0.textContent = title; article.appendChild(h0); }
    stripJunk(doc);
    var rootNode = pickRoot(doc);
    imgCount = 0;
    if (rootNode) clean(rootNode, base, article);
    tidy(article);
    if (textLen(article) < 600) {
      var ld = jsonLdArticle(doc);
      if (ld) {
        article = document.createElement("article"); article.className = "doc";
        var ht = document.createElement("h1"); ht.textContent = (ld.headline || title || "").trim(); article.appendChild(ht);
        var paras = ld.body.split(/\n{2,}|\r\n\r\n/);
        for (var p = 0; p < paras.length; p++) { var pp = paras[p].trim(); if (pp) { var pe = document.createElement("p"); pe.textContent = pp; article.appendChild(pe); } }
      }
    }
    restructureTeasers(article);
    var thin = textLen(article) < 200 && !article.querySelector("img");
    return { article: article, thin: thin };
  }

  // Engine-first: for listing-shaped pages the baskets engine produces a clean
  // card grid (its strength). Fully guarded; on anything it does not strongly
  // simplify (articles, tables, thin pages) it returns false and we fall through
  // to the proven reader below, so this can never regress a page.
  function tryEngineListing(t) {
    try {
      if (!window.UCB || !UCB.pipeline || typeof UCB.pipeline.run !== "function") return false;
      var res = UCB.pipeline.run(t.html, t.final || t.url);
      if (!res || !res.blocks || !res.blocks.length) return false;
      // A real listing has a grid/carousel/gallery whose items carry titles - not
      // just images. (A bare image carousel reads better through the reader.)
      var listing = false;
      for (var i = 0; i < res.blocks.length; i++) {
        var b = res.blocks[i];
        if ((b.kind === "grid" || b.kind === "carousel" || b.kind === "gallery") && b.items && b.items.length >= 3) {
          var titled = 0;
          for (var j = 0; j < b.items.length; j++) { if (b.items[j] && b.items[j].title) titled++; }
          if (titled >= 3) { listing = true; break; }
        }
      }
      if (!listing || typeof UCB.renderCanonical !== "function") return false;
      var frag = UCB.renderCanonical(res.blocks);
      if (!frag || !frag.childNodes || !frag.childNodes.length) return false;
      // Quality gate: the engine view must hold real content (cards with text),
      // not just a masthead + nav. Otherwise fall through to the reader.
      var probe = document.createElement("div");
      probe.appendChild(frag.cloneNode(true));
      var allCards = probe.querySelectorAll(".card"), good = 0;
      for (var c = 0; c < allCards.length; c++) { if (allCards[c].textContent.trim()) good++; }
      if (good < 2) return false;
      reader.innerHTML = "";
      reader.appendChild(frag);
      setStatus("");
      bindLinks();
      scrollTop();
      return true;
    } catch (e) { return false; }
  }

  // Bot-walls / challenge pages (Cloudflare, captcha) have no readable content.
  // Showing them in Zen is pointless - flip to the live view so the WebView can
  // pass the check and reach the real page.
  function looksBlocked(html) {
    if (!html) return false;
    var head = html.slice(0, 4000).toLowerCase();
    return /attention required! \| cloudflare|just a moment\.\.\.|cf-browser-verification|cf-challenge|checking your browser before|verify you are (a )?human|recaptcha|hcaptcha|you have been blocked|access to this page has been denied|please enable (javascript|js) and cookies/.test(head);
  }

  function renderZen(t) {
    setMode("zen");
    if (!t.html) { renderWelcome(); return; }
    if (looksBlocked(t.html)) {
      t.mode = "native"; renderNative(t); renderTabs(); syncChrome();
      flash("Opened live - this site needs a browser check");
      return;
    }
    if (tryEngineListing(t)) return;
    var built = buildReader(t.html, t.final || t.url);
    if (built.thin) {
      // Nothing worth simplifying on this one, so just show it live - quietly.
      t.mode = "native";
      renderNative(t);
      renderTabs();
      syncChrome();
      flash("Best viewed live");
      return;
    }
    var metaDoc = new DOMParser().parseFromString(t.html, "text/html");
    reader.innerHTML = "";
    reader.appendChild(masthead(metaDoc, t.final || t.url));
    reader.appendChild(built.article);
    reader.appendChild(footer(t));
    setStatus("");
    bindLinks();
    scrollTop();
  }

  function renderNative(t) {
    setMode("native");
    reader.innerHTML = "";
    var frame = document.createElement("iframe");
    frame.className = "liveframe";
    // Sandboxed without same-origin: the live page renders and scripts run, but
    // it cannot reach our app shell or the Tauri bridge. Safe live view.
    frame.setAttribute("sandbox", "allow-scripts allow-forms allow-popups");
    frame.setAttribute("referrerpolicy", "no-referrer");
    frame.srcdoc = injectBase(t.html || "", t.final || t.url);
    reader.appendChild(frame);
    setStatus("");
    scrollTop();
  }

  function renderActive() {
    var t = activeTab();
    if (!t) return;
    if (!t.html) { renderZen(t); return; }              // welcome screen
    if (nativeLock) { t.mode = "native"; renderNative(t); return; }
    if (t.mode === "native") { renderNative(t); return; }
    renderZen(t);                                        // may auto-fall back to Native
  }

  // A small, low-key toast that fades on its own. Used for quiet hints like
  // "we showed you the live page because there was nothing to simplify".
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  function flash(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3500);
  }

  function bindLinks() {
    var links = reader.querySelectorAll("a[data-href]");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (e) { e.preventDefault(); go(this.getAttribute("data-href")); });
    }
  }

  function syncChrome() {
    var t = activeTab();
    if (!t) return;
    addr.value = t.url || "";
    var showingNative = (nativeLock || t.mode === "native") && !!t.html;
    setMode(showingNative ? "native" : "zen");
    updateSeg(showingNative);
    updateNav();
  }

  function updateSeg(showingNative) {
    if (segZen) segZen.classList.toggle("active", !showingNative);
    if (segNative) segNative.classList.toggle("active", !!showingNative);
    if (lockBtn) {
      lockBtn.classList.toggle("on", nativeLock);
      lockBtn.title = nativeLock ? "Native locked on every site (click to unlock)" : "Lock Native on every site";
    }
  }

  function showActive() {
    renderActive();
    syncChrome();
  }

  function setTabMode(t, mode) {
    t.mode = mode;
    if (t.id === activeId) { renderActive(); syncChrome(); }
    renderTabs();
  }
  // Zen-auto: drop any Native lock and try the calm read (auto-falls back if thin).
  function setPrefZen() {
    nativeLock = false;
    var t = activeTab();
    if (t) { t.mode = "zen"; if (t.html) renderActive(); }
    syncChrome(); renderTabs();
  }
  // Native for this view (not locked - the next site goes back to Zen-auto).
  function setPrefNative() {
    var t = activeTab();
    if (t) { t.mode = "native"; if (t.html) renderActive(); }
    syncChrome(); renderTabs();
  }
  // The lock: keep Native on every site, or release back to Zen-auto.
  function toggleLock() {
    nativeLock = !nativeLock;
    var t = activeTab();
    if (t) { t.mode = nativeLock ? "native" : "zen"; if (t.html) renderActive(); }
    syncChrome(); renderTabs();
  }

  // ---------- navigation ----------
  function updateNav() {
    var t = activeTab();
    if (backBtn) backBtn.disabled = !t || t.hist.length === 0;
    if (fwdBtn) fwdBtn.disabled = !t || t.fwd.length === 0;
  }

  // histMode: undefined/"new" = fresh nav, "back", "fwd", "reload".
  function go(rawUrl, histMode) {
    if (!invoke) { setStatus("This page only works inside the UnClick Browser app."); return; }
    var url = normalizeUrl(rawUrl);
    if (!url) return;
    var t = activeTab();
    if (!t) { t = newTab(); renderTabs(); }
    if (!histMode || histMode === "new") { if (t.url && t.url !== url) t.hist.push(t.url); t.fwd = []; }
    else if (histMode === "back") { if (t.url) t.fwd.push(t.url); }
    else if (histMode === "fwd") { if (t.url) t.hist.push(t.url); }
    t.url = url;
    addr.value = url;
    setStatus("Loading " + url + " ...");
    updateNav();
    invoke("fetch_url", { url: url }).then(function (page) {
      t.html = (page && page.html) || "";
      t.final = (page && page.final_url) || url;
      var metaDoc = new DOMParser().parseFromString(t.html, "text/html");
      t.title = pageTitle(metaDoc) || hostOf(t.final);
      t.host = hostOf(t.final);
      t.favicon = faviconOf(metaDoc, t.final);
      // Each fresh load re-tries Zen unless Native is locked (auto-revert).
      t.mode = nativeLock ? "native" : "zen";
      if (t.id === activeId) { renderActive(); syncChrome(); }
      renderTabs();
    }).catch(function (err) {
      if (t.id === activeId) setStatus("Could not load that page. " + (err && err.toString ? err.toString() : ""));
    });
  }

  function back() { var t = activeTab(); if (t && t.hist.length) go(t.hist.pop(), "back"); }
  function forward() { var t = activeTab(); if (t && t.fwd.length) go(t.fwd.pop(), "fwd"); }

  // The UnClick logo returns the active tab to the home (welcome) screen.
  function goHome() {
    var t = activeTab();
    if (t) { if (t.url) t.hist.push(t.url); t.url = ""; t.html = ""; t.final = ""; t.title = "New tab"; t.host = ""; t.favicon = ""; t.mode = "zen"; }
    addr.value = ""; renderActive(); syncChrome(); renderTabs(); addr.focus();
  }
  var brandEl = document.querySelector(".brand");
  if (brandEl) { brandEl.style.cursor = "pointer"; brandEl.title = "Home"; brandEl.addEventListener("click", goHome); }

  addr.addEventListener("keydown", function (e) { if (e.key === "Enter") go(addr.value); });
  if (backBtn) backBtn.addEventListener("click", back);
  if (fwdBtn) fwdBtn.addEventListener("click", forward);
  if (segZen) segZen.addEventListener("click", setPrefZen);
  if (segNative) segNative.addEventListener("click", setPrefNative);
  if (lockBtn) lockBtn.addEventListener("click", toggleLock);
  if (newTabBtn) newTabBtn.addEventListener("click", function () { newTab(); renderTabs(); showActive(); addr.focus(); });

  // Mouse side buttons: 3 = back, 4 = forward.
  window.addEventListener("mouseup", function (e) {
    if (e.button === 3) { e.preventDefault(); back(); }
    else if (e.button === 4) { e.preventDefault(); forward(); }
  });
  window.addEventListener("auxclick", function (e) { if (e.button === 3 || e.button === 4) e.preventDefault(); });

  window.addEventListener("keydown", function (e) {
    var inField = document.activeElement === addr;
    var mod = e.ctrlKey || e.metaKey;
    if (mod && (e.key === "t" || e.key === "T")) { e.preventDefault(); newTab(); renderTabs(); showActive(); addr.focus(); return; }
    if (mod && (e.key === "w" || e.key === "W")) { e.preventDefault(); closeTab(activeId); return; }
    if (mod && e.key === "Tab") {
      e.preventDefault();
      if (tabs.length < 2) return;
      var idx = 0; for (var i = 0; i < tabs.length; i++) if (tabs[i].id === activeId) idx = i;
      var next = e.shiftKey ? (idx - 1 + tabs.length) % tabs.length : (idx + 1) % tabs.length;
      activeId = tabs[next].id; renderTabs(); showActive(); return;
    }
    if (mod && (e.key === "l" || e.key === "k" || e.key === "L" || e.key === "K")) { e.preventDefault(); addr.focus(); addr.select(); return; }
    if (mod && (e.key === "r" || e.key === "R")) { e.preventDefault(); var t = activeTab(); if (t && t.url) go(t.url, "reload"); return; }
    if (e.key === "F5") { e.preventDefault(); var rt = activeTab(); if (rt && rt.url) go(rt.url, "reload"); return; }
    if (e.altKey && e.key === "ArrowLeft") { e.preventDefault(); back(); return; }
    if (e.altKey && e.key === "ArrowRight") { e.preventDefault(); forward(); return; }
    if (e.key === "Backspace" && !inField) { e.preventDefault(); back(); return; }
    if (e.key === "Escape" && inField) { addr.blur(); }
  });

  // start with one Zen tab on the welcome screen
  newTab();
  renderTabs();
  showActive();
})();
