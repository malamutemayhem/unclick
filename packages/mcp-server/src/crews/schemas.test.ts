import { describe, expect, it } from "vitest";
import { parseHatTurn, parseSynthesis } from "./schemas.js";

describe("parseHatTurn (HatTurnV1)", () => {
  it("accepts a well-formed hat turn", () => {
    const r = parseHatTurn({
      hat_id: "00000000-0000-0000-0000-000000000001",
      hat_name: "Contrarian",
      key_points: ["The plan rests on a single fragile assumption."],
      confidence: "medium",
      risks: ["assumption may be invalidated by Q3 data"],
      dissent: "We should pause until the assumption is validated.",
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.hat_name).toBe("Contrarian");
      expect(r.value.confidence).toBe("medium");
      expect(r.value.dissent).toBeTypeOf("string");
    }
  });

  it("accepts dissent: null", () => {
    const r = parseHatTurn({
      hat_id: "h1",
      hat_name: "Pragmatist",
      key_points: ["Ship it"],
      confidence: "high",
      risks: [],
      dissent: null,
    });
    expect(r.ok).toBe(true);
  });

  it("rejects missing key_points", () => {
    const r = parseHatTurn({
      hat_id: "h1",
      hat_name: "X",
      key_points: [],
      confidence: "low",
      risks: [],
      dissent: null,
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/key_points/);
  });

  it("rejects an unknown confidence value", () => {
    const r = parseHatTurn({
      hat_id: "h1",
      hat_name: "X",
      key_points: ["a"],
      confidence: "vibes",
      risks: [],
      dissent: null,
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/confidence/);
  });

  it("rejects empty hat_id", () => {
    const r = parseHatTurn({
      hat_id: "",
      hat_name: "X",
      key_points: ["a"],
      confidence: "low",
      risks: [],
      dissent: null,
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/hat_id/);
  });

  it("rejects non-object input", () => {
    const r = parseHatTurn("not an object");
    expect(r.ok).toBe(false);
  });
});

describe("parseSynthesis (SynthesisV1)", () => {
  it("accepts a well-formed synthesis verdict", () => {
    const r = parseSynthesis({
      verdict: "Pause and validate the assumption before proceeding.",
      key_decision: "Run the validation experiment first.",
      strongest_agreement: "All hats want evidence before commit.",
      sharpest_disagreement: "Pace -- ship now vs validate first.",
      risks: ["delay erodes momentum"],
      unknowns: ["how long the validation takes"],
      recommendation: "Run a 1-week validation sprint, then re-decide.",
      hats_consulted: ["Contrarian", "Pragmatist", "Realist"],
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.hats_consulted).toHaveLength(3);
    }
  });

  it("rejects missing recommendation", () => {
    const r = parseSynthesis({
      verdict: "v",
      key_decision: "k",
      strongest_agreement: "s",
      sharpest_disagreement: "d",
      risks: [],
      unknowns: [],
      recommendation: "",
      hats_consulted: ["A"],
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/recommendation/);
  });

  it("rejects empty hats_consulted", () => {
    const r = parseSynthesis({
      verdict: "v",
      key_decision: "k",
      strongest_agreement: "s",
      sharpest_disagreement: "d",
      risks: [],
      unknowns: [],
      recommendation: "r",
      hats_consulted: [],
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/hats_consulted/);
  });

  it("rejects non-string verdict", () => {
    const r = parseSynthesis({
      verdict: 42,
      key_decision: "k",
      strongest_agreement: "s",
      sharpest_disagreement: "d",
      risks: [],
      unknowns: [],
      recommendation: "r",
      hats_consulted: ["A"],
    });
    expect(r.ok).toBe(false);
  });
});
