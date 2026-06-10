import { describe, it, expect } from "vitest";
import {
  easeOfThread, stitchReach, yarnSafe, portability,
  needleCost, locking, bentTip, needleMaterial,
  bestProject, darningNeedles,
} from "../darning-needle-calc.js";

describe("easeOfThread", () => {
  it("jumbo eye thick easiest to thread", () => {
    expect(easeOfThread("jumbo_eye_thick")).toBeGreaterThan(easeOfThread("curved_upholstery_long"));
  });
});

describe("stitchReach", () => {
  it("curved upholstery long best reach", () => {
    expect(stitchReach("curved_upholstery_long")).toBeGreaterThan(stitchReach("chibi_locking_short"));
  });
});

describe("yarnSafe", () => {
  it("straight blunt large safest for yarn", () => {
    expect(yarnSafe("straight_blunt_large")).toBeGreaterThan(yarnSafe("curved_upholstery_long"));
  });
});

describe("portability", () => {
  it("chibi locking short most portable", () => {
    expect(portability("chibi_locking_short")).toBeGreaterThan(portability("jumbo_eye_thick"));
  });
});

describe("needleCost", () => {
  it("chibi locking short more expensive than straight blunt", () => {
    expect(needleCost("chibi_locking_short")).toBeGreaterThan(needleCost("straight_blunt_large"));
  });
});

describe("locking", () => {
  it("chibi locking short has locking", () => {
    expect(locking("chibi_locking_short")).toBe(true);
  });
  it("bent tip knit has no locking", () => {
    expect(locking("bent_tip_knit")).toBe(false);
  });
});

describe("bentTip", () => {
  it("bent tip knit has bent tip", () => {
    expect(bentTip("bent_tip_knit")).toBe(true);
  });
  it("straight blunt large has no bent tip", () => {
    expect(bentTip("straight_blunt_large")).toBe(false);
  });
});

describe("needleMaterial", () => {
  it("chibi locking short uses steel spring clasp", () => {
    expect(needleMaterial("chibi_locking_short")).toBe("steel_spring_clasp");
  });
});

describe("bestProject", () => {
  it("bent tip knit best for knit seam mattress", () => {
    expect(bestProject("bent_tip_knit")).toBe("knit_seam_mattress");
  });
});

describe("darningNeedles", () => {
  it("returns 5 types", () => {
    expect(darningNeedles()).toHaveLength(5);
  });
});
