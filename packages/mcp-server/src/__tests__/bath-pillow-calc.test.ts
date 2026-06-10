import { describe, it, expect } from "vitest";
import {
  neckSupport, comfortLevel, drySpeed, gripStick,
  pillowCost, machineWash, travelFriendly, fillMaterial,
  bestBath, bathPillows,
} from "../bath-pillow-calc.js";

describe("neckSupport", () => {
  it("memory foam contour best neck support", () => {
    expect(neckSupport("memory_foam_contour")).toBeGreaterThan(neckSupport("mesh_quick_dry_open"));
  });
});

describe("comfortLevel", () => {
  it("memory foam contour most comfortable", () => {
    expect(comfortLevel("memory_foam_contour")).toBeGreaterThan(comfortLevel("inflatable_vinyl_air"));
  });
});

describe("drySpeed", () => {
  it("mesh quick dry open fastest dry speed", () => {
    expect(drySpeed("mesh_quick_dry_open")).toBeGreaterThan(drySpeed("memory_foam_contour"));
  });
});

describe("gripStick", () => {
  it("full body tub mat best grip stick", () => {
    expect(gripStick("full_body_tub_mat")).toBeGreaterThan(gripStick("inflatable_vinyl_air"));
  });
});

describe("pillowCost", () => {
  it("memory foam contour most expensive", () => {
    expect(pillowCost("memory_foam_contour")).toBeGreaterThan(pillowCost("inflatable_vinyl_air"));
  });
});

describe("machineWash", () => {
  it("mesh quick dry open is machine washable", () => {
    expect(machineWash("mesh_quick_dry_open")).toBe(true);
  });
  it("memory foam contour is not machine washable", () => {
    expect(machineWash("memory_foam_contour")).toBe(false);
  });
});

describe("travelFriendly", () => {
  it("inflatable vinyl air is travel friendly", () => {
    expect(travelFriendly("inflatable_vinyl_air")).toBe(true);
  });
  it("suction cup foam is not travel friendly", () => {
    expect(travelFriendly("suction_cup_foam")).toBe(false);
  });
});

describe("fillMaterial", () => {
  it("memory foam contour uses viscoelastic foam gel", () => {
    expect(fillMaterial("memory_foam_contour")).toBe("viscoelastic_foam_gel");
  });
});

describe("bestBath", () => {
  it("memory foam contour best for luxury long soak", () => {
    expect(bestBath("memory_foam_contour")).toBe("luxury_long_soak");
  });
});

describe("bathPillows", () => {
  it("returns 5 types", () => {
    expect(bathPillows()).toHaveLength(5);
  });
});
