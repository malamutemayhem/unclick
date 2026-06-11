import { describe, it, expect } from "vitest";
import {
  speed, sealStrength, versatility, cleanability,
  smCost, contactless, forFoodSafety, method,
  bestUse, sealingMachineTypes,
} from "../sealing-machine-calc.js";

describe("speed", () => {
  it("induction cap fastest", () => {
    expect(speed("induction_cap")).toBeGreaterThan(speed("vacuum_map_chamber"));
  });
});

describe("sealStrength", () => {
  it("ultrasonic weld strongest seal", () => {
    expect(sealStrength("ultrasonic_weld")).toBeGreaterThan(sealStrength("heat_bar_impulse"));
  });
});

describe("versatility", () => {
  it("heat bar impulse most versatile", () => {
    expect(versatility("heat_bar_impulse")).toBeGreaterThan(versatility("induction_cap"));
  });
});

describe("cleanability", () => {
  it("ultrasonic weld best cleanability", () => {
    expect(cleanability("ultrasonic_weld")).toBeGreaterThan(cleanability("heat_bar_impulse"));
  });
});

describe("smCost", () => {
  it("ultrasonic weld most expensive", () => {
    expect(smCost("ultrasonic_weld")).toBeGreaterThan(smCost("heat_bar_impulse"));
  });
});

describe("contactless", () => {
  it("induction cap is contactless", () => {
    expect(contactless("induction_cap")).toBe(true);
  });
  it("heat bar impulse not contactless", () => {
    expect(contactless("heat_bar_impulse")).toBe(false);
  });
});

describe("forFoodSafety", () => {
  it("all sealing machines for food safety", () => {
    expect(forFoodSafety("heat_bar_impulse")).toBe(true);
    expect(forFoodSafety("vacuum_map_chamber")).toBe(true);
  });
});

describe("method", () => {
  it("vacuum map uses chamber vacuum gas flush", () => {
    expect(method("vacuum_map_chamber")).toBe("chamber_vacuum_gas_flush_map_heat_seal_tray_or_bag");
  });
});

describe("bestUse", () => {
  it("induction cap for bottle jar tamper evident", () => {
    expect(bestUse("induction_cap")).toBe("bottle_jar_tamper_evident_foil_seal_pharma_beverage");
  });
});

describe("sealingMachineTypes", () => {
  it("returns 5 types", () => {
    expect(sealingMachineTypes()).toHaveLength(5);
  });
});
