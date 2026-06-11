import { describe, it, expect } from "vitest";
import {
  diameterControl, throughput, attenuation, concentricity,
  fdCost, highPurity, forTelecom, drawConfig,
  bestUse, fiberDrawTypes,
} from "../fiber-draw-calc.js";

describe("diameterControl", () => {
  it("single mode draw best diameter control", () => {
    expect(diameterControl("single_mode_draw")).toBeGreaterThan(diameterControl("polymer_fiber"));
  });
});

describe("throughput", () => {
  it("multi mode draw highest throughput", () => {
    expect(throughput("multi_mode_draw")).toBeGreaterThan(throughput("photonic_crystal"));
  });
});

describe("attenuation", () => {
  it("single mode draw best attenuation", () => {
    expect(attenuation("single_mode_draw")).toBeGreaterThan(attenuation("polymer_fiber"));
  });
});

describe("concentricity", () => {
  it("single mode draw best concentricity", () => {
    expect(concentricity("single_mode_draw")).toBeGreaterThan(concentricity("polymer_fiber"));
  });
});

describe("fdCost", () => {
  it("specialty fiber most expensive", () => {
    expect(fdCost("specialty_fiber")).toBeGreaterThan(fdCost("polymer_fiber"));
  });
});

describe("highPurity", () => {
  it("single mode draw is high purity", () => {
    expect(highPurity("single_mode_draw")).toBe(true);
  });
  it("polymer fiber not high purity", () => {
    expect(highPurity("polymer_fiber")).toBe(false);
  });
});

describe("forTelecom", () => {
  it("single mode draw for telecom", () => {
    expect(forTelecom("single_mode_draw")).toBe(true);
  });
  it("multi mode draw not for telecom", () => {
    expect(forTelecom("multi_mode_draw")).toBe(false);
  });
});

describe("drawConfig", () => {
  it("photonic crystal uses stack draw hollow core microstruc", () => {
    expect(drawConfig("photonic_crystal")).toBe("photonic_crystal_fiber_draw_stack_draw_hollow_core_microstruc");
  });
});

describe("bestUse", () => {
  it("single mode draw for telecom long haul low attenuation 9um", () => {
    expect(bestUse("single_mode_draw")).toBe("telecom_single_mode_fiber_draw_long_haul_low_attenuation_9um");
  });
});

describe("fiberDrawTypes", () => {
  it("returns 5 types", () => {
    expect(fiberDrawTypes()).toHaveLength(5);
  });
});
