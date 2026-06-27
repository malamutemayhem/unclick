import { describe, it, expect } from "vitest";
import {
  sensitivity, range, efficiency, bandwidth,
  rfhCost, ambient, forIot, antenna,
  bestUse, rfHarvests,
} from "../rf-harvest-calc.js";

describe("sensitivity", () => {
  it("backscatter reflect highest sensitivity", () => {
    expect(sensitivity("backscatter_reflect")).toBeGreaterThan(sensitivity("rectenna_dipole"));
  });
});

describe("range", () => {
  it("dedicated 915mhz longest range", () => {
    expect(range("dedicated_915mhz")).toBeGreaterThan(range("backscatter_reflect"));
  });
});

describe("efficiency", () => {
  it("dedicated 915mhz most efficient", () => {
    expect(efficiency("dedicated_915mhz")).toBeGreaterThan(efficiency("backscatter_reflect"));
  });
});

describe("bandwidth", () => {
  it("multi band wideband widest bandwidth", () => {
    expect(bandwidth("multi_band_wideband")).toBeGreaterThan(bandwidth("dedicated_915mhz"));
  });
});

describe("rfhCost", () => {
  it("multi band wideband most expensive", () => {
    expect(rfhCost("multi_band_wideband")).toBeGreaterThan(rfhCost("backscatter_reflect"));
  });
});

describe("ambient", () => {
  it("ambient wifi scavenge is ambient", () => {
    expect(ambient("ambient_wifi_scavenge")).toBe(true);
  });
  it("dedicated 915mhz not ambient", () => {
    expect(ambient("dedicated_915mhz")).toBe(false);
  });
});

describe("forIot", () => {
  it("backscatter reflect for iot", () => {
    expect(forIot("backscatter_reflect")).toBe(true);
  });
  it("rectenna dipole not for iot", () => {
    expect(forIot("rectenna_dipole")).toBe(false);
  });
});

describe("antenna", () => {
  it("multi band wideband uses spiral log periodic", () => {
    expect(antenna("multi_band_wideband")).toBe("spiral_log_periodic");
  });
});

describe("bestUse", () => {
  it("backscatter reflect best for rfid batteryless sensor", () => {
    expect(bestUse("backscatter_reflect")).toBe("rfid_batteryless_sensor");
  });
});

describe("rfHarvests", () => {
  it("returns 5 types", () => {
    expect(rfHarvests()).toHaveLength(5);
  });
});
