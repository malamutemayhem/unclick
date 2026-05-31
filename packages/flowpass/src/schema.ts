import { z } from "zod";

export const FlowPassStepIdSchema = z.enum([
  "entry-route",
  "primary-cta",
  "form-readiness",
  "success-state",
  "failure-state",
  "navigation-continuity",
  "handoff-proof",
]);

export const FlowPassJourneyKindSchema = z.enum([
  "signup",
  "auth",
  "checkout",
  "onboarding",
  "support",
  "custom",
]);

export const FlowPassProfileSchema = z.enum(["smoke", "standard", "deep"]);

export const FlowPassSeveritySchema = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "info",
]);

export const FlowPassStepVerdictSchema = z.enum([
  "pass",
  "warn",
  "fail",
  "unknown",
]);

export const FlowPassReportVerdictSchema = z.enum([
  "ready",
  "needs-work",
  "blocked",
  "unknown",
]);

export const FlowPassHatIdSchema = z.enum([
  "driver",
  "verifier",
  "network-observer",
  "state-auditor",
  "performance-watcher",
  "accessibility-during-flow",
  "edge-case-explorer",
  "flake-detector",
  "synthesiser",
]);

export const FlowPassEvidenceSchema = z.object({
  kind: z.enum([
    "route",
    "link",
    "form",
    "fixture",
    "screenshot",
    "console-log",
    "network-log",
    "accessibility-snapshot",
    "geopass-signal",
    "side-channel",
    "hat-output",
    "state-signal",
    "run-report",
    "manual-note",
  ]),
  label: z.string().min(1),
  source_url: z.string().url().optional(),
  summary: z.string().min(1),
});

export const FlowPassFindingSchema = z.object({
  id: z.string().min(1),
  step_id: FlowPassStepIdSchema,
  severity: FlowPassSeveritySchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  evidence: z.array(FlowPassEvidenceSchema).default([]),
  recommendation: z.string().min(1).optional(),
});

export const FlowPassStepSchema = z.object({
  id: FlowPassStepIdSchema,
  label: z.string().min(1),
  route: z.string().min(1).optional(),
  required: z.boolean().default(true),
  fixtures: z.array(z.string().min(1)).default([]),
  evidence_kinds: z.array(z.string().min(1)).default([]),
});

export const FlowPassStepResultSchema = z.object({
  step_id: FlowPassStepIdSchema,
  label: z.string().min(1),
  score: z.number().min(0).max(100),
  verdict: FlowPassStepVerdictSchema,
  evidence: z.array(FlowPassEvidenceSchema).default([]),
  findings: z.array(FlowPassFindingSchema).default([]),
  comments: z.array(z.string().min(1)).default([]),
  duration_ms: z.number().min(0).optional(),
  hat_ids: z.array(FlowPassHatIdSchema).default([]),
});

export const FlowPassScannerSourceSchema = z.object({
  kind: z.enum(["geopass-plan", "fixture", "manual"]),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).default("plan-only"),
  target_url: z.string().url(),
  shared_check_ids: z.array(z.string().min(1)).default([]),
});

export const FlowPassSummarySchema = z.object({
  posture: z.string().min(1),
  counts_by_verdict: z.object({
    pass: z.number().int().min(0),
    warn: z.number().int().min(0),
    fail: z.number().int().min(0),
    unknown: z.number().int().min(0),
  }),
  counts_by_severity: z.object({
    critical: z.number().int().min(0),
    high: z.number().int().min(0),
    medium: z.number().int().min(0),
    low: z.number().int().min(0),
    info: z.number().int().min(0),
  }),
  coverage_note: z.string().min(1),
});

export const FlowPassHatOutputSchema = z.object({
  hat_id: FlowPassHatIdSchema,
  verdict: FlowPassStepVerdictSchema,
  summary: z.string().min(1),
  evidence: z.array(FlowPassEvidenceSchema).default([]),
});

export const FlowPassNotCheckedSchema = z.object({
  label: z.string().min(1),
  reason: z.string().min(1),
});

export const FlowPassDisagreementSchema = z.object({
  id: z.string().min(1),
  step_id: FlowPassStepIdSchema.optional(),
  driver_verdict: FlowPassStepVerdictSchema,
  verifier_verdict: FlowPassStepVerdictSchema,
  summary: z.string().min(1),
  status: z.enum(["open", "resolved"]).default("open"),
});

export const FlowPassReportSchema = z.object({
  run_id: z.string().min(1).optional(),
  target_url: z.string().url(),
  generated_at: z.string().datetime(),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).default("plan-only"),
  profile: FlowPassProfileSchema.default("smoke"),
  journey: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    kind: FlowPassJourneyKindSchema,
  }),
  journey_readiness_score: z.number().min(0).max(100),
  verdict: FlowPassReportVerdictSchema,
  steps: z.array(FlowPassStepResultSchema).min(1),
  scanner_source: FlowPassScannerSourceSchema,
  summary: FlowPassSummarySchema.optional(),
  hats: z.array(FlowPassHatOutputSchema).default([]),
  not_checked: z.array(FlowPassNotCheckedSchema).default([]),
  disagreements: z.array(FlowPassDisagreementSchema).default([]),
  notes: z.array(z.string().min(1)).default([]),
});

export const FlowPassReceiptSchema = z.object({
  kind: z.literal("flowpass_receipt_v1"),
  status: z.enum(["PASS", "WARN", "BLOCKER", "PENDING"]),
  run_id: z.string().min(1),
  target_url: z.string().url(),
  target_sha: z.string().min(1).optional(),
  generated_at: z.string().datetime(),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]),
  profile: FlowPassProfileSchema,
  journey: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    kind: FlowPassJourneyKindSchema,
  }),
  score: z.number().min(0).max(100),
  verdict: FlowPassReportVerdictSchema,
  checked: z.object({
    total: z.number().int().min(0),
    pass: z.number().int().min(0),
    warn: z.number().int().min(0),
    fail: z.number().int().min(0),
    unknown: z.number().int().min(0),
  }),
  evidence_sources: z.array(FlowPassEvidenceSchema).default([]),
  not_checked: z.array(FlowPassNotCheckedSchema).default([]),
  disagreements_open: z.number().int().min(0),
  action_needed: z.array(z.string().min(1)).default([]),
  boundaries: z.array(z.string().min(1)).min(1),
});

export const FlowPassFixtureLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  primary: z.boolean().optional(),
});

export const FlowPassFixtureFormSchema = z.object({
  name: z.string().min(1).optional(),
  action: z.string().min(1).optional(),
  fields: z.array(z.string().min(1)).default([]),
  submit_label: z.string().min(1).optional(),
  required_fields: z.array(z.string().min(1)).default([]),
});

export const FlowPassSideChannelSchema = z.object({
  kind: z.enum(["email", "sms", "webhook", "database", "api", "contract"]),
  label: z.string().min(1),
  status: z.enum(["observed", "missing", "not_checked"]).default("observed"),
  summary: z.string().min(1),
});

export const FlowPassFixtureSchema = z.object({
  route_status: z.number().int().min(100).max(599).optional(),
  page_title: z.string().optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  source_url: z.string().url().optional(),
  links: z.array(FlowPassFixtureLinkSchema).default([]),
  buttons: z.array(FlowPassFixtureLinkSchema).default([]),
  forms: z.array(FlowPassFixtureFormSchema).default([]),
  success_signals: z.array(z.string().min(1)).default([]),
  failure_signals: z.array(z.string().min(1)).default([]),
  handoff_signals: z.array(z.string().min(1)).default([]),
  network_events: z.array(z.object({
    method: z.string().min(1).optional(),
    url: z.string().min(1),
    status: z.number().int().min(100).max(599).optional(),
  })).default([]),
  console_errors: z.array(z.string().min(1)).default([]),
  performance_ms: z.number().min(0).optional(),
  accessibility_notes: z.array(z.string().min(1)).default([]),
  side_channels: z.array(FlowPassSideChannelSchema).default([]),
  screenshots: z.array(z.object({
    label: z.string().min(1),
    path: z.string().min(1).optional(),
    url: z.string().url().optional(),
  })).default([]),
});

export const FlowPassPackSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  journey: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    kind: FlowPassJourneyKindSchema.default("custom"),
  }),
  steps: z.array(FlowPassStepSchema).min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const FlowPassUserPackSchema = z.object({
  flow: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  url: z.string().url(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  journey: z.object({
    id: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    kind: FlowPassJourneyKindSchema.default("custom"),
  }).optional(),
  steps: z.array(z.union([z.string().min(1), FlowPassStepSchema, z.record(z.unknown())])).min(1),
  assertions: z.array(z.union([z.string().min(1), z.record(z.unknown())])).default([]),
  hats: z.array(FlowPassHatIdSchema).default([
    "driver",
    "verifier",
    "network-observer",
    "state-auditor",
    "performance-watcher",
    "accessibility-during-flow",
    "flake-detector",
    "synthesiser",
  ]),
  heal_budget: z.object({
    max_cost_usd: z.number().min(0).optional(),
    tier_cap: z.number().int().min(1).max(3).optional(),
  }).optional(),
  monitor: z.record(z.unknown()).optional(),
  fixtures: z.record(z.unknown()).optional(),
}).passthrough();

export const FlowPassGeoPassAdapterSchema = z.object({
  source: z.literal("geopass"),
  target_url: z.string().url(),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).optional(),
  shared_check_ids: z.array(z.string().min(1)).default([]),
});

export const FlowPassRunInputSchema = z.object({
  target_url: z.string().url(),
  generated_at: z.string().datetime().optional(),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).default("fixture"),
  profile: FlowPassProfileSchema.default("smoke"),
  journey_id: z.string().min(1).optional(),
  journey_name: z.string().min(1).optional(),
  journey_kind: FlowPassJourneyKindSchema.default("custom"),
  steps: z.array(FlowPassStepIdSchema).optional(),
  fixture: FlowPassFixtureSchema.optional(),
  scanner_source: FlowPassGeoPassAdapterSchema.optional(),
  notes: z.array(z.string().min(1)).default([]),
});

export type FlowPassStepId = z.infer<typeof FlowPassStepIdSchema>;
export type FlowPassJourneyKind = z.infer<typeof FlowPassJourneyKindSchema>;
export type FlowPassProfile = z.infer<typeof FlowPassProfileSchema>;
export type FlowPassSeverity = z.infer<typeof FlowPassSeveritySchema>;
export type FlowPassStepVerdict = z.infer<typeof FlowPassStepVerdictSchema>;
export type FlowPassReportVerdict = z.infer<typeof FlowPassReportVerdictSchema>;
export type FlowPassHatId = z.infer<typeof FlowPassHatIdSchema>;
export type FlowPassEvidence = z.infer<typeof FlowPassEvidenceSchema>;
export type FlowPassFinding = z.infer<typeof FlowPassFindingSchema>;
export type FlowPassStep = z.infer<typeof FlowPassStepSchema>;
export type FlowPassStepResult = z.infer<typeof FlowPassStepResultSchema>;
export type FlowPassScannerSource = z.infer<typeof FlowPassScannerSourceSchema>;
export type FlowPassSummary = z.infer<typeof FlowPassSummarySchema>;
export type FlowPassHatOutput = z.infer<typeof FlowPassHatOutputSchema>;
export type FlowPassNotChecked = z.infer<typeof FlowPassNotCheckedSchema>;
export type FlowPassDisagreement = z.infer<typeof FlowPassDisagreementSchema>;
export type FlowPassReport = z.infer<typeof FlowPassReportSchema>;
export type FlowPassReceipt = z.infer<typeof FlowPassReceiptSchema>;
export type FlowPassFixture = z.infer<typeof FlowPassFixtureSchema>;
export type FlowPassPack = z.infer<typeof FlowPassPackSchema>;
export type FlowPassUserPack = z.infer<typeof FlowPassUserPackSchema>;
export type FlowPassRunInput = z.input<typeof FlowPassRunInputSchema>;
export type FlowPassGeoPassAdapter = z.infer<typeof FlowPassGeoPassAdapterSchema>;
