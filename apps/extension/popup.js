import { CAPABILITIES } from "./src/capabilities.js";
import { mandateState } from "./src/mandates.js";

function send(message) {
  return chrome.runtime.sendMessage(message);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

async function render() {
  const state = await send({ type: "get_state" });
  const capRoot = document.getElementById("capabilities");
  capRoot.replaceChildren();

  for (const cap of CAPABILITIES) {
    const mandate = state.mandates?.[cap.capability_id];
    const status = mandateState(mandate);

    const card = el("div", "cap");
    card.append(el("h2", null, cap.label));
    card.append(el("p", null, cap.explain));
    card.append(el("span", `state ${status}`, `Mandate: ${status}`));

    const msg = el("div", "msg");

    if (status === "active") {
      const input = el("input");
      input.placeholder = "https://unclick.world/...";
      card.append(input);

      const run = el("button", "run", "Request archive save");
      run.addEventListener("click", async () => {
        const res = await send({ type: "execute", capability_id: cap.capability_id, page_url: input.value.trim() });
        msg.className = res.ok ? "msg ok" : "msg err";
        msg.textContent = res.ok ? "Save tab opened; receipt logged." : res.reason;
        if (res.ok) render();
      });
      card.append(run);

      const revoke = el("button", "revoke", "Revoke mandate");
      revoke.addEventListener("click", async () => {
        await send({ type: "revoke_mandate", capability_id: cap.capability_id });
        render();
      });
      card.append(revoke);
    } else {
      const grant = el("button", "grant", "Grant 60 min mandate");
      grant.addEventListener("click", async () => {
        await send({ type: "grant_mandate", capability_id: cap.capability_id });
        render();
      });
      card.append(grant);
    }

    card.append(msg);
    capRoot.append(card);
  }

  const receiptRoot = document.getElementById("receipts");
  receiptRoot.replaceChildren();
  const receipts = (state.receipts || []).slice(0, 10);
  if (!receipts.length) {
    receiptRoot.append(el("div", "receipt", "No actions yet."));
  }
  for (const r of receipts) {
    receiptRoot.append(el("div", "receipt", `${r.at} ${r.capability_id} ${r.outcome} ${r.details?.page_url || ""}`));
  }
}

render();
