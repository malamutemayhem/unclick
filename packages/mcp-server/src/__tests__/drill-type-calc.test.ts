import { describe, it, expect } from "vitest";
import {
  minDiameter, speed, accuracy, aspectRatio,
  drillCost, contactless, forHdi, mechanism,
  bestUse, drillTypes,
} from "../drill-type-calc.js";

describe("minDiameter", () => {
  it("photo defined via smallest min diameter", () => {
    expect(minDiameter("photo_defined_via")).toBeGreaterThan(minDiameter("mechanical_carbide"));
  });
});

describe("speed", () => {
  it("photo defined via fastest", () => {
    expect(speed("photo_defined_via")).toBeGreaterThan(speed("plasma_etch_via"));
  });
});

describe("accuracy", () => {
  it("uv laser excimer most accurate", () => {
    expect(accuracy("uv_laser_excimer")).toBeGreaterThan(accuracy("mechanical_carbide"));
  });
});

describe("aspectRatio", () => {
  it("plasma etch via best aspect ratio", () => {
    expect(aspectRatio("plasma_etch_via")).toBeGreaterThan(aspectRatio("photo_defined_via"));
  });
});

describe("drillCost", () => {
  it("uv laser excimer most expensive", () => {
    expect(drillCost("uv_laser_excimer")).toBeGreaterThan(drillCost("mechanical_carbide"));
  });
});

describe("contactless", () => {
  it("uv laser co2 is contactless", () => {
    expect(contactless("uv_laser_co2")).toBe(true);
  });
  it("mechanical carbide not contactless", () => {
    expect(contactless("mechanical_carbide")).toBe(false);
  });
});

describe("forHdi", () => {
  it("uv laser excimer for hdi", () => {
    expect(forHdi("uv_laser_excimer")).toBe(true);
  });
  it("mechanical carbide not for hdi", () => {
    expect(forHdi("mechanical_carbide")).toBe(false);
  });
});

describe("mechanism", () => {
  it("plasma etch via uses reactive ion etch cf4", () => {
    expect(mechanism("plasma_etch_via")).toBe("reactive_ion_etch_cf4");
  });
});

describe("bestUse", () => {
  it("photo defined via best for buildup layer batch via", () => {
    expect(bestUse("photo_defined_via")).toBe("buildup_layer_batch_via");
  });
});

describe("drillTypes", () => {
  it("returns 5 types", () => {
    expect(drillTypes()).toHaveLength(5);
  });
});
