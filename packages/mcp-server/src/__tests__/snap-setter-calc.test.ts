import { describe, it, expect } from "vitest";
import {
  setForce, alignment, snapVariety, portability,
  setterCost, dieIncluded, benchMounted, mechanism,
  bestUse, snapSetters,
} from "../snap-setter-calc.js";

describe("setForce", () => {
  it("bench mount pro strongest set force", () => {
    expect(setForce("bench_mount_pro")).toBeGreaterThan(setForce("rotary_punch_combo"));
  });
});

describe("alignment", () => {
  it("bench mount pro best alignment", () => {
    expect(alignment("bench_mount_pro")).toBeGreaterThan(alignment("mallet_anvil_set"));
  });
});

describe("snapVariety", () => {
  it("bench mount pro most snap variety", () => {
    expect(snapVariety("bench_mount_pro")).toBeGreaterThan(snapVariety("mallet_anvil_set"));
  });
});

describe("portability", () => {
  it("hand plier squeeze most portable", () => {
    expect(portability("hand_plier_squeeze")).toBeGreaterThan(portability("bench_mount_pro"));
  });
});

describe("setterCost", () => {
  it("bench mount pro most expensive", () => {
    expect(setterCost("bench_mount_pro")).toBeGreaterThan(setterCost("hand_plier_squeeze"));
  });
});

describe("dieIncluded", () => {
  it("hand plier squeeze has die included", () => {
    expect(dieIncluded("hand_plier_squeeze")).toBe(true);
  });
  it("bench mount pro no die included", () => {
    expect(dieIncluded("bench_mount_pro")).toBe(false);
  });
});

describe("benchMounted", () => {
  it("bench mount pro is bench mounted", () => {
    expect(benchMounted("bench_mount_pro")).toBe(true);
  });
  it("hand plier squeeze not bench mounted", () => {
    expect(benchMounted("hand_plier_squeeze")).toBe(false);
  });
});

describe("mechanism", () => {
  it("hand plier squeeze uses spring loaded plier", () => {
    expect(mechanism("hand_plier_squeeze")).toBe("spring_loaded_plier");
  });
});

describe("bestUse", () => {
  it("bench mount pro best for production batch set", () => {
    expect(bestUse("bench_mount_pro")).toBe("production_batch_set");
  });
});

describe("snapSetters", () => {
  it("returns 5 types", () => {
    expect(snapSetters()).toHaveLength(5);
  });
});
