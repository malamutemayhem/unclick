(function () {
  var tauri = window.__TAURI__;
  var invoke = tauri && tauri.core ? tauri.core.invoke : null;

  var addr = document.getElementById("addr");
  var goBtn = document.getElementById("go");
  var reader = document.getElementById("reader");
  var statusEl = document.getElementById("status");
  var themeBtn = document.getElementById("theme");
  var root = document.documentElement;

  themeBtn.addEventListener("click", function () {
    var light = root.getAttribute("data-theme") === "light";
    root.setAttribute("data-theme", light ? "dark" : "light");
    themeBtn.textContent = light ? "Light" : "Dark";
  });

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

  var DROP = { SCRIPT:1, STYLE:1, NOSCRIPT:1, NAV:1, HEADER:1, FOOTER:1, ASIDE:1, FORM:1, IFRAME:1, SVG:1, BUTTON:1, INPUT:1, SELECT:1, TEXTAREA:1, LINK:1, META:1 };
  var KEEP = { P:1, H1:1, H2:1, H3:1, H4:1, UL:1, OL:1, LI:1, BLOCKQUOTE:1, PRE:1, CODE:1, FIGURE:1, FIGCAPTION:1, IMG:1, TABLE:1, THEAD:1, TBODY:1, TR:1, TH:1, TD:1, STRONG:1, EM:1, B:1, I:1, BR:1, HR:1 };

  function textLen(el) { return (el.textContent || "").trim().length; }

  function pickMain(doc) {
    var named = doc.querySelectorAll("article, main, [role=main]");
    if (named.length) {
      var best = named[0];
      for (var i = 1; i < named.length; i++) if (textLen(named[i]) > textLen(best)) best = named[i];
      return best;
    }
    var blocks = doc.querySelectorAll("div, section");
    var pick = doc.body, score = 0;
    for (var j = 0; j < blocks.length; j++) {
      var ps = blocks[j].querySelectorAll(":scope > p");
      var s = 0;
      for (var k = 0; k < ps.length; k++) s += (ps[k].textContent || "").length;
      if (s > score) { score = s; pick = blocks[j]; }
    }
    return pick || doc.body;
  }

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
      if (DROP[tag]) continue;
      if (tag === "A") {
        var a = document.createElement("a");
        var href = resolve(node.getAttribute("href"), base);
        if (href) a.setAttribute("data-href", href);
        clean(node, base, a);
        if (a.textContent.trim()) out.appendChild(a);
        continue;
      }
      if (tag === "IMG") {
        var isrc = resolve(node.getAttribute("src") || node.getAttribute("data-src") || node.getAttribute("data-lazy-src"), base);
        if (!isrc) continue;
        var img = document.createElement("img");
        img.src = isrc;
        img.alt = node.getAttribute("alt") || "";
        out.appendChild(img);
        continue;
      }
      if (KEEP[tag]) {
        var el = document.createElement(tag.toLowerCase());
        clean(node, base, el);
        var empty = !el.textContent.trim() && !el.querySelector("img");
        if (empty && tag !== "HR" && tag !== "BR") continue;
        out.appendChild(el);
        continue;
      }
      clean(node, base, out);
    }
  }

  function setStatus(msg) { statusEl.textContent = msg || ""; }

  function read(rawUrl) {
    if (!invoke) { setStatus("This page only works inside the UnClick Browser app."); return; }
    var url = normalizeUrl(rawUrl);
    if (!url) return;
    addr.value = url;
    setStatus("Loading " + url + " ...");
    invoke("fetch_url", { url: url }).then(function (page) {
      var base = (page && page.final_url) || url;
      var html = (page && page.html) || "";
      var doc = new DOMParser().parseFromString(html, "text/html");
      var title = "";
      var og = doc.querySelector("meta[property='og:title']");
      if (og && og.getAttribute("content")) title = og.getAttribute("content");
      if (!title && doc.querySelector("title")) title = doc.querySelector("title").textContent;
      if (!title && doc.querySelector("h1")) title = doc.querySelector("h1").textContent;
      var main = pickMain(doc);
      var article = document.createElement("article");
      article.className = "doc";
      if (title && title.trim()) {
        var h = document.createElement("h1");
        h.textContent = title.trim();
        article.appendChild(h);
      }
      clean(main, base, article);
      if (!article.textContent.trim()) {
        setStatus("Nothing readable found on that page. Some sites build their content with scripts, which the reader cannot see yet.");
        return;
      }
      reader.innerHTML = "";
      reader.appendChild(article);
      setStatus("");
      var links = reader.querySelectorAll("a[data-href]");
      for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (e) {
          e.preventDefault();
          read(this.getAttribute("data-href"));
        });
      }
      var m = document.querySelector("main");
      if (m) m.scrollTop = 0;
    }).catch(function (err) {
      setStatus("Could not load that page. " + (err && err.toString ? err.toString() : ""));
    });
  }

  goBtn.addEventListener("click", function () { read(addr.value); });
  addr.addEventListener("keydown", function (e) { if (e.key === "Enter") read(addr.value); });
})();
