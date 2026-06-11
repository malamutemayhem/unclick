import { describe, it, expect } from "vitest";
import {
  minDiameter, speed, accuracy, aspectRatio,
  drillCost, contactless, forMicrovia, drillMethod,
  bestUse, pcbDrills,
} from "../pcb-drill-calc.js";

describe("minDiameter", () => {
  it("laser uv micro finest min diameter", () => {
    expect(minDiameter("laser_uv_micro")).toBeGreaterThan(minDiameter("mechanical_carbide"));
  });
});

describe("speed", () => {
  it("laser uv micro fastest speed", () => {
    expect(speed("laser_uv_micro")).toBeGreaterThan(speed("cnc_routing_slot"));
  });
});

describe("accuracy", () => {
  it("laser uv micro best accuracy", () => {
    expect(accuracy("laser_uv_micro")).toBeGreaterThan(accuracy("cnc_routing_slot"));
  });
});

describe("aspectRatio", () => {
  it("cnc routing slot highest aspect ratio", () => {
    expect(aspectRatio("cnc_routing_slot")).toBeGreaterThan(aspectRatio("laser_co2_blind"));
  });
});

describe("drillCost", () => {
  it("plasma etch via most expensive", () => {
    expect(drillCost("plasma_etch_via")).toBeGreaterThan(drillCost("mechanical_carbide"));
  });
});

describe("contactless", () => {
  it("laser uv micro is contactless", () => {
    expect(contactless("laser_uv_micro")).toBe(true);
  });
  it("mechanical carbide not contactless", () => {
    expect(contactless("mechanical_carbide")).toBe(false);
  });
});

describe("forMicrovia", () => {
  it("laser uv micro is for microvia", () => {
    expect(forMicrovia("laser_uv_micro")).toBe(true);
  });
  it("mechanical carbide not for microvia", () => {
    expect(forMicrovia("mechanical_carbide")).toBe(false);
  });
});

describe("drillMethod", () => {
  it("laser co2 blind uses co2 laser pulse", () => {
    expect(drillMethod("laser_co2_blind")).toBe("co2_laser_pulse");
  });
});

describe("bestUse", () => {
  it("mechanical carbide best for standard through hole via", () => {
    expect(bestUse("mechanical_carbide")).toBe("standard_through_hole_via");
  });
});

describe("pcbDrills", () => {
  it("returns 5 types", () => {
    expect(pcbDrills()).toHaveLength(5);
  });
});
