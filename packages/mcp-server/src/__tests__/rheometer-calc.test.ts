import { describe, it, expect } from "vitest";
import {
  shearRange, throughput, torqueSensitivity, tempControl,
  rhCost, forViscoelastic, forHighShear, rheoConfig,
  bestUse, rheometerTypes,
} from "../rheometer-calc.js";

describe("shearRange", () => {
  it("capillary best shear range", () => {
    expect(shearRange("capillary_rheo")).toBeGreaterThan(shearRange("extensional_rheo"));
  });
});

describe("throughput", () => {
  it("rotational parallel highest throughput", () => {
    expect(throughput("rotational_parallel")).toBeGreaterThan(throughput("extensional_rheo"));
  });
});

describe("torqueSensitivity", () => {
  it("oscillatory best torque sensitivity", () => {
    expect(torqueSensitivity("oscillatory_rheo")).toBeGreaterThan(torqueSensitivity("capillary_rheo"));
  });
});

describe("tempControl", () => {
  it("rotational cone best temp control", () => {
    expect(tempControl("rotational_cone")).toBeGreaterThan(tempControl("capillary_rheo"));
  });
});

describe("rhCost", () => {
  it("extensional most expensive", () => {
    expect(rhCost("extensional_rheo")).toBeGreaterThan(rhCost("rotational_parallel"));
  });
});

describe("forViscoelastic", () => {
  it("rotational cone for viscoelastic", () => {
    expect(forViscoelastic("rotational_cone")).toBe(true);
  });
  it("capillary not for viscoelastic", () => {
    expect(forViscoelastic("capillary_rheo")).toBe(false);
  });
});

describe("forHighShear", () => {
  it("capillary for high shear", () => {
    expect(forHighShear("capillary_rheo")).toBe(true);
  });
  it("rotational cone not for high shear", () => {
    expect(forHighShear("rotational_cone")).toBe(false);
  });
});

describe("rheoConfig", () => {
  it("oscillatory uses dynamic mechanical storage loss modulus", () => {
    expect(rheoConfig("oscillatory_rheo")).toBe("oscillatory_rheometer_dynamic_mechanical_storage_loss_modulus");
  });
});

describe("bestUse", () => {
  it("capillary for extrusion high shear rate process simulate", () => {
    expect(bestUse("capillary_rheo")).toBe("extrusion_capillary_rheometer_high_shear_rate_process_simulate");
  });
});

describe("rheometerTypes", () => {
  it("returns 5 types", () => {
    expect(rheometerTypes()).toHaveLength(5);
  });
});
