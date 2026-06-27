import { describe, it, expect } from "vitest";
import {
  lineWidth, layerCount, resistance, reliability,
  rdlCost, waferLevel, forChiplet, process,
  bestUse, redistributionLayers,
} from "../redistribution-layer-calc.js";

describe("lineWidth", () => {
  it("fan out wafer finest line width", () => {
    expect(lineWidth("fan_out_wafer")).toBeGreaterThan(lineWidth("polymer_pi_rdl"));
  });
});

describe("layerCount", () => {
  it("multi layer rdl most layers", () => {
    expect(layerCount("multi_layer_rdl")).toBeGreaterThan(layerCount("single_cu_rdl"));
  });
});

describe("resistance", () => {
  it("fan out wafer lowest resistance", () => {
    expect(resistance("fan_out_wafer")).toBeGreaterThan(resistance("polymer_pi_rdl"));
  });
});

describe("reliability", () => {
  it("multi layer rdl most reliable", () => {
    expect(reliability("multi_layer_rdl")).toBeGreaterThan(reliability("polymer_pi_rdl"));
  });
});

describe("rdlCost", () => {
  it("fan out wafer most expensive", () => {
    expect(rdlCost("fan_out_wafer")).toBeGreaterThan(rdlCost("single_cu_rdl"));
  });
});

describe("waferLevel", () => {
  it("single cu rdl is wafer level", () => {
    expect(waferLevel("single_cu_rdl")).toBe(true);
  });
  it("polymer pi rdl not wafer level", () => {
    expect(waferLevel("polymer_pi_rdl")).toBe(false);
  });
});

describe("forChiplet", () => {
  it("multi layer rdl is for chiplet", () => {
    expect(forChiplet("multi_layer_rdl")).toBe(true);
  });
  it("single cu rdl not for chiplet", () => {
    expect(forChiplet("single_cu_rdl")).toBe(false);
  });
});

describe("process", () => {
  it("fan out wafer uses mold first rdl last", () => {
    expect(process("fan_out_wafer")).toBe("mold_first_rdl_last");
  });
});

describe("bestUse", () => {
  it("fan out wafer best for fowlp 5g module", () => {
    expect(bestUse("fan_out_wafer")).toBe("fowlp_5g_module");
  });
});

describe("redistributionLayers", () => {
  it("returns 5 types", () => {
    expect(redistributionLayers()).toHaveLength(5);
  });
});
