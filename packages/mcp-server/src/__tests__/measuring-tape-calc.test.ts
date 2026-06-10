import { describe, it, expect } from "vitest";
import {
  accuracy, maxLength, portability, durability,
  tapeCost, needsBattery, selfRetract, bladeMaterial,
  bestUse, measuringTapes,
} from "../measuring-tape-calc.js";

describe("accuracy", () => {
  it("laser digital measure most accurate", () => {
    expect(accuracy("laser_digital_measure")).toBeGreaterThan(accuracy("tailor_vinyl_flexible"));
  });
});

describe("maxLength", () => {
  it("laser digital measure and long reel surveyor longest", () => {
    expect(maxLength("laser_digital_measure")).toBeGreaterThan(maxLength("retractable_steel_blade"));
  });
});

describe("portability", () => {
  it("tailor vinyl flexible most portable", () => {
    expect(portability("tailor_vinyl_flexible")).toBeGreaterThan(portability("long_reel_surveyor"));
  });
});

describe("durability", () => {
  it("long reel surveyor most durable", () => {
    expect(durability("long_reel_surveyor")).toBeGreaterThan(durability("tailor_vinyl_flexible"));
  });
});

describe("tapeCost", () => {
  it("laser digital measure most expensive", () => {
    expect(tapeCost("laser_digital_measure")).toBeGreaterThan(tapeCost("retractable_steel_blade"));
  });
});

describe("needsBattery", () => {
  it("laser digital measure needs battery", () => {
    expect(needsBattery("laser_digital_measure")).toBe(true);
  });
  it("retractable steel blade does not", () => {
    expect(needsBattery("retractable_steel_blade")).toBe(false);
  });
});

describe("selfRetract", () => {
  it("retractable steel blade self retracts", () => {
    expect(selfRetract("retractable_steel_blade")).toBe(true);
  });
  it("fabric fiberglass sewing does not", () => {
    expect(selfRetract("fabric_fiberglass_sewing")).toBe(false);
  });
});

describe("bladeMaterial", () => {
  it("retractable steel blade uses carbon steel coated", () => {
    expect(bladeMaterial("retractable_steel_blade")).toBe("carbon_steel_coated");
  });
});

describe("bestUse", () => {
  it("laser digital measure best for real estate interior design", () => {
    expect(bestUse("laser_digital_measure")).toBe("real_estate_interior_design");
  });
});

describe("measuringTapes", () => {
  it("returns 5 types", () => {
    expect(measuringTapes()).toHaveLength(5);
  });
});
