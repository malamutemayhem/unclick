import { describe, it, expect } from "vitest";
import {
  sizingAccuracy, hammerSafe, surfaceFinish, shapeRange,
  mandrelCost, markedSizes, forWireWrap, mandrelShape,
  bestUse, ringMandrels,
} from "../ring-mandrel-calc.js";

describe("sizingAccuracy", () => {
  it("steel tapered round most sizing accuracy", () => {
    expect(sizingAccuracy("steel_tapered_round")).toBeGreaterThan(sizingAccuracy("wooden_oval_comfort"));
  });
});

describe("hammerSafe", () => {
  it("steel tapered round most hammer safe", () => {
    expect(hammerSafe("steel_tapered_round")).toBeGreaterThan(hammerSafe("wooden_oval_comfort"));
  });
});

describe("surfaceFinish", () => {
  it("steel tapered round best surface finish", () => {
    expect(surfaceFinish("steel_tapered_round")).toBeGreaterThan(surfaceFinish("triblet_wire_wrapping"));
  });
});

describe("shapeRange", () => {
  it("triblet wire wrapping widest shape range", () => {
    expect(shapeRange("triblet_wire_wrapping")).toBeGreaterThan(shapeRange("stepped_size_fixed"));
  });
});

describe("mandrelCost", () => {
  it("grooved channel set most expensive", () => {
    expect(mandrelCost("grooved_channel_set")).toBeGreaterThan(mandrelCost("wooden_oval_comfort"));
  });
});

describe("markedSizes", () => {
  it("steel tapered round has marked sizes", () => {
    expect(markedSizes("steel_tapered_round")).toBe(true);
  });
  it("wooden oval comfort has no marked sizes", () => {
    expect(markedSizes("wooden_oval_comfort")).toBe(false);
  });
});

describe("forWireWrap", () => {
  it("triblet wire wrapping is for wire wrap", () => {
    expect(forWireWrap("triblet_wire_wrapping")).toBe(true);
  });
  it("steel tapered round is not for wire wrap", () => {
    expect(forWireWrap("steel_tapered_round")).toBe(false);
  });
});

describe("mandrelShape", () => {
  it("stepped size fixed uses stepped diameter ring", () => {
    expect(mandrelShape("stepped_size_fixed")).toBe("stepped_diameter_ring");
  });
});

describe("bestUse", () => {
  it("steel tapered round best for band sizing hammer", () => {
    expect(bestUse("steel_tapered_round")).toBe("band_sizing_hammer");
  });
});

describe("ringMandrels", () => {
  it("returns 5 types", () => {
    expect(ringMandrels()).toHaveLength(5);
  });
});
