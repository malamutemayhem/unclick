import { describe, it, expect } from "vitest";
import {
  grindFine, pigmentYield, speedProcess, batchSize,
  woadCost, powered, forLeaf, grindMethod,
  bestUse, woadMills,
} from "../woad-mill-calc.js";

describe("grindFine", () => {
  it("ball mill tumble finest grind", () => {
    expect(grindFine("ball_mill_tumble")).toBeGreaterThan(grindFine("wooden_stamp_crush"));
  });
});

describe("pigmentYield", () => {
  it("roller mill press highest pigment yield", () => {
    expect(pigmentYield("roller_mill_press")).toBeGreaterThan(pigmentYield("mortar_pestle_hand"));
  });
});

describe("speedProcess", () => {
  it("ball mill tumble fastest process", () => {
    expect(speedProcess("ball_mill_tumble")).toBeGreaterThan(speedProcess("mortar_pestle_hand"));
  });
});

describe("batchSize", () => {
  it("roller mill press largest batch", () => {
    expect(batchSize("roller_mill_press")).toBeGreaterThan(batchSize("mortar_pestle_hand"));
  });
});

describe("woadCost", () => {
  it("ball mill tumble most expensive", () => {
    expect(woadCost("ball_mill_tumble")).toBeGreaterThan(woadCost("mortar_pestle_hand"));
  });
});

describe("powered", () => {
  it("roller mill press is powered", () => {
    expect(powered("roller_mill_press")).toBe(true);
  });
  it("stone quern grind not powered", () => {
    expect(powered("stone_quern_grind")).toBe(false);
  });
});

describe("forLeaf", () => {
  it("stone quern grind is for leaf", () => {
    expect(forLeaf("stone_quern_grind")).toBe(true);
  });
  it("mortar pestle hand not for leaf", () => {
    expect(forLeaf("mortar_pestle_hand")).toBe(false);
  });
});

describe("grindMethod", () => {
  it("ball mill tumble uses tumble ball grind", () => {
    expect(grindMethod("ball_mill_tumble")).toBe("tumble_ball_grind");
  });
});

describe("bestUse", () => {
  it("roller mill press best for production dye extract", () => {
    expect(bestUse("roller_mill_press")).toBe("production_dye_extract");
  });
});

describe("woadMills", () => {
  it("returns 5 types", () => {
    expect(woadMills()).toHaveLength(5);
  });
});
