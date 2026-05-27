export type DogfoodStatus = "passing" | "failing" | "pending" | "blocked";

export interface DogfoodPassResult {
  id: string;
  name: string;
  status: DogfoodStatus;
  summary: string;
  evidence: string;
  checkedAt?: string;
  blockedReason?: string;
  reasonCode?: string;
  nextProof?: string;
  runId?: string;
  targetUrl?: string;
  proof?: {
    kind: "testpass_run" | "uxpass_run" | "planned" | "compliancepass_report";
    runId?: string;
    targetUrl?: string;
    checksTotal?: number;
    highSeverityGaps?: number;
    generatedAt?: string;
    ageHours?: number;
    maxAgeHours?: number;
  };
}

export interface DogfoodTrendPoint {
  date: string;
  passing: number;
  failing: number;
  blocked?: number;
  pending: number;
}

export type DogfoodStatusLegend = Record<DogfoodStatus, string>;

export interface XPassIndexEntry {
  id: string;
  name: string;
  stage: "live_gate" | "live_dogfood" | "scope_gated" | "planned" | "guidance";
  label: string;
  automation: string;
  mentionProfile: string;
  nextStep: string;
}

export const dogfoodReport = {
  generatedAt: "2026-05-01T17:16:13.158Z",
  lastRunAt: "2026-05-01T17:16:13.158Z",
  status: "blocked",
  source: "static fallback receipt",
  headline: "We dogfood UnClick on UnClick.",
  target: "UnClick public and agent-facing product surfaces",
  nextAutomation: "Nightly dogfood receipts refresh this board with live scheduled evidence.",
  statusLegend: {
    passing: "A live check ran and returned a passing result.",
    failing: "A live check ran and returned a failing result or could not reach its API.",
    blocked: "The check needs action before it can be marked passing, such as a missing credential, scope gate, or high-severity readiness gap.",
    pending: "The check is planned or scaffolded, but live proof is not available yet.",
  } satisfies DogfoodStatusLegend,
  proofPolicy: "Public dogfood receipts mark passing only when a live check actually ran. Blocked and pending are honest product states, not failures to hide.",
  xpassIndex: [
    {
      id: "testpass",
      name: "TestPass",
      stage: "live_gate",
      label: "Live trust gate",
      automation: "PR check, scheduled smoke, dogfood receipt, wake-router watched",
      mentionProfile: "High mention volume because it protects merges and cron trust.",
      nextStep: "Keep it as the default proof gate while the rest of XPass catches up.",
    },
    {
      id: "uxpass",
      name: "UXPass",
      stage: "live_dogfood",
      label: "Live dogfood lane",
      automation: "Dogfood receipt and run endpoint",
      mentionProfile: "Medium mention volume when the dogfood receipt or runner needs attention.",
      nextStep: "Promote to scheduled proof once the credential path is consistently healthy.",
    },
    {
      id: "securitypass",
      name: "SecurityPass",
      stage: "scope_gated",
      label: "Scope-gated",
      automation: "Blocked public receipt until safe recurring proof exists",
      mentionProfile: "Low mention volume by design because unsafe probes stay disabled.",
      nextStep: "Add a deny-by-default recurring runner proof before live security checks.",
    },
    {
      id: "seopass",
      name: "SEOPass",
      stage: "planned",
      label: "Planned",
      automation: "Scaffold-only public receipt",
      mentionProfile: "Low mention volume until a recurring search and metadata runner lands.",
      nextStep: "Define the smallest recurring metadata proof.",
    },
    {
      id: "copypass",
      name: "CopyPass",
      stage: "planned",
      label: "Planned",
      automation: "Scaffold-only public receipt",
      mentionProfile: "Low mention volume until copy checks become scheduled evidence.",
      nextStep: "Define the copy quality receipt shape.",
    },
    {
      id: "legalpass",
      name: "LegalPass",
      stage: "planned",
      label: "Planned",
      automation: "Scaffold-only public receipt",
      mentionProfile: "Low mention volume until policy and claims checks become scheduled evidence.",
      nextStep: "Keep guidance-only until legal review boundaries are explicit.",
    },
    {
      id: "compliancepass",
      name: "CompliancePass",
      stage: "live_dogfood",
      label: "Readiness evidence",
      automation: "Local deterministic scanner and public readiness receipt",
      mentionProfile: "Low mention volume unless readiness evidence, claims, or docs drift.",
      nextStep: "Keep report language conservative and link more XPass receipts as they mature.",
    },
  ] satisfies XPassIndexEntry[],
  results: [
    {
      id: "testpass",
      name: "TestPass",
      status: "passing",
      summary: "Scheduled TestPass completed with 17 checks and 0 failures.",
      evidence: "Run 2097cbe4-03da-4c32-9c10-3ddf9c4ffff5 checked https://unclick.world/api/mcp.",
      checkedAt: "2026-05-01T17:16:13.158Z",
      runId: "2097cbe4-03da-4c32-9c10-3ddf9c4ffff5",
      targetUrl: "https://unclick.world/api/mcp",
      proof: {
        kind: "testpass_run",
        runId: "2097cbe4-03da-4c32-9c10-3ddf9c4ffff5",
        targetUrl: "https://unclick.world/api/mcp",
      },
    },
    {
      id: "uxpass",
      name: "UXPass",
      status: "blocked",
      summary: "Scheduled UXPass could not run because DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET is missing.",
      evidence: "Set one workflow secret so the nightly dogfood workflow can create a fresh uxpass_runs row.",
      checkedAt: "2026-05-01T17:16:13.158Z",
      blockedReason: "Missing DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET.",
      reasonCode: "missing_credential",
      nextProof: "Set one UXPass workflow secret, then rerun the dogfood report workflow.",
    },
    {
      id: "securitypass",
      name: "SecurityPass",
      status: "blocked",
      summary: "SecurityPass is blocked until the recurring runner proof is ready.",
      evidence: "SecurityPass remains scope-gated; the public dogfood receipt does not run security probes yet.",
      checkedAt: "2026-05-01T17:16:13.158Z",
      blockedReason: "SecurityPass is intentionally deny-all/scope-gated until a safe recurring runner proof lands.",
      reasonCode: "scope_gate",
      nextProof: "Land a safe recurring SecurityPass runner receipt before marking this passing.",
    },
    {
      id: "seopass",
      name: "SEOPass",
      status: "pending",
      summary: "Queued for recurring search and metadata review.",
      evidence: "SEOPass is still scaffold-only for public dogfood receipts.",
      checkedAt: "2026-05-01T17:16:13.158Z",
      reasonCode: "planned_runner",
      nextProof: "Add a recurring SEOPass receipt before moving this out of pending.",
    },
    {
      id: "copypass",
      name: "CopyPass",
      status: "pending",
      summary: "Queued for recurring copy quality review.",
      evidence: "CopyPass recurring public receipts will land after the runner surface is available.",
      checkedAt: "2026-05-01T17:16:13.158Z",
      reasonCode: "planned_runner",
      nextProof: "Add a recurring CopyPass receipt before moving this out of pending.",
    },
    {
      id: "legalpass",
      name: "LegalPass",
      status: "pending",
      summary: "Queued for recurring policy and claims review.",
      evidence: "LegalPass recurring public receipts will land after the runner surface is available.",
      checkedAt: "2026-05-01T17:16:13.158Z",
      reasonCode: "planned_runner",
      nextProof: "Add a recurring LegalPass receipt before moving this out of pending.",
    },
    {
      id: "compliancepass",
      name: "CompliancePass",
      status: "blocked",
      summary: "CompliancePass scanned 27 readiness checks and scored 95.8/100, but the receipt is amber.",
      evidence: "See /enterprise/latest.json for the evidence-backed readiness report and remaining gaps.",
      checkedAt: "2026-05-27T00:00:00.000Z",
      blockedReason: "CompliancePass readiness is amber; 1 high/critical gap remains, plus medium lint, large-file, push-protection proof, and framework index gaps.",
      proof: { kind: "compliancepass_report", targetUrl: "/enterprise/latest.json", checksTotal: 27, highSeverityGaps: 1 },
      reasonCode: "readiness_gap",
      nextProof: "Resolve or explicitly route high/critical CompliancePass gaps, then regenerate /enterprise/latest.json.",
    },
  ] satisfies DogfoodPassResult[],
  trend: [
    { date: "2026-05-01", passing: 1, failing: 0, blocked: 3, pending: 3 },
  ] satisfies DogfoodTrendPoint[],
  lastActionableFailure: {
    title: "UXPass needs attention",
    detail: "Scheduled UXPass could not run because DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET is missing. Blocked reason: Missing DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET.",
    owner: "Dogfood automation",
  },
};
