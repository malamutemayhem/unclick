import { describe, it, expect } from "vitest";
import {
  pressure, volume, efficiency, inspection,
  pvCost, codeStamped, forHighPress, head,
  bestUse, pressureVesselTypes,
} from "../pressure-vessel-calc.js";

describe("pressure", () => {
  it("multilayer wrap highest pressure", () => {
    expect(pressure("multilayer_wrap")).toBeGreaterThan(pressure("jacketed_reactor"));
  });
});

describe("volume", () => {
  it("spherical storage largest volume", () => {
    expect(volume("spherical_storage")).toBeGreaterThan(volume("jacketed_reactor"));
  });
});

describe("efficiency", () => {
  it("spherical most efficient", () => {
    expect(efficiency("spherical_storage")).toBeGreaterThan(efficiency("cylindrical_horizontal"));
  });
});

describe("inspection", () => {
  it("horizontal easiest inspection", () => {
    expect(inspection("cylindrical_horizontal")).toBeGreaterThan(inspection("multilayer_wrap"));
  });
});

describe("pvCost", () => {
  it("multilayer wrap most expensive", () => {
    expect(pvCost("multilayer_wrap")).toBeGreaterThan(pvCost("cylindrical_horizontal"));
  });
});

describe("codeStamped", () => {
  it("all vessels are code stamped", () => {
    expect(codeStamped("cylindrical_horizontal")).toBe(true);
    expect(codeStamped("spherical_storage")).toBe(true);
  });
});

describe("forHighPress", () => {
  it("multilayer wrap for high pressure", () => {
    expect(forHighPress("multilayer_wrap")).toBe(true);
  });
  it("jacketed reactor not for high pressure", () => {
    expect(forHighPress("jacketed_reactor")).toBe(false);
  });
});

describe("head", () => {
  it("spherical uses full sphere", () => {
    expect(head("spherical_storage")).toBe("full_sphere_no_seam_optimal_stress");
  });
});

describe("bestUse", () => {
  it("jacketed reactor for chemical pharma", () => {
    expect(bestUse("jacketed_reactor")).toBe("chemical_reactor_pharma_temp_control");
  });
});

describe("pressureVesselTypes", () => {
  it("returns 5 types", () => {
    expect(pressureVesselTypes()).toHaveLength(5);
  });
});
