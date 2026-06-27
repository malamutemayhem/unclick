import { describe, it, expect } from "vitest";
import {
  portDensity, accessibility, protection, scalability,
  feCost, lockable, forOutdoor, termination,
  bestUse, fiberEnclosureTypes,
} from "../fiber-enclosure-calc.js";

describe("portDensity", () => {
  it("4u highest port density", () => {
    expect(portDensity("rack_mount_4u_high_density")).toBeGreaterThan(portDensity("wall_mount_patch_small"));
  });
});

describe("accessibility", () => {
  it("cassette most accessible", () => {
    expect(accessibility("modular_cassette_mpo")).toBeGreaterThan(accessibility("outdoor_pedestal_nema"));
  });
});

describe("protection", () => {
  it("outdoor best protection", () => {
    expect(protection("outdoor_pedestal_nema")).toBeGreaterThan(protection("wall_mount_patch_small"));
  });
});

describe("scalability", () => {
  it("cassette most scalable", () => {
    expect(scalability("modular_cassette_mpo")).toBeGreaterThan(scalability("wall_mount_patch_small"));
  });
});

describe("feCost", () => {
  it("cassette most expensive", () => {
    expect(feCost("modular_cassette_mpo")).toBeGreaterThan(feCost("wall_mount_patch_small"));
  });
});

describe("lockable", () => {
  it("rack mount is lockable", () => {
    expect(lockable("rack_mount_1u_slide")).toBe(true);
  });
  it("cassette not lockable", () => {
    expect(lockable("modular_cassette_mpo")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("pedestal for outdoor", () => {
    expect(forOutdoor("outdoor_pedestal_nema")).toBe(true);
  });
  it("wall mount not outdoor", () => {
    expect(forOutdoor("wall_mount_patch_small")).toBe(false);
  });
});

describe("termination", () => {
  it("cassette uses pre terminated mpo", () => {
    expect(termination("modular_cassette_mpo")).toBe("pre_terminated_mpo_cassette_snap");
  });
});

describe("bestUse", () => {
  it("4u for data center core", () => {
    expect(bestUse("rack_mount_4u_high_density")).toBe("data_center_core_distribution");
  });
});

describe("fiberEnclosureTypes", () => {
  it("returns 5 types", () => {
    expect(fiberEnclosureTypes()).toHaveLength(5);
  });
});
