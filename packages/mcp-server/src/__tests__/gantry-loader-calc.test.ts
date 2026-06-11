import { describe, it, expect } from "vitest";
import {
  speed, throughput, payload, repeatability,
  glCost, multiAxis, forPressTend, loaderConfig,
  bestUse, gantryLoaderTypes,
} from "../gantry-loader-calc.js";

describe("speed", () => {
  it("single axis gantry best speed", () => {
    expect(speed("single_axis_gantry")).toBeGreaterThan(speed("three_axis_gantry"));
  });
});

describe("throughput", () => {
  it("servo shuttle highest throughput", () => {
    expect(throughput("servo_shuttle")).toBeGreaterThan(throughput("overhead_gantry"));
  });
});

describe("payload", () => {
  it("overhead gantry best payload", () => {
    expect(payload("overhead_gantry")).toBeGreaterThan(payload("servo_shuttle"));
  });
});

describe("repeatability", () => {
  it("three axis gantry best repeatability", () => {
    expect(repeatability("three_axis_gantry")).toBeGreaterThan(repeatability("overhead_gantry"));
  });
});

describe("glCost", () => {
  it("overhead gantry most expensive", () => {
    expect(glCost("overhead_gantry")).toBeGreaterThan(glCost("servo_shuttle"));
  });
});

describe("multiAxis", () => {
  it("three axis gantry is multi axis", () => {
    expect(multiAxis("three_axis_gantry")).toBe(true);
  });
  it("single axis gantry not multi axis", () => {
    expect(multiAxis("single_axis_gantry")).toBe(false);
  });
});

describe("forPressTend", () => {
  it("single axis gantry for press tend", () => {
    expect(forPressTend("single_axis_gantry")).toBe(true);
  });
  it("three axis gantry not for press tend", () => {
    expect(forPressTend("three_axis_gantry")).toBe(false);
  });
});

describe("loaderConfig", () => {
  it("dual axis gantry uses x z travel vertical lift horizontal move", () => {
    expect(loaderConfig("dual_axis_gantry")).toBe("dual_axis_gantry_loader_x_z_travel_vertical_lift_horizontal_move");
  });
});

describe("bestUse", () => {
  it("servo shuttle for stamping feed fast index strip feed", () => {
    expect(bestUse("servo_shuttle")).toBe("stamping_feed_servo_shuttle_gantry_loader_fast_index_strip_feed");
  });
});

describe("gantryLoaderTypes", () => {
  it("returns 5 types", () => {
    expect(gantryLoaderTypes()).toHaveLength(5);
  });
});
