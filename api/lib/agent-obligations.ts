export type AgentObligationReceiptType = "ACK" | "PASS" | "HOLD" | "BLOCKER" | "proof";
export type AgentObligationStatus = "open" | "accepted" | "stale";

export interface AgentObligationSource {
  kind: "pull_request" | "todo" | "wake" | "other";
  id: string;
  pr_number?: number;
  url?: string;
  wake_id?: string;
}

export interface AgentObligation {
  id: string;
  kind: "pr_review_ack" | "proof_request" | "owner_decision" | "other";
  source: AgentObligationSource;
  owner_agent_id?: string;
  owner_lane?: string;
  next_action: string;
  accepted_receipt_types: AgentObligationReceiptType[];
  ttl_seconds: number;
  created_at: string;
  fallback_owner: string;
  proof_required: boolean;
  proof_requirement: string;
  status: AgentObligationStatus;
  visible_debt_reason?: string;
}

export interface BuildPrReviewObligationInput {
  id: string;
  prNumber: number;
  prUrl: string;
  wakeId: string;
  ownerAgentId?: string;
  ownerLane?: string;
  nextAction: string;
  createdAt: string;
  ttlSeconds: number;
  fallbackOwner: string;
  proofRequirement?: string;
  acceptedReceiptTypes?: AgentObligationReceiptType[];
}

export interface AgentObligationReceipt {
  text: string;
  author_agent_id?: string;
  created_at?: string;
  url?: string;
}

export interface AgentObligationValidation {
  accepted: boolean;
  status: AgentObligationStatus;
  reason: string;
  receipt_type?: AgentObligationReceiptType;
  proof_links: string[];
  fallback_owner?: string;
  visible_debt_reason?: string;
}

const DEFAULT_RECEIPT_TYPES: AgentObligationReceiptType[] = ["ACK", "PASS", "HOLD", "BLOCKER", "proof"];

export function buildPrReviewObligation(input: BuildPrReviewObligationInput): AgentObligation {
  if (!input.id.trim()) throw new Error("obligation id required");
  if (!Number.isFinite(input.prNumber) || input.prNumber <= 0) throw new Error("prNumber required");
  if (!input.prUrl.trim()) throw new Error("prUrl required");
  if (!input.wakeId.trim()) throw new Error("wakeId required");
  if (!input.nextAction.trim()) throw new Error("nextAction required");
  if (!input.fallbackOwner.trim()) throw new Error("fallbackOwner required");

  return {
    id: input.id,
    kind: "pr_review_ack",
    source: {
      kind: "pull_request",
      id: `pr-${Math.floor(input.prNumber)}`,
      pr_number: Math.floor(input.prNumber),
      url: input.prUrl,
      wake_id: input.wakeId,
    },
    ...(input.ownerAgentId ? { owner_agent_id: input.ownerAgentId } : {}),
    ...(input.ownerLane ? { owner_lane: input.ownerLane } : {}),
    next_action: input.nextAction,
    accepted_receipt_types: input.acceptedReceiptTypes ?? DEFAULT_RECEIPT_TYPES,
    ttl_seconds: clampTtlSeconds(input.ttlSeconds),
    created_at: input.createdAt,
    fallback_owner: input.fallbackOwner,
    proof_required: true,
    proof_requirement: input.proofRequirement ?? "Link a matching PR, wake, Boardroom, or review proof receipt.",
    status: "open",
  };
}

export function validateAgentObligationReceipt(
  obligation: AgentObligation,
  receipt: AgentObligationReceipt,
  now = new Date(),
): AgentObligationValidation {
  const stale = evaluateAgentObligationState(obligation, now);
  const text = compactText(receipt.text, 5000);
  const proofLinks = extractProofLinks([text, receipt.url].filter(Boolean).join(" "));
  const receiptType = classifyReceiptType(text);

  if (!receiptType) {
    return rejectForState(stale, "unrecognized_receipt", proofLinks);
  }

  if (!obligation.accepted_receipt_types.includes(receiptType)) {
    return rejectForState(stale, "receipt_type_not_allowed", proofLinks, receiptType);
  }

  if (!receiptMatchesObligation(obligation, receipt)) {
    return rejectForState(stale, "receipt_does_not_match_obligation", proofLinks, receiptType);
  }

  if (looksLikeFakeDone(text)) {
    return rejectForState(stale, "fake_done_receipt_rejected", proofLinks, receiptType);
  }

  if (obligation.proof_required && !hasRequiredProof(obligation, text, proofLinks)) {
    return rejectForState(stale, "proof_required", proofLinks, receiptType);
  }

  return {
    accepted: true,
    status: "accepted",
    reason: "receipt_matches_obligation",
    receipt_type: receiptType,
    proof_links: proofLinks,
  };
}

export function evaluateAgentObligationState(
  obligation: AgentObligation,
  now = new Date(),
): AgentObligationValidation {
  if (obligation.status === "accepted") {
    return {
      accepted: true,
      status: "accepted",
      reason: "already_accepted",
      proof_links: [],
    };
  }

  if (isTtlExpired(obligation, now)) {
    return {
      accepted: false,
      status: "stale",
      reason: "ttl_expired",
      proof_links: [],
      fallback_owner: obligation.fallback_owner,
      visible_debt_reason:
        obligation.visible_debt_reason ||
        `No accepted receipt for ${obligation.source.id} before TTL; route to ${obligation.fallback_owner}.`,
    };
  }

  return {
    accepted: false,
    status: "open",
    reason: "awaiting_receipt",
    proof_links: [],
  };
}

export function classifyReceiptType(text: string): AgentObligationReceiptType | null {
  const value = String(text ?? "").trim();
  if (/^BLOCKER\s*:/i.test(value) || /\bBLOCKER\b/i.test(value)) return "BLOCKER";
  if (/^HOLD\s*:/i.test(value) || /\bHOLD\b/i.test(value)) return "HOLD";
  if (/^PASS\s*:/i.test(value) || /\bPASS\b/i.test(value)) return "PASS";
  if (/^ACK(?:\/CLAIM)?\b/i.test(value) || /\bACK\b/i.test(value)) return "ACK";
  if (/\bproof\s*:/i.test(value) || extractProofLinks(value).length > 0) return "proof";
  return null;
}

function rejectForState(
  state: AgentObligationValidation,
  reason: string,
  proofLinks: string[],
  receiptType?: AgentObligationReceiptType,
): AgentObligationValidation {
  return {
    accepted: false,
    status: state.status,
    reason,
    ...(receiptType ? { receipt_type: receiptType } : {}),
    proof_links: proofLinks,
    ...(state.fallback_owner ? { fallback_owner: state.fallback_owner } : {}),
    ...(state.visible_debt_reason ? { visible_debt_reason: state.visible_debt_reason } : {}),
  };
}

function receiptMatchesObligation(obligation: AgentObligation, receipt: AgentObligationReceipt): boolean {
  const text = [receipt.text, receipt.url].filter(Boolean).join(" ");
  const normalized = text.toLowerCase();
  if (obligation.id && normalized.includes(obligation.id.toLowerCase())) return true;
  if (obligation.source.wake_id && normalized.includes(obligation.source.wake_id.toLowerCase())) return true;
  if (obligation.source.url && normalized.includes(obligation.source.url.toLowerCase())) return true;
  if (obligation.source.pr_number && mentionsPrNumber(text, obligation.source.pr_number)) return true;
  return false;
}

function hasRequiredProof(obligation: AgentObligation, text: string, proofLinks: string[]): boolean {
  if (/\bproof\s*:/i.test(text) && receiptMatchesObligation(obligation, { text })) return true;
  return proofLinks.some((link) => receiptMatchesObligation(obligation, { text: link, url: link }));
}

function mentionsPrNumber(text: string, prNumber: number): boolean {
  const escaped = String(prNumber).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`(?:^|[^\\w])#${escaped}(?:[^\\w]|$)`, "i"),
    new RegExp(`\\bpr\\s*#?\\s*${escaped}\\b`, "i"),
    new RegExp(`/pull/${escaped}(?:[^0-9]|$)`, "i"),
  ];
  return patterns.some((pattern) => pattern.test(text));
}

function looksLikeFakeDone(text: string): boolean {
  const value = String(text ?? "").trim();
  return /\bdone\b/i.test(value) && !/^(PASS|HOLD|BLOCKER|ACK)\s*:/i.test(value) && !/\bproof\s*:/i.test(value);
}

function extractProofLinks(text: string): string[] {
  return Array.from(new Set(String(text ?? "").match(/https?:\/\/[^\s)]+/gi) ?? []));
}

function isTtlExpired(obligation: AgentObligation, now: Date): boolean {
  const createdAtMs = Date.parse(obligation.created_at);
  if (!Number.isFinite(createdAtMs)) return false;
  return now.getTime() - createdAtMs > obligation.ttl_seconds * 1000;
}

function clampTtlSeconds(value: unknown): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 10 * 60;
  return Math.max(60, Math.min(Math.floor(parsed), 7 * 24 * 60 * 60));
}

function compactText(value: unknown, max: number): string {
  const text = String(value ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max) : text;
}
