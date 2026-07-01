// Stores the UnClick API key and endpoint locally. The key never leaves the device
// except in the Authorization header of requests to the configured UnClick endpoint.

const KEY = "unclick_api_key";
const ENDPOINT = "unclick_endpoint";
const DEFAULT_ENDPOINT = "https://unclick.world/api/mcp";

const keyEl = document.getElementById("key");
const endpointEl = document.getElementById("endpoint");
const statusEl = document.getElementById("status");

chrome.storage.local.get([KEY, ENDPOINT]).then((cfg) => {
  keyEl.value = cfg[KEY] || "";
  endpointEl.value = cfg[ENDPOINT] || DEFAULT_ENDPOINT;
});

document.getElementById("save").addEventListener("click", async () => {
  await chrome.storage.local.set({
    [KEY]: keyEl.value.trim(),
    [ENDPOINT]: endpointEl.value.trim() || DEFAULT_ENDPOINT,
  });
  statusEl.textContent = "Saved";
  setTimeout(() => (statusEl.textContent = ""), 1500);
});
