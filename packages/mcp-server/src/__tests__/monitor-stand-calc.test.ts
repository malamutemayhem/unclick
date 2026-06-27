import { describe, it, expect } from "vitest";
import {
  ergonomicHeight, adjustability, deskSpaceSaved, stability,
  standCost, cableManagement, vesaCompatible, mountType,
  bestSetup, monitorStands,
} from "../monitor-stand-calc.js";

describe("ergonomicHeight", () => {
  it("arm clamp adjustable best ergonomic height", () => {
    expect(ergonomicHeight("arm_clamp_adjustable")).toBeGreaterThan(ergonomicHeight("riser_shelf_wood"));
  });
});

describe("adjustability", () => {
  it("dual arm gas spring most adjustable", () => {
    expect(adjustability("dual_arm_gas_spring")).toBeGreaterThan(adjustability("riser_shelf_wood"));
  });
});

describe("deskSpaceSaved", () => {
  it("wall mount tilt saves most desk space", () => {
    expect(deskSpaceSaved("wall_mount_tilt")).toBeGreaterThan(deskSpaceSaved("laptop_stand_fold"));
  });
});

describe("stability", () => {
  it("wall mount tilt most stable", () => {
    expect(stability("wall_mount_tilt")).toBeGreaterThan(stability("laptop_stand_fold"));
  });
});

describe("standCost", () => {
  it("dual arm gas spring most expensive", () => {
    expect(standCost("dual_arm_gas_spring")).toBeGreaterThan(standCost("riser_shelf_wood"));
  });
});

describe("cableManagement", () => {
  it("arm clamp adjustable has cable management", () => {
    expect(cableManagement("arm_clamp_adjustable")).toBe(true);
  });
  it("riser shelf wood does not", () => {
    expect(cableManagement("riser_shelf_wood")).toBe(false);
  });
});

describe("vesaCompatible", () => {
  it("dual arm gas spring is vesa compatible", () => {
    expect(vesaCompatible("dual_arm_gas_spring")).toBe(true);
  });
  it("laptop stand fold is not", () => {
    expect(vesaCompatible("laptop_stand_fold")).toBe(false);
  });
});

describe("mountType", () => {
  it("wall mount tilt uses wall stud bracket", () => {
    expect(mountType("wall_mount_tilt")).toBe("wall_stud_bracket");
  });
});

describe("bestSetup", () => {
  it("dual arm gas spring best for dual monitor workflow", () => {
    expect(bestSetup("dual_arm_gas_spring")).toBe("dual_monitor_workflow");
  });
});

describe("monitorStands", () => {
  it("returns 5 types", () => {
    expect(monitorStands()).toHaveLength(5);
  });
});
