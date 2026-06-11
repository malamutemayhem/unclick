import { describe, it, expect } from "vitest";
import {
  protection, coverage, aesthetic, maintenance,
  lrCost, active, forBuilding, conductor,
  bestUse, lightningRodTypes,
} from "../lightning-rod-calc.js";

describe("protection", () => {
  it("mesh conductor best protection", () => {
    expect(protection("mesh_conductor_faraday_cage")).toBeGreaterThan(protection("charge_transfer_dissipator"));
  });
});

describe("coverage", () => {
  it("mesh conductor best coverage", () => {
    expect(coverage("mesh_conductor_faraday_cage")).toBeGreaterThan(coverage("franklin_rod_copper_tip"));
  });
});

describe("aesthetic", () => {
  it("charge transfer best aesthetic", () => {
    expect(aesthetic("charge_transfer_dissipator")).toBeGreaterThan(aesthetic("catenary_wire_overhead"));
  });
});

describe("maintenance", () => {
  it("charge transfer lowest maintenance", () => {
    expect(maintenance("charge_transfer_dissipator")).toBeGreaterThan(maintenance("catenary_wire_overhead"));
  });
});

describe("lrCost", () => {
  it("mesh conductor most expensive", () => {
    expect(lrCost("mesh_conductor_faraday_cage")).toBeGreaterThan(lrCost("franklin_rod_copper_tip"));
  });
});

describe("active", () => {
  it("ese is active", () => {
    expect(active("early_streamer_ese_active")).toBe(true);
  });
  it("franklin rod not active", () => {
    expect(active("franklin_rod_copper_tip")).toBe(false);
  });
});

describe("forBuilding", () => {
  it("mesh for building", () => {
    expect(forBuilding("mesh_conductor_faraday_cage")).toBe(true);
  });
  it("catenary wire not for building", () => {
    expect(forBuilding("catenary_wire_overhead")).toBe(false);
  });
});

describe("conductor", () => {
  it("catenary uses overhead ground wire", () => {
    expect(conductor("catenary_wire_overhead")).toBe("overhead_ground_wire_shield");
  });
});

describe("bestUse", () => {
  it("mesh for sensitive facility", () => {
    expect(bestUse("mesh_conductor_faraday_cage")).toBe("sensitive_facility_data_center_ammo");
  });
});

describe("lightningRodTypes", () => {
  it("returns 5 types", () => {
    expect(lightningRodTypes()).toHaveLength(5);
  });
});
