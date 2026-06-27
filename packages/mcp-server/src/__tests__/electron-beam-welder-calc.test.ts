import { describe, it, expect } from "vitest";
import {
  penetrationDepth, weldPrecision, weldSpeed, heatInput,
  ebCost, vacuum, forAerospace, welderConfig,
  bestUse, electronBeamWelderTypes,
} from "../electron-beam-welder-calc.js";

describe("penetrationDepth", () => {
  it("high vacuum deepest penetration", () => {
    expect(penetrationDepth("high_vacuum")).toBeGreaterThan(penetrationDepth("portable_local"));
  });
});

describe("weldPrecision", () => {
  it("high vacuum best weld precision", () => {
    expect(weldPrecision("high_vacuum")).toBeGreaterThan(weldPrecision("non_vacuum"));
  });
});

describe("weldSpeed", () => {
  it("multi beam fastest weld speed", () => {
    expect(weldSpeed("multi_beam")).toBeGreaterThan(weldSpeed("portable_local"));
  });
});

describe("heatInput", () => {
  it("high vacuum lowest heat input (best control)", () => {
    expect(heatInput("high_vacuum")).toBeGreaterThan(heatInput("portable_local"));
  });
});

describe("ebCost", () => {
  it("high vacuum most expensive", () => {
    expect(ebCost("high_vacuum")).toBeGreaterThan(ebCost("portable_local"));
  });
});

describe("vacuum", () => {
  it("high vacuum requires vacuum", () => {
    expect(vacuum("high_vacuum")).toBe(true);
  });
  it("non vacuum no vacuum", () => {
    expect(vacuum("non_vacuum")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("high vacuum for aerospace", () => {
    expect(forAerospace("high_vacuum")).toBe(true);
  });
  it("non vacuum not for aerospace", () => {
    expect(forAerospace("non_vacuum")).toBe(false);
  });
});

describe("welderConfig", () => {
  it("portable local uses field repair on site", () => {
    expect(welderConfig("portable_local")).toBe("portable_local_vacuum_seal_electron_beam_field_repair_on_site");
  });
});

describe("bestUse", () => {
  it("multi beam for high production multi joint", () => {
    expect(bestUse("multi_beam")).toBe("high_production_multi_joint_simultaneous_electron_beam_weld_auto");
  });
});

describe("electronBeamWelderTypes", () => {
  it("returns 5 types", () => {
    expect(electronBeamWelderTypes()).toHaveLength(5);
  });
});
