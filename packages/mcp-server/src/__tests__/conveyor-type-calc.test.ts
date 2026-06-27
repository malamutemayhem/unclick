import { describe, it, expect } from "vitest";
import {
  throughput, incline, gentleness, maintenance,
  cvCost, enclosed, forBulk, drive,
  bestUse, conveyorTypes,
} from "../conveyor-type-calc.js";

describe("throughput", () => {
  it("belt flat highest throughput", () => {
    expect(throughput("belt_flat_rubber")).toBeGreaterThan(throughput("pneumatic_vacuum_tube"));
  });
});

describe("incline", () => {
  it("screw auger best incline", () => {
    expect(incline("screw_auger_bulk")).toBeGreaterThan(incline("roller_gravity_free"));
  });
});

describe("gentleness", () => {
  it("belt flat most gentle", () => {
    expect(gentleness("belt_flat_rubber")).toBeGreaterThan(gentleness("screw_auger_bulk"));
  });
});

describe("maintenance", () => {
  it("roller gravity lowest maintenance", () => {
    expect(maintenance("roller_gravity_free")).toBeGreaterThan(maintenance("chain_slat_heavy"));
  });
});

describe("cvCost", () => {
  it("chain slat most expensive", () => {
    expect(cvCost("chain_slat_heavy")).toBeGreaterThan(cvCost("roller_gravity_free"));
  });
});

describe("enclosed", () => {
  it("screw auger is enclosed", () => {
    expect(enclosed("screw_auger_bulk")).toBe(true);
  });
  it("belt flat not enclosed", () => {
    expect(enclosed("belt_flat_rubber")).toBe(false);
  });
});

describe("forBulk", () => {
  it("screw auger for bulk", () => {
    expect(forBulk("screw_auger_bulk")).toBe(true);
  });
  it("roller gravity not for bulk", () => {
    expect(forBulk("roller_gravity_free")).toBe(false);
  });
});

describe("drive", () => {
  it("pneumatic uses blower vacuum air stream", () => {
    expect(drive("pneumatic_vacuum_tube")).toBe("blower_vacuum_air_stream");
  });
});

describe("bestUse", () => {
  it("screw auger best for grain silo cement", () => {
    expect(bestUse("screw_auger_bulk")).toBe("grain_silo_cement_powder_feed");
  });
});

describe("conveyorTypes", () => {
  it("returns 5 types", () => {
    expect(conveyorTypes()).toHaveLength(5);
  });
});
