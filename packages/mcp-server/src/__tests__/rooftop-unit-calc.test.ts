import { describe, it, expect } from "vitest";
import {
  efficiency, capacity, noise, maintenance,
  rtCost, variableSpeed, forRetail, refrigerant,
  bestUse, rooftopUnitTypes,
} from "../rooftop-unit-calc.js";

describe("efficiency", () => {
  it("vav most efficient", () => {
    expect(efficiency("variable_air_volume")).toBeGreaterThan(efficiency("constant_volume_basic"));
  });
});

describe("capacity", () => {
  it("vav highest capacity", () => {
    expect(capacity("variable_air_volume")).toBeGreaterThan(capacity("doas_dedicated_outdoor"));
  });
});

describe("noise", () => {
  it("vav quieter than mua", () => {
    expect(noise("variable_air_volume")).toBeGreaterThan(noise("make_up_air_kitchen"));
  });
});

describe("maintenance", () => {
  it("constant volume easy maintenance", () => {
    expect(maintenance("constant_volume_basic")).toBeGreaterThan(maintenance("doas_dedicated_outdoor"));
  });
});

describe("rtCost", () => {
  it("doas most expensive", () => {
    expect(rtCost("doas_dedicated_outdoor")).toBeGreaterThan(rtCost("constant_volume_basic"));
  });
});

describe("variableSpeed", () => {
  it("vav has variable speed", () => {
    expect(variableSpeed("variable_air_volume")).toBe(true);
  });
  it("constant volume no variable speed", () => {
    expect(variableSpeed("constant_volume_basic")).toBe(false);
  });
});

describe("forRetail", () => {
  it("constant volume for retail", () => {
    expect(forRetail("constant_volume_basic")).toBe(true);
  });
  it("doas not retail", () => {
    expect(forRetail("doas_dedicated_outdoor")).toBe(false);
  });
});

describe("refrigerant", () => {
  it("mua uses gas fired", () => {
    expect(refrigerant("make_up_air_kitchen")).toBe("direct_gas_fired_tempered");
  });
});

describe("bestUse", () => {
  it("doas for lab hospital", () => {
    expect(bestUse("doas_dedicated_outdoor")).toBe("lab_hospital_100_pct_oa");
  });
});

describe("rooftopUnitTypes", () => {
  it("returns 5 types", () => {
    expect(rooftopUnitTypes()).toHaveLength(5);
  });
});
