import { describe, it, expect } from "vitest";
import {
  setStrength, easeOfUse, sizeRange, portability,
  setterCost, punchIncluded, oneHand, setterMech,
  bestUse, eyeletSetters,
} from "../eyelet-setter-calc.js";

describe("setStrength", () => {
  it("crop a dile big strongest set", () => {
    expect(setStrength("crop_a_dile_big")).toBeGreaterThan(setStrength("setter_tool_basic"));
  });
});

describe("easeOfUse", () => {
  it("crop a dile big easiest to use", () => {
    expect(easeOfUse("crop_a_dile_big")).toBeGreaterThan(easeOfUse("hammer_set_anvil"));
  });
});

describe("sizeRange", () => {
  it("revolving punch hole widest size range", () => {
    expect(sizeRange("revolving_punch_hole")).toBeGreaterThan(sizeRange("setter_tool_basic"));
  });
});

describe("portability", () => {
  it("setter tool basic most portable", () => {
    expect(portability("setter_tool_basic")).toBeGreaterThan(portability("hammer_set_anvil"));
  });
});

describe("setterCost", () => {
  it("crop a dile big most expensive", () => {
    expect(setterCost("crop_a_dile_big")).toBeGreaterThan(setterCost("setter_tool_basic"));
  });
});

describe("punchIncluded", () => {
  it("crop a dile big has punch included", () => {
    expect(punchIncluded("crop_a_dile_big")).toBe(true);
  });
  it("hammer set anvil no punch included", () => {
    expect(punchIncluded("hammer_set_anvil")).toBe(false);
  });
});

describe("oneHand", () => {
  it("squeeze plier hand is one hand", () => {
    expect(oneHand("squeeze_plier_hand")).toBe(true);
  });
  it("hammer set anvil not one hand", () => {
    expect(oneHand("hammer_set_anvil")).toBe(false);
  });
});

describe("setterMech", () => {
  it("crop a dile big uses lever compound press", () => {
    expect(setterMech("crop_a_dile_big")).toBe("lever_compound_press");
  });
});

describe("bestUse", () => {
  it("crop a dile big best for thick material set", () => {
    expect(bestUse("crop_a_dile_big")).toBe("thick_material_set");
  });
});

describe("eyeletSetters", () => {
  it("returns 5 types", () => {
    expect(eyeletSetters()).toHaveLength(5);
  });
});
