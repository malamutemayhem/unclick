import { describe, it, expect } from "vitest";
import {
  peakAmps, portability, chargeRetention, coldWeather,
  starterCost, usbCharging, noPreCharge, batteryType,
  bestScenario, jumpStarters,
} from "../jump-starter-calc.js";

describe("peakAmps", () => {
  it("ultracapacitor highest peak amps", () => {
    expect(peakAmps("ultracapacitor")).toBeGreaterThan(peakAmps("solar_trickle"));
  });
});

describe("portability", () => {
  it("lithium compact most portable", () => {
    expect(portability("lithium_compact")).toBeGreaterThan(portability("lead_acid_heavy"));
  });
});

describe("chargeRetention", () => {
  it("solar trickle best charge retention", () => {
    expect(chargeRetention("solar_trickle")).toBeGreaterThan(chargeRetention("ultracapacitor"));
  });
});

describe("coldWeather", () => {
  it("ultracapacitor best cold weather", () => {
    expect(coldWeather("ultracapacitor")).toBeGreaterThan(coldWeather("solar_trickle"));
  });
});

describe("starterCost", () => {
  it("ultracapacitor most expensive", () => {
    expect(starterCost("ultracapacitor")).toBeGreaterThan(starterCost("solar_trickle"));
  });
});

describe("usbCharging", () => {
  it("lithium compact has usb charging", () => {
    expect(usbCharging("lithium_compact")).toBe(true);
  });
  it("lead acid heavy does not", () => {
    expect(usbCharging("lead_acid_heavy")).toBe(false);
  });
});

describe("noPreCharge", () => {
  it("ultracapacitor needs no pre charge", () => {
    expect(noPreCharge("ultracapacitor")).toBe(true);
  });
  it("lithium compact does", () => {
    expect(noPreCharge("lithium_compact")).toBe(false);
  });
});

describe("batteryType", () => {
  it("ultracapacitor uses supercapacitor bank", () => {
    expect(batteryType("ultracapacitor")).toBe("supercapacitor_bank");
  });
});

describe("bestScenario", () => {
  it("lithium compact for glove box emergency", () => {
    expect(bestScenario("lithium_compact")).toBe("glove_box_emergency");
  });
});

describe("jumpStarters", () => {
  it("returns 5 types", () => {
    expect(jumpStarters()).toHaveLength(5);
  });
});
