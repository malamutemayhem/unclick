import { describe, it, expect } from "vitest";
import {
  uniformity, gentleness, flexibility, throughput,
  tdCost, batch, forHeatSens, airPath,
  bestUse, trayDryerTypes,
} from "../tray-dryer-calc.js";

describe("uniformity", () => {
  it("through circulation best uniformity", () => {
    expect(uniformity("through_circulation_perf")).toBeGreaterThan(uniformity("cabinet_batch_static"));
  });
});

describe("gentleness", () => {
  it("vacuum tray gentlest", () => {
    expect(gentleness("vacuum_tray_low_temp")).toBeGreaterThan(gentleness("multi_tier_gravity_feed"));
  });
});

describe("flexibility", () => {
  it("cabinet batch most flexible", () => {
    expect(flexibility("cabinet_batch_static")).toBeGreaterThan(flexibility("multi_tier_gravity_feed"));
  });
});

describe("throughput", () => {
  it("multi tier highest throughput", () => {
    expect(throughput("multi_tier_gravity_feed")).toBeGreaterThan(throughput("cabinet_batch_static"));
  });
});

describe("tdCost", () => {
  it("vacuum tray most expensive", () => {
    expect(tdCost("vacuum_tray_low_temp")).toBeGreaterThan(tdCost("cabinet_batch_static"));
  });
});

describe("batch", () => {
  it("cabinet batch is batch", () => {
    expect(batch("cabinet_batch_static")).toBe(true);
  });
  it("truck in tunnel not batch", () => {
    expect(batch("truck_in_tunnel_semi")).toBe(false);
  });
});

describe("forHeatSens", () => {
  it("vacuum tray for heat sensitive", () => {
    expect(forHeatSens("vacuum_tray_low_temp")).toBe(true);
  });
  it("cabinet batch not for heat sensitive", () => {
    expect(forHeatSens("cabinet_batch_static")).toBe(false);
  });
});

describe("airPath", () => {
  it("through circulation uses upward perforated tray", () => {
    expect(airPath("through_circulation_perf")).toBe("upward_through_perforated_tray_bed");
  });
});

describe("bestUse", () => {
  it("vacuum tray for pharma api", () => {
    expect(bestUse("vacuum_tray_low_temp")).toBe("pharma_api_heat_sensitive_powder");
  });
});

describe("trayDryerTypes", () => {
  it("returns 5 types", () => {
    expect(trayDryerTypes()).toHaveLength(5);
  });
});
