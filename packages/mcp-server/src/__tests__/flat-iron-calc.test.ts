import { describe, it, expect } from "vitest";
import {
  heatDistribution, smoothResult, hairProtection, heatUpSpeed,
  ironCost, dualVoltage, autoShutoff, plateCoating,
  bestHair, flatIrons,
} from "../flat-iron-calc.js";

describe("heatDistribution", () => {
  it("titanium pro salon best heat distribution", () => {
    expect(heatDistribution("titanium_pro_salon")).toBeGreaterThan(heatDistribution("mini_travel_compact"));
  });
});

describe("smoothResult", () => {
  it("titanium pro salon smoothest result", () => {
    expect(smoothResult("titanium_pro_salon")).toBeGreaterThan(smoothResult("ceramic_plate_basic"));
  });
});

describe("hairProtection", () => {
  it("steam moisture infuse best hair protection", () => {
    expect(hairProtection("steam_moisture_infuse")).toBeGreaterThan(hairProtection("titanium_pro_salon"));
  });
});

describe("heatUpSpeed", () => {
  it("titanium pro salon fastest heat up", () => {
    expect(heatUpSpeed("titanium_pro_salon")).toBeGreaterThan(heatUpSpeed("steam_moisture_infuse"));
  });
});

describe("ironCost", () => {
  it("titanium pro salon most expensive", () => {
    expect(ironCost("titanium_pro_salon")).toBeGreaterThan(ironCost("ceramic_plate_basic"));
  });
});

describe("dualVoltage", () => {
  it("mini travel compact has dual voltage", () => {
    expect(dualVoltage("mini_travel_compact")).toBe(true);
  });
  it("ceramic plate basic has no dual voltage", () => {
    expect(dualVoltage("ceramic_plate_basic")).toBe(false);
  });
});

describe("autoShutoff", () => {
  it("all flat irons have auto shutoff", () => {
    expect(autoShutoff("ceramic_plate_basic")).toBe(true);
    expect(autoShutoff("titanium_pro_salon")).toBe(true);
  });
});

describe("plateCoating", () => {
  it("tourmaline ionic shine uses tourmaline ceramic ion", () => {
    expect(plateCoating("tourmaline_ionic_shine")).toBe("tourmaline_ceramic_ion");
  });
});

describe("bestHair", () => {
  it("titanium pro salon best for thick coarse curly", () => {
    expect(bestHair("titanium_pro_salon")).toBe("thick_coarse_curly");
  });
});

describe("flatIrons", () => {
  it("returns 5 types", () => {
    expect(flatIrons()).toHaveLength(5);
  });
});
