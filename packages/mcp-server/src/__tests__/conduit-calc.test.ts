import { describe, it, expect } from "vitest";
import {
  fillCapacity, durability, flexibility, installEase,
  conduitCost, metalBody, forUnderground, material,
  bestUse, conduits,
} from "../conduit-calc.js";

describe("fillCapacity", () => {
  it("rigid galvanized highest fill capacity", () => {
    expect(fillCapacity("rigid_galvanized")).toBeGreaterThan(fillCapacity("flexible_liquid_tight"));
  });
});

describe("durability", () => {
  it("rigid galvanized most durable", () => {
    expect(durability("rigid_galvanized")).toBeGreaterThan(durability("flexible_liquid_tight"));
  });
});

describe("flexibility", () => {
  it("flexible liquid tight most flexible", () => {
    expect(flexibility("flexible_liquid_tight")).toBeGreaterThan(flexibility("rigid_galvanized"));
  });
});

describe("installEase", () => {
  it("flexible liquid tight easiest install", () => {
    expect(installEase("flexible_liquid_tight")).toBeGreaterThan(installEase("rigid_galvanized"));
  });
});

describe("conduitCost", () => {
  it("rigid galvanized most expensive", () => {
    expect(conduitCost("rigid_galvanized")).toBeGreaterThan(conduitCost("pvc_schedule_40"));
  });
});

describe("metalBody", () => {
  it("emt steel is metal body", () => {
    expect(metalBody("emt_steel_thin")).toBe(true);
  });
  it("pvc schedule 40 not metal body", () => {
    expect(metalBody("pvc_schedule_40")).toBe(false);
  });
});

describe("forUnderground", () => {
  it("pvc schedule 40 is for underground", () => {
    expect(forUnderground("pvc_schedule_40")).toBe(true);
  });
  it("emt steel not for underground", () => {
    expect(forUnderground("emt_steel_thin")).toBe(false);
  });
});

describe("material", () => {
  it("innerduct hdpe uses hdpe smooth wall", () => {
    expect(material("innerduct_hdpe")).toBe("hdpe_smooth_wall");
  });
});

describe("bestUse", () => {
  it("rigid galvanized best for hazardous location", () => {
    expect(bestUse("rigid_galvanized")).toBe("hazardous_location_path");
  });
});

describe("conduits", () => {
  it("returns 5 types", () => {
    expect(conduits()).toHaveLength(5);
  });
});
