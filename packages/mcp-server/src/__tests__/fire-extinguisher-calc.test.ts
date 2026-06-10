import { describe, it, expect } from "vitest";
import {
  fireClassRange, dischargeTime, cleanupEase, portability,
  extinguisherCost, rechargeable, safeForElectronics, agentType,
  bestLocation, fireExtinguishers,
} from "../fire-extinguisher-calc.js";

describe("fireClassRange", () => {
  it("abc dry chemical widest range", () => {
    expect(fireClassRange("abc_dry_chemical")).toBeGreaterThan(fireClassRange("kitchen_wet_chemical"));
  });
});

describe("dischargeTime", () => {
  it("halon clean agent fastest discharge", () => {
    expect(dischargeTime("halon_clean_agent")).toBeGreaterThan(dischargeTime("abc_dry_chemical"));
  });
});

describe("cleanupEase", () => {
  it("co2 gas easiest cleanup", () => {
    expect(cleanupEase("co2_gas")).toBeGreaterThan(cleanupEase("abc_dry_chemical"));
  });
});

describe("portability", () => {
  it("water mist most portable", () => {
    expect(portability("water_mist")).toBeGreaterThan(portability("co2_gas"));
  });
});

describe("extinguisherCost", () => {
  it("halon clean agent most expensive", () => {
    expect(extinguisherCost("halon_clean_agent")).toBeGreaterThan(extinguisherCost("abc_dry_chemical"));
  });
});

describe("rechargeable", () => {
  it("all are rechargeable", () => {
    expect(rechargeable("abc_dry_chemical")).toBe(true);
    expect(rechargeable("co2_gas")).toBe(true);
  });
});

describe("safeForElectronics", () => {
  it("co2 gas is safe for electronics", () => {
    expect(safeForElectronics("co2_gas")).toBe(true);
  });
  it("abc dry chemical is not", () => {
    expect(safeForElectronics("abc_dry_chemical")).toBe(false);
  });
});

describe("agentType", () => {
  it("co2 gas uses carbon dioxide gas", () => {
    expect(agentType("co2_gas")).toBe("carbon_dioxide_gas");
  });
});

describe("bestLocation", () => {
  it("co2 gas best for server room lab", () => {
    expect(bestLocation("co2_gas")).toBe("server_room_lab");
  });
});

describe("fireExtinguishers", () => {
  it("returns 5 types", () => {
    expect(fireExtinguishers()).toHaveLength(5);
  });
});
