import { describe, it, expect } from "vitest";
import {
  installEase, securityStrength, walkThrough, portability,
  gateCost, noDamageWall, autoClose, gateDesign,
  bestSpot, petGates,
} from "../pet-gate-calc.js";

describe("installEase", () => {
  it("pressure mount easiest install", () => {
    expect(installEase("pressure_mount")).toBeGreaterThan(installEase("hardware_mount"));
  });
});

describe("securityStrength", () => {
  it("hardware mount strongest security", () => {
    expect(securityStrength("hardware_mount")).toBeGreaterThan(securityStrength("freestanding_fold"));
  });
});

describe("walkThrough", () => {
  it("extra tall walk through best walk through", () => {
    expect(walkThrough("extra_tall_walk_through")).toBeGreaterThan(walkThrough("freestanding_fold"));
  });
});

describe("portability", () => {
  it("freestanding fold most portable", () => {
    expect(portability("freestanding_fold")).toBeGreaterThan(portability("hardware_mount"));
  });
});

describe("gateCost", () => {
  it("extra tall walk through most expensive", () => {
    expect(gateCost("extra_tall_walk_through")).toBeGreaterThan(gateCost("pressure_mount"));
  });
});

describe("noDamageWall", () => {
  it("pressure mount does no wall damage", () => {
    expect(noDamageWall("pressure_mount")).toBe(true);
  });
  it("hardware mount does damage wall", () => {
    expect(noDamageWall("hardware_mount")).toBe(false);
  });
});

describe("autoClose", () => {
  it("pressure mount has auto close", () => {
    expect(autoClose("pressure_mount")).toBe(true);
  });
  it("freestanding fold does not", () => {
    expect(autoClose("freestanding_fold")).toBe(false);
  });
});

describe("gateDesign", () => {
  it("retractable mesh uses roll up mesh cassette", () => {
    expect(gateDesign("retractable_mesh")).toBe("roll_up_mesh_cassette");
  });
});

describe("bestSpot", () => {
  it("hardware mount for top of stairs safety", () => {
    expect(bestSpot("hardware_mount")).toBe("top_of_stairs_safety");
  });
});

describe("petGates", () => {
  it("returns 5 types", () => {
    expect(petGates()).toHaveLength(5);
  });
});
