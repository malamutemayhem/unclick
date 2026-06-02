import { createHash } from "node:crypto";

import { createFlowPassPlan } from "./flow-plan.js";
import { createPlanOnlyFlowPassReport } from "./verdict-pack.js";
import {
  FlowPassFixtureSchema,
  FlowPassGeoPassAdapterSchema,
  FlowPassReportSchema,
  FlowPassRunInputSchema,
  type FlowPassDisagreement,
  type FlowPassEvidence,
  type FlowPassFinding,
  type FlowPassFixture,
  type FlowPassHatOutput,
  type FlowPassNotChecked,
  type FlowPassReport,
  type FlowPassRunInput,
  type FlowPassSeverity,
  type FlowPassStepId,
  type FlowPassStepResult,
  type FlowPassStepVerdict,
} from "./schema.js";

const SENSITIVE_PATTERN =
  /\b(api[_ -]?key|bearer|password|secret|sk-[a-z0-9_-]{8,}|token)\b/i;

const CTA_TERMS = [
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
  "run",
];

const SUCCESS_TERMS = [
  "success",
  "complete",
  "completed",
  "confirmed",
  "created",
  "receipt",
  "done",
  "welcome",
  "thank you",
];

const FAILURE_TERMS = [
  "error",
  "invalid",
  "required",
  "try again",
  "recover",
  "failed",
  "missing",
];

const HANDOFF_TERMS = [
  "receipt",
  "confirmation",
  "handoff",
  "next step",
  "reference",
  "run id",
  "job id",
  "ticket",
  "proof",
];

export const FLOWPASS_NOT_CHECKED: FlowPassNotChecked[] = [
  {
    label: "Live browser execution",
    reason:
      "This safe runner evaluates caller-provided public fixtures and does not drive Stagehand, Playwright, auth, checkout, billing, or destructive flows.",
  },
  {
    label: "rrweb and video capture",
    reason:
      "Replay capture is reserved for the live-readonly runner. Fixture runs only preserve structured evidence summaries.",
  },
  {
    label: "Real email, SMS, webhook, and database assertions",
    reason:
      "Side-channel assertions can be supplied as fixtures, but this runner does not touch live delivery systems or production data.",
  },
  {
    label: "Visual pixel diff",
    reason:
      "Screenshot labels can be attached as evidence, but Backstop or odiff execution is not run in this deterministic slice.",
  },
  {
    label: "Synthetic multi-region monitoring",
    reason:
      "Cohorted alerting is part of the scheduled monitoring tier and is not claimed by a single fixture run.",
  },
];

function redact(value: string): string {
  return value
    .replace(/\bsk-[a-z0-9_-]{8,}\b/gi, "[redacted-sensitive-token]")
    .replace(
      /\b(?:api[_ -]?key|bearer|password|secret|token)\b[:=\s-]*[^\s.,;)]*/gi,
      "[redacted-sensitive-token]",
    );
}

function normalize(value: unknown): string {
  return String(value ?? "").toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}

function includesAny(value: string, terms: string[]): boolean {
  const normalized = normalize(value);
  return terms.some((term) => normalized.includes(term));
}

function compact(value: string, max = 220): string {
  const cleaned = redact(value).replace(/\s+/g, " ").trim();
  return cleaned.length > max ? `${cleaned.slice(0, max - 3)}...` : cleaned;
}

function fixtureText(fixture: FlowPassFixture): string {
  return [
    fixture.page_title,
    fixture.text,
    fixture.html,
    ...fixture.links.map((link) => `${link.label} ${link.href ?? ""} ${link.role ?? ""}`),
    ...fixture.buttons.map((button) => `${button.label} ${button.href ?? ""} ${button.role ?? ""}`),
    ...fixture.forms.map((form) =>
      `${form.name ?? ""} ${form.action ?? ""} ${form.submit_label ?? ""} ${form.fields.join(" ")}`,
    ),
    ...fixture.success_signals,
    ...fixture.failure_signals,
    ...fixture.handoff_signals,
    ...fixture.side_channels.map((channel) => `${channel.label} ${channel.summary}`),
  ].join(" ");
}

function makeRunId(input: unknown): string {
  return `flowpass_${createHash("sha256")
    .update(JSON.stringify(input))
    .digest("hex")
    .slice(0, 12)}`;
}

function evidence(
  kind: FlowPassEvidence["kind"],
  label: string,
  summary: string,
  fixture: FlowPassFixture,
): FlowPassEvidence {
  return {
    kind,
    label,
    summary: compact(summary),
    ...(fixture.source_url ? { source_url: fixture.source_url } : {}),
  };
}

function finding(
  stepId: FlowPassStepId,
  severity: FlowPassSeverity,
  title: string,
  summary: string,
  recommendation: string,
  evidenceItems: FlowPassEvidence[],
): FlowPassFinding {
  return {
    id: `${stepId}-${createHash("sha256").update(title + summary).digest("hex").slice(0, 8)}`,
    step_id: stepId,
    severity,
    title,
    summary,
    recommendation,
    evidence: evidenceItems,
  };
}

function resultFor(
  stepId: FlowPassStepId,
  label: string,
  verdict: FlowPassStepVerdict,
  score: number,
  evidenceItems: FlowPassEvidence[],
  findings: FlowPassFinding[],
  comments: string[],
  hatIds: StepHatId[],
): FlowPassStepResult {
  return {
    step_id: stepId,
    label,
    score,
    verdict,
    evidence: evidenceItems,
    findings,
    comments,
    hat_ids: hatIds,
  };
}

type StepHatId =
  | "driver"
  | "verifier"
  | "network-observer"
  | "state-auditor"
  | "performance-watcher"
  | "accessibility-during-flow"
  | "edge-case-explorer"
  | "flake-detector"
  | "synthesiser";

function entryRouteResult(fixture: FlowPassFixture): FlowPassStepResult {
  const status = fixture.route_status;
  const hasPage = Boolean(fixture.text?.trim() || fixture.html?.trim() || fixture.page_title?.trim());
  const evidenceItems = [
    evidence(
      "route",
      "Route fixture",
      status ? `Fixture route status ${status}.` : "No route status was supplied.",
      fixture,
    ),
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
      ["driver", "verifier", "network-observer"],
    );
  }

  const severity: FlowPassSeverity = status && status >= 500 ? "critical" : "high";
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
        evidenceItems,
      ),
    ],
    ["The journey cannot be called ready until the first route has proof."],
    ["driver", "verifier", "network-observer"],
  );
}

function primaryCtaResult(fixture: FlowPassFixture): FlowPassStepResult {
  const candidates = [...fixture.links, ...fixture.buttons];
  const primary = candidates.find((candidate) => candidate.primary === true);
  const named = candidates.find((candidate) => includesAny(candidate.label, CTA_TERMS));
  const cta = primary ?? named;
  const evidenceItems = [
    evidence(
      "link",
      "CTA fixture",
      cta
        ? `Found CTA candidate "${cta.label}"${cta.href ? ` -> ${cta.href}` : ""}.`
        : "No CTA candidate was supplied.",
      fixture,
    ),
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
      ["driver", "verifier"],
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
          evidenceItems,
        ),
      ],
      ["CTA copy exists, but reachability is not fully proven."],
      ["driver", "verifier"],
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
        evidenceItems,
      ),
    ],
    ["The journey has no proven next action."],
    ["driver", "verifier"],
  );
}

function formReadinessResult(fixture: FlowPassFixture): FlowPassStepResult {
  const form = fixture.forms.find((candidate) => candidate.fields.length > 0) ?? fixture.forms[0];
  const hasSubmit = Boolean(form?.submit_label || form?.action);
  const evidenceItems = [
    evidence(
      "form",
      "Form fixture",
      form
        ? `Found form "${form.name ?? "unnamed"}" with ${form.fields.length} field(s).`
        : "No form fixture was supplied.",
      fixture,
    ),
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
      ["driver", "verifier", "state-auditor"],
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
          evidenceItems,
        ),
      ],
      ["The input surface exists, but the completion action is unclear."],
      ["driver", "verifier", "state-auditor"],
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
        evidenceItems,
      ),
    ],
    ["FlowPass cannot prove fixture input can be entered."],
    ["driver", "verifier", "state-auditor"],
  );
}

function successStateResult(fixture: FlowPassFixture): FlowPassStepResult {
  const text = fixtureText(fixture);
  const hasSuccess = fixture.success_signals.length > 0 || includesAny(text, SUCCESS_TERMS);
  const evidenceItems = [
    evidence(
      "state-signal",
      "Success state fixture",
      hasSuccess
        ? `Success signal: ${fixture.success_signals[0] ?? "success-like text found in page fixture"}.`
        : "No success state signal was supplied.",
      fixture,
    ),
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
      ["verifier", "state-auditor", "synthesiser"],
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
        evidenceItems,
      ),
    ],
    ["An end-to-end journey needs a clear finish line."],
    ["verifier", "state-auditor", "synthesiser"],
  );
}

function failureStateResult(fixture: FlowPassFixture): FlowPassStepResult {
  const text = fixtureText(fixture);
  const hasFailure = fixture.failure_signals.length > 0 || includesAny(text, FAILURE_TERMS);
  const evidenceItems = [
    evidence(
      "state-signal",
      "Failure state fixture",
      hasFailure
        ? `Failure or recovery signal: ${fixture.failure_signals[0] ?? "failure-like text found in page fixture"}.`
        : "No failure or recovery state signal was supplied.",
      fixture,
    ),
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
      ["verifier", "state-auditor", "edge-case-explorer"],
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
        evidenceItems,
      ),
    ],
    ["The happy path may work, but recovery is not proven."],
    ["verifier", "state-auditor", "edge-case-explorer"],
  );
}

function navigationContinuityResult(fixture: FlowPassFixture): FlowPassStepResult {
  const links = fixture.links;
  const hasContinuity = links.some((link) =>
    includesAny(`${link.label} ${link.href ?? ""}`, ["back", "next", "continue", "dashboard", "home", "project"]),
  );
  const evidenceItems = [
    evidence(
      "link",
      "Navigation fixture",
      links.length > 0
        ? `Found ${links.length} navigation link(s).`
        : "No navigation link fixture was supplied.",
      fixture,
    ),
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
      ["driver", "verifier"],
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
          evidenceItems,
        ),
      ],
      ["The fixture has links, but continuity intent is unclear."],
      ["driver", "verifier"],
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
        evidenceItems,
      ),
    ],
    ["A completed path still needs a route out."],
    ["driver", "verifier"],
  );
}

function handoffProofResult(fixture: FlowPassFixture): FlowPassStepResult {
  const text = fixtureText(fixture);
  const sideChannelProof = fixture.side_channels.some((channel) => channel.status === "observed");
  const hasHandoff =
    fixture.handoff_signals.length > 0 ||
    sideChannelProof ||
    includesAny(text, HANDOFF_TERMS);
  const evidenceItems = [
    evidence(
      sideChannelProof ? "side-channel" : "manual-note",
      "Handoff fixture",
      hasHandoff
        ? `Handoff signal: ${fixture.handoff_signals[0] ?? fixture.side_channels[0]?.summary ?? "handoff-like text found"}.`
        : "No receipt, state handoff, or side-channel proof was supplied.",
      fixture,
    ),
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
      ["verifier", "state-auditor", "synthesiser"],
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
        evidenceItems,
      ),
    ],
    ["Without handoff proof, FlowPass cannot prove the journey finished in a useful state."],
    ["verifier", "state-auditor", "synthesiser"],
  );
}

function evaluateStep(stepId: FlowPassStepId, fixture: FlowPassFixture): FlowPassStepResult {
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

function countsByVerdict(steps: FlowPassStepResult[]) {
  return steps.reduce(
    (counts, step) => {
      counts[step.verdict] += 1;
      return counts;
    },
    { pass: 0, warn: 0, fail: 0, unknown: 0 },
  );
}

function countsBySeverity(steps: FlowPassStepResult[]) {
  return steps
    .flatMap((step) => step.findings)
    .reduce(
      (counts, item) => {
        counts[item.severity] += 1;
        return counts;
      },
      { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
    );
}

function reportVerdict(steps: FlowPassStepResult[]): FlowPassReport["verdict"] {
  if (steps.some((step) => step.verdict === "fail")) return "blocked";
  if (steps.some((step) => step.verdict === "warn" || step.verdict === "unknown")) return "needs-work";
  return "ready";
}

function postureFor(verdict: FlowPassReport["verdict"]): string {
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

function hatVerdictFromSteps(steps: FlowPassStepResult[], hatId: FlowPassHatOutput["hat_id"]): FlowPassStepVerdict {
  const relevant = steps.filter((step) => step.hat_ids.includes(hatId));
  if (relevant.length === 0) return "unknown";
  if (relevant.some((step) => step.verdict === "fail")) return "fail";
  if (relevant.some((step) => step.verdict === "warn" || step.verdict === "unknown")) return "warn";
  return "pass";
}

function buildHatOutputs(steps: FlowPassStepResult[], fixture: FlowPassFixture): FlowPassHatOutput[] {
  const hats: FlowPassHatOutput["hat_id"][] = [
    "driver",
    "verifier",
    "network-observer",
    "state-auditor",
    "performance-watcher",
    "accessibility-during-flow",
    "edge-case-explorer",
    "flake-detector",
    "synthesiser",
  ];

  return hats.map((hatId) => {
    if (hatId === "performance-watcher") {
      const verdict: FlowPassStepVerdict =
        fixture.performance_ms === undefined
          ? "unknown"
          : fixture.performance_ms <= 3000
            ? "pass"
            : fixture.performance_ms <= 6000
              ? "warn"
              : "fail";
      return {
        hat_id: hatId,
        verdict,
        summary:
          fixture.performance_ms === undefined
            ? "No performance fixture was supplied."
            : `Fixture reports ${fixture.performance_ms}ms journey duration.`,
        evidence: [
          evidence(
            "manual-note",
            "Performance fixture",
            fixture.performance_ms === undefined
              ? "No performance timing supplied."
              : `${fixture.performance_ms}ms supplied by the fixture.`,
            fixture,
          ),
        ],
      };
    }

    if (hatId === "accessibility-during-flow") {
      const verdict: FlowPassStepVerdict =
        fixture.accessibility_notes.length === 0
          ? "unknown"
          : fixture.accessibility_notes.some((note) => includesAny(note, ["error", "fail", "blocked"]))
            ? "fail"
            : "pass";
      return {
        hat_id: hatId,
        verdict,
        summary:
          fixture.accessibility_notes.length === 0
            ? "No accessibility fixture was supplied."
            : `Accessibility notes supplied: ${fixture.accessibility_notes.length}.`,
        evidence: [
          evidence(
            "accessibility-snapshot",
            "Accessibility fixture",
            fixture.accessibility_notes[0] ?? "No accessibility note supplied.",
            fixture,
          ),
        ],
      };
    }

    if (hatId === "flake-detector") {
      const verdict: FlowPassStepVerdict =
        fixture.console_errors.length > 0
          ? "warn"
          : fixture.performance_ms === undefined
            ? "unknown"
            : "pass";
      return {
        hat_id: hatId,
        verdict,
        summary:
          fixture.console_errors.length > 0
            ? "Console errors were supplied in the fixture, so flake risk needs review."
            : "No console-error fixture signals were supplied.",
        evidence: [
          evidence(
            "console-log",
            "Console fixture",
            fixture.console_errors[0] ?? "No console errors supplied.",
            fixture,
          ),
        ],
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
          fixture,
        ),
      ],
    };
  });
}

function buildDisagreements(hats: FlowPassHatOutput[]): FlowPassDisagreement[] {
  const driver = hats.find((hat) => hat.hat_id === "driver");
  const verifier = hats.find((hat) => hat.hat_id === "verifier");
  if (!driver || !verifier || driver.verdict === verifier.verdict) return [];
  return [
    {
      id: `flowpass-disagreement-${createHash("sha256")
        .update(`${driver.verdict}:${verifier.verdict}`)
        .digest("hex")
        .slice(0, 8)}`,
      driver_verdict: driver.verdict,
      verifier_verdict: verifier.verdict,
      summary:
        "Driver and Verifier disagree on the fixture journey. Human resolution is needed before this flow becomes a gate.",
      status: "open",
    },
  ];
}

function scoreSteps(steps: FlowPassStepResult[]): number {
  if (steps.length === 0) return 0;
  return Math.round(steps.reduce((total, step) => total + step.score, 0) / steps.length);
}

export function runFlowPass(input: FlowPassRunInput): FlowPassReport {
  const parsed = FlowPassRunInputSchema.parse(input);
  const scannerSource = FlowPassGeoPassAdapterSchema.parse(
    parsed.scanner_source ?? {
      source: "geopass",
      target_url: parsed.target_url,
      mode: parsed.mode,
      shared_check_ids: ["aggregate-ai-engine-readiness"],
    },
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
        "FlowPass returned a plan-only report because no public fixture was supplied.",
      ],
    });
  }

  const fixture = FlowPassFixtureSchema.parse(parsed.fixture);
  const plan = createFlowPassPlan({
    targetUrl: parsed.target_url,
    journeyId: parsed.journey_id,
    journeyName: parsed.journey_name,
    journeyKind: parsed.journey_kind,
    steps: parsed.steps,
  });
  const stepResults = plan.steps.map((step) => evaluateStep(step.id, fixture));
  const hats = buildHatOutputs(stepResults, fixture);
  const verdict = reportVerdict(stepResults);
  const score = scoreSteps(stepResults);
  const runId = makeRunId({
    target_url: parsed.target_url,
    journey: plan.journey,
    profile: parsed.profile,
    steps: stepResults.map((step) => [step.step_id, step.verdict, step.score]),
  });

  return FlowPassReportSchema.parse({
    run_id: runId,
    target_url: plan.targetUrl,
    generated_at: parsed.generated_at ?? new Date(0).toISOString(),
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
      shared_check_ids: scannerSource.shared_check_ids,
    },
    summary: {
      posture: postureFor(verdict),
      counts_by_verdict: countsByVerdict(stepResults),
      counts_by_severity: countsBySeverity(stepResults),
      coverage_note:
        "This FlowPass result covers only the supplied public fixture. Unknown live browser, auth, billing, email, database, visual, and multi-region paths stay unknown unless separately checked.",
    },
    hats,
    not_checked: FLOWPASS_NOT_CHECKED,
    disagreements: buildDisagreements(hats),
    notes: [
      ...parsed.notes,
      "FlowPass ran deterministic fixture checks only. It did not execute live auth, checkout, billing, email, production database writes, or destructive submissions.",
    ],
  });
}
