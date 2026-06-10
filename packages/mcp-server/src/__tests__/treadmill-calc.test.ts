import { describe, it, expect } from "vitest";
import {
  topSpeed, cushioning, footprint, durabilityRating,
  machineCost, foldable, requiresPower, driveSystem,
  bestUser, treadmills,
} from "../treadmill-calc.js";

describe("topSpeed", () => {
  it("commercial gym fastest", () => {
    expect(topSpeed("commercial_gym")).toBeGreaterThan(topSpeed("under_desk"));
  });
});

describe("cushioning", () => {
  it("commercial gym best cushioning", () => {
    expect(cushioning("commercial_gym")).toBeGreaterThan(cushioning("under_desk"));
  });
});

describe("footprint", () => {
  it("commercial gym largest footprint", () => {
    expect(footprint("commercial_gym")).toBeGreaterThan(footprint("under_desk"));
  });
});

describe("durabilityRating", () => {
  it("commercial gym most durable", () => {
    expect(durabilityRating("commercial_gym")).toBeGreaterThan(durabilityRating("under_desk"));
  });
});

describe("machineCost", () => {
  it("commercial gym most expensive", () => {
    expect(machineCost("commercial_gym")).toBeGreaterThan(machineCost("under_desk"));
  });
});

describe("foldable", () => {
  it("motorized folding is foldable", () => {
    expect(foldable("motorized_folding")).toBe(true);
  });
  it("commercial gym is not", () => {
    expect(foldable("commercial_gym")).toBe(false);
  });
});

describe("requiresPower", () => {
  it("commercial gym requires power", () => {
    expect(requiresPower("commercial_gym")).toBe(true);
  });
  it("manual curved does not", () => {
    expect(requiresPower("manual_curved")).toBe(false);
  });
});

describe("driveSystem", () => {
  it("manual curved uses slatted belt self powered", () => {
    expect(driveSystem("manual_curved")).toBe("slatted_belt_self_powered");
  });
});

describe("bestUser", () => {
  it("under desk for office walking light", () => {
    expect(bestUser("under_desk")).toBe("office_walking_light");
  });
});

describe("treadmills", () => {
  it("returns 5 types", () => {
    expect(treadmills()).toHaveLength(5);
  });
});
