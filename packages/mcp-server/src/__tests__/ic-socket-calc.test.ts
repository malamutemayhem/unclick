import { describe, it, expect } from "vitest";
import {
  contactReliability, insertCycles, signalPerf, thermalPath,
  socketCost, leverLock, forProduction, contactType,
  bestUse, icSockets,
} from "../ic-socket-calc.js";

describe("contactReliability", () => {
  it("zif zero insert best contact reliability", () => {
    expect(contactReliability("zif_zero_insert")).toBeGreaterThan(contactReliability("dip_through_hole"));
  });
});

describe("insertCycles", () => {
  it("zif zero insert most insert cycles", () => {
    expect(insertCycles("zif_zero_insert")).toBeGreaterThan(insertCycles("dip_through_hole"));
  });
});

describe("signalPerf", () => {
  it("lga land grid best signal perf", () => {
    expect(signalPerf("lga_land_grid")).toBeGreaterThan(signalPerf("dip_through_hole"));
  });
});

describe("thermalPath", () => {
  it("lga land grid best thermal path", () => {
    expect(thermalPath("lga_land_grid")).toBeGreaterThan(thermalPath("dip_through_hole"));
  });
});

describe("socketCost", () => {
  it("burn in test most expensive", () => {
    expect(socketCost("burn_in_test")).toBeGreaterThan(socketCost("dip_through_hole"));
  });
});

describe("leverLock", () => {
  it("zif zero insert has lever lock", () => {
    expect(leverLock("zif_zero_insert")).toBe(true);
  });
  it("pga pin grid no lever lock", () => {
    expect(leverLock("pga_pin_grid")).toBe(false);
  });
});

describe("forProduction", () => {
  it("lga land grid is for production", () => {
    expect(forProduction("lga_land_grid")).toBe(true);
  });
  it("zif zero insert not for production", () => {
    expect(forProduction("zif_zero_insert")).toBe(false);
  });
});

describe("contactType", () => {
  it("burn in test uses kelvin probe contact", () => {
    expect(contactType("burn_in_test")).toBe("kelvin_probe_contact");
  });
});

describe("bestUse", () => {
  it("dip through hole best for hobby breadboard proto", () => {
    expect(bestUse("dip_through_hole")).toBe("hobby_breadboard_proto");
  });
});

describe("icSockets", () => {
  it("returns 5 types", () => {
    expect(icSockets()).toHaveLength(5);
  });
});
