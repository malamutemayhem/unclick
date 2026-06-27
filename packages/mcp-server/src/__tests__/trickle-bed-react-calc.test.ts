import { describe, it, expect } from "vitest";
import {
  conversion, liquidDistrib, heatManage, catalystLife,
  trCost, cocurrent, forHydrotreat, packing,
  bestUse, trickleBedReactTypes,
} from "../trickle-bed-react-calc.js";

describe("conversion", () => {
  it("pulsing flow highest conversion", () => {
    expect(conversion("pulsing_flow_regime")).toBeGreaterThan(conversion("upflow_flooded_bed"));
  });
});

describe("liquidDistrib", () => {
  it("monolith structured best liquid distribution", () => {
    expect(liquidDistrib("monolith_structured")).toBeGreaterThan(liquidDistrib("downflow_cocurrent"));
  });
});

describe("heatManage", () => {
  it("multi bed quench best heat management", () => {
    expect(heatManage("multi_bed_quench")).toBeGreaterThan(heatManage("downflow_cocurrent"));
  });
});

describe("catalystLife", () => {
  it("monolith structured longest catalyst life", () => {
    expect(catalystLife("monolith_structured")).toBeGreaterThan(catalystLife("pulsing_flow_regime"));
  });
});

describe("trCost", () => {
  it("monolith structured most expensive", () => {
    expect(trCost("monolith_structured")).toBeGreaterThan(trCost("downflow_cocurrent"));
  });
});

describe("cocurrent", () => {
  it("downflow is cocurrent", () => {
    expect(cocurrent("downflow_cocurrent")).toBe(true);
  });
  it("upflow flooded not cocurrent", () => {
    expect(cocurrent("upflow_flooded_bed")).toBe(false);
  });
});

describe("forHydrotreat", () => {
  it("downflow for hydrotreat", () => {
    expect(forHydrotreat("downflow_cocurrent")).toBe(true);
  });
  it("monolith not for hydrotreat", () => {
    expect(forHydrotreat("monolith_structured")).toBe(false);
  });
});

describe("packing", () => {
  it("multi bed quench uses stacked bed quench box", () => {
    expect(packing("multi_bed_quench")).toBe("stacked_bed_quench_box_redistribute");
  });
});

describe("bestUse", () => {
  it("monolith structured for auto exhaust", () => {
    expect(bestUse("monolith_structured")).toBe("auto_exhaust_gas_clean_low_pressure_drop");
  });
});

describe("trickleBedReactTypes", () => {
  it("returns 5 types", () => {
    expect(trickleBedReactTypes()).toHaveLength(5);
  });
});
