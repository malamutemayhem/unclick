import { describe, it, expect } from "vitest";
import {
  tensionControl, bobbinCapacity, stability, portability,
  kateCost, hasBrake, freestanding, mountStyle,
  bestPlying, lazyKates,
} from "../lazy-kate-calc.js";

describe("tensionControl", () => {
  it("tensioned brake spring best tension control", () => {
    expect(tensionControl("tensioned_brake_spring")).toBeGreaterThan(tensionControl("horizontal_peg_simple"));
  });
});

describe("bobbinCapacity", () => {
  it("vertical stand tower most bobbin capacity", () => {
    expect(bobbinCapacity("vertical_stand_tower")).toBeGreaterThan(bobbinCapacity("clamp_on_table_mount"));
  });
});

describe("stability", () => {
  it("clamp on table mount most stable", () => {
    expect(stability("clamp_on_table_mount")).toBeGreaterThan(stability("horizontal_peg_simple"));
  });
});

describe("portability", () => {
  it("horizontal peg simple most portable", () => {
    expect(portability("horizontal_peg_simple")).toBeGreaterThan(portability("electric_kate_motor"));
  });
});

describe("kateCost", () => {
  it("electric kate motor most expensive", () => {
    expect(kateCost("electric_kate_motor")).toBeGreaterThan(kateCost("horizontal_peg_simple"));
  });
});

describe("hasBrake", () => {
  it("tensioned brake spring has brake", () => {
    expect(hasBrake("tensioned_brake_spring")).toBe(true);
  });
  it("horizontal peg simple does not have brake", () => {
    expect(hasBrake("horizontal_peg_simple")).toBe(false);
  });
});

describe("freestanding", () => {
  it("vertical stand tower is freestanding", () => {
    expect(freestanding("vertical_stand_tower")).toBe(true);
  });
  it("clamp on table mount is not freestanding", () => {
    expect(freestanding("clamp_on_table_mount")).toBe(false);
  });
});

describe("mountStyle", () => {
  it("clamp on table mount uses c clamp table edge", () => {
    expect(mountStyle("clamp_on_table_mount")).toBe("c_clamp_table_edge");
  });
});

describe("bestPlying", () => {
  it("tensioned brake spring best for even tension navajo", () => {
    expect(bestPlying("tensioned_brake_spring")).toBe("even_tension_navajo");
  });
});

describe("lazyKates", () => {
  it("returns 5 types", () => {
    expect(lazyKates()).toHaveLength(5);
  });
});
