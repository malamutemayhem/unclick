import { describe, it, expect } from "vitest";
import {
  needleProtect, workSurface, durability, portability,
  padCost, reusable, wornOnHand, padMaterial,
  bestUse, foamPads,
} from "../foam-pad-calc.js";

describe("needleProtect", () => {
  it("brush mat bristle best needle protection", () => {
    expect(needleProtect("brush_mat_bristle")).toBeGreaterThan(needleProtect("finger_guard_thimble"));
  });
});

describe("workSurface", () => {
  it("multi surface stack largest work surface", () => {
    expect(workSurface("multi_surface_stack")).toBeGreaterThan(workSurface("clover_mat_travel"));
  });
});

describe("durability", () => {
  it("finger guard thimble most durable", () => {
    expect(durability("finger_guard_thimble")).toBeGreaterThan(durability("high_density_firm"));
  });
});

describe("portability", () => {
  it("finger guard thimble most portable", () => {
    expect(portability("finger_guard_thimble")).toBeGreaterThan(portability("multi_surface_stack"));
  });
});

describe("padCost", () => {
  it("brush mat bristle more expensive than high density", () => {
    expect(padCost("brush_mat_bristle")).toBeGreaterThan(padCost("high_density_firm"));
  });
});

describe("reusable", () => {
  it("brush mat bristle is reusable", () => {
    expect(reusable("brush_mat_bristle")).toBe(true);
  });
  it("high density firm is not reusable", () => {
    expect(reusable("high_density_firm")).toBe(false);
  });
});

describe("wornOnHand", () => {
  it("finger guard thimble is worn on hand", () => {
    expect(wornOnHand("finger_guard_thimble")).toBe(true);
  });
  it("brush mat bristle is not worn on hand", () => {
    expect(wornOnHand("brush_mat_bristle")).toBe(false);
  });
});

describe("padMaterial", () => {
  it("brush mat bristle uses nylon bristle base", () => {
    expect(padMaterial("brush_mat_bristle")).toBe("nylon_bristle_base");
  });
});

describe("bestUse", () => {
  it("multi surface stack best for large project base", () => {
    expect(bestUse("multi_surface_stack")).toBe("large_project_base");
  });
});

describe("foamPads", () => {
  it("returns 5 types", () => {
    expect(foamPads()).toHaveLength(5);
  });
});
