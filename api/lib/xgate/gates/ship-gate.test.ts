import { describe, expect, it } from "vitest";

import { shipGate } from "./ship-gate.js";
import type { GateContext } from "../types.js";

function makeContext(overrides: Partial<GateContext> = {}): GateContext {
  return {
    action: {
      class: "ship",
      raw: "vercel deploy --prod",
      tool: "vercel",
      targetEnv: "prod",
      parsed: {},
    },
    environment: "prod",
    autonomyLevel: "interactive",
    now: 1_777_777_777,
    ...overrides,
  };
}

describe("shipGate", () => {
  it("denies a production deploy without proof", () => {
    const verdict = shipGate(makeContext());

    expect(verdict.verdict).toBe("deny");
    expect(verdict.ruleId).toBe("ship.no_proof");
  });

  it("asks for interactive approval on a production deploy with proof", () => {
    const verdict = shipGate(makeContext({
      action: {
        class: "ship",
        raw: "vercel deploy --prod",
        tool: "vercel",
        targetEnv: "prod",
        parsed: {
          proofRef: "xpass_receipt_v1:abc123",
        },
      },
    }));

    expect(verdict.verdict).toBe("ask");
    expect(verdict.ruleId).toBe("ship.prod_interactive");
    expect(verdict.evidence).toContain("proofRef=xpass_receipt_v1:abc123");
  });

  it("allows staging deploys without production proof friction", () => {
    const verdict = shipGate(makeContext({
      action: {
        class: "ship",
        raw: "vercel deploy",
        tool: "vercel",
        targetEnv: "staging",
        parsed: {},
      },
      environment: "staging",
    }));

    expect(verdict.verdict).toBe("allow");
    expect(verdict.ruleId).toBe("ship.non_prod");
  });

  it("denies unattended production deploys without a preauthorized token", () => {
    const verdict = shipGate(makeContext({
      action: {
        class: "ship",
        raw: "vercel deploy --prod",
        tool: "vercel",
        targetEnv: "prod",
        parsed: {
          proofRef: "3333c3e4",
        },
      },
      autonomyLevel: "unattended",
    }));

    expect(verdict.verdict).toBe("deny");
    expect(verdict.ruleId).toBe("ship.unattended_no_token");
  });

  it("allows unattended production deploys with proof and a preauthorized token", () => {
    const verdict = shipGate(makeContext({
      action: {
        class: "ship",
        raw: "vercel deploy --prod",
        tool: "vercel",
        targetEnv: "prod",
        parsed: {
          proofRef: "3333c3e4",
          preauthorizedToken: true,
        },
      },
      autonomyLevel: "unattended",
    }));

    expect(verdict.verdict).toBe("allow");
    expect(verdict.ruleId).toBe("ship.prod_preauthorized");
  });
});
