import { describe, it, expect } from "vitest";
import {
  sinkRate, snagResist, sensitivity, versatility,
  sinkerCost, leadFree, reusable, sinkerShape,
  bestRig, sinkers,
} from "../sinker-calc.js";

describe("sinkRate", () => {
  it("tungsten drop shot fastest sink", () => {
    expect(sinkRate("tungsten_drop_shot")).toBeGreaterThan(sinkRate("split_shot_removable"));
  });
});

describe("snagResist", () => {
  it("bullet worm weight best snag resistance", () => {
    expect(snagResist("bullet_worm_weight")).toBeGreaterThan(snagResist("bank_sinker_anchor"));
  });
});

describe("sensitivity", () => {
  it("tungsten drop shot most sensitive", () => {
    expect(sensitivity("tungsten_drop_shot")).toBeGreaterThan(sensitivity("bank_sinker_anchor"));
  });
});

describe("versatility", () => {
  it("split shot removable most versatile", () => {
    expect(versatility("split_shot_removable")).toBeGreaterThan(versatility("bank_sinker_anchor"));
  });
});

describe("sinkerCost", () => {
  it("tungsten drop shot most expensive", () => {
    expect(sinkerCost("tungsten_drop_shot")).toBeGreaterThan(sinkerCost("split_shot_removable"));
  });
});

describe("leadFree", () => {
  it("tungsten drop shot is lead free", () => {
    expect(leadFree("tungsten_drop_shot")).toBe(true);
  });
  it("split shot removable is not", () => {
    expect(leadFree("split_shot_removable")).toBe(false);
  });
});

describe("reusable", () => {
  it("all sinkers are reusable", () => {
    expect(reusable("split_shot_removable")).toBe(true);
  });
  it("tungsten drop shot also reusable", () => {
    expect(reusable("tungsten_drop_shot")).toBe(true);
  });
});

describe("sinkerShape", () => {
  it("egg sinker sliding uses oval egg center hole", () => {
    expect(sinkerShape("egg_sinker_sliding")).toBe("oval_egg_center_hole");
  });
});

describe("bestRig", () => {
  it("bullet worm weight best for texas rig bass", () => {
    expect(bestRig("bullet_worm_weight")).toBe("texas_rig_bass");
  });
});

describe("sinkers", () => {
  it("returns 5 types", () => {
    expect(sinkers()).toHaveLength(5);
  });
});
