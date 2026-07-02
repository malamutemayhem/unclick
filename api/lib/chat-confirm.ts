// ── Confirm-before-execute gate for chat tool-calling ─────────────────────
//
// High-risk connector actions (send, delete, deploy, pay, merge) need a human
// nod before they fire. This module produces and validates short-lived HMAC
// tokens that encode the action. The token is shown to the user via the model's
// natural conversation ("I'd like to send this email - shall I proceed?") and
// returned through a confirm_action tool call.
//
// Tokens are stateless (no database, no server-side store). They are valid for
// a rolling two-minute window so the user has time to read the details and
// respond. The HMAC prevents the model from fabricating a token.

import { createHmac } from "node:crypto";

const TOKEN_WINDOW_SECONDS = 120;

function timeSlot(): number {
  return Math.floor(Date.now() / (TOKEN_WINDOW_SECONDS * 1000));
}

function hmac(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

function canonicalPayload(
  endpointId: string,
  params: Record<string, unknown>,
  slot: number,
): string {
  const sortedParams = JSON.stringify(params, Object.keys(params).sort());
  return `${endpointId}\n${sortedParams}\n${slot}`;
}

export function createConfirmToken(
  secret: string,
  endpointId: string,
  params: Record<string, unknown>,
): string {
  const slot = timeSlot();
  const payload = canonicalPayload(endpointId, params, slot);
  return `${slot}.${hmac(secret, payload)}`;
}

export function validateConfirmToken(
  secret: string,
  token: string,
  endpointId: string,
  params: Record<string, unknown>,
): boolean {
  const dot = token.indexOf(".");
  if (dot < 0) return false;

  const slotStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const slot = Number(slotStr);
  if (!Number.isFinite(slot)) return false;

  const now = timeSlot();
  if (Math.abs(now - slot) > 1) return false;

  const expected = hmac(secret, canonicalPayload(endpointId, params, slot));
  if (sig.length !== expected.length) return false;

  let match = 0;
  for (let i = 0; i < sig.length; i++) {
    match |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return match === 0;
}
