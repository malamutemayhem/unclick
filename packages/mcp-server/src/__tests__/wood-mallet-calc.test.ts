import { describe, it, expect } from "vitest";
import {
  strikeForce, controlFeel, bounceAbsorb, surfaceSafe,
  malletCost, woodHead, nonMarring, headMaterial,
  bestTask, woodMallets,
} from "../wood-mallet-calc.js";

describe("strikeForce", () => {
  it("dead blow shot most strike force", () => {
    expect(strikeForce("dead_blow_shot")).toBeGreaterThan(strikeForce("rubber_mallet_soft"));
  });
});

describe("controlFeel", () => {
  it("carvers mallet round best control feel", () => {
    expect(controlFeel("carvers_mallet_round")).toBeGreaterThan(controlFeel("dead_blow_shot"));
  });
});

describe("bounceAbsorb", () => {
  it("dead blow shot best bounce absorption", () => {
    expect(bounceAbsorb("dead_blow_shot")).toBeGreaterThan(bounceAbsorb("brass_hammer_detail"));
  });
});

describe("surfaceSafe", () => {
  it("rubber mallet soft most surface safe", () => {
    expect(surfaceSafe("rubber_mallet_soft")).toBeGreaterThan(surfaceSafe("brass_hammer_detail"));
  });
});

describe("malletCost", () => {
  it("brass hammer detail most expensive", () => {
    expect(malletCost("brass_hammer_detail")).toBeGreaterThan(malletCost("rubber_mallet_soft"));
  });
});

describe("woodHead", () => {
  it("carvers mallet round has wood head", () => {
    expect(woodHead("carvers_mallet_round")).toBe(true);
  });
  it("dead blow shot does not have wood head", () => {
    expect(woodHead("dead_blow_shot")).toBe(false);
  });
});

describe("nonMarring", () => {
  it("rubber mallet soft is non marring", () => {
    expect(nonMarring("rubber_mallet_soft")).toBe(true);
  });
  it("brass hammer detail is not non marring", () => {
    expect(nonMarring("brass_hammer_detail")).toBe(false);
  });
});

describe("headMaterial", () => {
  it("dead blow shot uses polyurethane shot fill", () => {
    expect(headMaterial("dead_blow_shot")).toBe("polyurethane_shot_fill");
  });
});

describe("bestTask", () => {
  it("carvers mallet round best for chisel gouge drive", () => {
    expect(bestTask("carvers_mallet_round")).toBe("chisel_gouge_drive");
  });
});

describe("woodMallets", () => {
  it("returns 5 types", () => {
    expect(woodMallets()).toHaveLength(5);
  });
});
