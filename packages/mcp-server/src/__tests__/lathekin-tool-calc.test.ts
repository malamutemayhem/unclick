import { describe, it, expect } from "vitest";
import {
  openEase, scratchResist, durability, gripComfort,
  toolCost, nonMarring, traditional, tipMaterial,
  bestUse, lathekinTools,
} from "../lathekin-tool-calc.js";

describe("openEase", () => {
  it("metal lathekin durable easiest open", () => {
    expect(openEase("metal_lathekin_durable")).toBeGreaterThan(openEase("plastic_lathekin_smooth"));
  });
});

describe("scratchResist", () => {
  it("teflon lathekin nonstick best scratch resist", () => {
    expect(scratchResist("teflon_lathekin_nonstick")).toBeGreaterThan(scratchResist("metal_lathekin_durable"));
  });
});

describe("durability", () => {
  it("metal lathekin durable most durable", () => {
    expect(durability("metal_lathekin_durable")).toBeGreaterThan(durability("bone_lathekin_traditional"));
  });
});

describe("gripComfort", () => {
  it("bone lathekin traditional most comfortable grip", () => {
    expect(gripComfort("bone_lathekin_traditional")).toBeGreaterThan(gripComfort("metal_lathekin_durable"));
  });
});

describe("toolCost", () => {
  it("teflon lathekin nonstick most expensive", () => {
    expect(toolCost("teflon_lathekin_nonstick")).toBeGreaterThan(toolCost("plastic_lathekin_smooth"));
  });
});

describe("nonMarring", () => {
  it("teflon lathekin nonstick is non marring", () => {
    expect(nonMarring("teflon_lathekin_nonstick")).toBe(true);
  });
  it("metal lathekin durable not non marring", () => {
    expect(nonMarring("metal_lathekin_durable")).toBe(false);
  });
});

describe("traditional", () => {
  it("bone lathekin traditional is traditional", () => {
    expect(traditional("bone_lathekin_traditional")).toBe(true);
  });
  it("plastic lathekin smooth not traditional", () => {
    expect(traditional("plastic_lathekin_smooth")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("teflon lathekin nonstick uses teflon coated tip", () => {
    expect(tipMaterial("teflon_lathekin_nonstick")).toBe("teflon_coated_tip");
  });
});

describe("bestUse", () => {
  it("wooden lathekin standard best for general came open", () => {
    expect(bestUse("wooden_lathekin_standard")).toBe("general_came_open");
  });
});

describe("lathekinTools", () => {
  it("returns 5 types", () => {
    expect(lathekinTools()).toHaveLength(5);
  });
});
