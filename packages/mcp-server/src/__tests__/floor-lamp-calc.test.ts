import { describe, it, expect } from "vitest";
import {
  brightness, ambiance, taskLight, footprint,
  lampCost, dimmable, adjustableHead, shadeStyle,
  bestRoom, floorLamps,
} from "../floor-lamp-calc.js";

describe("brightness", () => {
  it("tree multi branch brightest", () => {
    expect(brightness("tree_multi_branch")).toBeGreaterThan(brightness("tripod_mid_century"));
  });
});

describe("ambiance", () => {
  it("tripod mid century best ambiance", () => {
    expect(ambiance("tripod_mid_century")).toBeGreaterThan(ambiance("reading_adjustable_arm"));
  });
});

describe("taskLight", () => {
  it("reading adjustable arm best task light", () => {
    expect(taskLight("reading_adjustable_arm")).toBeGreaterThan(taskLight("torchiere_uplight"));
  });
});

describe("footprint", () => {
  it("torchiere uplight smallest footprint", () => {
    expect(footprint("torchiere_uplight")).toBeGreaterThan(footprint("arc_overreach_curve"));
  });
});

describe("lampCost", () => {
  it("arc overreach curve most expensive", () => {
    expect(lampCost("arc_overreach_curve")).toBeGreaterThan(lampCost("torchiere_uplight"));
  });
});

describe("dimmable", () => {
  it("all types are dimmable", () => {
    expect(dimmable("torchiere_uplight")).toBe(true);
    expect(dimmable("reading_adjustable_arm")).toBe(true);
  });
});

describe("adjustableHead", () => {
  it("reading adjustable arm has adjustable head", () => {
    expect(adjustableHead("reading_adjustable_arm")).toBe(true);
  });
  it("torchiere uplight does not", () => {
    expect(adjustableHead("torchiere_uplight")).toBe(false);
  });
});

describe("shadeStyle", () => {
  it("tripod mid century uses fabric drum tripod", () => {
    expect(shadeStyle("tripod_mid_century")).toBe("fabric_drum_tripod");
  });
});

describe("bestRoom", () => {
  it("torchiere uplight best for living room ambient fill", () => {
    expect(bestRoom("torchiere_uplight")).toBe("living_room_ambient_fill");
  });
});

describe("floorLamps", () => {
  it("returns 5 types", () => {
    expect(floorLamps()).toHaveLength(5);
  });
});
