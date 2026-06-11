import { describe, it, expect } from "vitest";
import {
  axialCapacity, speedLimit, misalignment, stiffness,
  tbCost, hydrodynamic, forHeavyAxial, element,
  bestUse, thrustBearingTypes,
} from "../thrust-bearing-calc.js";

describe("axialCapacity", () => {
  it("tilting pad highest axial capacity", () => {
    expect(axialCapacity("tilting_pad_hydro")).toBeGreaterThan(axialCapacity("thrust_ball_single"));
  });
});

describe("speedLimit", () => {
  it("tilting pad highest speed", () => {
    expect(speedLimit("tilting_pad_hydro")).toBeGreaterThan(speedLimit("spherical_thrust_roller"));
  });
});

describe("misalignment", () => {
  it("spherical thrust best misalignment", () => {
    expect(misalignment("spherical_thrust_roller")).toBeGreaterThan(misalignment("cylindrical_thrust_roller"));
  });
});

describe("stiffness", () => {
  it("tilting pad highest stiffness", () => {
    expect(stiffness("tilting_pad_hydro")).toBeGreaterThan(stiffness("thrust_ball_single"));
  });
});

describe("tbCost", () => {
  it("tilting pad most expensive", () => {
    expect(tbCost("tilting_pad_hydro")).toBeGreaterThan(tbCost("thrust_ball_single"));
  });
});

describe("hydrodynamic", () => {
  it("tilting pad is hydrodynamic", () => {
    expect(hydrodynamic("tilting_pad_hydro")).toBe(true);
  });
  it("thrust ball not hydrodynamic", () => {
    expect(hydrodynamic("thrust_ball_single")).toBe(false);
  });
});

describe("forHeavyAxial", () => {
  it("spherical thrust for heavy axial", () => {
    expect(forHeavyAxial("spherical_thrust_roller")).toBe(true);
  });
  it("thrust ball not for heavy axial", () => {
    expect(forHeavyAxial("thrust_ball_single")).toBe(false);
  });
});

describe("element", () => {
  it("tilting pad uses oil film wedge", () => {
    expect(element("tilting_pad_hydro")).toBe("tilting_pad_oil_film_hydrodynamic_wedge");
  });
});

describe("bestUse", () => {
  it("spherical thrust for hydroelectric", () => {
    expect(bestUse("spherical_thrust_roller")).toBe("hydroelectric_vertical_shaft_heavy_misalign");
  });
});

describe("thrustBearingTypes", () => {
  it("returns 5 types", () => {
    expect(thrustBearingTypes()).toHaveLength(5);
  });
});
