import { describe, it, expect } from "vitest";
import {
  stoppingPower, wetPerformance, modulation, maintenanceEase,
  brakeCost, requiresFluid, handLever, brakeSystem,
  bestUse, bikeBrakes,
} from "../bike-brake-calc.js";

describe("stoppingPower", () => {
  it("disc hydraulic best stopping", () => {
    expect(stoppingPower("disc_hydraulic")).toBeGreaterThan(stoppingPower("coaster_hub"));
  });
});

describe("wetPerformance", () => {
  it("disc hydraulic best wet performance", () => {
    expect(wetPerformance("disc_hydraulic")).toBeGreaterThan(wetPerformance("rim_caliper"));
  });
});

describe("modulation", () => {
  it("disc hydraulic best modulation", () => {
    expect(modulation("disc_hydraulic")).toBeGreaterThan(modulation("coaster_hub"));
  });
});

describe("maintenanceEase", () => {
  it("coaster hub easiest maintenance", () => {
    expect(maintenanceEase("coaster_hub")).toBeGreaterThan(maintenanceEase("disc_hydraulic"));
  });
});

describe("brakeCost", () => {
  it("disc hydraulic most expensive", () => {
    expect(brakeCost("disc_hydraulic")).toBeGreaterThan(brakeCost("coaster_hub"));
  });
});

describe("requiresFluid", () => {
  it("disc hydraulic requires fluid", () => {
    expect(requiresFluid("disc_hydraulic")).toBe(true);
  });
  it("disc mechanical does not", () => {
    expect(requiresFluid("disc_mechanical")).toBe(false);
  });
});

describe("handLever", () => {
  it("rim caliper has hand lever", () => {
    expect(handLever("rim_caliper")).toBe(true);
  });
  it("coaster hub does not", () => {
    expect(handLever("coaster_hub")).toBe(false);
  });
});

describe("brakeSystem", () => {
  it("disc hydraulic uses fluid piston disc rotor", () => {
    expect(brakeSystem("disc_hydraulic")).toBe("fluid_piston_disc_rotor");
  });
});

describe("bestUse", () => {
  it("coaster hub for cruiser kids simple", () => {
    expect(bestUse("coaster_hub")).toBe("cruiser_kids_simple");
  });
});

describe("bikeBrakes", () => {
  it("returns 5 types", () => {
    expect(bikeBrakes()).toHaveLength(5);
  });
});
