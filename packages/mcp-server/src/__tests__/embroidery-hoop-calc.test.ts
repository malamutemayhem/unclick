import { describe, it, expect } from "vitest";
import {
  fabricTension, easeOfUse, fabricFriendly, sizeRange,
  hoopCost, displayReady, handsFree, frameMaterial,
  bestStitch, embroideryHoops,
} from "../embroidery-hoop-calc.js";

describe("fabricTension", () => {
  it("q snap frame best fabric tension", () => {
    expect(fabricTension("q_snap_frame")).toBeGreaterThan(fabricTension("wooden_oval"));
  });
});

describe("easeOfUse", () => {
  it("plastic spring tension easiest to use", () => {
    expect(easeOfUse("plastic_spring_tension")).toBeGreaterThan(easeOfUse("machine_clamp"));
  });
});

describe("fabricFriendly", () => {
  it("q snap frame most fabric friendly", () => {
    expect(fabricFriendly("q_snap_frame")).toBeGreaterThan(fabricFriendly("machine_clamp"));
  });
});

describe("sizeRange", () => {
  it("q snap frame most size range", () => {
    expect(sizeRange("q_snap_frame")).toBeGreaterThan(sizeRange("machine_clamp"));
  });
});

describe("hoopCost", () => {
  it("machine clamp most expensive", () => {
    expect(hoopCost("machine_clamp")).toBeGreaterThan(hoopCost("bamboo_round"));
  });
});

describe("displayReady", () => {
  it("bamboo round is display ready", () => {
    expect(displayReady("bamboo_round")).toBe(true);
  });
  it("plastic spring tension is not", () => {
    expect(displayReady("plastic_spring_tension")).toBe(false);
  });
});

describe("handsFree", () => {
  it("q snap frame is hands free", () => {
    expect(handsFree("q_snap_frame")).toBe(true);
  });
  it("bamboo round is not", () => {
    expect(handsFree("bamboo_round")).toBe(false);
  });
});

describe("frameMaterial", () => {
  it("bamboo round uses natural bamboo screw top", () => {
    expect(frameMaterial("bamboo_round")).toBe("natural_bamboo_screw_top");
  });
});

describe("bestStitch", () => {
  it("q snap frame for large quilt block", () => {
    expect(bestStitch("q_snap_frame")).toBe("large_quilt_block");
  });
});

describe("embroideryHoops", () => {
  it("returns 5 types", () => {
    expect(embroideryHoops()).toHaveLength(5);
  });
});
