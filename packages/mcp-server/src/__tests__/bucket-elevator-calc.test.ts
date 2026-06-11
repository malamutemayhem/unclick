import { describe, it, expect } from "vitest";
import {
  capacity, height, gentleness, speed,
  beCost, enclosed, forFragile, discharge,
  bestUse, bucketElevatorTypes,
} from "../bucket-elevator-calc.js";

describe("capacity", () => {
  it("high speed highest capacity", () => {
    expect(capacity("high_speed_nylon_bucket")).toBeGreaterThan(capacity("positive_discharge_snub"));
  });
});

describe("height", () => {
  it("continuous chain tallest", () => {
    expect(height("continuous_bucket_chain")).toBeGreaterThan(height("positive_discharge_snub"));
  });
});

describe("gentleness", () => {
  it("continuous chain most gentle", () => {
    expect(gentleness("continuous_bucket_chain")).toBeGreaterThan(gentleness("high_speed_nylon_bucket"));
  });
});

describe("speed", () => {
  it("high speed fastest", () => {
    expect(speed("high_speed_nylon_bucket")).toBeGreaterThan(speed("continuous_bucket_chain"));
  });
});

describe("beCost", () => {
  it("z type most expensive", () => {
    expect(beCost("enclosed_z_type_vertical")).toBeGreaterThan(beCost("centrifugal_discharge_belt"));
  });
});

describe("enclosed", () => {
  it("all are enclosed", () => {
    expect(enclosed("centrifugal_discharge_belt")).toBe(true);
  });
  it("z type enclosed", () => {
    expect(enclosed("enclosed_z_type_vertical")).toBe(true);
  });
});

describe("forFragile", () => {
  it("continuous for fragile", () => {
    expect(forFragile("continuous_bucket_chain")).toBe(true);
  });
  it("centrifugal not fragile", () => {
    expect(forFragile("centrifugal_discharge_belt")).toBe(false);
  });
});

describe("discharge", () => {
  it("positive uses snub wheel", () => {
    expect(discharge("positive_discharge_snub")).toBe("snub_wheel_positive_knockoff");
  });
});

describe("bestUse", () => {
  it("z type for food pharma", () => {
    expect(bestUse("enclosed_z_type_vertical")).toBe("food_pharma_sanitary_enclosed");
  });
});

describe("bucketElevatorTypes", () => {
  it("returns 5 types", () => {
    expect(bucketElevatorTypes()).toHaveLength(5);
  });
});
