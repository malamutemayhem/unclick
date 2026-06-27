import { describe, it, expect } from "vitest";
import {
  penetration, speed, precision, heatAffectedZone,
  lwCost, contactless, forReflective, source,
  bestUse, laserWeldTypes,
} from "../laser-weld-calc.js";

describe("penetration", () => {
  it("fiber cw deepest penetration", () => {
    expect(penetration("fiber_cw")).toBeGreaterThan(penetration("blue_diode"));
  });
});

describe("speed", () => {
  it("fiber cw fastest", () => {
    expect(speed("fiber_cw")).toBeGreaterThan(speed("pulsed_nd_yag"));
  });
});

describe("precision", () => {
  it("pulsed nd yag and disk laser most precise", () => {
    expect(precision("pulsed_nd_yag")).toBeGreaterThan(precision("co2_cw"));
    expect(precision("disk_laser")).toBeGreaterThan(precision("co2_cw"));
  });
});

describe("heatAffectedZone", () => {
  it("fiber cw and disk laser smallest haz", () => {
    expect(heatAffectedZone("fiber_cw")).toBeGreaterThan(heatAffectedZone("co2_cw"));
    expect(heatAffectedZone("disk_laser")).toBeGreaterThan(heatAffectedZone("co2_cw"));
  });
});

describe("lwCost", () => {
  it("blue diode most expensive", () => {
    expect(lwCost("blue_diode")).toBeGreaterThan(lwCost("pulsed_nd_yag"));
  });
});

describe("contactless", () => {
  it("all types are contactless", () => {
    expect(contactless("co2_cw")).toBe(true);
    expect(contactless("fiber_cw")).toBe(true);
  });
});

describe("forReflective", () => {
  it("fiber cw for reflective metals", () => {
    expect(forReflective("fiber_cw")).toBe(true);
  });
  it("co2 cw not for reflective metals", () => {
    expect(forReflective("co2_cw")).toBe(false);
  });
});

describe("source", () => {
  it("blue diode uses gallium nitride", () => {
    expect(source("blue_diode")).toBe("gallium_nitride_diode_450nm_blue_high_copper_absorption");
  });
});

describe("bestUse", () => {
  it("pulsed nd yag for mold repair", () => {
    expect(bestUse("pulsed_nd_yag")).toBe("mold_repair_jewelry_dental_prosthetic_precision_spot_weld");
  });
});

describe("laserWeldTypes", () => {
  it("returns 5 types", () => {
    expect(laserWeldTypes()).toHaveLength(5);
  });
});
