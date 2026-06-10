import { describe, it, expect } from "vitest";
import {
  depthCapability, coreQuality, drillingSpeed, equipmentWeight,
  operatingCost, preservesBubbles, fieldDeployable, cuttingMechanism,
  bestApplication, iceCoreMethods,
} from "../ice-core-method-calc.js";

describe("depthCapability", () => {
  it("electromechanical deepest", () => {
    expect(depthCapability("electromechanical")).toBeGreaterThan(depthCapability("hot_water"));
  });
});

describe("coreQuality", () => {
  it("electromechanical best quality", () => {
    expect(coreQuality("electromechanical")).toBeGreaterThan(coreQuality("hot_water"));
  });
});

describe("drillingSpeed", () => {
  it("rapid access fastest", () => {
    expect(drillingSpeed("rapid_access")).toBeGreaterThan(drillingSpeed("electromechanical"));
  });
});

describe("equipmentWeight", () => {
  it("electromechanical heaviest", () => {
    expect(equipmentWeight("electromechanical")).toBeGreaterThan(equipmentWeight("rapid_access"));
  });
});

describe("operatingCost", () => {
  it("electromechanical most expensive", () => {
    expect(operatingCost("electromechanical")).toBeGreaterThan(operatingCost("rapid_access"));
  });
});

describe("preservesBubbles", () => {
  it("mechanical drill preserves bubbles", () => {
    expect(preservesBubbles("mechanical_drill")).toBe(true);
  });
  it("thermal drill does not", () => {
    expect(preservesBubbles("thermal_drill")).toBe(false);
  });
});

describe("fieldDeployable", () => {
  it("mechanical drill is field deployable", () => {
    expect(fieldDeployable("mechanical_drill")).toBe(true);
  });
  it("electromechanical is not", () => {
    expect(fieldDeployable("electromechanical")).toBe(false);
  });
});

describe("cuttingMechanism", () => {
  it("thermal drill uses heated ring melt", () => {
    expect(cuttingMechanism("thermal_drill")).toBe("heated_ring_melt");
  });
});

describe("bestApplication", () => {
  it("electromechanical for deep ice sheet record", () => {
    expect(bestApplication("electromechanical")).toBe("deep_ice_sheet_record");
  });
});

describe("iceCoreMethods", () => {
  it("returns 5 methods", () => {
    expect(iceCoreMethods()).toHaveLength(5);
  });
});
