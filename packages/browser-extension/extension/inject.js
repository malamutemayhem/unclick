// Runs in the page context. Observes fetch/XHR and posts the raw exchange to the
// content script. It does NOT strip here; stripping happens on device in the background
// worker (see background.js). Production will move stripping earlier so raw values never
// reach extension storage.

(function () {
  const post = (payload) =>
    window.postMessage({ source: "unclick-local", payload }, "*");

  const toAbsolute = (u) => {
    try {
      return new URL(u, location.href).href;
    } catch {
      return null;
    }
  };

  const origFetch = window.fetch;
  if (origFetch) {
    window.fetch = async function (input, init) {
      const res = await origFetch.apply(this, arguments);
      try {
        const rawUrl = typeof input === "string" ? input : input && input.url;
        const url = toAbsolute(rawUrl);
        if (!url) return res;
        const method =
          (init && init.method) ||
          (typeof input === "object" && input && input.method) ||
          "GET";
        let responseBody;
        const clone = res.clone();
        const ct = clone.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          responseBody = await clone.json().catch(() => undefined);
        }
        post({
          method,
          url,
          status: res.status,
          requestBody: init && init.body,
          responseHeaders: ct ? { "content-type": ct } : undefined,
          timestamp: Date.now(),
          responseBody,
        });
      } catch (_e) {
        // never break the page
      }
      return res;
    };
  }

  const OrigXHR = window.XMLHttpRequest;
  if (OrigXHR) {
    const open = OrigXHR.prototype.open;
    const send = OrigXHR.prototype.send;
    OrigXHR.prototype.open = function (method, url) {
      this.__unclick = { method, url: toAbsolute(url) };
      return open.apply(this, arguments);
    };
    OrigXHR.prototype.send = function (body) {
      this.addEventListener("load", () => {
        try {
          const meta = this.__unclick;
          if (!meta || !meta.url) return;
          const ct = this.getResponseHeader("content-type") || "";
          let responseBody;
          if (ct.includes("application/json")) {
            try {
              responseBody = JSON.parse(this.responseText);
            } catch {
              responseBody = undefined;
            }
          }
          post({
            method: meta.method,
            url: meta.url,
            status: this.status,
            requestBody: body,
            responseHeaders: ct ? { "content-type": ct } : undefined,
            timestamp: Date.now(),
            responseBody,
          });
        } catch (_e) {
          // never break the page
        }
      });
      return send.apply(this, arguments);
    };
  }
})();
