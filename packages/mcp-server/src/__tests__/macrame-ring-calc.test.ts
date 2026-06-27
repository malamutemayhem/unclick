import { describe, it, expect } from "vitest";
import {
  knotGrip, strength, sizeRange, visualAppeal,
  ringCost, paintable, showsThrough, ringFinish,
  bestProject, macrameRings,
} from "../macrame-ring-calc.js";

describe("knotGrip", () => {
  it("rattan hoop woven best knot grip", () => {
    expect(knotGrip("rattan_hoop_woven")).toBeGreaterThan(knotGrip("acrylic_ring_color"));
  });
});

describe("strength", () => {
  it("metal ring weld strongest", () => {
    expect(strength("metal_ring_weld")).toBeGreaterThan(strength("acrylic_ring_color"));
  });
});

describe("sizeRange", () => {
  it("metal ring weld widest size range", () => {
    expect(sizeRange("metal_ring_weld")).toBeGreaterThan(sizeRange("brass_ring_solid"));
  });
});

describe("visualAppeal", () => {
  it("rattan hoop woven best visual appeal", () => {
    expect(visualAppeal("rattan_hoop_woven")).toBeGreaterThan(visualAppeal("metal_ring_weld"));
  });
});

describe("ringCost", () => {
  it("brass ring solid most expensive", () => {
    expect(ringCost("brass_ring_solid")).toBeGreaterThan(ringCost("metal_ring_weld"));
  });
});

describe("paintable", () => {
  it("wood ring natural is paintable", () => {
    expect(paintable("wood_ring_natural")).toBe(true);
  });
  it("brass ring solid is not paintable", () => {
    expect(paintable("brass_ring_solid")).toBe(false);
  });
});

describe("showsThrough", () => {
  it("brass ring solid shows through", () => {
    expect(showsThrough("brass_ring_solid")).toBe(true);
  });
  it("wood ring natural does not show through", () => {
    expect(showsThrough("wood_ring_natural")).toBe(false);
  });
});

describe("ringFinish", () => {
  it("rattan hoop woven is woven natural vine", () => {
    expect(ringFinish("rattan_hoop_woven")).toBe("woven_natural_vine");
  });
});

describe("bestProject", () => {
  it("wood ring natural best for dreamcatcher center", () => {
    expect(bestProject("wood_ring_natural")).toBe("dreamcatcher_center");
  });
});

describe("macrameRings", () => {
  it("returns 5 types", () => {
    expect(macrameRings()).toHaveLength(5);
  });
});
