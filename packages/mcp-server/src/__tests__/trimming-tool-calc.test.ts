import { describe, it, expect } from "vitest";
import {
  clayRemoval, surfaceTexture, controlFeel, durability,
  trimCost, decorative, forFootTrim, bladeType,
  bestPot, trimmingTools,
} from "../trimming-tool-calc.js";

describe("clayRemoval", () => {
  it("ribbon tool flat blade best clay removal", () => {
    expect(clayRemoval("ribbon_tool_flat_blade")).toBeGreaterThan(clayRemoval("chattering_spring_steel"));
  });
});

describe("surfaceTexture", () => {
  it("chattering spring steel best surface texture", () => {
    expect(surfaceTexture("chattering_spring_steel")).toBeGreaterThan(surfaceTexture("ribbon_tool_flat_blade"));
  });
});

describe("controlFeel", () => {
  it("diamond tip carbide best control feel", () => {
    expect(controlFeel("diamond_tip_carbide")).toBeGreaterThan(controlFeel("chattering_spring_steel"));
  });
});

describe("durability", () => {
  it("diamond tip carbide most durable", () => {
    expect(durability("diamond_tip_carbide")).toBeGreaterThan(durability("wooden_handle_gouge"));
  });
});

describe("trimCost", () => {
  it("diamond tip carbide most expensive", () => {
    expect(trimCost("diamond_tip_carbide")).toBeGreaterThan(trimCost("loop_tool_round_wire"));
  });
});

describe("decorative", () => {
  it("chattering spring steel is decorative", () => {
    expect(decorative("chattering_spring_steel")).toBe(true);
  });
  it("loop tool round wire is not decorative", () => {
    expect(decorative("loop_tool_round_wire")).toBe(false);
  });
});

describe("forFootTrim", () => {
  it("loop tool round wire is for foot trim", () => {
    expect(forFootTrim("loop_tool_round_wire")).toBe(true);
  });
  it("chattering spring steel is not for foot trim", () => {
    expect(forFootTrim("chattering_spring_steel")).toBe(false);
  });
});

describe("bladeType", () => {
  it("chattering spring steel uses flexible spring strip", () => {
    expect(bladeType("chattering_spring_steel")).toBe("flexible_spring_strip");
  });
});

describe("bestPot", () => {
  it("diamond tip carbide best for porcelain precise trim", () => {
    expect(bestPot("diamond_tip_carbide")).toBe("porcelain_precise_trim");
  });
});

describe("trimmingTools", () => {
  it("returns 5 types", () => {
    expect(trimmingTools()).toHaveLength(5);
  });
});
