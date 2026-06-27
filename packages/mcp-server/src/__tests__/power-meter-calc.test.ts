import { describe, it, expect } from "vitest";
import {
  accuracy, granularity, connectivity, installEase,
  pmCost, revenueGrade, forTenant, interface_,
  bestUse, powerMeterTypes,
} from "../power-meter-calc.js";

describe("accuracy", () => {
  it("revenue grade most accurate", () => {
    expect(accuracy("revenue_grade_ct")).toBeGreaterThan(accuracy("portable_clamp_on"));
  });
});

describe("granularity", () => {
  it("branch circuit best granularity", () => {
    expect(granularity("branch_circuit_panel")).toBeGreaterThan(granularity("portable_clamp_on"));
  });
});

describe("connectivity", () => {
  it("iot cloud best connectivity", () => {
    expect(connectivity("iot_cloud_wireless")).toBeGreaterThan(connectivity("portable_clamp_on"));
  });
});

describe("installEase", () => {
  it("portable easiest install", () => {
    expect(installEase("portable_clamp_on")).toBeGreaterThan(installEase("revenue_grade_ct"));
  });
});

describe("pmCost", () => {
  it("revenue grade most expensive", () => {
    expect(pmCost("revenue_grade_ct")).toBeGreaterThan(pmCost("portable_clamp_on"));
  });
});

describe("revenueGrade", () => {
  it("revenue grade ct is revenue grade", () => {
    expect(revenueGrade("revenue_grade_ct")).toBe(true);
  });
  it("portable not revenue grade", () => {
    expect(revenueGrade("portable_clamp_on")).toBe(false);
  });
});

describe("forTenant", () => {
  it("submeter for tenant", () => {
    expect(forTenant("submeter_tenant_billing")).toBe(true);
  });
  it("portable not tenant", () => {
    expect(forTenant("portable_clamp_on")).toBe(false);
  });
});

describe("interface_", () => {
  it("iot uses cloud api", () => {
    expect(interface_("iot_cloud_wireless")).toBe("wifi_lora_cloud_api_rest");
  });
});

describe("bestUse", () => {
  it("portable for energy audit", () => {
    expect(bestUse("portable_clamp_on")).toBe("energy_audit_spot_check");
  });
});

describe("powerMeterTypes", () => {
  it("returns 5 types", () => {
    expect(powerMeterTypes()).toHaveLength(5);
  });
});
