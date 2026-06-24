// The glass box: shows exactly what was captured, with per-site tier control and delete.

const listEl = document.getElementById("list");
const TIERS = [
  ["off", "Off"],
  ["me_only", "Me only"],
  ["public", "Public"],
];

function send(message) {
  return new Promise((resolve) => chrome.runtime.sendMessage(message, resolve));
}

function render(state) {
  const hosts = Object.keys(state.shapes || {}).sort();
  if (!hosts.length) {
    listEl.innerHTML = '<p class="empty">No sites learned yet. Browse a site to start.</p>';
    return;
  }
  listEl.innerHTML = "";
  for (const host of hosts) {
    const endpoints = Object.keys(state.shapes[host] || {});
    const tier = (state.tiers && state.tiers[host]) || state.defaultTier;

    const box = document.createElement("div");
    box.className = "host";

    const head = document.createElement("div");
    head.className = "host-head";
    head.innerHTML =
      `<span class="host-name">${host}</span>` +
      `<span class="count">${endpoints.length} endpoint(s)</span>`;
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
    select.addEventListener("change", async () => {
      await send({ type: "setTier", host, tier: select.value });
    });

    const del = document.createElement("button");
    del.className = "danger";
    del.textContent = "Delete";
    del.addEventListener("click", async () => {
      await send({ type: "deleteHost", host });
      load();
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

async function load() {
  const state = await send({ type: "getState" });
  render(state || { shapes: {}, tiers: {}, defaultTier: "me_only" });
}

document.getElementById("clear").addEventListener("click", async () => {
  await send({ type: "clearAll" });
  load();
});

load();
