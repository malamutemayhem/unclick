import { describe, it, expect } from "vitest";
import {
  heatTransfer, foulingResist, compactness, pressureDrop,
  shCost, selfClean, forSlurry, channel,
  bestUse, spiralHeatExTypes,
} from "../spiral-heat-ex-calc.js";

describe("heatTransfer", () => {
  it("type i and multi spiral best heat transfer", () => {
    expect(heatTransfer("type_i_both_spiral")).toBeGreaterThan(heatTransfer("type_ii_spiral_cross"));
  });
});

describe("foulingResist", () => {
  it("self cleaning slurry best fouling resistance", () => {
    expect(foulingResist("self_cleaning_slurry")).toBeGreaterThan(foulingResist("type_ii_spiral_cross"));
  });
});

describe("compactness", () => {
  it("type i most compact", () => {
    expect(compactness("type_i_both_spiral")).toBeGreaterThan(compactness("multi_spiral_parallel"));
  });
});

describe("pressureDrop", () => {
  it("self cleaning slurry highest pressure drop", () => {
    expect(pressureDrop("self_cleaning_slurry")).toBeGreaterThan(pressureDrop("type_iii_spiral_condenser"));
  });
});

describe("shCost", () => {
  it("multi spiral most expensive", () => {
    expect(shCost("multi_spiral_parallel")).toBeGreaterThan(shCost("type_ii_spiral_cross"));
  });
});

describe("selfClean", () => {
  it("type i is self cleaning", () => {
    expect(selfClean("type_i_both_spiral")).toBe(true);
  });
  it("type ii not self cleaning", () => {
    expect(selfClean("type_ii_spiral_cross")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("self cleaning for slurry", () => {
    expect(forSlurry("self_cleaning_slurry")).toBe(true);
  });
  it("type ii not for slurry", () => {
    expect(forSlurry("type_ii_spiral_cross")).toBe(false);
  });
});

describe("channel", () => {
  it("type iii uses spiral coolant open vapor", () => {
    expect(channel("type_iii_spiral_condenser")).toBe("spiral_coolant_open_vapor_column_mount");
  });
});

describe("bestUse", () => {
  it("multi spiral for pulp paper mill", () => {
    expect(bestUse("multi_spiral_parallel")).toBe("large_capacity_pulp_paper_mill_heat");
  });
});

describe("spiralHeatExTypes", () => {
  it("returns 5 types", () => {
    expect(spiralHeatExTypes()).toHaveLength(5);
  });
});
