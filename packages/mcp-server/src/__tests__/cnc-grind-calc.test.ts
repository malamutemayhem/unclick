import { describe, it, expect } from "vitest";
import {
  precision, speed, surfaceFinish, versatility,
  cgCost, automated, forHardened, wheel,
  bestUse, cncGrindTypes,
} from "../cnc-grind-calc.js";

describe("precision", () => {
  it("jig grind most precise", () => {
    expect(precision("jig_grind_coordinate")).toBeGreaterThan(precision("centerless_thrufeed"));
  });
});

describe("speed", () => {
  it("centerless thrufeed fastest", () => {
    expect(speed("centerless_thrufeed")).toBeGreaterThan(speed("jig_grind_coordinate"));
  });
});

describe("surfaceFinish", () => {
  it("jig grind best surface finish", () => {
    expect(surfaceFinish("jig_grind_coordinate")).toBeGreaterThan(surfaceFinish("centerless_thrufeed"));
  });
});

describe("versatility", () => {
  it("jig grind most versatile", () => {
    expect(versatility("jig_grind_coordinate")).toBeGreaterThan(versatility("centerless_thrufeed"));
  });
});

describe("cgCost", () => {
  it("jig grind most expensive", () => {
    expect(cgCost("jig_grind_coordinate")).toBeGreaterThan(cgCost("surface_grind_reciprocate"));
  });
});

describe("automated", () => {
  it("all CNC grinders are automated", () => {
    expect(automated("surface_grind_reciprocate")).toBe(true);
  });
  it("centerless also automated", () => {
    expect(automated("centerless_thrufeed")).toBe(true);
  });
});

describe("forHardened", () => {
  it("cylindrical OD for hardened", () => {
    expect(forHardened("cylindrical_od_plunge")).toBe(true);
  });
  it("creep feed for hardened", () => {
    expect(forHardened("creep_feed_deep")).toBe(true);
  });
});

describe("wheel", () => {
  it("cylindrical OD uses CBN vitrified", () => {
    expect(wheel("cylindrical_od_plunge")).toBe("cbn_vitrified_superabrasive");
  });
});

describe("bestUse", () => {
  it("centerless for high volume round parts", () => {
    expect(bestUse("centerless_thrufeed")).toBe("pin_rod_tube_high_volume_round");
  });
});

describe("cncGrindTypes", () => {
  it("returns 5 types", () => {
    expect(cncGrindTypes()).toHaveLength(5);
  });
});
