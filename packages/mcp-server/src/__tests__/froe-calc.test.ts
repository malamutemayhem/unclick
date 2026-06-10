import { describe, it, expect } from "vitest";
import {
  splitForce, grainFollow, controlSteer, bladeLength,
  froeCost, curved, needsClub, steelType,
  bestUse, froes,
} from "../froe-calc.js";

describe("splitForce", () => {
  it("heavy blade timber strongest split force", () => {
    expect(splitForce("heavy_blade_timber")).toBeGreaterThan(splitForce("short_blade_shim"));
  });
});

describe("grainFollow", () => {
  it("curved blade shingle best grain follow", () => {
    expect(grainFollow("curved_blade_shingle")).toBeGreaterThan(grainFollow("heavy_blade_timber"));
  });
});

describe("controlSteer", () => {
  it("curved blade shingle best control steer", () => {
    expect(controlSteer("curved_blade_shingle")).toBeGreaterThan(controlSteer("heavy_blade_timber"));
  });
});

describe("bladeLength", () => {
  it("heavy blade timber longest blade", () => {
    expect(bladeLength("heavy_blade_timber")).toBeGreaterThan(bladeLength("short_blade_shim"));
  });
});

describe("froeCost", () => {
  it("heavy blade timber most expensive", () => {
    expect(froeCost("heavy_blade_timber")).toBeGreaterThan(froeCost("short_blade_shim"));
  });
});

describe("curved", () => {
  it("curved blade shingle is curved", () => {
    expect(curved("curved_blade_shingle")).toBe(true);
  });
  it("straight blade basic not curved", () => {
    expect(curved("straight_blade_basic")).toBe(false);
  });
});

describe("needsClub", () => {
  it("straight blade basic needs club", () => {
    expect(needsClub("straight_blade_basic")).toBe(true);
  });
  it("short blade shim no club needed", () => {
    expect(needsClub("short_blade_shim")).toBe(false);
  });
});

describe("steelType", () => {
  it("straight blade basic uses carbon steel forged", () => {
    expect(steelType("straight_blade_basic")).toBe("carbon_steel_forged");
  });
});

describe("bestUse", () => {
  it("curved blade shingle best for shingle shake split", () => {
    expect(bestUse("curved_blade_shingle")).toBe("shingle_shake_split");
  });
});

describe("froes", () => {
  it("returns 5 types", () => {
    expect(froes()).toHaveLength(5);
  });
});
