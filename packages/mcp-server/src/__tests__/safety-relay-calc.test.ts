import { describe, it, expect } from "vitest";
import {
  sil, channels, diagnostics, flexibility,
  srCost, configurable, forMachine, category,
  bestUse, safetyRelayTypes,
} from "../safety-relay-calc.js";

describe("sil", () => {
  it("configurable plc highest sil", () => {
    expect(sil("configurable_safety_plc")).toBeGreaterThan(sil("estop_single_channel"));
  });
});

describe("channels", () => {
  it("configurable plc most channels", () => {
    expect(channels("configurable_safety_plc")).toBeGreaterThan(channels("estop_single_channel"));
  });
});

describe("diagnostics", () => {
  it("configurable plc best diagnostics", () => {
    expect(diagnostics("configurable_safety_plc")).toBeGreaterThan(diagnostics("estop_single_channel"));
  });
});

describe("flexibility", () => {
  it("configurable plc most flexible", () => {
    expect(flexibility("configurable_safety_plc")).toBeGreaterThan(flexibility("estop_dual_channel"));
  });
});

describe("srCost", () => {
  it("configurable plc most expensive", () => {
    expect(srCost("configurable_safety_plc")).toBeGreaterThan(srCost("estop_single_channel"));
  });
});

describe("configurable", () => {
  it("safety plc is configurable", () => {
    expect(configurable("configurable_safety_plc")).toBe(true);
  });
  it("estop dual not configurable", () => {
    expect(configurable("estop_dual_channel")).toBe(false);
  });
});

describe("forMachine", () => {
  it("all for machine", () => {
    expect(forMachine("estop_single_channel")).toBe(true);
    expect(forMachine("configurable_safety_plc")).toBe(true);
  });
});

describe("category", () => {
  it("light curtain is cat 4 optoelectronic", () => {
    expect(category("light_curtain_monitor")).toBe("cat_4_optoelectronic_safeguard");
  });
});

describe("bestUse", () => {
  it("speed monitor for safe speed zero", () => {
    expect(bestUse("speed_standstill_monitor")).toBe("spindle_conveyor_safe_speed_zero");
  });
});

describe("safetyRelayTypes", () => {
  it("returns 5 types", () => {
    expect(safetyRelayTypes()).toHaveLength(5);
  });
});
