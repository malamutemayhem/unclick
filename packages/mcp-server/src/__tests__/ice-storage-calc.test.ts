import { describe, it, expect } from "vitest";
import {
  capacity, efficiency, discharge, footprint,
  isCost, partialStorage, forPeakShave, medium,
  bestUse, iceStorageTypes,
} from "../ice-storage-calc.js";

describe("capacity", () => {
  it("slurry highest capacity", () => {
    expect(capacity("ice_slurry_harvester")).toBeGreaterThan(capacity("eutectic_salt_plate"));
  });
});

describe("efficiency", () => {
  it("eutectic most efficient", () => {
    expect(efficiency("eutectic_salt_plate")).toBeGreaterThan(efficiency("ice_slurry_harvester"));
  });
});

describe("discharge", () => {
  it("slurry fastest discharge", () => {
    expect(discharge("ice_slurry_harvester")).toBeGreaterThan(discharge("eutectic_salt_plate"));
  });
});

describe("footprint", () => {
  it("eutectic smallest footprint", () => {
    expect(footprint("eutectic_salt_plate")).toBeGreaterThan(footprint("ice_slurry_harvester"));
  });
});

describe("isCost", () => {
  it("slurry most expensive", () => {
    expect(isCost("ice_slurry_harvester")).toBeGreaterThan(isCost("eutectic_salt_plate"));
  });
});

describe("partialStorage", () => {
  it("encapsulated supports partial", () => {
    expect(partialStorage("encapsulated_ball_container")).toBe(true);
  });
  it("slurry not partial", () => {
    expect(partialStorage("ice_slurry_harvester")).toBe(false);
  });
});

describe("forPeakShave", () => {
  it("internal melt for peak shave", () => {
    expect(forPeakShave("internal_melt_coil")).toBe(true);
  });
  it("slurry not peak shave", () => {
    expect(forPeakShave("ice_slurry_harvester")).toBe(false);
  });
});

describe("medium", () => {
  it("encapsulated uses spherical capsule", () => {
    expect(medium("encapsulated_ball_container")).toBe("spherical_capsule_phase_change");
  });
});

describe("bestUse", () => {
  it("eutectic for cold chain", () => {
    expect(bestUse("eutectic_salt_plate")).toBe("cold_chain_transport_backup");
  });
});

describe("iceStorageTypes", () => {
  it("returns 5 types", () => {
    expect(iceStorageTypes()).toHaveLength(5);
  });
});
