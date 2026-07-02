// The glass box plus day-one features: status, save-to-memory, coverage, redaction preview.

import { coverageForHost, coverageLabel, describeRedaction } from "./api.js";

const listEl = document.getElementById("list");
const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const TIERS = [
  ["off", "Off"],
  ["me_only", "Me only"],
  ["public", "Public"],
];

function send(message) {
  return new Promise((resolve) => chrome.runtime.sendMessage(message, resolve));
}

// --- status ---------------------------------------------------------------

async function loadStatus() {
  const s = await send({ type: "getStatus" });
  if (!s || !s.configured) {
    statusDot.className = "dot";
    statusText.innerHTML = 'Not connected. <a href="#" id="openSettings">Add your API key</a> to enable Memory and status.';
    const link = document.getElementById("openSettings");
    if (link) link.addEventListener("click", openSettings);
    return;
  }
  const warn = s.connections.needsAttention > 0;
  statusDot.className = warn ? "dot warn" : "dot ok";
  statusText.textContent =
    `${s.connections.connected} connected` +
    (warn ? `, ${s.connections.needsAttention} need attention` : "") +
    ` · ${s.signals.count} signal(s)`;
}

// --- host list + coverage -------------------------------------------------

function render(state) {
  const hosts = Object.keys(state.shapes || {}).sort();
  if (!hosts.length) {
    listEl.innerHTML = '<p class="empty">No sites learned yet. Browse a site to start.</p>';
    return;
  }
  listEl.innerHTML = "";
  for (const host of hosts) {
    const shapeMap = state.shapes[host] || {};
    const shapes = Object.values(shapeMap);
    const endpoints = Object.keys(shapeMap);
    const tier = (state.tiers && state.tiers[host]) || state.defaultTier;

    const box = document.createElement("div");
    box.className = "host";

    const head = document.createElement("div");
    head.className = "host-head";
    const name = document.createElement("span");
    name.className = "host-name";
    name.textContent = host;
    const cover = document.createElement("span");
    cover.className = "cover";
    cover.textContent = coverageLabel(coverageForHost(shapes));
    head.appendChild(name);
    head.appendChild(cover);
    box.appendChild(head);

    const controls = document.createElement("div");
    controls.className = "row";
    const select = document.createElement("select");
    for (const [value, label] of TIERS) {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = label;
      if (value === tier) opt.selected = true;
      select.appendChild(opt);
    }
    select.addEventListener("change", () => send({ type: "setTier", host, tier: select.value }));
    const del = document.createElement("button");
    del.className = "danger";
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      await send({ type: "deleteHost", host });
      loadState();
    });
    controls.appendChild(select);
    controls.appendChild(del);
    box.appendChild(controls);

    const ul = document.createElement("ul");
    ul.className = "endpoints";
    for (const key of endpoints.sort()) {
      const li = document.createElement("li");
      li.textContent = key;
      ul.appendChild(li);
    }
    box.appendChild(ul);
    listEl.appendChild(box);
  }
}

async function loadState() {
  const state = await send({ type: "getState" });
  render(state || { shapes: {}, tiers: {}, defaultTier: "me_only" });
}

// --- save this page to memory --------------------------------------------

async function activeTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs && tabs[0];
}

document.getElementById("savePage").addEventListener("click", async () => {
  const tab = await activeTab();
  if (!tab) return;
  const btn = document.getElementById("savePage");
  btn.textContent = "Saving...";
  const res = await send({
    type: "saveFact",
    payload: { text: tab.title || tab.url, sourceUrl: tab.url, category: "general" },
  });
  btn.textContent = res && res.ok ? "Saved to Memory" : res && res.error === "no_api_key" ? "Add API key in Settings" : "Save failed";
  setTimeout(() => (btn.textContent = "Save this page to Memory"), 2000);
});

// --- redaction preview ----------------------------------------------------

document.getElementById("previewRun").addEventListener("click", () => {
  const input = document.getElementById("previewInput").value.trim();
  const out = document.getElementById("previewOut");
  out.hidden = false;
  if (!input) {
    out.textContent = "Paste a URL first.";
    return;
  }
  try {
    const report = describeRedaction({ method: "GET", url: input });
    out.textContent = JSON.stringify(report, null, 2);
  } catch (_e) {
    out.textContent = "That does not look like a valid URL.";
  }
});

// --- settings + clear -----------------------------------------------------

function openSettings(e) {
  if (e) e.preventDefault();
  if (chrome.runtime.openOptionsPage) chrome.runtime.openOptionsPage();
}
document.getElementById("settings").addEventListener("click", () => openSettings());
document.getElementById("clear").addEventListener("click", async () => {
  await send({ type: "clearAll" });
  loadState();
});

loadStatus();
loadState();
