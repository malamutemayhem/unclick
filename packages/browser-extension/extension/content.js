// Isolated-world content script. Injects the page hook and forwards raw exchanges to
// the background worker, where they are stripped to shapes on device.

(function () {
  const el = document.createElement("script");
  el.src = chrome.runtime.getURL("inject.js");
  el.onload = () => el.remove();
  (document.head || document.documentElement).appendChild(el);

  window.addEventListener("message", (event) => {
    if (event.source !== window) return;
    const data = event.data;
    if (!data || data.source !== "unclick-local" || !data.payload) return;
    try {
      chrome.runtime.sendMessage({ type: "capture", exchange: data.payload });
    } catch (_e) {
      // background may be asleep; ignore
    }
  });
})();
