import { describe, it, expect } from "vitest";
import {
  countryCompat, chargingPorts, compactness, safetyRating,
  adapterCost, convertsVoltage, surgeProtect, plugDesign,
  bestTrip, travelAdapters,
} from "../travel-adapter-calc.js";

describe("countryCompat", () => {
  it("universal all in one best compatibility", () => {
    expect(countryCompat("universal_all_in_one")).toBeGreaterThan(countryCompat("multi_port_power_strip"));
  });
});

describe("chargingPorts", () => {
  it("multi port power strip most ports", () => {
    expect(chargingPorts("multi_port_power_strip")).toBeGreaterThan(chargingPorts("plug_only_no_convert"));
  });
});

describe("compactness", () => {
  it("usb c gan charger most compact", () => {
    expect(compactness("usb_c_gan_charger")).toBeGreaterThan(compactness("voltage_converter_heavy"));
  });
});

describe("safetyRating", () => {
  it("usb c gan charger best safety", () => {
    expect(safetyRating("usb_c_gan_charger")).toBeGreaterThan(safetyRating("plug_only_no_convert"));
  });
});

describe("adapterCost", () => {
  it("voltage converter heavy most expensive", () => {
    expect(adapterCost("voltage_converter_heavy")).toBeGreaterThan(adapterCost("plug_only_no_convert"));
  });
});

describe("convertsVoltage", () => {
  it("voltage converter heavy converts voltage", () => {
    expect(convertsVoltage("voltage_converter_heavy")).toBe(true);
  });
  it("universal all in one does not", () => {
    expect(convertsVoltage("universal_all_in_one")).toBe(false);
  });
});

describe("surgeProtect", () => {
  it("universal all in one has surge protect", () => {
    expect(surgeProtect("universal_all_in_one")).toBe(true);
  });
  it("plug only no convert does not", () => {
    expect(surgeProtect("plug_only_no_convert")).toBe(false);
  });
});

describe("plugDesign", () => {
  it("usb c gan charger uses folding prong gan brick", () => {
    expect(plugDesign("usb_c_gan_charger")).toBe("folding_prong_gan_brick");
  });
});

describe("bestTrip", () => {
  it("universal all in one best for multi country backpack", () => {
    expect(bestTrip("universal_all_in_one")).toBe("multi_country_backpack");
  });
});

describe("travelAdapters", () => {
  it("returns 5 types", () => {
    expect(travelAdapters()).toHaveLength(5);
  });
});
