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
  var markBtn = document.getElementById("mark");
  var mainEl = document.querySelector("main");
  var root = document.documentElement;

  // Two reading modes:  zen = the calm UnClick read,  native = the raw live page.
  // Default is Zen-auto: try Zen, fall back to Native per-page, revert when able.
  // nativeLock = true pins Native on every site until the user unlocks it.
  var tabs = [];
  var activeId = 0;
  var seq = 0;
  var nativeLock = false;

  // ---------- persistence: tiny JSON blobs in localStorage, zero deps ----------
  function readStore(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return (v === null || v === undefined) ? fallback : v; }
    catch (e) { return fallback; }
  }
  function writeStore(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  var prefs = readStore("ucb-prefs", {});
  var pageHistory = readStore("ucb-history", []);   // most recent first, capped
  var readingList = readStore("ucb-marks", []);     // saved pages, newest first
  var HIST_MAX = 500;

  if (prefs.theme === "light" || prefs.theme === "dark") root.setAttribute("data-theme", prefs.theme);

  themeBtn.addEventListener("click", function () {
    var light = root.getAttribute("data-theme") === "light";
    root.setAttribute("data-theme", light ? "dark" : "light");
    prefs.theme = light ? "dark" : "light";
    writeStore("ucb-prefs", prefs);
  });

  // ---------- zoom: scales the Zen read only, never the Native frame ----------
  var ZOOMS = [0.8, 0.9, 1, 1.1, 1.25, 1.4, 1.6];
  var zoomIdx = ZOOMS.indexOf(prefs.zoom);
  if (zoomIdx < 0) zoomIdx = 2;

  function setMode(mode) {
    root.setAttribute("data-mode", mode);
    reader.style.zoom = (mode === "native") ? 1 : ZOOMS[zoomIdx];
  }
  function zoomBy(step) {
    var n = Math.max(0, Math.min(ZOOMS.length - 1, zoomIdx + step));
    zoomIdx = n;
    prefs.zoom = ZOOMS[zoomIdx];
    writeStore("ucb-prefs", prefs);
    if (root.getAttribute("data-mode") !== "native") reader.style.zoom = ZOOMS[zoomIdx];
    flash(Math.round(ZOOMS[zoomIdx] * 100) + "%");
  }

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

  // ---------- history + reading list ----------
  function recordHistory(t) {
    if (!t || !t.url) return;
    for (var i = pageHistory.length - 1; i >= 0; i--) { if (pageHistory[i].url === t.url) pageHistory.splice(i, 1); }
    pageHistory.unshift({ url: t.url, title: t.title || "", host: t.host || "", ts: Date.now() });
    if (pageHistory.length > HIST_MAX) pageHistory.length = HIST_MAX;
    writeStore("ucb-history", pageHistory);
  }
  function markIndex(url) {
    for (var i = 0; i < readingList.length; i++) if (readingList[i].url === url) return i;
    return -1;
  }
  function toggleMark() {
    var t = activeTab();
    if (!t || !t.url || !t.html) { flash("Open a page first"); return; }
    var i = markIndex(t.url);
    if (i >= 0) { readingList.splice(i, 1); flash("Removed from reading list"); }
    else { readingList.unshift({ url: t.url, title: t.title || t.url, host: t.host || "", ts: Date.now() }); flash("Saved to reading list"); }
    writeStore("ucb-marks", readingList);
    syncMarkBtn();
  }
  function syncMarkBtn() {
    if (!markBtn) return;
    var t = activeTab();
    var on = !!(t && t.url && t.html && markIndex(t.url) >= 0);
    markBtn.classList.toggle("on", on);
    markBtn.title = on ? "Remove from reading list (Ctrl+D)" : "Save to reading list (Ctrl+D)";
  }

  // ---------- session: restore your tabs on the next launch ----------
  function saveSession() {
    var ses = { active: 0, tabs: [] };
    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      if (!t.url) continue;
      if (t.id === activeId) ses.active = ses.tabs.length;
      ses.tabs.push({ url: t.url || "", title: t.title || "", host: t.host || "", hist: (t.hist || []).slice(-50), fwd: (t.fwd || []).slice(-50) });
    }
    writeStore("ucb-session", ses);
  }
  function restoreSession() {
    var ses = readStore("ucb-session", null);
    if (!ses || !ses.tabs || !ses.tabs.length) return false;
    var any = false;
    for (var i = 0; i < ses.tabs.length; i++) {
      var s = ses.tabs[i];
      if (!s || !s.url) continue;
      var t = newTab(false);
      t.url = s.url;
      t.title = s.title || s.url;
      t.host = s.host || hostOf(s.url);
      t.hist = s.hist || [];
      t.fwd = s.fwd || [];
      any = true;
    }
    if (!any) return false;
    var idx = Math.min(ses.active || 0, tabs.length - 1);
    activeId = tabs[idx].id;
    return true;
  }

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
    saveSession();
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
  function startCard(it) {
    var a = document.createElement("a");
    a.className = "card card-text";
    a.setAttribute("data-href", it.url);
    var body = document.createElement("div"); body.className = "card-body";
    var ti = document.createElement("div"); ti.className = "card-title"; ti.textContent = it.title || it.url;
    body.appendChild(ti);
    var bl = document.createElement("div"); bl.className = "card-blurb"; bl.textContent = it.host || it.url;
    body.appendChild(bl);
    a.appendChild(body);
    return a;
  }
  function startSection(title, items, action) {
    var sec = document.createElement("div"); sec.className = "sec";
    var st = document.createElement("div"); st.className = "sec-title"; st.textContent = title + " ";
    if (action) st.appendChild(action);
    sec.appendChild(st);
    var list = document.createElement("div"); list.className = "card-list";
    for (var i = 0; i < items.length; i++) list.appendChild(startCard(items[i]));
    sec.appendChild(list);
    return sec;
  }
  function renderWelcome() {
    setMode("zen");
    reader.innerHTML =
      '<div class="welcome">' +
      '<p class="kicker">UnClick / Browser</p>' +
      '<h1>The web, calm.</h1>' +
      '<p class="soft">Type any web address above and press Enter. UnClick rebuilds the page into Zen: one clean, calm, fast read. Flip to Native any time to see the raw live page.</p>' +
      '<p class="soft">Tabs: <kbd>Ctrl T</kbd> new, <kbd>Ctrl W</kbd> close, <kbd>Ctrl Tab</kbd> next. Find: <kbd>Ctrl F</kbd>. Save: <kbd>Ctrl D</kbd>. Zoom: <kbd>Ctrl +</kbd> / <kbd>Ctrl -</kbd>. Address bar: <kbd>Ctrl L</kbd>.</p>' +
      '</div>';
    // Your own pages, on device only: saved reads first, then recent visits.
    var wrap = reader.querySelector(".welcome");
    if (wrap) {
      if (readingList.length) wrap.appendChild(startSection("Reading list", readingList.slice(0, 8)));
      if (pageHistory.length) {
        var clear = document.createElement("a");
        clear.textContent = "clear";
        clear.style.cssText = "cursor:pointer;text-transform:none;letter-spacing:0;font-weight:400;";
        clear.addEventListener("click", function () { pageHistory = []; writeStore("ucb-history", pageHistory); renderActive(); });
        wrap.appendChild(startSection("Recent", pageHistory.slice(0, 8), clear));
      }
    }
    bindLinks();
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

  // Engine-first: the baskets engine now covers listing pages (card grids),
  // article pages (a serialized prose body), and data tables. Fully guarded;
  // on anything it does not strongly simplify it returns false and we fall
  // through to the proven reader below, so this can never regress a page.
  function tryEngineListing(t) {
    try {
      if (!window.UCB || !UCB.pipeline || typeof UCB.pipeline.run !== "function") return false;
      var res = UCB.pipeline.run(t.html, t.final || t.url);
      if (!res || !res.blocks || !res.blocks.length) return false;
      // What kind of substance did the engine find?
      //   listing  - a grid/carousel/gallery/list whose items carry titles
      //   articleChars - total serialized prose across article blocks
      //   tableRows    - total extracted data rows
      var listing = false, articleChars = 0, tableRows = 0;
      for (var i = 0; i < res.blocks.length; i++) {
        var b = res.blocks[i];
        if ((b.kind === "grid" || b.kind === "carousel" || b.kind === "gallery" || b.kind === "list" || b.kind === "stats") && b.items && b.items.length >= 3) {
          var titled = 0;
          for (var j = 0; j < b.items.length; j++) { if (b.items[j] && b.items[j].title) titled++; }
          if (titled >= 3) listing = true;
        }
        if (b.kind === "article") articleChars += (b.html ? b.html.length : 0) + (b.blurb ? b.blurb.length : 0);
        if (b.kind === "table" && b.meta && b.meta.rows) tableRows += b.meta.rows.length;
      }
      // Substance gate: a real listing, a real body, or a real table. Thin
      // pages still fall through to the reader (and its own fallbacks).
      if (!listing && articleChars < 600 && tableRows < 3) return false;
      if (typeof UCB.renderCanonical !== "function") return false;
      var frag = UCB.renderCanonical(res.blocks);
      if (!frag || !frag.childNodes || !frag.childNodes.length) return false;
      // Render-quality gate: what actually reached the DOM must hold real
      // content, not just a masthead + nav bar.
      var probe = document.createElement("div");
      probe.appendChild(frag.cloneNode(true));
      if (listing) {
        var allCards = probe.querySelectorAll(".card"), good = 0;
        for (var c = 0; c < allCards.length; c++) { if (allCards[c].textContent.trim()) good++; }
        if (good < 2) return false;
      } else {
        var bodyText = 0;
        var docs = probe.querySelectorAll("article.doc, .sec");
        for (var d = 0; d < docs.length; d++) bodyText += docs[d].textContent.trim().length;
        if (bodyText < 250) return false;
      }
      reader.innerHTML = "";
      reader.appendChild(frag);
      setStatus("");
      bindLinks();
      scrollTop();
      prefetchImageSizes();
      return true;
    } catch (e) { return false; }
  }

  // Warm the per-url image size cache for whatever just rendered, so the
  // ~400KB per-image cap gets precise on the next visit. Fire and forget.
  function prefetchImageSizes() {
    try {
      if (!window.UCB || !UCB.imageRules || typeof UCB.imageRules.prefetchSizes !== "function") return;
      var imgs = reader.querySelectorAll("img");
      var urls = [];
      for (var i = 0; i < imgs.length && urls.length < 48; i++) {
        var s = imgs[i].getAttribute("src");
        if (s && s.indexOf("http") === 0) urls.push(s);
      }
      if (urls.length) UCB.imageRules.prefetchSizes(urls);
    } catch (e) {}
  }

  // Bot-walls / challenge pages (Cloudflare, captcha) have no readable content.
  // Showing them in Zen is pointless - hand the user to a real browser that can
  // actually complete the check.
  function looksBlocked(html) {
    if (!html) return false;
    var head = html.slice(0, 4000).toLowerCase();
    return /attention required! \| cloudflare|just a moment\.\.\.|cf-browser-verification|cf-challenge|checking your browser before|verify you are (a )?human|recaptcha|hcaptcha|smartcaptcha|(are|am) not a robot|requests sent from your device are automated|you have been blocked|access to this page has been denied|please enable (javascript|js) and cookies/.test(head);
  }

  function renderZen(t) {
    setMode("zen");
    if (!t.html) { renderWelcome(); return; }
    if (looksBlocked(t.html)) { renderUnsupported(t, "wall"); renderTabs(); syncChrome(); return; }
    if (isWebApp(t.host, t.html)) { renderUnsupported(t); return; }
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
    prefetchImageSizes();
  }

  // Web apps (search engines, mail, social) have no server-rendered article to
  // simplify, and they refuse to be embedded, so the live iframe just shows the
  // browser's "refused to connect". Detect them and show an honest panel instead
  // of a broken frame.
  function isWebApp(host, html) {
    host = (host || "").toLowerCase().replace(/^www\./, "");
    if (host) {
      if (/(^|\.)google(\.[a-z]{2,3})+$/.test(host)) return true;
      var APPS = ["gmail.com", "youtube.com", "outlook.com", "outlook.live.com", "office.com", "facebook.com", "instagram.com", "twitter.com", "x.com", "linkedin.com", "figma.com", "notion.so", "slack.com", "discord.com", "messenger.com", "web.whatsapp.com"];
      for (var i = 0; i < APPS.length; i++) { if (host === APPS[i] || host.slice(-(APPS[i].length + 1)) === "." + APPS[i]) return true; }
    }
    if (html) {
      var bare = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (bare.length < 200 && /<(div|main)[^>]+id=["'](root|app|__next|__nuxt|svelte)["']/i.test(html)) return true;
    }
    return false;
  }
  // Hand a URL off to the user's real default browser (interactive pages that
  // the fetch-and-iframe view cannot run: web apps, captchas, logins).
  function openExternal(url) {
    if (!url) return;
    if (invoke) { invoke("open_external", { url: url }).catch(function () { try { window.open(url, "_blank"); } catch (e) {} }); }
    else { try { window.open(url, "_blank"); } catch (e) {} }
  }
  // reason: "webapp" = google/mail/social shell, "wall" = captcha/login check.
  function renderUnsupported(t, reason) {
    t.mode = "zen";                 // the panel is a calm read, never the native frame
    setMode("zen");
    var host = t.host || hostOf(t.final || t.url) || "This site";
    var url = t.final || t.url || "";
    reader.innerHTML = "";
    var w = document.createElement("div"); w.className = "welcome";
    w.style.cssText = "max-width:680px;margin:56px auto;padding:0 24px;";  // stay centered in any layout
    var k = document.createElement("p"); k.className = "kicker"; k.textContent = "UnClick / Browser"; w.appendChild(k);
    var h = document.createElement("h1");
    var p1 = document.createElement("p"); p1.className = "soft";
    if (reason === "wall") {
      h.textContent = host + " needs a real browser";
      p1.textContent = "This page is a sign-in or anti-bot check (captcha) that has to run in a full browser to complete. UnClick shows pages as a calm read, so it cannot solve it here. Open it in your main browser:";
    } else {
      h.textContent = host + " is a web app";
      p1.textContent = "UnClick rebuilds article and listing pages into a calm read. This one runs entirely in the browser and refuses to be embedded, so there is nothing to simplify or show in-app. Open it in your main browser:";
    }
    w.appendChild(h); w.appendChild(p1);
    var btn = document.createElement("button"); btn.textContent = "Open in your browser";
    btn.style.cssText = "margin:4px 0 14px;padding:10px 18px;font-size:14px;font-weight:600;border-radius:10px;border:0;background:var(--accent,#3b82f6);color:#fff;cursor:pointer;";
    btn.addEventListener("click", function () { openExternal(url); });
    w.appendChild(btn);
    var p2 = document.createElement("p"); p2.className = "soft"; p2.style.cssText = "font-size:13px;opacity:0.6;word-break:break-all;";
    var a = document.createElement("a"); a.className = "live"; a.href = url; a.textContent = url;
    a.addEventListener("click", function (e) { e.preventDefault(); openExternal(url); });
    p2.appendChild(a); w.appendChild(p2);
    reader.appendChild(w);
    setStatus(""); scrollTop();
  }

  function renderNative(t) {
    if (isWebApp(t.host, t.html)) { renderUnsupported(t); return; }
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
    closeFind();
    // A restored tab holds its URL but no content yet: load it on first view.
    if (!t.html && t.url && !t.pending) { go(t.url, "reload"); return; }
    if (!t.html) {
      if (t.pending) { reader.innerHTML = ""; setMode("zen"); setStatus("Loading " + t.url + " ..."); return; }
      renderZen(t);                                      // welcome screen
      return;
    }
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
    // The engine footer's "Open in Native" carries data-native instead of a
    // URL; wire it to the same mode switch as the reader footer.
    var nats = reader.querySelectorAll("a[data-native]");
    for (var k = 0; k < nats.length; k++) {
      nats[k].style.cursor = "pointer";
      nats[k].addEventListener("click", function (e) {
        e.preventDefault();
        var t = activeTab();
        if (t) setTabMode(t, "native");
      });
    }
  }

  // ---------- find in page (works on the Zen read) ----------
  var findbar = document.getElementById("findbar");
  var findq = document.getElementById("findq");
  var findcount = document.getElementById("findcount");
  var findHits = [];
  var findIdx = -1;
  var findTimer = null;
  var FIND_MAX = 400;

  function clearFind() {
    var parents = [];
    for (var i = 0; i < findHits.length; i++) {
      var m = findHits[i];
      var p = m.parentNode;
      if (p) {
        p.replaceChild(document.createTextNode(m.textContent), m);
        if (parents.indexOf(p) < 0) parents.push(p);
      }
    }
    for (var j = 0; j < parents.length; j++) parents[j].normalize();
    findHits = [];
    findIdx = -1;
    if (findcount) findcount.textContent = "";
  }
  function runFind(q) {
    clearFind();
    q = (q || "").trim();
    if (q.length < 2) return;
    var needle = q.toLowerCase();
    var walker = document.createTreeWalker(reader, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    var n;
    while ((n = walker.nextNode())) {
      if (n.textContent && n.textContent.toLowerCase().indexOf(needle) >= 0) nodes.push(n);
    }
    for (var i = 0; i < nodes.length && findHits.length < FIND_MAX; i++) {
      var node = nodes[i];
      var text = node.textContent;
      var low = text.toLowerCase();
      var pos = 0, at;
      var frag = document.createDocumentFragment();
      while ((at = low.indexOf(needle, pos)) >= 0 && findHits.length < FIND_MAX) {
        if (at > pos) frag.appendChild(document.createTextNode(text.slice(pos, at)));
        var mark = document.createElement("mark");
        mark.className = "uc-hit";
        mark.textContent = text.slice(at, at + q.length);
        frag.appendChild(mark);
        findHits.push(mark);
        pos = at + q.length;
      }
      if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
      node.parentNode.replaceChild(frag, node);
    }
    if (findHits.length) setFindCurrent(0);
    else if (findcount) findcount.textContent = "0";
  }
  function setFindCurrent(i) {
    if (!findHits.length) return;
    if (findIdx >= 0 && findHits[findIdx]) findHits[findIdx].classList.remove("cur");
    findIdx = ((i % findHits.length) + findHits.length) % findHits.length;
    var m = findHits[findIdx];
    m.classList.add("cur");
    try { m.scrollIntoView({ block: "center" }); } catch (e) { m.scrollIntoView(); }
    if (findcount) findcount.textContent = (findIdx + 1) + "/" + findHits.length;
  }
  function openFind() {
    if (!findbar) return;
    var t = activeTab();
    if (t && t.html && (nativeLock || t.mode === "native")) { flash("Find works in the Zen view"); return; }
    findbar.hidden = false;
    findq.focus();
    findq.select();
    if (findq.value) runFind(findq.value);
  }
  function closeFind() {
    if (!findbar || findbar.hidden) return;
    clearFind();
    findbar.hidden = true;
  }
  if (findq) {
    findq.addEventListener("input", function () {
      if (findTimer) clearTimeout(findTimer);
      findTimer = setTimeout(function () { runFind(findq.value); }, 160);
    });
    findq.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); setFindCurrent(e.shiftKey ? findIdx - 1 : findIdx + 1); }
      else if (e.key === "Escape") { e.preventDefault(); closeFind(); }
    });
  }
  (function () {
    var prev = document.getElementById("findprev");
    var next = document.getElementById("findnext");
    var close = document.getElementById("findclose");
    if (prev) prev.addEventListener("click", function () { setFindCurrent(findIdx - 1); });
    if (next) next.addEventListener("click", function () { setFindCurrent(findIdx + 1); });
    if (close) close.addEventListener("click", closeFind);
  })();

  function syncChrome() {
    var t = activeTab();
    if (!t) return;
    addr.value = t.url || "";
    var showingNative = (nativeLock || t.mode === "native") && !!t.html;
    setMode(showingNative ? "native" : "zen");
    updateSeg(showingNative);
    updateNav();
    syncMarkBtn();
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
  var LOAD_TIMEOUT_MS = 30000;
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
    // One token per load: a stale response (slow fetch finishing after the user
    // moved on, or after Stop) must never overwrite the newer page.
    t.loadSeq = (t.loadSeq || 0) + 1;
    var token = t.loadSeq;
    t.pending = true;
    addr.value = url;
    setStatus("Loading " + url + " ...");
    updateNav();
    // Belt and suspenders: the Rust fetch has its own timeouts, but if anything
    // slips through, never leave the user staring at "Loading" forever.
    var watchdog = setTimeout(function () {
      if (t.loadSeq !== token || !t.pending) return;
      t.pending = false;
      if (t.id === activeId) setStatus("That page took too long to load. Press Ctrl+R to try again.");
    }, LOAD_TIMEOUT_MS);
    invoke("fetch_url", { url: url }).then(function (page) {
      clearTimeout(watchdog);
      if (t.loadSeq !== token || !t.pending) return;
      t.pending = false;
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
      recordHistory(t);
      saveSession();
    }).catch(function (err) {
      clearTimeout(watchdog);
      if (t.loadSeq !== token || !t.pending) return;
      t.pending = false;
      if (t.id === activeId) setStatus("Could not load that page. " + (err && err.toString ? err.toString() : ""));
    });
  }
  function stopLoading() {
    var t = activeTab();
    if (!t || !t.pending) return false;
    t.loadSeq = (t.loadSeq || 0) + 1;
    t.pending = false;
    setStatus("Stopped.");
    return true;
  }

  function back() { var t = activeTab(); if (t && t.hist.length) go(t.hist.pop(), "back"); }
  function forward() { var t = activeTab(); if (t && t.fwd.length) go(t.fwd.pop(), "fwd"); }

  // The UnClick logo returns the active tab to the home (welcome) screen.
  function goHome() {
    var t = activeTab();
    if (t) { if (t.url) t.hist.push(t.url); t.url = ""; t.html = ""; t.final = ""; t.title = "New tab"; t.host = ""; t.favicon = ""; t.mode = "zen"; t.pending = false; t.loadSeq = (t.loadSeq || 0) + 1; }
    addr.value = ""; renderActive(); syncChrome(); renderTabs(); addr.focus();
    saveSession();
  }
  var brandEl = document.querySelector(".brand");
  if (brandEl) { brandEl.style.cursor = "pointer"; brandEl.title = "Home"; brandEl.addEventListener("click", goHome); }

  addr.addEventListener("keydown", function (e) { if (e.key === "Enter") go(addr.value); });
  // Address suggestions come from your own reading list and history, on device.
  var addrList = document.getElementById("addrlist");
  addr.addEventListener("input", function () {
    if (!addrList) return;
    var q = addr.value.trim().toLowerCase();
    addrList.innerHTML = "";
    if (q.length < 2) return;
    var seen = {};
    var added = 0;
    var pools = [readingList, pageHistory];
    for (var p = 0; p < pools.length && added < 8; p++) {
      var pool = pools[p];
      for (var i = 0; i < pool.length && added < 8; i++) {
        var it = pool[i];
        if (!it || !it.url || seen[it.url]) continue;
        var hay = (it.url + " " + (it.title || "")).toLowerCase();
        if (hay.indexOf(q) < 0) continue;
        seen[it.url] = 1;
        var opt = document.createElement("option");
        opt.value = it.url;
        if (it.title) opt.label = it.title;
        addrList.appendChild(opt);
        added++;
      }
    }
  });
  if (markBtn) markBtn.addEventListener("click", toggleMark);
  window.addEventListener("beforeunload", saveSession);
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
    if (mod && (e.key === "f" || e.key === "F")) { e.preventDefault(); openFind(); return; }
    if (mod && (e.key === "d" || e.key === "D")) { e.preventDefault(); toggleMark(); return; }
    if (mod && (e.key === "=" || e.key === "+")) { e.preventDefault(); zoomBy(1); return; }
    if (mod && e.key === "-") { e.preventDefault(); zoomBy(-1); return; }
    if (mod && e.key === "0") { e.preventDefault(); zoomIdx = 2; zoomBy(0); return; }
    if (mod && e.key >= "1" && e.key <= "9") {
      e.preventDefault();
      var want = e.key === "9" ? tabs.length - 1 : Math.min(parseInt(e.key, 10) - 1, tabs.length - 1);
      if (want >= 0 && tabs[want] && tabs[want].id !== activeId) { activeId = tabs[want].id; renderTabs(); showActive(); }
      return;
    }
    if (e.key === "F5") { e.preventDefault(); var rt = activeTab(); if (rt && rt.url) go(rt.url, "reload"); return; }
    if (e.altKey && e.key === "ArrowLeft") { e.preventDefault(); back(); return; }
    if (e.altKey && e.key === "ArrowRight") { e.preventDefault(); forward(); return; }
    if (e.key === "Backspace" && !inField) { e.preventDefault(); back(); return; }
    if (e.key === "Escape" && inField) { addr.blur(); return; }
    if (e.key === "Escape" && !inField) {
      if (findbar && !findbar.hidden) { closeFind(); return; }
      if (stopLoading()) return;
    }
  });

  // Wire the precise image-size cap to the Rust HEAD prober: oversized images
  // are skipped on the next render, and sizes cache per url so a repeat visit
  // measures nothing. Degrades to allow-all outside the app.
  if (invoke && window.UCB && UCB.imageRules) {
    UCB.imageRules.measure = function (urls) {
      return invoke("image_sizes", { urls: urls }).catch(function () { return {}; });
    };
  }

  // Start where you left off; first run gets one Zen tab on the welcome screen.
  if (!restoreSession()) newTab();
  renderTabs();
  showActive();
})();
