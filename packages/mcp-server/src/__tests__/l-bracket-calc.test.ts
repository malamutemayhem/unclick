import { describe, it, expect } from "vitest";
import {
  switchSpeed, cameraFit, buildQuality, gripComfort,
  bracketCost, arcaCompatible, portAccess, bodyMaterial,
  bestShooter, lBrackets,
} from "../l-bracket-calc.js";

describe("switchSpeed", () => {
  it("quick release lever fastest switch", () => {
    expect(switchSpeed("quick_release_lever")).toBeGreaterThan(switchSpeed("modular_two_piece"));
  });
});

describe("cameraFit", () => {
  it("camera specific custom best camera fit", () => {
    expect(cameraFit("camera_specific_custom")).toBeGreaterThan(cameraFit("universal_arca_swiss"));
  });
});

describe("buildQuality", () => {
  it("camera specific custom best build quality", () => {
    expect(buildQuality("camera_specific_custom")).toBeGreaterThan(buildQuality("modular_two_piece"));
  });
});

describe("gripComfort", () => {
  it("wooden grip comfort most grip comfort", () => {
    expect(gripComfort("wooden_grip_comfort")).toBeGreaterThan(gripComfort("universal_arca_swiss"));
  });
});

describe("bracketCost", () => {
  it("camera specific custom most expensive", () => {
    expect(bracketCost("camera_specific_custom")).toBeGreaterThan(bracketCost("universal_arca_swiss"));
  });
});

describe("arcaCompatible", () => {
  it("all l brackets are arca compatible", () => {
    expect(arcaCompatible("universal_arca_swiss")).toBe(true);
    expect(arcaCompatible("camera_specific_custom")).toBe(true);
  });
});

describe("portAccess", () => {
  it("camera specific custom has port access", () => {
    expect(portAccess("camera_specific_custom")).toBe(true);
  });
  it("universal arca swiss has no port access", () => {
    expect(portAccess("universal_arca_swiss")).toBe(false);
  });
});

describe("bodyMaterial", () => {
  it("wooden grip comfort uses walnut aluminum hybrid", () => {
    expect(bodyMaterial("wooden_grip_comfort")).toBe("walnut_aluminum_hybrid");
  });
});

describe("bestShooter", () => {
  it("camera specific custom best for dedicated body pro", () => {
    expect(bestShooter("camera_specific_custom")).toBe("dedicated_body_pro");
  });
});

describe("lBrackets", () => {
  it("returns 5 types", () => {
    expect(lBrackets()).toHaveLength(5);
  });
});
