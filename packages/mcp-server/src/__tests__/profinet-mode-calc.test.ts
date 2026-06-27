import { describe, it, expect } from "vitest";
import {
  cycleTime, determinism, bandwidth, redundancy,
  modeCost, hardwareSync, forMotion, scheduling,
  bestUse, profinetModes,
} from "../profinet-mode-calc.js";

describe("cycleTime", () => {
  it("profinet irt best cycle time", () => {
    expect(cycleTime("profinet_irt")).toBeGreaterThan(cycleTime("profinet_cba"));
  });
});

describe("determinism", () => {
  it("profinet irt most deterministic", () => {
    expect(determinism("profinet_irt")).toBeGreaterThan(determinism("profinet_rt"));
  });
});

describe("bandwidth", () => {
  it("profinet tsn most bandwidth", () => {
    expect(bandwidth("profinet_tsn")).toBeGreaterThan(bandwidth("profinet_cba"));
  });
});

describe("redundancy", () => {
  it("profinet mrp best redundancy", () => {
    expect(redundancy("profinet_mrp")).toBeGreaterThan(redundancy("profinet_cba"));
  });
});

describe("modeCost", () => {
  it("profinet tsn most expensive", () => {
    expect(modeCost("profinet_tsn")).toBeGreaterThan(modeCost("profinet_rt"));
  });
});

describe("hardwareSync", () => {
  it("profinet irt uses hardware sync", () => {
    expect(hardwareSync("profinet_irt")).toBe(true);
  });
  it("profinet rt no hardware sync", () => {
    expect(hardwareSync("profinet_rt")).toBe(false);
  });
});

describe("forMotion", () => {
  it("profinet irt is for motion", () => {
    expect(forMotion("profinet_irt")).toBe(true);
  });
  it("profinet rt not for motion", () => {
    expect(forMotion("profinet_rt")).toBe(false);
  });
});

describe("scheduling", () => {
  it("profinet rt uses software rt 1ms", () => {
    expect(scheduling("profinet_rt")).toBe("software_rt_1ms");
  });
});

describe("bestUse", () => {
  it("profinet irt best for servo drive sync axis", () => {
    expect(bestUse("profinet_irt")).toBe("servo_drive_sync_axis");
  });
});

describe("profinetModes", () => {
  it("returns 5 types", () => {
    expect(profinetModes()).toHaveLength(5);
  });
});
