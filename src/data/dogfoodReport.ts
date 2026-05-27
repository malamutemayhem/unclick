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
    kind: "testpass_run" | "uxpass_run" | "seopass_run" | "planned" | "package_ready" | "boundary";
    runId?: string;
    targetUrl?: string;
    score?: number;
    sourceUrls?: string[];
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
  stage: "live_gate" | "live_dogfood" | "scope_gated" | "package_ready" | "boundary" | "planned" | "guidance";
  label: string;
  automation: string;
  mentionProfile: string;
  nextStep: string;
}

export const dogfoodReport = {
  generatedAt: "2026-05-28T00:00:00.000Z",
  lastRunAt: "2026-05-28T00:00:00.000Z",
  status: "blocked",
  source: "static fallback receipt",
  headline: "We dogfood UnClick on UnClick.",
  target: "UnClick public and agent-facing product surfaces",
  nextAutomation: "Nightly dogfood receipts refresh this board with live scheduled evidence.",
  statusLegend: {
    passing: "A live check ran and returned a passing result.",
    failing: "A live check ran and returned a failing result or could not reach its API.",
    blocked: "The check could not run because an action is needed, such as a missing credential or scope gate.",
    pending: "The check is planned, package-ready, or scaffolded, but live proof is not available yet.",
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
      id: "sloppass",
      name: "SlopPass",
      stage: "package_ready",
      label: "Package-ready quality gate",
      automation: "Package runner, verdict pack, dogfood tests, XPass routing",
      mentionProfile: "Medium mention volume because historical QualityPass references now route here.",
      nextStep: "Add a recurring SlopPass public receipt before marking it live dogfood.",
    },
    {
      id: "seopass",
      name: "SEOPass",
      stage: "live_dogfood",
      label: "Live dogfood lane",
      automation: "Public read-only SEO receipt",
      mentionProfile: "Medium mention volume when SEO metadata, crawler, or AI-era readiness drifts.",
      nextStep: "Promote the read-only receipt into a scheduled baseline and GEOPass bundle handoff.",
    },
    {
      id: "copypass",
      name: "CopyPass",
      stage: "package_ready",
      label: "Package-ready",
      automation: "Deterministic copy review, CopyRoom boundary, dogfood tests",
      mentionProfile: "Medium mention volume for public wording, claims, docs, and source-copy risk.",
      nextStep: "Add a recurring CopyPass receipt with CopyRoom/source-copy proof.",
    },
    {
      id: "legalpass",
      name: "LegalPass",
      stage: "package_ready",
      label: "Package-ready guidance",
      automation: "Legal guidance tools, pack schema, public proof boundaries",
      mentionProfile: "Medium mention volume when public claims, policy language, or disclaimers change.",
      nextStep: "Add a recurring LegalPass receipt that stays guidance-only, not legal certification.",
    },
    {
      id: "commonsensepass",
      name: "CommonSensePass",
      stage: "live_gate",
      label: "Worker sanity gate",
      automation: "False-DONE and proof sanity checks for worker claims and queues",
      mentionProfile: "High mention volume around claims, proof receipts, merge-ready language, and queue health.",
      nextStep: "Publish the recurring proof receipt for queue and worker-claim sanity.",
    },
    {
      id: "flowpass",
      name: "FlowPass",
      stage: "package_ready",
      label: "Package-ready",
      automation: "Journey map checks and end-to-end flow fixtures",
      mentionProfile: "Medium mention volume for onboarding, checkout, handoff, forms, and success states.",
      nextStep: "Add a recurring journey receipt with one public flow target.",
    },
    {
      id: "geopass",
      name: "GEOPass",
      stage: "package_ready",
      label: "Package-ready",
      automation: "AI answer-engine readiness scanner and metadata evidence",
      mentionProfile: "Medium mention volume for llms.txt, schema, bots, and answer-engine readiness.",
      nextStep: "Add a recurring answer-engine readiness receipt.",
    },
    {
      id: "rotatepass",
      name: "RotatePass",
      stage: "boundary",
      label: "Boundary guard",
      automation: "Credential lifecycle docs and redaction guard",
      mentionProfile: "Low mention volume because live credential rotation stays behind explicit scope.",
      nextStep: "Add a safe local credential lifecycle receipt without touching real secrets.",
    },
    {
      id: "wakepass",
      name: "WakePass",
      stage: "live_gate",
      label: "Wake and stale-work gate",
      automation: "Dispatch, stale ACK, heartbeat, and reclaim visibility",
      mentionProfile: "High mention volume when scheduled work stalls or needs a fresh owner.",
      nextStep: "Expose a public-safe stale-work receipt for dogfood runs.",
    },
    {
      id: "enterprisepass",
      name: "EnterprisePass",
      stage: "guidance",
      label: "Guidance report",
      automation: "Receipt guard and readiness report boundary",
      mentionProfile: "Low mention volume while it remains a guidance layer, not certification.",
      nextStep: "Add low-risk readiness checks without claiming compliance certification.",
    },
  ] satisfies XPassIndexEntry[],
  results: [
    {
      id: "testpass",
      name: "TestPass",
      status: "passing",
      summary: "Scheduled TestPass completed with 17 checks and 0 failures.",
      evidence: "Run 2097cbe4-03da-4c32-9c10-3ddf9c4ffff5 checked https://unclick.world/api/mcp.",
      checkedAt: "2026-05-28T00:00:00.000Z",
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
      checkedAt: "2026-05-28T00:00:00.000Z",
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
      checkedAt: "2026-05-28T00:00:00.000Z",
      blockedReason: "SecurityPass is intentionally deny-all/scope-gated until a safe recurring runner proof lands.",
      reasonCode: "scope_gate",
      nextProof: "Land a safe recurring SecurityPass runner receipt before marking this passing.",
    },
    {
      id: "sloppass",
      name: "SlopPass",
      status: "pending",
      summary: "Package-backed quality review exists, but the public dogfood receipt has not run it yet.",
      evidence: "SlopPass has a package runner, verdict pack, and dogfood tests; public status stays pending until a scheduled receipt exists.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "package_ready_needs_scheduled_receipt",
      targetUrl: "packages/sloppass",
      proof: { kind: "package_ready", targetUrl: "packages/sloppass" },
      nextProof: "Add a recurring SlopPass public receipt before marking this passing.",
    },
    {
      id: "seopass",
      name: "SEOPass",
      status: "passing",
      summary: "SEOPass read-only dogfood completed with public SEO evidence.",
      evidence: "Read-only fallback receipt checks public HTML, robots.txt, sitemap.xml, and llms.txt shape.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      runId: "seopass-static-fallback",
      targetUrl: "https://unclick.world",
      proof: {
        kind: "seopass_run",
        runId: "seopass-static-fallback",
        targetUrl: "https://unclick.world",
      },
      nextProof: "Replace the static fallback with the latest scheduled SEOPass receipt.",
    },
    {
      id: "copypass",
      name: "CopyPass",
      status: "pending",
      summary: "Package-backed copy quality review exists, but the public dogfood receipt has not run it yet.",
      evidence: "CopyPass has deterministic review tooling and CopyRoom boundary checks; public status stays pending until scheduled proof exists.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "package_ready_needs_scheduled_receipt",
      targetUrl: "packages/copypass",
      proof: { kind: "package_ready", targetUrl: "packages/copypass" },
      nextProof: "Add a recurring CopyPass receipt with CopyRoom/source-copy proof.",
    },
    {
      id: "legalpass",
      name: "LegalPass",
      status: "pending",
      summary: "Package-backed policy and claims guidance exists, but the public dogfood receipt has not run it yet.",
      evidence: "LegalPass has guidance tooling, pack schema, and public proof boundaries; public status stays pending until scheduled proof exists.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "package_ready_needs_scheduled_receipt",
      targetUrl: "packages/legalpass",
      proof: { kind: "package_ready", targetUrl: "packages/legalpass" },
      nextProof: "Add a recurring LegalPass receipt that stays guidance-only, not legal certification.",
    },
    {
      id: "commonsensepass",
      name: "CommonSensePass",
      status: "pending",
      summary: "Worker sanity checks exist, but the public dogfood receipt has not run them yet.",
      evidence: "CommonSensePass is routed for proof, queue, claim, false-DONE, and merge-ready sanity; public status stays pending until scheduled proof exists.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "package_ready_needs_scheduled_receipt",
      targetUrl: "packages/commonsensepass",
      proof: { kind: "package_ready", targetUrl: "packages/commonsensepass" },
      nextProof: "Add a recurring CommonSensePass proof receipt for worker claims and queue health.",
    },
    {
      id: "flowpass",
      name: "FlowPass",
      status: "pending",
      summary: "Package-backed journey checks exist, but the public dogfood receipt has not run them yet.",
      evidence: "FlowPass has journey fixtures for onboarding, checkout, handoff, forms, and success/failure states; public status stays pending until scheduled proof exists.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "package_ready_needs_scheduled_receipt",
      targetUrl: "packages/flowpass",
      proof: { kind: "package_ready", targetUrl: "packages/flowpass" },
      nextProof: "Add a recurring FlowPass receipt for one public journey target.",
    },
    {
      id: "geopass",
      name: "GEOPass",
      status: "pending",
      summary: "Package-backed answer-engine readiness checks exist, but the public dogfood receipt has not run them yet.",
      evidence: "GEOPass has AI answer-engine readiness scanning for llms.txt, schema, bots, and metadata; public status stays pending until scheduled proof exists.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "package_ready_needs_scheduled_receipt",
      targetUrl: "packages/geopass",
      proof: { kind: "package_ready", targetUrl: "packages/geopass" },
      nextProof: "Add a recurring GEOPass answer-engine readiness receipt.",
    },
    {
      id: "rotatepass",
      name: "RotatePass",
      status: "pending",
      summary: "Credential lifecycle boundaries are documented and guarded, but no live credential rotation runs in public dogfood.",
      evidence: "RotatePass stays boundary-only until a safe local receipt can prove redaction and lifecycle behavior without touching real secrets.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "boundary_needs_runner",
      targetUrl: "docs/rotatepass-local-phase0.md",
      proof: { kind: "boundary", targetUrl: "docs/rotatepass-local-phase0.md" },
      nextProof: "Add a safe local RotatePass receipt that proves lifecycle handling without exposing secrets.",
    },
    {
      id: "wakepass",
      name: "WakePass",
      status: "pending",
      summary: "Wake and stale-work visibility exists, but the public dogfood receipt has not run a public-safe stale-work check yet.",
      evidence: "WakePass powers dispatch, stale ACK, heartbeat, and reclaim visibility; public status stays pending until a public-safe receipt exists.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      reasonCode: "boundary_needs_runner",
      targetUrl: "docs/prd/wakepass.md",
      proof: { kind: "boundary", targetUrl: "docs/prd/wakepass.md" },
      nextProof: "Add a public-safe WakePass receipt for stale scheduled work and reclaim visibility.",
    },
    {
      id: "enterprisepass",
      name: "EnterprisePass",
      status: "pending",
      summary: "Seed enterprise-readiness report is published; automated evidence checks are not live yet.",
      evidence: "See /enterprise/latest.json for the readiness-report boundary and pending category map.",
      checkedAt: "2026-05-28T00:00:00.000Z",
      proof: { kind: "planned", targetUrl: "/enterprise/latest.json" },
      reasonCode: "planned_runner",
      nextProof: "Wire automated evidence checks before moving this beyond readiness guidance.",
    },
  ] satisfies DogfoodPassResult[],
  trend: [
    { date: "2026-05-28", passing: 2, failing: 0, blocked: 2, pending: 9 },
  ] satisfies DogfoodTrendPoint[],
  lastActionableFailure: {
    title: "UXPass needs attention",
    detail: "Scheduled UXPass could not run because DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET is missing. Blocked reason: Missing DOGFOOD_UXPASS_TOKEN, UXPASS_TOKEN, or CRON_SECRET.",
    owner: "Dogfood automation",
  },
};
