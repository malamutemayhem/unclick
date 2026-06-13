/**
 * UnClick Local service worker (Phase 1).
 *
 * Enforcement lives here, not in the popup: an execute request without a
 * live mandate is refused even if a future UI (or a compromised popup)
 * asks nicely. Storage holds mandates and redacted receipts only.
 */

import { createMandate, revokeMandate, isMandateLive } from "./src/mandates.js";
import { buildReceipt, appendReceipt } from "./src/receipts.js";
import { getCapability, validateArchiveSaveInput } from "./src/capabilities.js";

async function getState() {
  const stored = await chrome.storage.local.get(["mandates", "receipts"]);
  return { mandates: stored.mandates || {}, receipts: stored.receipts || [] };
}

async function setState(state) {
  await chrome.storage.local.set(state);
}

async function handleMessage(message) {
  const state = await getState();
  const { type, capability_id: capabilityId } = message || {};

  if (type === "get_state") {
    return { ok: true, ...state };
  }

  if (type === "grant_mandate") {
    if (!getCapability(capabilityId)) return { ok: false, reason: "unknown capability" };
    state.mandates[capabilityId] = createMandate(capabilityId);
    await setState(state);
    return { ok: true, mandate: state.mandates[capabilityId] };
  }

  if (type === "revoke_mandate") {
    const mandate = state.mandates[capabilityId];
    if (!mandate) return { ok: false, reason: "no mandate to revoke" };
    state.mandates[capabilityId] = revokeMandate(mandate);
    await setState(state);
    return { ok: true, mandate: state.mandates[capabilityId] };
  }

  if (type === "execute") {
    const capability = getCapability(capabilityId);
    if (!capability) return { ok: false, reason: "unknown capability" };
    if (!isMandateLive(state.mandates[capabilityId])) {
      return { ok: false, reason: "no live mandate; grant one in the popup first" };
    }

    if (capabilityId === "local.visibility.archive-save") {
      const check = validateArchiveSaveInput(message.page_url);
      if (!check.ok) return { ok: false, reason: check.reason };

      await chrome.tabs.create({ url: check.save_url });
      const receipt = buildReceipt(capabilityId, capability.action, "tab_opened", {
        page_url: message.page_url,
      });
      state.receipts = appendReceipt(state.receipts, receipt);
      await setState(state);
      return { ok: true, receipt };
    }

    return { ok: false, reason: "capability has no executor" };
  }

  return { ok: false, reason: "unknown message type" };
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  handleMessage(message).then(sendResponse, (err) => sendResponse({ ok: false, reason: String(err) }));
  return true;
});
