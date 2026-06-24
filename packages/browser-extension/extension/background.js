// Background service worker (module). Strips captured exchanges to shapes on device,
// applies the per-site privacy tier, and stores shapes locally. Nothing is uploaded.

import { DEFAULT_TIER, extractShape, shouldCapture } from "./core.js";

const SHAPES_KEY = "unclick_shapes"; // { [host]: { [endpointKey]: shape } }
const TIERS_KEY = "unclick_tiers"; // { [host]: "off" | "me_only" | "public" }
const MAX_ENDPOINTS_PER_HOST = 200;

async function getStore(key, fallback) {
  const out = await chrome.storage.local.get(key);
  return out[key] ?? fallback;
}

async function tierForHost(host) {
  const tiers = await getStore(TIERS_KEY, {});
  return tiers[host] ?? DEFAULT_TIER;
}

function endpointKey(shape) {
  return `${shape.method} ${shape.pathTemplate}`;
}

async function handleCapture(exchange) {
  let shape;
  try {
    shape = extractShape(exchange);
  } catch (_e) {
    return; // unparsable URL, skip
  }
  const tier = await tierForHost(shape.host);
  if (!shouldCapture(tier)) return;

  const all = await getStore(SHAPES_KEY, {});
  const forHost = all[shape.host] ?? {};
  const key = endpointKey(shape);
  if (!(key in forHost) && Object.keys(forHost).length >= MAX_ENDPOINTS_PER_HOST) {
    return; // bound storage per host
  }
  forHost[key] = shape;
  all[shape.host] = forHost;
  await chrome.storage.local.set({ [SHAPES_KEY]: all });
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (!msg || !msg.type) return;

  if (msg.type === "capture") {
    handleCapture(msg.exchange);
    return; // fire and forget
  }

  if (msg.type === "getState") {
    Promise.all([getStore(SHAPES_KEY, {}), getStore(TIERS_KEY, {})]).then(
      ([shapes, tiers]) => sendResponse({ shapes, tiers, defaultTier: DEFAULT_TIER }),
    );
    return true; // async response
  }

  if (msg.type === "setTier") {
    getStore(TIERS_KEY, {}).then((tiers) => {
      tiers[msg.host] = msg.tier;
      chrome.storage.local.set({ [TIERS_KEY]: tiers }).then(() => sendResponse({ ok: true }));
    });
    return true;
  }

  if (msg.type === "deleteHost") {
    getStore(SHAPES_KEY, {}).then((all) => {
      delete all[msg.host];
      chrome.storage.local.set({ [SHAPES_KEY]: all }).then(() => sendResponse({ ok: true }));
    });
    return true;
  }

  if (msg.type === "clearAll") {
    chrome.storage.local.set({ [SHAPES_KEY]: {} }).then(() => sendResponse({ ok: true }));
    return true;
  }
});
