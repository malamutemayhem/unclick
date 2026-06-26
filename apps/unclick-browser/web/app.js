(function () {
  var tauri = window.__TAURI__;
  var invoke = tauri && tauri.core ? tauri.core.invoke : null;

  var addr = document.getElementById("addr");
  var goBtn = document.getElementById("go");
  var backBtn = document.getElementById("back");
  var fwdBtn = document.getElementById("fwd");
  var reader = document.getElementById("reader");
  var statusEl = document.getElementById("status");
  var themeBtn = document.getElementById("theme");
  var root = document.documentElement;

  var currentUrl = "";
  var hist = [];   // pages behind us
  var fwd = [];    // pages ahead of us (after a back)

  themeBtn.addEventListener("click", function () {
    var light = root.getAttribute("data-theme") === "light";
    root.setAttribute("data-theme", light ? "dark" : "light");
    themeBtn.textContent = light ? "Light" : "Dark";
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
        img.src = isrc;
        img.alt = node.getAttribute("alt") || "";
        img.loading = "lazy";
        img.decoding = "async";
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

  // Turn "image + headline" links into one tidy horizontal card, so a list of
  // stories reads as a clean column instead of a tall image-over-text stack.
  function cardify(scope) {
    var links = scope.querySelectorAll("a[data-href]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var img = a.querySelector("img");
      var txt = (a.textContent || "").trim();
      if (!img || txt.length < 12) continue;
      var kids = [], k;
      for (k = 0; k < a.childNodes.length; k++) kids.push(a.childNodes[k]);
      var body = document.createElement("div");
      body.className = "card-body";
      for (k = 0; k < kids.length; k++) {
        if (kids[k] === img) continue;
        if (kids[k].nodeType === 1 && kids[k].tagName === "IMG") continue; // keep one thumb
        body.appendChild(kids[k]);
      }
      if (!(body.textContent || "").trim()) continue;
      a.classList.add("card");
      a.innerHTML = "";
      img.className = "card-thumb";
      img.removeAttribute("style");
      a.appendChild(img);
      a.appendChild(body);
    }
  }

  // Same source banner on every page: site logo + name, left aligned.
  function masthead(doc, base) {
    var host = hostOf(base);
    var site = metaContent(doc, "og:site_name") || metaContent(doc, "application-name") || host;
    var iconHref = "";
    var ic = doc.querySelector('link[rel~="icon"]') || doc.querySelector('link[rel="shortcut icon"]') || doc.querySelector('link[rel="apple-touch-icon"]');
    if (ic && ic.getAttribute("href")) iconHref = resolve(ic.getAttribute("href"), base);
    if (!iconHref && host) iconHref = originOf(base) + "/favicon.ico";

    var bar = document.createElement("div");
    bar.className = "masthead";
    if (iconHref) {
      var fav = document.createElement("img");
      fav.className = "fav";
      fav.src = iconHref;
      fav.alt = "";
      fav.onerror = function () { this.style.display = "none"; };
      bar.appendChild(fav);
    }
    var name = document.createElement("span");
    name.className = "site";
    name.textContent = site || host || "Source";
    bar.appendChild(name);
    if (host && site && site !== host) {
      var grow = document.createElement("span"); grow.className = "grow"; bar.appendChild(grow);
      var h = document.createElement("span"); h.className = "host"; h.textContent = host; bar.appendChild(h);
    }
    return bar;
  }

  // Same footer on every page: a clear way back to the live source.
  function footer(base) {
    var host = hostOf(base) || base;
    var f = document.createElement("div");
    f.className = "pagefoot";
    var src = document.createElement("a");
    src.setAttribute("data-href", base);
    src.textContent = host;
    var live = document.createElement("a");
    live.className = "live";
    live.textContent = "Open the live page";
    live.style.cursor = "pointer";
    live.addEventListener("click", function (e) { e.preventDefault(); window.location.href = base; });
    f.appendChild(document.createTextNode("Source: "));
    f.appendChild(src);
    f.appendChild(document.createTextNode("  ·  "));
    f.appendChild(live);
    return f;
  }

  function setStatus(html) { statusEl.innerHTML = html || ""; }

  // Script-built page: show a loud amber banner with one clear button.
  function showLiveOption(url) {
    setMode("live");
    reader.innerHTML = "";
    var b = document.createElement("div");
    b.className = "livebanner";
    var ic = document.createElement("div"); ic.className = "lb-icon"; ic.textContent = "⚡";
    var tx = document.createElement("div"); tx.className = "lb-text";
    var st = document.createElement("strong"); st.textContent = "This page builds itself with scripts.";
    var sp = document.createElement("span"); sp.textContent = "The calm reader sees very little here. Open the full live page instead.";
    tx.appendChild(st); tx.appendChild(sp);
    var btn = document.createElement("button"); btn.className = "lb-btn"; btn.textContent = "Show the live page";
    btn.addEventListener("click", function () { window.location.href = url; });
    b.appendChild(ic); b.appendChild(tx); b.appendChild(btn);
    reader.appendChild(b);
    setStatus("");
    var m = document.querySelector("main"); if (m) m.scrollTop = 0;
  }

  function render(url) {
    invoke("fetch_url", { url: url }).then(function (page) {
      var base = (page && page.final_url) || url;
      var html = (page && page.html) || "";
      var doc = new DOMParser().parseFromString(html, "text/html");
      var title = metaContent(doc, "og:title");
      if (!title && doc.querySelector("title")) title = doc.querySelector("title").textContent;
      if (!title && doc.querySelector("h1")) title = doc.querySelector("h1").textContent;

      var article = document.createElement("article");
      article.className = "doc";
      if (title && title.trim()) { var h0 = document.createElement("h1"); h0.textContent = title.trim(); article.appendChild(h0); }

      stripJunk(doc);
      var rootNode = pickRoot(doc);
      imgCount = 0;
      if (rootNode) clean(rootNode, base, article);
      tidy(article);

      // If the cleaned page is thin, try JSON-LD article body before giving up.
      if (textLen(article) < 600) {
        var ld = jsonLdArticle(doc);
        if (ld) {
          article = document.createElement("article");
          article.className = "doc";
          var ht = document.createElement("h1"); ht.textContent = (ld.headline || title || "").trim(); article.appendChild(ht);
          var paras = ld.body.split(/\n{2,}|\r\n\r\n/);
          for (var p = 0; p < paras.length; p++) { var pp = paras[p].trim(); if (pp) { var pe = document.createElement("p"); pe.textContent = pp; article.appendChild(pe); } }
        }
      }

      if (textLen(article) < 200 && !article.querySelector("img")) { showLiveOption(url); return; }

      cardify(article);

      // Re-parse a fresh doc for masthead meta (stripJunk mutated the first one).
      var metaDoc = new DOMParser().parseFromString(html, "text/html");
      reader.innerHTML = "";
      reader.appendChild(masthead(metaDoc, base));
      reader.appendChild(article);
      reader.appendChild(footer(base));

      setMode("native");
      setStatus("");
      currentUrl = url;
      var links = reader.querySelectorAll("a[data-href]");
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (e) { e.preventDefault(); go(this.getAttribute("data-href")); });
      }
      var m = document.querySelector("main"); if (m) m.scrollTop = 0;
    }).catch(function (err) {
      setStatus("Could not load that page. " + (err && err.toString ? err.toString() : ""));
    });
  }

  function updateNav() {
    if (backBtn) backBtn.disabled = hist.length === 0;
    if (fwdBtn) fwdBtn.disabled = fwd.length === 0;
  }

  // mode: undefined/"new" = fresh nav, "back", "fwd", "reload".
  function go(rawUrl, mode) {
    if (!invoke) { setStatus("This page only works inside the UnClick Browser app."); return; }
    var url = normalizeUrl(rawUrl);
    if (!url) return;
    if (!mode || mode === "new") {
      if (currentUrl && currentUrl !== url) hist.push(currentUrl);
      fwd = [];
    } else if (mode === "back") {
      if (currentUrl) fwd.push(currentUrl);
    } else if (mode === "fwd") {
      if (currentUrl) hist.push(currentUrl);
    }
    updateNav();
    addr.value = url;
    setStatus("Loading " + url + " ...");
    render(url);
  }

  function back() { if (hist.length) { go(hist.pop(), "back"); } }
  function forward() { if (fwd.length) { go(fwd.pop(), "fwd"); } }

  goBtn.addEventListener("click", function () { go(addr.value); });
  addr.addEventListener("keydown", function (e) { if (e.key === "Enter") go(addr.value); });
  if (backBtn) backBtn.addEventListener("click", back);
  if (fwdBtn) fwdBtn.addEventListener("click", forward);

  // Mouse side buttons: 3 = back, 4 = forward (the usual thumb buttons).
  window.addEventListener("mouseup", function (e) {
    if (e.button === 3) { e.preventDefault(); back(); }
    else if (e.button === 4) { e.preventDefault(); forward(); }
  });
  window.addEventListener("auxclick", function (e) {
    if (e.button === 3 || e.button === 4) e.preventDefault();
  });

  window.addEventListener("keydown", function (e) {
    var inField = document.activeElement === addr;
    if ((e.ctrlKey || e.metaKey) && (e.key === "l" || e.key === "k")) { e.preventDefault(); addr.focus(); addr.select(); return; }
    if ((e.ctrlKey || e.metaKey) && e.key === "r") { e.preventDefault(); if (currentUrl) go(currentUrl, "reload"); return; }
    if (e.key === "F5") { e.preventDefault(); if (currentUrl) go(currentUrl, "reload"); return; }
    if (e.altKey && e.key === "ArrowLeft") { e.preventDefault(); back(); return; }
    if (e.altKey && e.key === "ArrowRight") { e.preventDefault(); forward(); return; }
    if (e.key === "Backspace" && !inField) { e.preventDefault(); back(); return; }
    if (e.key === "Escape" && inField) { addr.blur(); }
  });

  updateNav();
})();
