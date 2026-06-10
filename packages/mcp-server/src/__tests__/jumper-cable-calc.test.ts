import { describe, it, expect } from "vitest";
import {
  peakAmps, cableLength, portability, safetyFeatures,
  cableCost, needsSecondCar, surgeProtect, conductorType,
  bestVehicle, jumperCables,
} from "../jumper-cable-calc.js";

describe("peakAmps", () => {
  it("commercial 1ga truck highest peak amps", () => {
    expect(peakAmps("commercial_1ga_truck")).toBeGreaterThan(peakAmps("standard_copper_10ga"));
  });
});

describe("cableLength", () => {
  it("commercial 1ga truck longest cable", () => {
    expect(cableLength("commercial_1ga_truck")).toBeGreaterThan(cableLength("lithium_jump_pack"));
  });
});

describe("portability", () => {
  it("lithium jump pack most portable", () => {
    expect(portability("lithium_jump_pack")).toBeGreaterThan(portability("commercial_1ga_truck"));
  });
});

describe("safetyFeatures", () => {
  it("smart reverse protect safest", () => {
    expect(safetyFeatures("smart_reverse_protect")).toBeGreaterThan(safetyFeatures("standard_copper_10ga"));
  });
});

describe("cableCost", () => {
  it("lithium jump pack most expensive", () => {
    expect(cableCost("lithium_jump_pack")).toBeGreaterThan(cableCost("standard_copper_10ga"));
  });
});

describe("needsSecondCar", () => {
  it("standard copper 10ga needs second car", () => {
    expect(needsSecondCar("standard_copper_10ga")).toBe(true);
  });
  it("lithium jump pack does not", () => {
    expect(needsSecondCar("lithium_jump_pack")).toBe(false);
  });
});

describe("surgeProtect", () => {
  it("smart reverse protect has surge protection", () => {
    expect(surgeProtect("smart_reverse_protect")).toBe(true);
  });
  it("heavy duty 4ga does not", () => {
    expect(surgeProtect("heavy_duty_4ga")).toBe(false);
  });
});

describe("conductorType", () => {
  it("lithium jump pack uses internal lithium cell", () => {
    expect(conductorType("lithium_jump_pack")).toBe("internal_lithium_cell");
  });
});

describe("bestVehicle", () => {
  it("lithium jump pack best for solo emergency portable", () => {
    expect(bestVehicle("lithium_jump_pack")).toBe("solo_emergency_portable");
  });
});

describe("jumperCables", () => {
  it("returns 5 types", () => {
    expect(jumperCables()).toHaveLength(5);
  });
});
