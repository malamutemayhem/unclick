// Background service worker (module). Strips captured exchanges to shapes on device,
// applies the per-site privacy tier, stores shapes locally, and performs explicit
// user-initiated calls to UnClick (save-to-memory, status). Nothing is uploaded
// automatically; shapes never leave the device in this slice.

import { DEFAULT_TIER, extractShape, shouldCapture } from "./core.js";
import {
  badgeText,
  buildMcpRequest,
  buildSaveFactRpc,
  buildToolRpc,
  DEFAULT_MCP_ENDPOINT,
  extractArray,
  parseMcpResult,
  summarizeConnections,
  summarizeSignals,
} from "./api.js";

const SHAPES_KEY = "unclick_shapes"; // { [host]: { [endpointKey]: shape } }
const TIERS_KEY = "unclick_tiers"; // { [host]: "off" | "me_only" | "public" }
const API_KEY = "unclick_api_key";
const ENDPOINT_KEY = "unclick_endpoint";
const MAX_ENDPOINTS_PER_HOST = 200;

async function getStore(key, fallback) {
  const out = await chrome.storage.local.get(key);
  return out[key] ?? fallback;
}

async function getConfig() {
  const out = await chrome.storage.local.get([API_KEY, ENDPOINT_KEY]);
  return { apiKey: out[API_KEY] || "", endpoint: out[ENDPOINT_KEY] || DEFAULT_MCP_ENDPOINT };
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

// --- explicit, user-initiated calls to UnClick ----------------------------

async function callTool(name, args) {
  const cfg = await getConfig();
  if (!cfg.apiKey) return { ok: false, error: "no_api_key" };
  const req = buildMcpRequest(cfg.endpoint, cfg.apiKey, buildToolRpc(name, args));
  try {
    const res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data: parseMcpResult(json) };
  } catch (_e) {
    return { ok: false, error: "network" };
  }
}

async function saveFact({ text, sourceUrl, category }) {
  const cfg = await getConfig();
  if (!cfg.apiKey) return { ok: false, error: "no_api_key" };
  const req = buildMcpRequest(cfg.endpoint, cfg.apiKey, buildSaveFactRpc({ fact: text, sourceUrl, category }));
  try {
    const res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body });
    return { ok: res.ok, status: res.status };
  } catch (_e) {
    return { ok: false, error: "network" };
  }
}

async function getStatus() {
  const cfg = await getConfig();
  if (!cfg.apiKey) return { configured: false };
  const [signalsRes, connRes] = await Promise.all([
    callTool("check_signals", {}),
    callTool("keychain_status", {}),
  ]);
  const signals = summarizeSignals(signalsRes.ok ? signalsRes.data ?? {} : {});
  const connections = summarizeConnections(connRes.ok ? extractArray(connRes.data) : []);
  try {
    await chrome.action.setBadgeText({ text: badgeText(connections, signals) });
  } catch (_e) {
    // badge is best-effort
  }
  return { configured: true, signals, connections };
}

async function flashBadge(result) {
  const text = result && result.ok ? "ok" : "x";
  try {
    await chrome.action.setBadgeText({ text });
    setTimeout(() => chrome.action.setBadgeText({ text: "" }), 2500);
  } catch (_e) {
    // best-effort
  }
}

// --- context menus (explicit save) ----------------------------------------

chrome.runtime.onInstalled.addListener(() => {
  try {
    chrome.contextMenus.create({
      id: "unclick-save-selection",
      title: "Save selection to UnClick Memory",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      id: "unclick-save-page",
      title: "Save this page to UnClick Memory",
      contexts: ["page"],
    });
  } catch (_e) {
    // menus already exist
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "unclick-save-selection" && info.selectionText) {
    saveFact({ text: info.selectionText, sourceUrl: info.pageUrl, category: "general" }).then(flashBadge);
  } else if (info.menuItemId === "unclick-save-page") {
    const title = (tab && tab.title) || info.pageUrl || "";
    saveFact({ text: title, sourceUrl: info.pageUrl, category: "general" }).then(flashBadge);
  }
});

// --- message router -------------------------------------------------------

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
    return true;
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

  if (msg.type === "saveFact") {
    saveFact(msg.payload || {}).then(sendResponse);
    return true;
  }

  if (msg.type === "getStatus") {
    getStatus().then(sendResponse);
    return true;
  }
});
