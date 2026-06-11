import { describe, it, expect } from "vitest";
import {
  heatRemoval, efficiency, noise, complexity,
  coolCost, pumpRequired, forHpc, medium,
  bestUse, coolingMethods,
} from "../cooling-method-calc.js";

describe("heatRemoval", () => {
  it("immersion 2phase best heat removal", () => {
    expect(heatRemoval("immersion_2phase")).toBeGreaterThan(heatRemoval("forced_air_fan"));
  });
});

describe("efficiency", () => {
  it("immersion 2phase best efficiency", () => {
    expect(efficiency("immersion_2phase")).toBeGreaterThan(efficiency("thermoelectric_peltier"));
  });
});

describe("noise", () => {
  it("immersion 2phase quietest", () => {
    expect(noise("immersion_2phase")).toBeGreaterThan(noise("forced_air_fan"));
  });
});

describe("complexity", () => {
  it("immersion 2phase most complex", () => {
    expect(complexity("immersion_2phase")).toBeGreaterThan(complexity("forced_air_fan"));
  });
});

describe("coolCost", () => {
  it("immersion 2phase most expensive", () => {
    expect(coolCost("immersion_2phase")).toBeGreaterThan(coolCost("forced_air_fan"));
  });
});

describe("pumpRequired", () => {
  it("direct liquid cold requires pump", () => {
    expect(pumpRequired("direct_liquid_cold")).toBe(true);
  });
  it("forced air fan no pump required", () => {
    expect(pumpRequired("forced_air_fan")).toBe(false);
  });
});

describe("forHpc", () => {
  it("immersion 2phase is for hpc", () => {
    expect(forHpc("immersion_2phase")).toBe(true);
  });
  it("forced air fan not for hpc", () => {
    expect(forHpc("forced_air_fan")).toBe(false);
  });
});

describe("medium", () => {
  it("immersion 2phase uses dielectric fluorocarbon", () => {
    expect(medium("immersion_2phase")).toBe("dielectric_fluorocarbon");
  });
});

describe("bestUse", () => {
  it("immersion 2phase best for high density ai pod", () => {
    expect(bestUse("immersion_2phase")).toBe("high_density_ai_pod");
  });
});

describe("coolingMethods", () => {
  it("returns 5 types", () => {
    expect(coolingMethods()).toHaveLength(5);
  });
});
