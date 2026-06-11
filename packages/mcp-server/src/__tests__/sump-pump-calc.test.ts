import { describe, it, expect } from "vitest";
import {
  capacity, head, reliability, noise,
  spCost, submersible, forBasement, motor,
  bestUse, sumpPumpTypes,
} from "../sump-pump-calc.js";

describe("capacity", () => {
  it("sewage ejector highest capacity", () => {
    expect(capacity("sewage_ejector_grinder")).toBeGreaterThan(capacity("water_powered_venturi"));
  });
});

describe("head", () => {
  it("sewage ejector highest head", () => {
    expect(head("sewage_ejector_grinder")).toBeGreaterThan(head("water_powered_venturi"));
  });
});

describe("reliability", () => {
  it("water powered most reliable", () => {
    expect(reliability("water_powered_venturi")).toBeGreaterThan(reliability("pedestal_column_above"));
  });
});

describe("noise", () => {
  it("submersible quietest (highest score)", () => {
    expect(noise("submersible_pedestal_basin")).toBeGreaterThan(noise("pedestal_column_above"));
  });
});

describe("spCost", () => {
  it("sewage ejector most expensive", () => {
    expect(spCost("sewage_ejector_grinder")).toBeGreaterThan(spCost("pedestal_column_above"));
  });
});

describe("submersible", () => {
  it("submersible basin is submersible", () => {
    expect(submersible("submersible_pedestal_basin")).toBe(true);
  });
  it("pedestal not submersible", () => {
    expect(submersible("pedestal_column_above")).toBe(false);
  });
});

describe("forBasement", () => {
  it("all types for basement", () => {
    expect(forBasement("submersible_pedestal_basin")).toBe(true);
  });
});

describe("motor", () => {
  it("water powered has no motor", () => {
    expect(motor("water_powered_venturi")).toBe("no_motor_municipal_water_venturi");
  });
});

describe("bestUse", () => {
  it("battery backup for power outage", () => {
    expect(bestUse("battery_backup_dc_float")).toBe("backup_power_outage_storm_flood");
  });
});

describe("sumpPumpTypes", () => {
  it("returns 5 types", () => {
    expect(sumpPumpTypes()).toHaveLength(5);
  });
});
