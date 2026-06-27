import { describe, it, expect } from "vitest";
import {
  flexAbility, structStrength, solderEase, visualLine,
  cameCost, leadFree, forBorder, profileShape,
  bestPanel, cameLeads,
} from "../came-lead-calc.js";

describe("flexAbility", () => {
  it("h channel standard most flexible", () => {
    expect(flexAbility("h_channel_standard")).toBeGreaterThan(flexAbility("brass_came_strong"));
  });
});

describe("structStrength", () => {
  it("brass came strong strongest structure", () => {
    expect(structStrength("brass_came_strong")).toBeGreaterThan(structStrength("h_channel_standard"));
  });
});

describe("solderEase", () => {
  it("h channel standard easiest to solder", () => {
    expect(solderEase("h_channel_standard")).toBeGreaterThan(solderEase("brass_came_strong"));
  });
});

describe("visualLine", () => {
  it("round profile decorative best visual line", () => {
    expect(visualLine("round_profile_decorative")).toBeGreaterThan(visualLine("u_channel_border"));
  });
});

describe("cameCost", () => {
  it("brass came strong most expensive", () => {
    expect(cameCost("brass_came_strong")).toBeGreaterThan(cameCost("h_channel_standard"));
  });
});

describe("leadFree", () => {
  it("zinc came rigid is lead free", () => {
    expect(leadFree("zinc_came_rigid")).toBe(true);
  });
  it("h channel standard is not lead free", () => {
    expect(leadFree("h_channel_standard")).toBe(false);
  });
});

describe("forBorder", () => {
  it("u channel border is for border", () => {
    expect(forBorder("u_channel_border")).toBe(true);
  });
  it("h channel standard is not for border", () => {
    expect(forBorder("h_channel_standard")).toBe(false);
  });
});

describe("profileShape", () => {
  it("round profile decorative uses round bead channel", () => {
    expect(profileShape("round_profile_decorative")).toBe("round_bead_channel");
  });
});

describe("bestPanel", () => {
  it("zinc came rigid best for large structural window", () => {
    expect(bestPanel("zinc_came_rigid")).toBe("large_structural_window");
  });
});

describe("cameLeads", () => {
  it("returns 5 types", () => {
    expect(cameLeads()).toHaveLength(5);
  });
});
