import { describe, it, expect } from "vitest";
import {
  integration, flexibility, efficiency, railCount,
  pmicCost, programmable, forMobile, interface_,
  bestUse, pmicTypes,
} from "../pmic-type-calc.js";

describe("integration", () => {
  it("integrated soc pmic highest integration", () => {
    expect(integration("integrated_soc_pmic")).toBeGreaterThan(integration("discrete_multi_rail"));
  });
});

describe("flexibility", () => {
  it("discrete multi rail most flexible", () => {
    expect(flexibility("discrete_multi_rail")).toBeGreaterThan(flexibility("integrated_soc_pmic"));
  });
});

describe("efficiency", () => {
  it("digital pmbus vr highest efficiency", () => {
    expect(efficiency("digital_pmbus_vr")).toBeGreaterThan(efficiency("integrated_soc_pmic"));
  });
});

describe("railCount", () => {
  it("integrated soc pmic most rails", () => {
    expect(railCount("integrated_soc_pmic")).toBeGreaterThan(railCount("charger_gauge_combo"));
  });
});

describe("pmicCost", () => {
  it("digital pmbus vr most expensive", () => {
    expect(pmicCost("digital_pmbus_vr")).toBeGreaterThan(pmicCost("charger_gauge_combo"));
  });
});

describe("programmable", () => {
  it("integrated soc pmic is programmable", () => {
    expect(programmable("integrated_soc_pmic")).toBe(true);
  });
  it("discrete multi rail not programmable", () => {
    expect(programmable("discrete_multi_rail")).toBe(false);
  });
});

describe("forMobile", () => {
  it("integrated soc pmic for mobile", () => {
    expect(forMobile("integrated_soc_pmic")).toBe(true);
  });
  it("discrete multi rail not for mobile", () => {
    expect(forMobile("discrete_multi_rail")).toBe(false);
  });
});

describe("interface_", () => {
  it("digital pmbus vr uses pmbus avs telemetry", () => {
    expect(interface_("digital_pmbus_vr")).toBe("pmbus_avs_telemetry");
  });
});

describe("bestUse", () => {
  it("charger gauge combo best for wearable battery system", () => {
    expect(bestUse("charger_gauge_combo")).toBe("wearable_battery_system");
  });
});

describe("pmicTypes", () => {
  it("returns 5 types", () => {
    expect(pmicTypes()).toHaveLength(5);
  });
});
