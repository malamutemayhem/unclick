/* eslint-disable @typescript-eslint/ban-ts-comment, no-var */
// @ts-nocheck
/* Generated from @unclick/flowpass source so Vercel bundles FlowPass with the MCP function. */

// packages/flowpass/src/schema.ts
import { z } from "zod";
var FlowPassStepIdSchema = z.enum([
  "entry-route",
  "primary-cta",
  "form-readiness",
  "success-state",
  "failure-state",
  "navigation-continuity",
  "handoff-proof"
]);
var FlowPassJourneyKindSchema = z.enum([
  "signup",
  "auth",
  "checkout",
  "onboarding",
  "support",
  "custom"
]);
var FlowPassProfileSchema = z.enum(["smoke", "standard", "deep"]);
var FlowPassSeveritySchema = z.enum([
  "critical",
  "high",
  "medium",
  "low",
  "info"
]);
var FlowPassStepVerdictSchema = z.enum([
  "pass",
  "warn",
  "fail",
  "unknown"
]);
var FlowPassReportVerdictSchema = z.enum([
  "ready",
  "needs-work",
  "blocked",
  "unknown"
]);
var FlowPassHatIdSchema = z.enum([
  "driver",
  "verifier",
  "network-observer",
  "state-auditor",
  "performance-watcher",
  "accessibility-during-flow",
  "edge-case-explorer",
  "flake-detector",
  "synthesiser"
]);
var FlowPassEvidenceSchema = z.object({
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
    "manual-note"
  ]),
  label: z.string().min(1),
  source_url: z.string().url().optional(),
  summary: z.string().min(1)
});
var FlowPassFindingSchema = z.object({
  id: z.string().min(1),
  step_id: FlowPassStepIdSchema,
  severity: FlowPassSeveritySchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  evidence: z.array(FlowPassEvidenceSchema).default([]),
  recommendation: z.string().min(1).optional()
});
var FlowPassStepSchema = z.object({
  id: FlowPassStepIdSchema,
  label: z.string().min(1),
  route: z.string().min(1).optional(),
  required: z.boolean().default(true),
  fixtures: z.array(z.string().min(1)).default([]),
  evidence_kinds: z.array(z.string().min(1)).default([])
});
var FlowPassStepResultSchema = z.object({
  step_id: FlowPassStepIdSchema,
  label: z.string().min(1),
  score: z.number().min(0).max(100),
  verdict: FlowPassStepVerdictSchema,
  evidence: z.array(FlowPassEvidenceSchema).default([]),
  findings: z.array(FlowPassFindingSchema).default([]),
  comments: z.array(z.string().min(1)).default([]),
  duration_ms: z.number().min(0).optional(),
  hat_ids: z.array(FlowPassHatIdSchema).default([])
});
var FlowPassScannerSourceSchema = z.object({
  kind: z.enum(["geopass-plan", "fixture", "manual"]),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).default("plan-only"),
  target_url: z.string().url(),
  shared_check_ids: z.array(z.string().min(1)).default([])
});
var FlowPassSummarySchema = z.object({
  posture: z.string().min(1),
  counts_by_verdict: z.object({
    pass: z.number().int().min(0),
    warn: z.number().int().min(0),
    fail: z.number().int().min(0),
    unknown: z.number().int().min(0)
  }),
  counts_by_severity: z.object({
    critical: z.number().int().min(0),
    high: z.number().int().min(0),
    medium: z.number().int().min(0),
    low: z.number().int().min(0),
    info: z.number().int().min(0)
  }),
  coverage_note: z.string().min(1)
});
var FlowPassHatOutputSchema = z.object({
  hat_id: FlowPassHatIdSchema,
  verdict: FlowPassStepVerdictSchema,
  summary: z.string().min(1),
  evidence: z.array(FlowPassEvidenceSchema).default([])
});
var FlowPassNotCheckedSchema = z.object({
  label: z.string().min(1),
  reason: z.string().min(1)
});
var FlowPassDisagreementSchema = z.object({
  id: z.string().min(1),
  step_id: FlowPassStepIdSchema.optional(),
  driver_verdict: FlowPassStepVerdictSchema,
  verifier_verdict: FlowPassStepVerdictSchema,
  summary: z.string().min(1),
  status: z.enum(["open", "resolved"]).default("open")
});
var FlowPassReportSchema = z.object({
  run_id: z.string().min(1).optional(),
  target_url: z.string().url(),
  generated_at: z.string().datetime(),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).default("plan-only"),
  profile: FlowPassProfileSchema.default("smoke"),
  journey: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    kind: FlowPassJourneyKindSchema
  }),
  journey_readiness_score: z.number().min(0).max(100),
  verdict: FlowPassReportVerdictSchema,
  steps: z.array(FlowPassStepResultSchema).min(1),
  scanner_source: FlowPassScannerSourceSchema,
  summary: FlowPassSummarySchema.optional(),
  hats: z.array(FlowPassHatOutputSchema).default([]),
  not_checked: z.array(FlowPassNotCheckedSchema).default([]),
  disagreements: z.array(FlowPassDisagreementSchema).default([]),
  notes: z.array(z.string().min(1)).default([])
});
var FlowPassFixtureLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
  primary: z.boolean().optional()
});
var FlowPassFixtureFormSchema = z.object({
  name: z.string().min(1).optional(),
  action: z.string().min(1).optional(),
  fields: z.array(z.string().min(1)).default([]),
  submit_label: z.string().min(1).optional(),
  required_fields: z.array(z.string().min(1)).default([])
});
var FlowPassSideChannelSchema = z.object({
  kind: z.enum(["email", "sms", "webhook", "database", "api", "contract"]),
  label: z.string().min(1),
  status: z.enum(["observed", "missing", "not_checked"]).default("observed"),
  summary: z.string().min(1)
});
var FlowPassFixtureSchema = z.object({
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
    status: z.number().int().min(100).max(599).optional()
  })).default([]),
  console_errors: z.array(z.string().min(1)).default([]),
  performance_ms: z.number().min(0).optional(),
  accessibility_notes: z.array(z.string().min(1)).default([]),
  side_channels: z.array(FlowPassSideChannelSchema).default([]),
  screenshots: z.array(z.object({
    label: z.string().min(1),
    path: z.string().min(1).optional(),
    url: z.string().url().optional()
  })).default([])
});
var FlowPassPackSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  journey: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    kind: FlowPassJourneyKindSchema.default("custom")
  }),
  steps: z.array(FlowPassStepSchema).min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional()
});
var FlowPassUserPackSchema = z.object({
  flow: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  url: z.string().url(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  journey: z.object({
    id: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    kind: FlowPassJourneyKindSchema.default("custom")
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
    "synthesiser"
  ]),
  heal_budget: z.object({
    max_cost_usd: z.number().min(0).optional(),
    tier_cap: z.number().int().min(1).max(3).optional()
  }).optional(),
  monitor: z.record(z.unknown()).optional(),
  fixtures: z.record(z.unknown()).optional()
}).passthrough();
var FlowPassGeoPassAdapterSchema = z.object({
  source: z.literal("geopass"),
  target_url: z.string().url(),
  mode: z.enum(["plan-only", "fixture", "live-readonly"]).optional(),
  shared_check_ids: z.array(z.string().min(1)).default([])
});
var FlowPassRunInputSchema = z.object({
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
  notes: z.array(z.string().min(1)).default([])
});

// packages/flowpass/src/flow-plan.ts
var DEFAULT_FLOWPASS_STEPS = [
  {
    id: "entry-route",
    label: "Entry route loads",
    route: "/",
    required: true,
    fixtures: ["public route fixture"],
    evidence_kinds: ["route", "fixture"]
  },
  {
    id: "primary-cta",
    label: "Primary CTA is reachable",
    required: true,
    fixtures: ["cta text fixture", "link target fixture"],
    evidence_kinds: ["link", "fixture"]
  },
  {
    id: "form-readiness",
    label: "Form is ready for fixture input",
    required: true,
    fixtures: ["valid fixture input", "required field fixture"],
    evidence_kinds: ["form", "fixture"]
  },
  {
    id: "success-state",
    label: "Success state is represented",
    required: true,
    fixtures: ["success copy fixture", "receipt fixture"],
    evidence_kinds: ["route", "manual-note"]
  },
  {
    id: "failure-state",
    label: "Failure state is represented",
    required: true,
    fixtures: ["validation error fixture", "recoverable error fixture"],
    evidence_kinds: ["form", "console-log", "manual-note"]
  },
  {
    id: "navigation-continuity",
    label: "Navigation continuity is preserved",
    required: true,
    fixtures: ["back link fixture", "next route fixture"],
    evidence_kinds: ["link", "route"]
  },
  {
    id: "handoff-proof",
    label: "Handoff proof is available",
    required: true,
    fixtures: ["receipt fixture", "state handoff fixture"],
    evidence_kinds: ["fixture", "manual-note"]
  }
];
var DISALLOWED_ACTIONS = [
  "live signup execution",
  "live auth execution",
  "live checkout or billing execution",
  "email delivery",
  "credential access",
  "production database writes",
  "destructive form submission"
];
function createFlowPassPlan(input) {
  const selectedSteps = new Set(
    (input.steps ?? DEFAULT_FLOWPASS_STEPS.map((step) => step.id)).map(
      (step) => FlowPassStepIdSchema.parse(step)
    )
  );
  return {
    targetUrl: new URL(input.targetUrl).toString(),
    mode: "plan-only",
    journey: {
      id: input.journeyId ?? "primary-journey",
      name: input.journeyName ?? "Primary product journey",
      kind: FlowPassJourneyKindSchema.parse(input.journeyKind ?? "custom")
    },
    steps: DEFAULT_FLOWPASS_STEPS.filter((step) => selectedSteps.has(step.id)),
    disallowedActions: DISALLOWED_ACTIONS
  };
}

// packages/flowpass/src/verdict-pack.ts
function defaultScannerSource(targetUrl) {
  return {
    source: "geopass",
    target_url: targetUrl,
    mode: "plan-only",
    shared_check_ids: ["aggregate-ai-engine-readiness"]
  };
}
function createFlowPassVerdictPack(input) {
  const plan = createFlowPassPlan(input);
  return {
    ...plan,
    scannerSource: FlowPassGeoPassAdapterSchema.parse(
      input.scannerSource ?? defaultScannerSource(plan.targetUrl)
    )
  };
}
function createPlanOnlyFlowPassReport(input) {
  const verdictPack = createFlowPassVerdictPack(input);
  const stepResults = verdictPack.steps.map((step) => ({
    step_id: step.id,
    label: step.label,
    score: 0,
    verdict: "unknown",
    evidence: [],
    findings: [],
    comments: [
      "Plan-only placeholder: run fixture-driven checks in a later chip."
    ],
    hat_ids: []
  }));
  return FlowPassReportSchema.parse({
    target_url: verdictPack.targetUrl,
    generated_at: input.generatedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
    mode: "plan-only",
    journey: verdictPack.journey,
    journey_readiness_score: 0,
    verdict: "unknown",
    steps: stepResults,
    scanner_source: {
      kind: "geopass-plan",
      mode: verdictPack.scannerSource.mode ?? "plan-only",
      target_url: verdictPack.scannerSource.target_url,
      shared_check_ids: verdictPack.scannerSource.shared_check_ids
    },
    notes: input.notes ?? [
      "FlowPass is fixture-driven and does not execute live auth, checkout, billing, email, or destructive flows in this chip."
    ]
  });
}

// packages/flowpass/src/runner.ts
import { createHash } from "crypto";
var CTA_TERMS = [
  "start",
  "sign up",
  "signup",
  "join",
  "try",
  "create",
  "continue",
  "checkout",
  "book",
  "contact",
  "run"
];
var SUCCESS_TERMS = [
  "success",
  "complete",
  "completed",
  "confirmed",
  "created",
  "receipt",
  "done",
  "welcome",
  "thank you"
];
var FAILURE_TERMS = [
  "error",
  "invalid",
  "required",
  "try again",
  "recover",
  "failed",
  "missing"
];
var HANDOFF_TERMS = [
  "receipt",
  "confirmation",
  "handoff",
  "next step",
  "reference",
  "run id",
  "job id",
  "ticket",
  "proof"
];
var FLOWPASS_NOT_CHECKED = [
  {
    label: "Live browser execution",
    reason: "This safe runner evaluates caller-provided public fixtures and does not drive Stagehand, Playwright, auth, checkout, billing, or destructive flows."
  },
  {
    label: "rrweb and video capture",
    reason: "Replay capture is reserved for the live-readonly runner. Fixture runs only preserve structured evidence summaries."
  },
  {
    label: "Real email, SMS, webhook, and database assertions",
    reason: "Side-channel assertions can be supplied as fixtures, but this runner does not touch live delivery systems or production data."
  },
  {
    label: "Visual pixel diff",
    reason: "Screenshot labels can be attached as evidence, but Backstop or odiff execution is not run in this deterministic slice."
  },
  {
    label: "Synthetic multi-region monitoring",
    reason: "Cohorted alerting is part of the scheduled monitoring tier and is not claimed by a single fixture run."
  }
];
function redact(value) {
  return value.replace(/\bsk-[a-z0-9_-]{8,}\b/gi, "[redacted-sensitive-token]").replace(
    /\b(?:api[_ -]?key|bearer|password|secret|token)\b[:=\s-]*[^\s.,;)]*/gi,
    "[redacted-sensitive-token]"
  );
}
function normalize(value) {
  return String(value ?? "").toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}
function includesAny(value, terms) {
  const normalized = normalize(value);
  return terms.some((term) => normalized.includes(term));
}
function compact(value, max = 220) {
  const cleaned = redact(value).replace(/\s+/g, " ").trim();
  return cleaned.length > max ? `${cleaned.slice(0, max - 3)}...` : cleaned;
}
function fixtureText(fixture) {
  return [
    fixture.page_title,
    fixture.text,
    fixture.html,
    ...fixture.links.map((link) => `${link.label} ${link.href ?? ""} ${link.role ?? ""}`),
    ...fixture.buttons.map((button) => `${button.label} ${button.href ?? ""} ${button.role ?? ""}`),
    ...fixture.forms.map(
      (form) => `${form.name ?? ""} ${form.action ?? ""} ${form.submit_label ?? ""} ${form.fields.join(" ")}`
    ),
    ...fixture.success_signals,
    ...fixture.failure_signals,
    ...fixture.handoff_signals,
    ...fixture.side_channels.map((channel) => `${channel.label} ${channel.summary}`)
  ].join(" ");
}
function makeRunId(input) {
  return `flowpass_${createHash("sha256").update(JSON.stringify(input)).digest("hex").slice(0, 12)}`;
}
function evidence(kind, label, summary, fixture) {
  return {
    kind,
    label,
    summary: compact(summary),
    ...fixture.source_url ? { source_url: fixture.source_url } : {}
  };
}
function finding(stepId, severity, title, summary, recommendation, evidenceItems) {
  return {
    id: `${stepId}-${createHash("sha256").update(title + summary).digest("hex").slice(0, 8)}`,
    step_id: stepId,
    severity,
    title,
    summary,
    recommendation,
    evidence: evidenceItems
  };
}
function resultFor(stepId, label, verdict, score, evidenceItems, findings, comments, hatIds) {
  return {
    step_id: stepId,
    label,
    score,
    verdict,
    evidence: evidenceItems,
    findings,
    comments,
    hat_ids: hatIds
  };
}
function entryRouteResult(fixture) {
  const status = fixture.route_status;
  const hasPage = Boolean(fixture.text?.trim() || fixture.html?.trim() || fixture.page_title?.trim());
  const evidenceItems = [
    evidence(
      "route",
      "Route fixture",
      status ? `Fixture route status ${status}.` : "No route status was supplied.",
      fixture
    )
  ];
  if (status && status >= 200 && status < 400 && hasPage) {
    return resultFor(
      "entry-route",
      "Entry route loads",
      "pass",
      100,
      evidenceItems,
      [],
      ["Entry route has a non-error status and visible page evidence."],
      ["driver", "verifier", "network-observer"]
    );
  }
  const severity = status && status >= 500 ? "critical" : "high";
  return resultFor(
    "entry-route",
    "Entry route loads",
    "fail",
    0,
    evidenceItems,
    [
      finding(
        "entry-route",
        severity,
        "Entry route is not proven loadable",
        "FlowPass could not prove a successful entry route from the supplied fixture.",
        "Supply a public fixture with a 2xx or 3xx route status plus visible page text, title, or HTML.",
        evidenceItems
      )
    ],
    ["The journey cannot be called ready until the first route has proof."],
    ["driver", "verifier", "network-observer"]
  );
}
function primaryCtaResult(fixture) {
  const candidates = [...fixture.links, ...fixture.buttons];
  const primary = candidates.find((candidate) => candidate.primary === true);
  const named = candidates.find((candidate) => includesAny(candidate.label, CTA_TERMS));
  const cta = primary ?? named;
  const evidenceItems = [
    evidence(
      "link",
      "CTA fixture",
      cta ? `Found CTA candidate "${cta.label}"${cta.href ? ` -> ${cta.href}` : ""}.` : "No CTA candidate was supplied.",
      fixture
    )
  ];
  if (cta?.href || cta?.role === "button" || primary) {
    return resultFor(
      "primary-cta",
      "Primary CTA is reachable",
      "pass",
      100,
      evidenceItems,
      [],
      ["A primary journey action is visible in the fixture."],
      ["driver", "verifier"]
    );
  }
  if (cta) {
    return resultFor(
      "primary-cta",
      "Primary CTA is reachable",
      "warn",
      70,
      evidenceItems,
      [
        finding(
          "primary-cta",
          "medium",
          "Primary CTA lacks destination proof",
          "A CTA label exists, but the fixture does not show a destination, button role, or primary marker.",
          "Attach href, role, or primary=true evidence so the next step is unambiguous.",
          evidenceItems
        )
      ],
      ["CTA copy exists, but reachability is not fully proven."],
      ["driver", "verifier"]
    );
  }
  return resultFor(
    "primary-cta",
    "Primary CTA is reachable",
    "fail",
    0,
    evidenceItems,
    [
      finding(
        "primary-cta",
        "high",
        "Primary CTA is missing",
        "The fixture did not expose a clear action that moves the journey forward.",
        "Provide a primary link or button fixture with a label and destination or role.",
        evidenceItems
      )
    ],
    ["The journey has no proven next action."],
    ["driver", "verifier"]
  );
}
function formReadinessResult(fixture) {
  const form = fixture.forms.find((candidate) => candidate.fields.length > 0) ?? fixture.forms[0];
  const hasSubmit = Boolean(form?.submit_label || form?.action);
  const evidenceItems = [
    evidence(
      "form",
      "Form fixture",
      form ? `Found form "${form.name ?? "unnamed"}" with ${form.fields.length} field(s).` : "No form fixture was supplied.",
      fixture
    )
  ];
  if (form && form.fields.length > 0 && hasSubmit) {
    return resultFor(
      "form-readiness",
      "Form is ready for fixture input",
      "pass",
      100,
      evidenceItems,
      [],
      ["Form fields and a submit path are present in the fixture."],
      ["driver", "verifier", "state-auditor"]
    );
  }
  if (form && form.fields.length > 0) {
    return resultFor(
      "form-readiness",
      "Form is ready for fixture input",
      "warn",
      70,
      evidenceItems,
      [
        finding(
          "form-readiness",
          "medium",
          "Form lacks submit proof",
          "Form fields exist, but the fixture does not prove how the user submits the step.",
          "Attach submit_label or action evidence to the form fixture.",
          evidenceItems
        )
      ],
      ["The input surface exists, but the completion action is unclear."],
      ["driver", "verifier", "state-auditor"]
    );
  }
  return resultFor(
    "form-readiness",
    "Form is ready for fixture input",
    "fail",
    0,
    evidenceItems,
    [
      finding(
        "form-readiness",
        "high",
        "Form readiness is not proven",
        "The supplied fixture does not show the input fields required to exercise the journey.",
        "Supply a form fixture with fields and submit proof, or remove this step from the flow if it is not part of the journey.",
        evidenceItems
      )
    ],
    ["FlowPass cannot prove fixture input can be entered."],
    ["driver", "verifier", "state-auditor"]
  );
}
function successStateResult(fixture) {
  const text = fixtureText(fixture);
  const hasSuccess = fixture.success_signals.length > 0 || includesAny(text, SUCCESS_TERMS);
  const evidenceItems = [
    evidence(
      "state-signal",
      "Success state fixture",
      hasSuccess ? `Success signal: ${fixture.success_signals[0] ?? "success-like text found in page fixture"}.` : "No success state signal was supplied.",
      fixture
    )
  ];
  if (hasSuccess) {
    return resultFor(
      "success-state",
      "Success state is represented",
      "pass",
      100,
      evidenceItems,
      [],
      ["The fixture includes a reachable success or completion signal."],
      ["verifier", "state-auditor", "synthesiser"]
    );
  }
  return resultFor(
    "success-state",
    "Success state is represented",
    "fail",
    0,
    evidenceItems,
    [
      finding(
        "success-state",
        "high",
        "Success state is missing",
        "The fixture does not prove what the user sees after completing the journey.",
        "Attach success copy, a confirmation route, a receipt state, or an equivalent completion marker.",
        evidenceItems
      )
    ],
    ["An end-to-end journey needs a clear finish line."],
    ["verifier", "state-auditor", "synthesiser"]
  );
}
function failureStateResult(fixture) {
  const text = fixtureText(fixture);
  const hasFailure = fixture.failure_signals.length > 0 || includesAny(text, FAILURE_TERMS);
  const evidenceItems = [
    evidence(
      "state-signal",
      "Failure state fixture",
      hasFailure ? `Failure or recovery signal: ${fixture.failure_signals[0] ?? "failure-like text found in page fixture"}.` : "No failure or recovery state signal was supplied.",
      fixture
    )
  ];
  if (hasFailure) {
    return resultFor(
      "failure-state",
      "Failure state is represented",
      "pass",
      100,
      evidenceItems,
      [],
      ["The fixture proves a recoverable failure or validation path."],
      ["verifier", "state-auditor", "edge-case-explorer"]
    );
  }
  return resultFor(
    "failure-state",
    "Failure state is represented",
    "warn",
    60,
    evidenceItems,
    [
      finding(
        "failure-state",
        "medium",
        "Failure state is not represented",
        "The fixture only proves a happy path and does not show validation or recovery behavior.",
        "Add invalid-input or recoverable-error fixture evidence before using FlowPass as a journey gate.",
        evidenceItems
      )
    ],
    ["The happy path may work, but recovery is not proven."],
    ["verifier", "state-auditor", "edge-case-explorer"]
  );
}
function navigationContinuityResult(fixture) {
  const links = fixture.links;
  const hasContinuity = links.some(
    (link) => includesAny(`${link.label} ${link.href ?? ""}`, ["back", "next", "continue", "dashboard", "home", "project"])
  );
  const evidenceItems = [
    evidence(
      "link",
      "Navigation fixture",
      links.length > 0 ? `Found ${links.length} navigation link(s).` : "No navigation link fixture was supplied.",
      fixture
    )
  ];
  if (hasContinuity) {
    return resultFor(
      "navigation-continuity",
      "Navigation continuity is preserved",
      "pass",
      100,
      evidenceItems,
      [],
      ["The fixture includes a continuing or return path."],
      ["driver", "verifier"]
    );
  }
  if (links.length > 0) {
    return resultFor(
      "navigation-continuity",
      "Navigation continuity is preserved",
      "warn",
      70,
      evidenceItems,
      [
        finding(
          "navigation-continuity",
          "low",
          "Navigation continuity is weak",
          "Links exist, but none clearly prove the user can continue or recover navigation.",
          "Attach next, back, dashboard, or equivalent continuity evidence.",
          evidenceItems
        )
      ],
      ["The fixture has links, but continuity intent is unclear."],
      ["driver", "verifier"]
    );
  }
  return resultFor(
    "navigation-continuity",
    "Navigation continuity is preserved",
    "fail",
    0,
    evidenceItems,
    [
      finding(
        "navigation-continuity",
        "medium",
        "Navigation continuity is missing",
        "The fixture does not show a path back, forward, or onward after the current step.",
        "Attach navigation evidence that lets a user recover or continue the journey.",
        evidenceItems
      )
    ],
    ["A completed path still needs a route out."],
    ["driver", "verifier"]
  );
}
function handoffProofResult(fixture) {
  const text = fixtureText(fixture);
  const sideChannelProof = fixture.side_channels.some((channel) => channel.status === "observed");
  const hasHandoff = fixture.handoff_signals.length > 0 || sideChannelProof || includesAny(text, HANDOFF_TERMS);
  const evidenceItems = [
    evidence(
      sideChannelProof ? "side-channel" : "manual-note",
      "Handoff fixture",
      hasHandoff ? `Handoff signal: ${fixture.handoff_signals[0] ?? fixture.side_channels[0]?.summary ?? "handoff-like text found"}.` : "No receipt, state handoff, or side-channel proof was supplied.",
      fixture
    )
  ];
  if (hasHandoff) {
    return resultFor(
      "handoff-proof",
      "Handoff proof is available",
      "pass",
      100,
      evidenceItems,
      [],
      ["The fixture includes a receipt, reference, side-channel, or handoff signal."],
      ["verifier", "state-auditor", "synthesiser"]
    );
  }
  return resultFor(
    "handoff-proof",
    "Handoff proof is available",
    "fail",
    0,
    evidenceItems,
    [
      finding(
        "handoff-proof",
        "high",
        "Handoff proof is missing",
        "The fixture does not prove that the journey leaves a receipt, reference, or durable state.",
        "Attach receipt text, a run id, confirmation id, ticket id, database fixture, email fixture, or webhook fixture.",
        evidenceItems
      )
    ],
    ["Without handoff proof, FlowPass cannot prove the journey finished in a useful state."],
    ["verifier", "state-auditor", "synthesiser"]
  );
}
function evaluateStep(stepId, fixture) {
  switch (stepId) {
    case "entry-route":
      return entryRouteResult(fixture);
    case "primary-cta":
      return primaryCtaResult(fixture);
    case "form-readiness":
      return formReadinessResult(fixture);
    case "success-state":
      return successStateResult(fixture);
    case "failure-state":
      return failureStateResult(fixture);
    case "navigation-continuity":
      return navigationContinuityResult(fixture);
    case "handoff-proof":
      return handoffProofResult(fixture);
  }
}
function countsByVerdict(steps) {
  return steps.reduce(
    (counts, step) => {
      counts[step.verdict] += 1;
      return counts;
    },
    { pass: 0, warn: 0, fail: 0, unknown: 0 }
  );
}
function countsBySeverity(steps) {
  return steps.flatMap((step) => step.findings).reduce(
    (counts, item) => {
      counts[item.severity] += 1;
      return counts;
    },
    { critical: 0, high: 0, medium: 0, low: 0, info: 0 }
  );
}
function reportVerdict(steps) {
  if (steps.some((step) => step.verdict === "fail")) return "blocked";
  if (steps.some((step) => step.verdict === "warn" || step.verdict === "unknown")) return "needs-work";
  return "ready";
}
function postureFor(verdict) {
  if (verdict === "ready") {
    return "FlowPass fixture checks found an end-to-end journey with entry, action, recovery, success, and handoff proof.";
  }
  if (verdict === "blocked") {
    return "FlowPass found journey blockers in the supplied fixture. Do not claim the flow is complete until the missing proof is added.";
  }
  if (verdict === "needs-work") {
    return "FlowPass found a mostly visible journey, but at least one proof boundary needs tightening before this becomes a gate.";
  }
  return "FlowPass could not determine journey readiness from the supplied evidence.";
}
function hatVerdictFromSteps(steps, hatId) {
  const relevant = steps.filter((step) => step.hat_ids.includes(hatId));
  if (relevant.length === 0) return "unknown";
  if (relevant.some((step) => step.verdict === "fail")) return "fail";
  if (relevant.some((step) => step.verdict === "warn" || step.verdict === "unknown")) return "warn";
  return "pass";
}
function buildHatOutputs(steps, fixture) {
  const hats = [
    "driver",
    "verifier",
    "network-observer",
    "state-auditor",
    "performance-watcher",
    "accessibility-during-flow",
    "edge-case-explorer",
    "flake-detector",
    "synthesiser"
  ];
  return hats.map((hatId) => {
    if (hatId === "performance-watcher") {
      const verdict2 = fixture.performance_ms === void 0 ? "unknown" : fixture.performance_ms <= 3e3 ? "pass" : fixture.performance_ms <= 6e3 ? "warn" : "fail";
      return {
        hat_id: hatId,
        verdict: verdict2,
        summary: fixture.performance_ms === void 0 ? "No performance fixture was supplied." : `Fixture reports ${fixture.performance_ms}ms journey duration.`,
        evidence: [
          evidence(
            "manual-note",
            "Performance fixture",
            fixture.performance_ms === void 0 ? "No performance timing supplied." : `${fixture.performance_ms}ms supplied by the fixture.`,
            fixture
          )
        ]
      };
    }
    if (hatId === "accessibility-during-flow") {
      const verdict2 = fixture.accessibility_notes.length === 0 ? "unknown" : fixture.accessibility_notes.some((note) => includesAny(note, ["error", "fail", "blocked"])) ? "fail" : "pass";
      return {
        hat_id: hatId,
        verdict: verdict2,
        summary: fixture.accessibility_notes.length === 0 ? "No accessibility fixture was supplied." : `Accessibility notes supplied: ${fixture.accessibility_notes.length}.`,
        evidence: [
          evidence(
            "accessibility-snapshot",
            "Accessibility fixture",
            fixture.accessibility_notes[0] ?? "No accessibility note supplied.",
            fixture
          )
        ]
      };
    }
    if (hatId === "flake-detector") {
      const verdict2 = fixture.console_errors.length > 0 ? "warn" : fixture.performance_ms === void 0 ? "unknown" : "pass";
      return {
        hat_id: hatId,
        verdict: verdict2,
        summary: fixture.console_errors.length > 0 ? "Console errors were supplied in the fixture, so flake risk needs review." : "No console-error fixture signals were supplied.",
        evidence: [
          evidence(
            "console-log",
            "Console fixture",
            fixture.console_errors[0] ?? "No console errors supplied.",
            fixture
          )
        ]
      };
    }
    const verdict = hatVerdictFromSteps(steps, hatId);
    return {
      hat_id: hatId,
      verdict,
      summary: `${hatId} reviewed its relevant fixture evidence and returned ${verdict}.`,
      evidence: [
        evidence(
          "hat-output",
          `${hatId} summary`,
          `${hatId} verdict ${verdict}.`,
          fixture
        )
      ]
    };
  });
}
function buildDisagreements(hats) {
  const driver = hats.find((hat) => hat.hat_id === "driver");
  const verifier = hats.find((hat) => hat.hat_id === "verifier");
  if (!driver || !verifier || driver.verdict === verifier.verdict) return [];
  return [
    {
      id: `flowpass-disagreement-${createHash("sha256").update(`${driver.verdict}:${verifier.verdict}`).digest("hex").slice(0, 8)}`,
      driver_verdict: driver.verdict,
      verifier_verdict: verifier.verdict,
      summary: "Driver and Verifier disagree on the fixture journey. Human resolution is needed before this flow becomes a gate.",
      status: "open"
    }
  ];
}
function scoreSteps(steps) {
  if (steps.length === 0) return 0;
  return Math.round(steps.reduce((total, step) => total + step.score, 0) / steps.length);
}
function runFlowPass(input) {
  const parsed = FlowPassRunInputSchema.parse(input);
  const scannerSource = FlowPassGeoPassAdapterSchema.parse(
    parsed.scanner_source ?? {
      source: "geopass",
      target_url: parsed.target_url,
      mode: parsed.mode,
      shared_check_ids: ["aggregate-ai-engine-readiness"]
    }
  );
  if (parsed.mode === "plan-only" || !parsed.fixture) {
    return createPlanOnlyFlowPassReport({
      targetUrl: parsed.target_url,
      generatedAt: parsed.generated_at,
      journeyId: parsed.journey_id,
      journeyName: parsed.journey_name,
      journeyKind: parsed.journey_kind,
      steps: parsed.steps,
      scannerSource,
      notes: [
        ...parsed.notes,
        "FlowPass returned a plan-only report because no public fixture was supplied."
      ]
    });
  }
  const fixture = FlowPassFixtureSchema.parse(parsed.fixture);
  const plan = createFlowPassPlan({
    targetUrl: parsed.target_url,
    journeyId: parsed.journey_id,
    journeyName: parsed.journey_name,
    journeyKind: parsed.journey_kind,
    steps: parsed.steps
  });
  const stepResults = plan.steps.map((step) => evaluateStep(step.id, fixture));
  const hats = buildHatOutputs(stepResults, fixture);
  const verdict = reportVerdict(stepResults);
  const score = scoreSteps(stepResults);
  const runId = makeRunId({
    target_url: parsed.target_url,
    journey: plan.journey,
    profile: parsed.profile,
    steps: stepResults.map((step) => [step.step_id, step.verdict, step.score])
  });
  return FlowPassReportSchema.parse({
    run_id: runId,
    target_url: plan.targetUrl,
    generated_at: parsed.generated_at ?? (/* @__PURE__ */ new Date(0)).toISOString(),
    mode: "fixture",
    profile: parsed.profile,
    journey: plan.journey,
    journey_readiness_score: score,
    verdict,
    steps: stepResults,
    scanner_source: {
      kind: "fixture",
      mode: scannerSource.mode ?? "fixture",
      target_url: scannerSource.target_url,
      shared_check_ids: scannerSource.shared_check_ids
    },
    summary: {
      posture: postureFor(verdict),
      counts_by_verdict: countsByVerdict(stepResults),
      counts_by_severity: countsBySeverity(stepResults),
      coverage_note: "This FlowPass result covers only the supplied public fixture. Unknown live browser, auth, billing, email, database, visual, and multi-region paths stay unknown unless separately checked."
    },
    hats,
    not_checked: FLOWPASS_NOT_CHECKED,
    disagreements: buildDisagreements(hats),
    notes: [
      ...parsed.notes,
      "FlowPass ran deterministic fixture checks only. It did not execute live auth, checkout, billing, email, production database writes, or destructive submissions."
    ]
  });
}

// packages/flowpass/src/reporter.ts
var SEVERITIES = ["critical", "high", "medium", "low", "info"];
function escapeHtml(value) {
  return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function escapeMarkdown(value) {
  return String(value ?? "").replace(/\r?\n/g, " ").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function findingLines(finding2) {
  return [
    `- ${escapeMarkdown(finding2.severity)}: ${escapeMarkdown(finding2.title)}`,
    `  - Evidence: ${escapeMarkdown(finding2.summary)}`,
    ...finding2.recommendation ? [`  - Next: ${escapeMarkdown(finding2.recommendation)}`] : []
  ];
}
function stepSummary(step) {
  return `${step.label}: ${step.verdict}, ${step.score}/100`;
}
function defaultOgImageUrl(report) {
  const target = new URL(report.target_url);
  return `${target.protocol}//${target.host}/og-image.png`;
}
function severityLines(report) {
  const counts = report.summary?.counts_by_severity;
  if (!counts) return ["- No severity summary was generated."];
  return SEVERITIES.map((severity) => `- ${severity}: ${counts[severity]}`);
}
function generateFlowPassJsonReport(report) {
  return {
    ...report,
    generated_report_at: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function generateFlowPassFixPrompt(report) {
  const findings = report.steps.flatMap((step) => step.findings);
  const lines = [
    "FlowPass journey-fix prompt",
    "",
    `Target: ${report.target_url}`,
    `Journey: ${report.journey.name}`,
    "",
    "Fix only the journey proof gaps below. Keep changes scoped to the user path, receipt, recovery state, or fixture evidence named by FlowPass."
  ];
  if (findings.length === 0) {
    lines.push("", "No blocking journey findings were detected in this fixture run.");
  } else {
    lines.push("", "Findings");
    for (const item of findings) lines.push(...findingLines(item));
  }
  lines.push(
    "",
    "After fixing, rerun FlowPass with the same journey and attach the new receipt to the PR or Boardroom job."
  );
  return lines.join("\n");
}
function generateFlowPassMarkdownReport(report) {
  const lines = [
    `# FlowPass Report - ${escapeMarkdown(report.journey.name)}`,
    "",
    `Target: ${escapeMarkdown(report.target_url)}`,
    "",
    `Mode: ${escapeMarkdown(report.mode)}`,
    "",
    `Verdict: ${escapeMarkdown(report.verdict)}`,
    "",
    `Journey readiness score: ${report.journey_readiness_score}/100`,
    "",
    `Posture: ${escapeMarkdown(report.summary?.posture ?? "No posture summary was generated.")}`,
    "",
    `Coverage: ${escapeMarkdown(report.summary?.coverage_note ?? "No coverage summary was generated.")}`,
    "",
    "## Steps",
    ""
  ];
  for (const step of report.steps) {
    lines.push(`- ${escapeMarkdown(stepSummary(step))}`);
    for (const comment of step.comments) lines.push(`  - ${escapeMarkdown(comment)}`);
    for (const item of step.findings) lines.push(...findingLines(item));
  }
  lines.push("", "## Hat panel", "");
  if (report.hats.length === 0) {
    lines.push("- No hat outputs were generated.");
  } else {
    for (const hat of report.hats) {
      lines.push(`- ${escapeMarkdown(hat.hat_id)}: ${escapeMarkdown(hat.verdict)}. ${escapeMarkdown(hat.summary)}`);
    }
  }
  lines.push("", "## Severity counts", "", ...severityLines(report));
  lines.push("", "## Disagreements", "");
  if (report.disagreements.length === 0) {
    lines.push("- No open Driver versus Verifier disagreement.");
  } else {
    for (const disagreement of report.disagreements) {
      lines.push(`- ${escapeMarkdown(disagreement.id)}: ${escapeMarkdown(disagreement.summary)}`);
    }
  }
  lines.push("", "## Not checked", "");
  for (const item of report.not_checked) {
    lines.push(`- ${escapeMarkdown(item.label)}: ${escapeMarkdown(item.reason)}`);
  }
  lines.push("", "## Build-fix prompt", "", "```text", generateFlowPassFixPrompt(report), "```", "");
  return lines.join("\n");
}
function generateFlowPassHtmlReport(report, options = {}) {
  const title = `FlowPass Report - ${report.journey.name}`;
  const description = report.summary?.posture || "FlowPass is a scoped journey proof for end-to-end product readiness.";
  const ogImageUrl = options.ogImageUrl || defaultOgImageUrl(report);
  const steps = report.steps.map(
    (step) => `<li>
        <strong>${escapeHtml(step.label)}: ${escapeHtml(step.verdict)} (${escapeHtml(step.score)}/100)</strong>
        <ul>
          ${step.comments.map((comment) => `<li>${escapeHtml(comment)}</li>`).join("")}
          ${step.findings.map(
      (finding2) => `<li>${escapeHtml(finding2.severity)}: ${escapeHtml(finding2.title)}
                <p>${escapeHtml(finding2.summary)}</p>
                ${finding2.recommendation ? `<p><strong>Next:</strong> ${escapeHtml(finding2.recommendation)}</p>` : ""}
              </li>`
    ).join("")}
        </ul>
      </li>`
  ).join("");
  const hats = report.hats.map((hat) => `<li>${escapeHtml(hat.hat_id)}: ${escapeHtml(hat.verdict)}. ${escapeHtml(hat.summary)}</li>`).join("");
  const notChecked = report.not_checked.map((item) => `<li>${escapeHtml(item.label)}: ${escapeHtml(item.reason)}</li>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}">
  <style>
    body { font-family: system-ui, sans-serif; margin: 32px; color: #111827; line-height: 1.5; }
    .banner { border: 1px solid #0ea5e9; background: #f0f9ff; padding: 16px; border-radius: 8px; }
    li { margin-bottom: 10px; }
    pre { white-space: pre-wrap; background: #f8fafc; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="banner">
    <strong>FlowPass is a scoped journey proof, not a production certification.</strong>
    <p>${escapeHtml(report.summary?.coverage_note ?? "Unknown live paths stay unknown unless separately checked.")}</p>
  </div>
  <h1>${escapeHtml(title)}</h1>
  <p><strong>Target:</strong> ${escapeHtml(report.target_url)}</p>
  <p><strong>Mode:</strong> ${escapeHtml(report.mode)}</p>
  <p><strong>Verdict:</strong> ${escapeHtml(report.verdict)}</p>
  <p><strong>Score:</strong> ${escapeHtml(report.journey_readiness_score)}/100</p>
  <p>${escapeHtml(report.summary?.posture ?? "")}</p>
  <h2>Steps</h2>
  <ul>${steps}</ul>
  <h2>Hat panel</h2>
  <ul>${hats || "<li>No hat outputs were generated.</li>"}</ul>
  <h2>Not checked</h2>
  <ul>${notChecked || "<li>No exclusions were recorded.</li>"}</ul>
  <h2>Build-fix prompt</h2>
  <pre>${escapeHtml(generateFlowPassFixPrompt(report))}</pre>
</body>
</html>`;
}

// packages/flowpass/src/pack.ts
import yaml from "js-yaml";
var ALL_STEP_IDS = [
  "entry-route",
  "primary-cta",
  "form-readiness",
  "success-state",
  "failure-state",
  "navigation-continuity",
  "handoff-proof"
];
var STEP_KEYWORDS = [
  { step: "entry-route", terms: ["go to", "homepage", "load", "route", "open"] },
  { step: "primary-cta", terms: ["click", "cta", "sign up", "signup", "start", "continue", "submit"] },
  { step: "form-readiness", terms: ["fill", "form", "field", "email", "input", "type"] },
  { step: "success-state", terms: ["success", "appears", "created", "confirmed", "verify", "project list"] },
  { step: "failure-state", terms: ["invalid", "error", "required", "try again", "fail", "recover"] },
  { step: "navigation-continuity", terms: ["back", "next", "navigation", "continue", "dashboard"] },
  { step: "handoff-proof", terms: ["receipt", "email", "webhook", "database", "db", "ticket", "handoff", "proof"] }
];
function slug(value) {
  const normalized = value.toLocaleLowerCase("en-US").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  return normalized || "flowpass-pack";
}
function normalizeText(value) {
  return String(value ?? "").toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}
function firstDuplicate(values) {
  const seen = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (seen.has(value)) return value;
    seen.add(value);
  }
  return null;
}
function assertionToText(value) {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}
function stepToText(value) {
  if (typeof value === "string") return value;
  if ("label" in value && typeof value.label === "string") return value.label;
  return JSON.stringify(value);
}
function inferStepIds(steps) {
  const ids = /* @__PURE__ */ new Set();
  for (const step of steps) {
    if (typeof step === "object" && step !== null && "id" in step) {
      const id = String(step.id);
      if (ALL_STEP_IDS.includes(id)) ids.add(id);
    }
    const text = normalizeText(stepToText(step));
    for (const { step: stepId, terms } of STEP_KEYWORDS) {
      if (terms.some((term) => text.includes(term))) ids.add(stepId);
    }
  }
  return ids.size > 0 ? ALL_STEP_IDS.filter((step) => ids.has(step)) : ALL_STEP_IDS;
}
function maybeFixture(raw) {
  const fixture = raw.fixtures?.flowpass_fixture ?? raw.fixtures?.fixture;
  if (!fixture || typeof fixture !== "object" || Array.isArray(fixture)) return void 0;
  return FlowPassFixtureSchema.parse(fixture);
}
function loadRawPack(input) {
  if (typeof input !== "string") return { raw: input, source: "object" };
  const parsed = yaml.load(input);
  return { raw: parsed, source: "yaml" };
}
function parseFlowPassPack(input) {
  const { raw, source } = loadRawPack(input);
  const parsed = FlowPassUserPackSchema.parse(raw);
  const packName = parsed.name ?? parsed.flow ?? parsed.journey?.name ?? "FlowPass journey";
  const journeyId = parsed.journey?.id ?? parsed.flow ?? slug(packName);
  const journeyName = parsed.journey?.name ?? packName;
  const plainEnglishSteps = parsed.steps.map(stepToText);
  const assertions = parsed.assertions.map(assertionToText);
  const duplicateHat = firstDuplicate(parsed.hats);
  if (duplicateHat) {
    throw new Error(`FlowPass pack hats must be unique. Duplicate hat: ${duplicateHat}`);
  }
  return {
    id: slug(journeyId),
    name: packName,
    targetUrl: new URL(parsed.url).toString(),
    description: parsed.description,
    tags: parsed.tags,
    journey: {
      id: slug(journeyId),
      name: journeyName,
      kind: parsed.journey?.kind ?? "custom"
    },
    steps: inferStepIds(parsed.steps),
    plainEnglishSteps,
    assertions,
    hats: parsed.hats,
    fixture: maybeFixture(parsed),
    source
  };
}

// packages/flowpass/src/fixtures.ts
var FLOWPASS_INTERNAL_DOGFOOD_FIXTURE = {
  route_status: 200,
  page_title: "UnClick FlowPass dogfood journey",
  text: "Start the FlowPass journey, fill the public fixture form, recover from invalid input, complete the run, and keep the proof receipt.",
  source_url: "https://unclick.world/flowpass",
  links: [
    { label: "Start FlowPass", href: "/flowpass/start", role: "link", primary: true },
    { label: "Continue to proof", href: "/flowpass/proof", role: "link" },
    { label: "Back to dashboard", href: "/admin", role: "link" }
  ],
  buttons: [
    { label: "Run fixture journey", role: "button", primary: true }
  ],
  forms: [
    {
      name: "FlowPass fixture form",
      action: "/api/flowpass/fixture",
      fields: ["email", "journey_name", "target_url"],
      required_fields: ["email", "target_url"],
      submit_label: "Run fixture journey"
    }
  ],
  success_signals: ["Journey complete. Receipt flowpass_fixture_001 created."],
  failure_signals: ["Invalid target URL. Fix the URL and try again."],
  handoff_signals: ["Receipt flowpass_fixture_001 links the run, evidence, and next action."],
  network_events: [
    { method: "GET", url: "/flowpass", status: 200 },
    { method: "POST", url: "/api/flowpass/fixture", status: 200 }
  ],
  console_errors: [],
  performance_ms: 1180,
  accessibility_notes: ["Public fixture labels and primary action names are present."],
  side_channels: [
    {
      kind: "api",
      label: "Fixture receipt API",
      status: "observed",
      summary: "The fixture run returns a receipt id without touching production data."
    }
  ],
  screenshots: [
    { label: "FlowPass fixture journey ready state", path: "public/dogfood/flowpass-fixture.png" }
  ]
};
var FLOWPASS_INTERNAL_DOGFOOD_INPUT = {
  target_url: "https://unclick.world/flowpass",
  generated_at: "2026-05-28T00:00:00.000Z",
  mode: "fixture",
  profile: "standard",
  journey_id: "flowpass-internal-dogfood",
  journey_name: "FlowPass internal dogfood journey",
  journey_kind: "onboarding",
  fixture: FLOWPASS_INTERNAL_DOGFOOD_FIXTURE,
  notes: [
    "Internal dogfood fixture for FlowPass package, MCP, and XPass receipt proof."
  ]
};
export {
  DEFAULT_FLOWPASS_STEPS,
  FLOWPASS_INTERNAL_DOGFOOD_FIXTURE,
  FLOWPASS_INTERNAL_DOGFOOD_INPUT,
  FLOWPASS_NOT_CHECKED,
  FlowPassDisagreementSchema,
  FlowPassEvidenceSchema,
  FlowPassFindingSchema,
  FlowPassFixtureFormSchema,
  FlowPassFixtureLinkSchema,
  FlowPassFixtureSchema,
  FlowPassGeoPassAdapterSchema,
  FlowPassHatIdSchema,
  FlowPassHatOutputSchema,
  FlowPassJourneyKindSchema,
  FlowPassNotCheckedSchema,
  FlowPassPackSchema,
  FlowPassProfileSchema,
  FlowPassReportSchema,
  FlowPassReportVerdictSchema,
  FlowPassRunInputSchema,
  FlowPassScannerSourceSchema,
  FlowPassSeveritySchema,
  FlowPassSideChannelSchema,
  FlowPassStepIdSchema,
  FlowPassStepResultSchema,
  FlowPassStepSchema,
  FlowPassStepVerdictSchema,
  FlowPassSummarySchema,
  FlowPassUserPackSchema,
  createFlowPassPlan,
  createFlowPassVerdictPack,
  createPlanOnlyFlowPassReport,
  generateFlowPassFixPrompt,
  generateFlowPassHtmlReport,
  generateFlowPassJsonReport,
  generateFlowPassMarkdownReport,
  parseFlowPassPack,
  runFlowPass
};
