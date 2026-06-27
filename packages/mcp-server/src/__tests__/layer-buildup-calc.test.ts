import { describe, it, expect } from "vitest";
import {
  layerCount, viaFlexibility, thickness, yieldRate,
  buildCost, microvia, forMobile, processType,
  bestUse, layerBuildups,
} from "../layer-buildup-calc.js";

describe("layerCount", () => {
  it("any layer hdi most layers", () => {
    expect(layerCount("any_layer_hdi")).toBeGreaterThan(layerCount("foil_lamination_std"));
  });
});

describe("viaFlexibility", () => {
  it("any layer hdi best via flexibility", () => {
    expect(viaFlexibility("any_layer_hdi")).toBeGreaterThan(viaFlexibility("foil_lamination_std"));
  });
});

describe("thickness", () => {
  it("coreless substrate best thickness control", () => {
    expect(thickness("coreless_substrate")).toBeGreaterThan(thickness("foil_lamination_std"));
  });
});

describe("yieldRate", () => {
  it("foil lamination std highest yield rate", () => {
    expect(yieldRate("foil_lamination_std")).toBeGreaterThan(yieldRate("coreless_substrate"));
  });
});

describe("buildCost", () => {
  it("any layer hdi most expensive", () => {
    expect(buildCost("any_layer_hdi")).toBeGreaterThan(buildCost("foil_lamination_std"));
  });
});

describe("microvia", () => {
  it("sequential buildup has microvia", () => {
    expect(microvia("sequential_buildup")).toBe(true);
  });
  it("foil lamination std no microvia", () => {
    expect(microvia("foil_lamination_std")).toBe(false);
  });
});

describe("forMobile", () => {
  it("any layer hdi is for mobile", () => {
    expect(forMobile("any_layer_hdi")).toBe(true);
  });
  it("foil lamination std not for mobile", () => {
    expect(forMobile("foil_lamination_std")).toBe(false);
  });
});

describe("processType", () => {
  it("coreless substrate uses carrier remove buildup", () => {
    expect(processType("coreless_substrate")).toBe("carrier_remove_buildup");
  });
});

describe("bestUse", () => {
  it("any layer hdi best for smartphone wearable pcb", () => {
    expect(bestUse("any_layer_hdi")).toBe("smartphone_wearable_pcb");
  });
});

describe("layerBuildups", () => {
  it("returns 5 types", () => {
    expect(layerBuildups()).toHaveLength(5);
  });
});
