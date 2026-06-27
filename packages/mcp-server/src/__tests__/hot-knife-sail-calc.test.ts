import { describe, it, expect } from "vitest";
import {
  cutClean, sealEdge, speedCut, fabricRange,
  knifeCost, portable, benchMount, heatSource,
  bestUse, hotKnifeSails,
} from "../hot-knife-sail-calc.js";

describe("cutClean", () => {
  it("bench mount fixed cleanest cut", () => {
    expect(cutClean("bench_mount_fixed")).toBeGreaterThan(cutClean("rope_cutter_heavy"));
  });
});

describe("sealEdge", () => {
  it("rope cutter heavy best edge seal", () => {
    expect(sealEdge("rope_cutter_heavy")).toBeGreaterThan(sealEdge("battery_blade_portable"));
  });
});

describe("speedCut", () => {
  it("bench mount fixed fastest cut", () => {
    expect(speedCut("bench_mount_fixed")).toBeGreaterThan(speedCut("soldering_tip_fine"));
  });
});

describe("fabricRange", () => {
  it("bench mount fixed widest fabric range", () => {
    expect(fabricRange("bench_mount_fixed")).toBeGreaterThan(fabricRange("soldering_tip_fine"));
  });
});

describe("knifeCost", () => {
  it("bench mount fixed most expensive", () => {
    expect(knifeCost("bench_mount_fixed")).toBeGreaterThan(knifeCost("soldering_tip_fine"));
  });
});

describe("portable", () => {
  it("battery blade portable is portable", () => {
    expect(portable("battery_blade_portable")).toBe(true);
  });
  it("electric blade standard not portable", () => {
    expect(portable("electric_blade_standard")).toBe(false);
  });
});

describe("benchMount", () => {
  it("bench mount fixed is bench mount", () => {
    expect(benchMount("bench_mount_fixed")).toBe(true);
  });
  it("electric blade standard not bench mount", () => {
    expect(benchMount("electric_blade_standard")).toBe(false);
  });
});

describe("heatSource", () => {
  it("rope cutter heavy uses high watt element", () => {
    expect(heatSource("rope_cutter_heavy")).toBe("high_watt_element");
  });
});

describe("bestUse", () => {
  it("electric blade standard best for general synthetic cut", () => {
    expect(bestUse("electric_blade_standard")).toBe("general_synthetic_cut");
  });
});

describe("hotKnifeSails", () => {
  it("returns 5 types", () => {
    expect(hotKnifeSails()).toHaveLength(5);
  });
});
