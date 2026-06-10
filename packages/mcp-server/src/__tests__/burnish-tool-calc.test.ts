import { describe, it, expect } from "vitest";
import {
  edgeGloss, speedOutput, controlFeel, edgeProfile,
  toolCost, needsPower, multiGroove, surfaceMaterial,
  bestFinish, burnishTools,
} from "../burnish-tool-calc.js";

describe("edgeGloss", () => {
  it("cocobolo multi groove best edge gloss", () => {
    expect(edgeGloss("cocobolo_multi_groove")).toBeGreaterThan(edgeGloss("canvas_cloth_manual"));
  });
});

describe("speedOutput", () => {
  it("power dremel wheel fastest speed", () => {
    expect(speedOutput("power_dremel_wheel")).toBeGreaterThan(speedOutput("canvas_cloth_manual"));
  });
});

describe("controlFeel", () => {
  it("canvas cloth manual best control", () => {
    expect(controlFeel("canvas_cloth_manual")).toBeGreaterThan(controlFeel("power_dremel_wheel"));
  });
});

describe("edgeProfile", () => {
  it("cocobolo multi groove best edge profile", () => {
    expect(edgeProfile("cocobolo_multi_groove")).toBeGreaterThan(edgeProfile("bone_folder_flat"));
  });
});

describe("toolCost", () => {
  it("cocobolo multi groove more expensive than wood slicker", () => {
    expect(toolCost("cocobolo_multi_groove")).toBeGreaterThan(toolCost("wood_slicker_round"));
  });
});

describe("needsPower", () => {
  it("power dremel wheel needs power", () => {
    expect(needsPower("power_dremel_wheel")).toBe(true);
  });
  it("wood slicker round needs no power", () => {
    expect(needsPower("wood_slicker_round")).toBe(false);
  });
});

describe("multiGroove", () => {
  it("cocobolo multi groove has multi groove", () => {
    expect(multiGroove("cocobolo_multi_groove")).toBe(true);
  });
  it("wood slicker round has no multi groove", () => {
    expect(multiGroove("wood_slicker_round")).toBe(false);
  });
});

describe("surfaceMaterial", () => {
  it("power dremel wheel uses felt buffing disc", () => {
    expect(surfaceMaterial("power_dremel_wheel")).toBe("felt_buffing_disc");
  });
});

describe("bestFinish", () => {
  it("cocobolo multi groove best for wallet luxury edge", () => {
    expect(bestFinish("cocobolo_multi_groove")).toBe("wallet_luxury_edge");
  });
});

describe("burnishTools", () => {
  it("returns 5 types", () => {
    expect(burnishTools()).toHaveLength(5);
  });
});
