import { describe, it, expect } from "vitest";
import {
  rdson, switchSpeed, voltage, thermal,
  mosCost, enhancementMode, forEv, material,
  bestUse, mosfetTypes,
} from "../mosfet-type-calc.js";

describe("rdson", () => {
  it("sic mosfet lowest rdson", () => {
    expect(rdson("sic_mosfet")).toBeGreaterThan(rdson("si_planar_mosfet"));
  });
});

describe("switchSpeed", () => {
  it("gan hemt fastest switching", () => {
    expect(switchSpeed("gan_hemt")).toBeGreaterThan(switchSpeed("igbt_trench"));
  });
});

describe("voltage", () => {
  it("sic mosfet highest voltage", () => {
    expect(voltage("sic_mosfet")).toBeGreaterThan(voltage("si_planar_mosfet"));
  });
});

describe("thermal", () => {
  it("sic mosfet best thermal", () => {
    expect(thermal("sic_mosfet")).toBeGreaterThan(thermal("si_planar_mosfet"));
  });
});

describe("mosCost", () => {
  it("sic mosfet most expensive", () => {
    expect(mosCost("sic_mosfet")).toBeGreaterThan(mosCost("si_planar_mosfet"));
  });
});

describe("enhancementMode", () => {
  it("si planar is enhancement mode", () => {
    expect(enhancementMode("si_planar_mosfet")).toBe(true);
  });
  it("gan hemt not enhancement mode", () => {
    expect(enhancementMode("gan_hemt")).toBe(false);
  });
});

describe("forEv", () => {
  it("sic mosfet for ev", () => {
    expect(forEv("sic_mosfet")).toBe(true);
  });
  it("si planar not for ev", () => {
    expect(forEv("si_planar_mosfet")).toBe(false);
  });
});

describe("material", () => {
  it("gan hemt uses gallium nitride on si", () => {
    expect(material("gan_hemt")).toBe("gallium_nitride_on_si");
  });
});

describe("bestUse", () => {
  it("igbt trench best for mw grid inverter", () => {
    expect(bestUse("igbt_trench")).toBe("mw_grid_inverter");
  });
});

describe("mosfetTypes", () => {
  it("returns 5 types", () => {
    expect(mosfetTypes()).toHaveLength(5);
  });
});
