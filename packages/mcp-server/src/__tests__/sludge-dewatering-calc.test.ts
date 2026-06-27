import { describe, it, expect } from "vitest";
import {
  cakeDryness, throughput, energyUse, polymerUse,
  sdwCost, continuous, forHighVolume, mechanism,
  bestUse, sludgeDewateringTypes,
} from "../sludge-dewatering-calc.js";

describe("cakeDryness", () => {
  it("plate frame press driest cake", () => {
    expect(cakeDryness("plate_frame_press")).toBeGreaterThan(cakeDryness("vacuum_drum_filter"));
  });
});

describe("throughput", () => {
  it("centrifuge decanter highest throughput", () => {
    expect(throughput("centrifuge_decanter")).toBeGreaterThan(throughput("plate_frame_press"));
  });
});

describe("energyUse", () => {
  it("centrifuge decanter highest energy use", () => {
    expect(energyUse("centrifuge_decanter")).toBeGreaterThan(energyUse("screw_press"));
  });
});

describe("polymerUse", () => {
  it("centrifuge decanter highest polymer use", () => {
    expect(polymerUse("centrifuge_decanter")).toBeGreaterThan(polymerUse("plate_frame_press"));
  });
});

describe("sdwCost", () => {
  it("centrifuge decanter most expensive", () => {
    expect(sdwCost("centrifuge_decanter")).toBeGreaterThan(sdwCost("screw_press"));
  });
});

describe("continuous", () => {
  it("belt filter press is continuous", () => {
    expect(continuous("belt_filter_press")).toBe(true);
  });
  it("plate frame press not continuous", () => {
    expect(continuous("plate_frame_press")).toBe(false);
  });
});

describe("forHighVolume", () => {
  it("centrifuge decanter for high volume", () => {
    expect(forHighVolume("centrifuge_decanter")).toBe(true);
  });
  it("screw press not for high volume", () => {
    expect(forHighVolume("screw_press")).toBe(false);
  });
});

describe("mechanism", () => {
  it("screw press uses rotating screw", () => {
    expect(mechanism("screw_press")).toBe("rotating_screw_in_cylinder_slow_squeeze_low_energy");
  });
});

describe("bestUse", () => {
  it("plate frame press for industrial chemical sludge", () => {
    expect(bestUse("plate_frame_press")).toBe("industrial_chemical_sludge_mining_tailings_dry_cake");
  });
});

describe("sludgeDewateringTypes", () => {
  it("returns 5 types", () => {
    expect(sludgeDewateringTypes()).toHaveLength(5);
  });
});
