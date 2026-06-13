import type { Environment, Gate, GateContext, GateResult } from "../types.js";

type ShipOperation = "deploy" | "rollback" | "publish" | "release" | "dns_change" | "infra_apply";

interface ShipGateParsed {
  operation?: ShipOperation | string | null;
  targetEnv?: Environment | null;
  proofRef?: string | null;
  preauthorizedToken?: boolean | null;
  hasPreauthorizedToken?: boolean | null;
  ship?: {
    operation?: ShipOperation | string | null;
    targetEnv?: Environment | null;
    proofRef?: string | null;
    preauthorizedToken?: boolean | null;
    hasPreauthorizedToken?: boolean | null;
  } | null;
}

const SHIP_KEYWORDS = new Set([
  "deploy",
  "deployment",
  "rollback",
  "publish",
  "release",
  "dns",
  "terraform",
  "pulumi",
  "infra",
  "infrastructure",
  "vercel",
  "netlify",
]);

function result(verdict: GateResult["verdict"], ruleId: string, reason: string, evidence: string[]): GateResult {
  return {
    gate: "ShipGate",
    verdict,
    ruleId,
    reason,
    evidence,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parsedShape(ctx: GateContext): ShipGateParsed {
  const parsed = ctx.action.parsed;
  if (!isRecord(parsed)) {
    return {};
  }

  const ship = isRecord(parsed.ship) ? parsed.ship : null;

  return {
    operation: typeof parsed.operation === "string" ? parsed.operation : null,
    targetEnv: parsed.targetEnv === "dev" || parsed.targetEnv === "staging" || parsed.targetEnv === "prod"
      ? parsed.targetEnv
      : null,
    proofRef: typeof parsed.proofRef === "string" ? parsed.proofRef : null,
    preauthorizedToken: parsed.preauthorizedToken === true,
    hasPreauthorizedToken: parsed.hasPreauthorizedToken === true,
    ship: ship
      ? {
          operation: typeof ship.operation === "string" ? ship.operation : null,
          targetEnv: ship.targetEnv === "dev" || ship.targetEnv === "staging" || ship.targetEnv === "prod"
            ? ship.targetEnv
            : null,
          proofRef: typeof ship.proofRef === "string" ? ship.proofRef : null,
          preauthorizedToken: ship.preauthorizedToken === true,
          hasPreauthorizedToken: ship.hasPreauthorizedToken === true,
        }
      : null,
  };
}

function words(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9_./-]+/)
    .filter(Boolean);
}

function hasShipKeyword(value: string): boolean {
  const tokens = words(value);
  if (tokens.some((token) => SHIP_KEYWORDS.has(token))) {
    return true;
  }

  const normalized = tokens.join(" ");
  return normalized.includes("terraform apply") || normalized.includes("pulumi up") || normalized.includes("npm publish");
}

function classifyShipOperation(ctx: GateContext, parsed: ShipGateParsed): boolean {
  if (ctx.action.class === "ship") {
    return true;
  }

  const operation = parsed.ship?.operation ?? parsed.operation;
  if (typeof operation === "string" && hasShipKeyword(operation)) {
    return true;
  }

  return hasShipKeyword(`${ctx.action.tool} ${ctx.action.raw}`);
}

function targetEnvironment(ctx: GateContext, parsed: ShipGateParsed): Environment {
  return parsed.ship?.targetEnv ?? parsed.targetEnv ?? ctx.action.targetEnv ?? ctx.environment;
}

function proofRef(parsed: ShipGateParsed): string | null {
  const proof = parsed.ship?.proofRef ?? parsed.proofRef ?? null;
  if (typeof proof !== "string") {
    return null;
  }

  const trimmed = proof.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function hasPreauthorizedToken(parsed: ShipGateParsed): boolean {
  return parsed.preauthorizedToken === true
    || parsed.hasPreauthorizedToken === true
    || parsed.ship?.preauthorizedToken === true
    || parsed.ship?.hasPreauthorizedToken === true;
}

export const shipGate: Gate = (ctx) => {
  try {
    const parsed = parsedShape(ctx);
    const isShip = classifyShipOperation(ctx, parsed);

    if (!isShip) {
      return result("allow", "ship.not_applicable", "Action is not a ship operation.", [
        `class=${ctx.action.class}`,
        `tool=${ctx.action.tool}`,
      ]);
    }

    const env = targetEnvironment(ctx, parsed);
    const evidence = [
      `class=${ctx.action.class}`,
      `tool=${ctx.action.tool}`,
      `targetEnv=${env}`,
      `autonomy=${ctx.autonomyLevel}`,
    ];

    if (env !== "prod") {
      return result("allow", "ship.non_prod", "Ship operation targets a non-production environment.", evidence);
    }

    const proof = proofRef(parsed);
    if (!proof) {
      return result("deny", "ship.no_proof", "Production ship requires a proof reference before execution.", evidence);
    }

    const proofEvidence = [...evidence, `proofRef=${proof}`];
    if (ctx.autonomyLevel === "interactive") {
      return result("ask", "ship.prod_interactive", "Production ship with proof still requires interactive approval.", proofEvidence);
    }

    if (!hasPreauthorizedToken(parsed)) {
      return result("deny", "ship.unattended_no_token", "Unattended production ship requires a preauthorized token.", proofEvidence);
    }

    return result("allow", "ship.prod_preauthorized", "Unattended production ship has proof and a preauthorized token.", [
      ...proofEvidence,
      "preauthorizedToken=true",
    ]);
  } catch (error) {
    return result("ask", "ship.parse_error", "ShipGate could not safely evaluate the action.", [
      error instanceof Error ? `error=${error.name}` : "error=unknown",
    ]);
  }
};
