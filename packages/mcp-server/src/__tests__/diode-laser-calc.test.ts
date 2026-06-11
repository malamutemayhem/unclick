import { describe, it, expect } from "vitest";
import {
  efficiency, throughput, brightness, lifetime,
  dlCost_, directDiode, forPumping, laserConfig,
  bestUse, diodeLaserTypes,
} from "../diode-laser-calc.js";

describe("efficiency", () => {
  it("vcsel array best efficiency", () => {
    expect(efficiency("vcsel_array")).toBeGreaterThan(efficiency("diode_stack"));
  });
});

describe("throughput", () => {
  it("diode stack highest throughput", () => {
    expect(throughput("diode_stack")).toBeGreaterThan(throughput("single_emitter"));
  });
});

describe("brightness", () => {
  it("single emitter best brightness", () => {
    expect(brightness("single_emitter")).toBeGreaterThan(brightness("diode_stack"));
  });
});

describe("lifetime", () => {
  it("vcsel array best lifetime", () => {
    expect(lifetime("vcsel_array")).toBeGreaterThan(lifetime("diode_stack"));
  });
});

describe("dlCost_", () => {
  it("diode stack most expensive", () => {
    expect(dlCost_("diode_stack")).toBeGreaterThan(dlCost_("single_emitter"));
  });
});

describe("directDiode", () => {
  it("single emitter is direct diode", () => {
    expect(directDiode("single_emitter")).toBe(true);
  });
  it("diode bar not direct diode", () => {
    expect(directDiode("diode_bar")).toBe(false);
  });
});

describe("forPumping", () => {
  it("diode bar for pumping", () => {
    expect(forPumping("diode_bar")).toBe(true);
  });
  it("vcsel array not for pumping", () => {
    expect(forPumping("vcsel_array")).toBe(false);
  });
});

describe("laserConfig", () => {
  it("vcsel uses surface emit circular beam test on wafer", () => {
    expect(laserConfig("vcsel_array")).toBe("vcsel_array_diode_laser_surface_emit_circular_beam_test_on_wafer");
  });
});

describe("bestUse", () => {
  it("fiber coupled for plastic weld flexible delivery remote", () => {
    expect(bestUse("fiber_coupled_diode")).toBe("plastic_weld_fiber_coupled_diode_laser_flexible_delivery_remote");
  });
});

describe("diodeLaserTypes", () => {
  it("returns 5 types", () => {
    expect(diodeLaserTypes()).toHaveLength(5);
  });
});
