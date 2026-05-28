import yaml from "js-yaml";

import {
  FlowPassFixtureSchema,
  FlowPassUserPackSchema,
  type FlowPassFixture,
  type FlowPassHatId,
  type FlowPassJourneyKind,
  type FlowPassStepId,
  type FlowPassUserPack,
} from "./schema.js";

export interface FlowPassNormalizedPack {
  id: string;
  name: string;
  targetUrl: string;
  description?: string;
  tags: string[];
  journey: {
    id: string;
    name: string;
    kind: FlowPassJourneyKind;
  };
  steps: FlowPassStepId[];
  plainEnglishSteps: string[];
  assertions: string[];
  hats: FlowPassHatId[];
  fixture?: FlowPassFixture;
  source: "object" | "yaml";
}

const ALL_STEP_IDS: FlowPassStepId[] = [
  "entry-route",
  "primary-cta",
  "form-readiness",
  "success-state",
  "failure-state",
  "navigation-continuity",
  "handoff-proof",
];

const STEP_KEYWORDS: Array<{ step: FlowPassStepId; terms: string[] }> = [
  { step: "entry-route", terms: ["go to", "homepage", "load", "route", "open"] },
  { step: "primary-cta", terms: ["click", "cta", "sign up", "signup", "start", "continue", "submit"] },
  { step: "form-readiness", terms: ["fill", "form", "field", "email", "input", "type"] },
  { step: "success-state", terms: ["success", "appears", "created", "confirmed", "verify", "project list"] },
  { step: "failure-state", terms: ["invalid", "error", "required", "try again", "fail", "recover"] },
  { step: "navigation-continuity", terms: ["back", "next", "navigation", "continue", "dashboard"] },
  { step: "handoff-proof", terms: ["receipt", "email", "webhook", "database", "db", "ticket", "handoff", "proof"] },
];

function slug(value: string): string {
  const normalized = value
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return normalized || "flowpass-pack";
}

function normalizeText(value: unknown): string {
  return String(value ?? "").toLocaleLowerCase("en-US").replace(/\s+/g, " ").trim();
}

function firstDuplicate(values: string[]): string | null {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) return value;
    seen.add(value);
  }
  return null;
}

function assertionToText(value: unknown): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function stepToText(value: FlowPassUserPack["steps"][number]): string {
  if (typeof value === "string") return value;
  if ("label" in value && typeof value.label === "string") return value.label;
  return JSON.stringify(value);
}

function inferStepIds(steps: FlowPassUserPack["steps"]): FlowPassStepId[] {
  const ids = new Set<FlowPassStepId>();

  for (const step of steps) {
    if (typeof step === "object" && step !== null && "id" in step) {
      const id = String(step.id);
      if ((ALL_STEP_IDS as string[]).includes(id)) ids.add(id as FlowPassStepId);
    }
    const text = normalizeText(stepToText(step));
    for (const { step: stepId, terms } of STEP_KEYWORDS) {
      if (terms.some((term) => text.includes(term))) ids.add(stepId);
    }
  }

  return ids.size > 0 ? ALL_STEP_IDS.filter((step) => ids.has(step)) : ALL_STEP_IDS;
}

function maybeFixture(raw: FlowPassUserPack): FlowPassFixture | undefined {
  const fixture = raw.fixtures?.flowpass_fixture ?? raw.fixtures?.fixture;
  if (!fixture || typeof fixture !== "object" || Array.isArray(fixture)) return undefined;
  return FlowPassFixtureSchema.parse(fixture);
}

function loadRawPack(input: string | unknown): { raw: unknown; source: "object" | "yaml" } {
  if (typeof input !== "string") return { raw: input, source: "object" };
  const parsed = yaml.load(input);
  return { raw: parsed, source: "yaml" };
}

export function parseFlowPassPack(input: string | unknown): FlowPassNormalizedPack {
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
      kind: parsed.journey?.kind ?? "custom",
    },
    steps: inferStepIds(parsed.steps),
    plainEnglishSteps,
    assertions,
    hats: parsed.hats,
    fixture: maybeFixture(parsed),
    source,
  };
}
