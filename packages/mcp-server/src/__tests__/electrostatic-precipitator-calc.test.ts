import { describe, it, expect } from "vitest";
import {
  efficiency, gasVolume, pressureDrop, particleSize,
  epCost, wet, forPowerPlant, electrode,
  bestUse, electrostaticPrecipitatorTypes,
} from "../electrostatic-precipitator-calc.js";

describe("efficiency", () => {
  it("wet tubular highest efficiency", () => {
    expect(efficiency("wet_tubular")).toBeGreaterThan(efficiency("two_stage"));
  });
});

describe("gasVolume", () => {
  it("dry plate wire highest gas volume", () => {
    expect(gasVolume("dry_plate_wire")).toBeGreaterThan(gasVolume("two_stage"));
  });
});

describe("pressureDrop", () => {
  it("dry plate wire best pressure drop", () => {
    expect(pressureDrop("dry_plate_wire")).toBeGreaterThan(pressureDrop("wet_tubular"));
  });
});

describe("particleSize", () => {
  it("wet tubular finest particle size capture", () => {
    expect(particleSize("wet_tubular")).toBeGreaterThan(particleSize("dry_plate_wire"));
  });
});

describe("epCost", () => {
  it("wet tubular and hot side most expensive", () => {
    expect(epCost("wet_tubular")).toBeGreaterThan(epCost("two_stage"));
    expect(epCost("hot_side")).toBeGreaterThan(epCost("two_stage"));
  });
});

describe("wet", () => {
  it("wet tubular uses wet process", () => {
    expect(wet("wet_tubular")).toBe(true);
  });
  it("dry plate wire is dry", () => {
    expect(wet("dry_plate_wire")).toBe(false);
  });
});

describe("forPowerPlant", () => {
  it("dry plate wire for power plant", () => {
    expect(forPowerPlant("dry_plate_wire")).toBe(true);
  });
  it("two stage not for power plant", () => {
    expect(forPowerPlant("two_stage")).toBe(false);
  });
});

describe("electrode", () => {
  it("two stage uses ionizer wire first stage", () => {
    expect(electrode("two_stage")).toBe("ionizer_wire_first_stage_collector_plate_second_stage");
  });
});

describe("bestUse", () => {
  it("wet tubular for acid mist tar fog", () => {
    expect(bestUse("wet_tubular")).toBe("acid_mist_tar_fog_fine_aerosol_sulfuric_acid_plant_metal");
  });
});

describe("electrostaticPrecipitatorTypes", () => {
  it("returns 5 types", () => {
    expect(electrostaticPrecipitatorTypes()).toHaveLength(5);
  });
});
