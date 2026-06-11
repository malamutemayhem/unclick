import { describe, it, expect } from "vitest";
import {
  headRange, throughput, efficiency, cavitationResist,
  tpCost, deepWell, forIrrigation, pumpConfig,
  bestUse, turbinePumpTypes,
} from "../turbine-pump-calc.js";

describe("headRange", () => {
  it("vertical turbine best head range", () => {
    expect(headRange("vertical_turbine")).toBeGreaterThan(headRange("axial_flow_turbine"));
  });
});

describe("throughput", () => {
  it("axial flow highest throughput", () => {
    expect(throughput("axial_flow_turbine")).toBeGreaterThan(throughput("regenerative_turbine"));
  });
});

describe("efficiency", () => {
  it("vertical turbine best efficiency", () => {
    expect(efficiency("vertical_turbine")).toBeGreaterThan(efficiency("regenerative_turbine"));
  });
});

describe("cavitationResist", () => {
  it("submersible turbine best cavitation resist", () => {
    expect(cavitationResist("submersible_turbine")).toBeGreaterThan(cavitationResist("regenerative_turbine"));
  });
});

describe("tpCost", () => {
  it("vertical turbine most expensive", () => {
    expect(tpCost("vertical_turbine")).toBeGreaterThan(tpCost("regenerative_turbine"));
  });
});

describe("deepWell", () => {
  it("vertical turbine for deep well", () => {
    expect(deepWell("vertical_turbine")).toBe(true);
  });
  it("regenerative turbine not deep well", () => {
    expect(deepWell("regenerative_turbine")).toBe(false);
  });
});

describe("forIrrigation", () => {
  it("vertical turbine for irrigation", () => {
    expect(forIrrigation("vertical_turbine")).toBe(true);
  });
  it("regenerative turbine not for irrigation", () => {
    expect(forIrrigation("regenerative_turbine")).toBe(false);
  });
});

describe("pumpConfig", () => {
  it("axial flow uses propeller impeller high volume low head", () => {
    expect(pumpConfig("axial_flow_turbine")).toBe("axial_flow_turbine_pump_propeller_impeller_high_volume_low_head");
  });
});

describe("bestUse", () => {
  it("submersible for bore water sealed motor no prime deep", () => {
    expect(bestUse("submersible_turbine")).toBe("bore_water_submersible_turbine_pump_sealed_motor_no_prime_deep");
  });
});

describe("turbinePumpTypes", () => {
  it("returns 5 types", () => {
    expect(turbinePumpTypes()).toHaveLength(5);
  });
});
