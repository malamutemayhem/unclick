import { describe, it, expect } from "vitest";
import {
  impressDetail, inkCoverage, easeOfUse, durability,
  stampCost, seeThrough, selfInking, stampMat,
  bestUse, rubberStamps,
} from "../rubber-stamp-calc.js";

describe("impressDetail", () => {
  it("deep etch art most detail", () => {
    expect(impressDetail("deep_etch_art")).toBeGreaterThan(impressDetail("foam_mounted_cushion"));
  });
});

describe("inkCoverage", () => {
  it("deep etch art best ink coverage", () => {
    expect(inkCoverage("deep_etch_art")).toBeGreaterThan(inkCoverage("self_inking_office"));
  });
});

describe("easeOfUse", () => {
  it("self inking office easiest to use", () => {
    expect(easeOfUse("self_inking_office")).toBeGreaterThan(easeOfUse("deep_etch_art"));
  });
});

describe("durability", () => {
  it("deep etch art most durable", () => {
    expect(durability("deep_etch_art")).toBeGreaterThan(durability("foam_mounted_cushion"));
  });
});

describe("stampCost", () => {
  it("deep etch art most expensive", () => {
    expect(stampCost("deep_etch_art")).toBeGreaterThan(stampCost("foam_mounted_cushion"));
  });
});

describe("seeThrough", () => {
  it("clear photopolymer is see through", () => {
    expect(seeThrough("clear_photopolymer")).toBe(true);
  });
  it("red rubber wood not see through", () => {
    expect(seeThrough("red_rubber_wood")).toBe(false);
  });
});

describe("selfInking", () => {
  it("self inking office is self inking", () => {
    expect(selfInking("self_inking_office")).toBe(true);
  });
  it("red rubber wood not self inking", () => {
    expect(selfInking("red_rubber_wood")).toBe(false);
  });
});

describe("stampMat", () => {
  it("red rubber wood uses vulcanized rubber wood", () => {
    expect(stampMat("red_rubber_wood")).toBe("vulcanized_rubber_wood");
  });
});

describe("bestUse", () => {
  it("clear photopolymer best for precise placement layer", () => {
    expect(bestUse("clear_photopolymer")).toBe("precise_placement_layer");
  });
});

describe("rubberStamps", () => {
  it("returns 5 types", () => {
    expect(rubberStamps()).toHaveLength(5);
  });
});
