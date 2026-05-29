/**
 * Reality Graph is UnClick Memory's proof-aware layer.
 *
 * It treats memories as claims that can be supported, contradicted,
 * expired, routed to jobs, or blocked until real proof exists.
 */

export type RealityNodeKind =
  | "claim"
  | "memory"
  | "job"
  | "proof"
  | "screen"
  | "test"
  | "commit"
  | "decision"
  | "person"
  | "file"
  | "action";

export type RealityEdgeKind =
  | "supports"
  | "contradicts"
  | "verifies"
  | "invalidates"
  | "supersedes"
  | "depends_on"
  | "routes_to"
  | "derived_from"
  | "mentions";

export type RealityClaimStatus =
  | "supported"
  | "unverified"
  | "contradicted"
  | "stale"
  | "actionable";

export type RealityProofStrength = "none" | "weak" | "medium" | "strong";

export interface RealitySourceReceipt {
  source_kind: "memory" | "conversation" | "boardroom" | "github" | "screenshot" | "test" | "live_check" | "manual";
  source_id: string;
  source_uri?: string;
  observed_at?: string;
  redaction_state?: "clean" | "redacted";
}

export interface RealityNode {
  id: string;
  kind: RealityNodeKind;
  label: string;
  summary?: string;
  confidence?: number;
  last_confirmed_at?: string;
  source?: RealitySourceReceipt;
  metadata?: Record<string, unknown>;
}

export interface RealityEdge {
  id: string;
  from: string;
  to: string;
  kind: RealityEdgeKind;
  confidence?: number;
  source?: RealitySourceReceipt;
  metadata?: Record<string, unknown>;
}

export interface RealityGraph {
  nodes: RealityNode[];
  edges: RealityEdge[];
}

export interface RealityClaimAssessment {
  claim_id: string;
  status: RealityClaimStatus;
  trust_score: number;
  proof_strength: RealityProofStrength;
  reasons: string[];
  next_action: string;
  support_count: number;
  contradiction_count: number;
}

export interface MemoryGovernorCandidate {
  id: string;
  label: string;
  confidence?: number;
  last_confirmed_at?: string;
  proof_strength?: RealityProofStrength;
  access_count?: number;
  contradiction_count?: number;
  duplicate_count?: number;
}

export interface MemoryGovernorScore {
  id: string;
  score: number;
  reasons: string[];
}

const proofWeights: Record<RealityProofStrength, number> = {
  none: 0,
  weak: 0.25,
  medium: 0.55,
  strong: 0.85,
};

export function createRealityGraph(graph: RealityGraph): RealityGraph {
  const seen = new Set<string>();
  for (const node of graph.nodes) {
    if (seen.has(node.id)) {
      throw new Error(`Duplicate Reality Graph node id: ${node.id}`);
    }
    seen.add(node.id);
  }

  for (const edge of graph.edges) {
    if (!seen.has(edge.from)) {
      throw new Error(`Reality Graph edge ${edge.id} has missing from node: ${edge.from}`);
    }
    if (!seen.has(edge.to)) {
      throw new Error(`Reality Graph edge ${edge.id} has missing to node: ${edge.to}`);
    }
  }

  return {
    nodes: [...graph.nodes],
    edges: [...graph.edges],
  };
}

export function assessRealityClaim(
  graph: RealityGraph,
  claimId: string,
  opts: { now?: Date; staleAfterDays?: number } = {},
): RealityClaimAssessment {
  const claim = graph.nodes.find((node) => node.id === claimId);
  if (!claim) {
    throw new Error(`Reality claim not found: ${claimId}`);
  }
  if (claim.kind !== "claim" && claim.kind !== "memory") {
    throw new Error(`Reality node is not assessable as a claim: ${claimId}`);
  }

  const incoming = graph.edges.filter((edge) => edge.to === claimId);
  const supportEdges = incoming.filter((edge) => edge.kind === "supports" || edge.kind === "verifies");
  const contradictionEdges = incoming.filter((edge) => edge.kind === "contradicts" || edge.kind === "invalidates");
  const proofStrength = strongestProofStrength(graph, supportEdges);
  const reasons: string[] = [];
  let trustScore = clamp((claim.confidence ?? 0.5) * 0.45 + proofWeights[proofStrength] * 0.55);

  if (supportEdges.length === 0) {
    reasons.push("No proof currently supports this memory claim.");
  } else {
    reasons.push(`${supportEdges.length} proof link(s) support this memory claim.`);
  }

  if (contradictionEdges.length > 0) {
    trustScore = clamp(trustScore - Math.min(0.75, contradictionEdges.length * 0.35));
    reasons.push(`${contradictionEdges.length} contradiction link(s) challenge this memory claim.`);
  }

  if (isStale(claim.last_confirmed_at, opts.now ?? new Date(), opts.staleAfterDays ?? 30)) {
    trustScore = clamp(trustScore - 0.2);
    reasons.push("This memory claim is stale and needs re-checking.");
  }

  const status = chooseStatus({
    contradictionCount: contradictionEdges.length,
    supportCount: supportEdges.length,
    proofStrength,
    stale: reasons.includes("This memory claim is stale and needs re-checking."),
  });

  return {
    claim_id: claimId,
    status,
    trust_score: Number(trustScore.toFixed(3)),
    proof_strength: proofStrength,
    reasons,
    next_action: nextActionForStatus(status),
    support_count: supportEdges.length,
    contradiction_count: contradictionEdges.length,
  };
}

export function scoreMemoryGovernorCandidate(candidate: MemoryGovernorCandidate, opts: { now?: Date } = {}): MemoryGovernorScore {
  const now = opts.now ?? new Date();
  const reasons: string[] = [];
  let score = candidate.confidence ?? 0.5;

  const proofStrength = candidate.proof_strength ?? "none";
  score += proofWeights[proofStrength] * 0.35;
  if (proofStrength === "none") reasons.push("No proof receipt attached.");
  else reasons.push(`${proofStrength} proof receipt attached.`);

  const ageDays = ageInDays(candidate.last_confirmed_at, now);
  if (ageDays === null) {
    score -= 0.15;
    reasons.push("Never confirmed.");
  } else if (ageDays > 30) {
    score -= 0.2;
    reasons.push("Older than 30 days.");
  } else {
    score += 0.1;
    reasons.push("Recently confirmed.");
  }

  if ((candidate.contradiction_count ?? 0) > 0) {
    score -= Math.min(0.5, (candidate.contradiction_count ?? 0) * 0.25);
    reasons.push("Has contradiction signals.");
  }

  if ((candidate.duplicate_count ?? 0) > 0) {
    score -= Math.min(0.25, (candidate.duplicate_count ?? 0) * 0.08);
    reasons.push("Looks duplicated.");
  }

  const accessBoost = Math.min(0.12, Math.log10((candidate.access_count ?? 0) + 1) * 0.04);
  if (accessBoost > 0) {
    score += accessBoost;
    reasons.push("Frequently accessed.");
  }

  return {
    id: candidate.id,
    score: Number(clamp(score).toFixed(3)),
    reasons,
  };
}

function strongestProofStrength(graph: RealityGraph, supportEdges: RealityEdge[]): RealityProofStrength {
  let strongest: RealityProofStrength = "none";
  for (const edge of supportEdges) {
    const node = graph.nodes.find((candidate) => candidate.id === edge.from);
    const strength = proofStrengthForNode(node, edge);
    if (proofWeights[strength] > proofWeights[strongest]) {
      strongest = strength;
    }
  }
  return strongest;
}

function proofStrengthForNode(node: RealityNode | undefined, edge: RealityEdge): RealityProofStrength {
  const metadataStrength = edge.metadata?.proof_strength;
  if (metadataStrength === "weak" || metadataStrength === "medium" || metadataStrength === "strong") {
    return metadataStrength;
  }
  if (!node) return "weak";
  if (node.kind === "test" || node.kind === "commit" || node.kind === "screen") return "strong";
  if (node.kind === "proof") return node.source ? "medium" : "weak";
  return "weak";
}

function chooseStatus(input: {
  contradictionCount: number;
  supportCount: number;
  proofStrength: RealityProofStrength;
  stale: boolean;
}): RealityClaimStatus {
  if (input.contradictionCount > 0) return "contradicted";
  if (input.supportCount === 0) return "unverified";
  if (input.stale) return "stale";
  if (input.proofStrength === "strong" || input.proofStrength === "medium") return "supported";
  return "actionable";
}

function nextActionForStatus(status: RealityClaimStatus): string {
  switch (status) {
    case "supported":
      return "Keep available for recall, with source receipts attached.";
    case "unverified":
      return "Route to proof collection before using as a trusted memory.";
    case "contradicted":
      return "Block trusted recall, reopen or create a job, and request fresh proof.";
    case "stale":
      return "Schedule a cheap live re-check before surfacing strongly.";
    case "actionable":
      return "Ask a verifier to strengthen weak proof before closing work.";
  }
}

function isStale(iso: string | undefined, now: Date, staleAfterDays: number): boolean {
  const age = ageInDays(iso, now);
  return age !== null && age > staleAfterDays;
}

function ageInDays(iso: string | undefined, now: Date): number | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return (now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000);
}

function clamp(value: number): number {
  return Math.max(0, Math.min(1, value));
}
