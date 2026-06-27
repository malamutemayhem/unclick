import { describe, it, expect } from "vitest";
import {
  airflowEfficiency, spaceRequired, fabricationCost,
  noiseReduction, installationFlexibility, canFitLowCeilings,
  factoryMade, bestApplication, sealMethod, ductShapes,
} from "../duct-shape-calc.js";

describe("airflowEfficiency", () => {
  it("round most efficient airflow", () => {
    expect(airflowEfficiency("round")).toBeGreaterThan(
      airflowEfficiency("flexible")
    );
  });
});

describe("spaceRequired", () => {
  it("round requires most space", () => {
    expect(spaceRequired("round")).toBeGreaterThan(
      spaceRequired("flexible")
    );
  });
});

describe("fabricationCost", () => {
  it("oval most expensive to fabricate", () => {
    expect(fabricationCost("oval")).toBeGreaterThan(
      fabricationCost("spiral")
    );
  });
});

describe("noiseReduction", () => {
  it("spiral best noise reduction", () => {
    expect(noiseReduction("spiral")).toBeGreaterThan(
      noiseReduction("rectangular")
    );
  });
});

describe("installationFlexibility", () => {
  it("flexible most installation flexibility", () => {
    expect(installationFlexibility("flexible")).toBeGreaterThan(
      installationFlexibility("spiral")
    );
  });
});

describe("canFitLowCeilings", () => {
  it("rectangular fits low ceilings", () => {
    expect(canFitLowCeilings("rectangular")).toBe(true);
  });
  it("round does not", () => {
    expect(canFitLowCeilings("round")).toBe(false);
  });
});

describe("factoryMade", () => {
  it("spiral is factory made", () => {
    expect(factoryMade("spiral")).toBe(true);
  });
  it("rectangular is not", () => {
    expect(factoryMade("rectangular")).toBe(false);
  });
});

describe("bestApplication", () => {
  it("spiral for exposed aesthetic", () => {
    expect(bestApplication("spiral")).toBe("exposed_aesthetic");
  });
});

describe("sealMethod", () => {
  it("rectangular uses flange mastic", () => {
    expect(sealMethod("rectangular")).toBe("flange_mastic");
  });
});

describe("ductShapes", () => {
  it("returns 5 shapes", () => {
    expect(ductShapes()).toHaveLength(5);
  });
});
