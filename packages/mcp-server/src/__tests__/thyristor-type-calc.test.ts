import { describe, it, expect } from "vitest";
import {
  voltageRating, currentRating, switchingSpeed, conduction,
  deviceCost, turnOffCapable, forHvdc, gateType,
  bestUse, thyristorTypes,
} from "../thyristor-type-calc.js";

describe("voltageRating", () => {
  it("igct integrated highest voltage rating", () => {
    expect(voltageRating("igct_integrated")).toBeGreaterThan(voltageRating("triac_bidirect"));
  });
});

describe("currentRating", () => {
  it("igct integrated highest current rating", () => {
    expect(currentRating("igct_integrated")).toBeGreaterThan(currentRating("triac_bidirect"));
  });
});

describe("switchingSpeed", () => {
  it("mcr light trigger fastest switching", () => {
    expect(switchingSpeed("mcr_light_trigger")).toBeGreaterThan(switchingSpeed("scr_phase_control"));
  });
});

describe("conduction", () => {
  it("scr phase control best conduction", () => {
    expect(conduction("scr_phase_control")).toBeGreaterThan(conduction("triac_bidirect"));
  });
});

describe("deviceCost", () => {
  it("igct integrated most expensive", () => {
    expect(deviceCost("igct_integrated")).toBeGreaterThan(deviceCost("triac_bidirect"));
  });
});

describe("turnOffCapable", () => {
  it("gto gate turnoff is turn off capable", () => {
    expect(turnOffCapable("gto_gate_turnoff")).toBe(true);
  });
  it("scr phase control not turn off capable", () => {
    expect(turnOffCapable("scr_phase_control")).toBe(false);
  });
});

describe("forHvdc", () => {
  it("scr phase control is for hvdc", () => {
    expect(forHvdc("scr_phase_control")).toBe(true);
  });
  it("triac bidirect not for hvdc", () => {
    expect(forHvdc("triac_bidirect")).toBe(false);
  });
});

describe("gateType", () => {
  it("mcr light trigger uses optically triggered", () => {
    expect(gateType("mcr_light_trigger")).toBe("optically_triggered");
  });
});

describe("bestUse", () => {
  it("igct integrated best for medium voltage drive", () => {
    expect(bestUse("igct_integrated")).toBe("medium_voltage_drive");
  });
});

describe("thyristorTypes", () => {
  it("returns 5 types", () => {
    expect(thyristorTypes()).toHaveLength(5);
  });
});
