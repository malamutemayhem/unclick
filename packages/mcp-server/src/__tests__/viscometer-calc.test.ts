import { describe, it, expect } from "vitest";
import {
  accuracy, shearRange, sampleVolume, easeOfUse,
  vmCost, inline, forNonNewtonian, principle,
  bestUse, viscometerTypes,
} from "../viscometer-calc.js";

describe("accuracy", () => {
  it("cone plate rheometer most accurate", () => {
    expect(accuracy("cone_plate_rheometer")).toBeGreaterThan(accuracy("rotational_brookfield"));
  });
});

describe("shearRange", () => {
  it("cone plate rheometer widest shear range", () => {
    expect(shearRange("cone_plate_rheometer")).toBeGreaterThan(shearRange("falling_ball_hoeppler"));
  });
});

describe("sampleVolume", () => {
  it("vibrating element inline least sample needed", () => {
    expect(sampleVolume("vibrating_element_inline")).toBeGreaterThan(sampleVolume("rotational_brookfield"));
  });
});

describe("easeOfUse", () => {
  it("rotational brookfield easiest to use", () => {
    expect(easeOfUse("rotational_brookfield")).toBeGreaterThan(easeOfUse("cone_plate_rheometer"));
  });
});

describe("vmCost", () => {
  it("cone plate rheometer most expensive", () => {
    expect(vmCost("cone_plate_rheometer")).toBeGreaterThan(vmCost("falling_ball_hoeppler"));
  });
});

describe("inline", () => {
  it("vibrating element is inline", () => {
    expect(inline("vibrating_element_inline")).toBe(true);
  });
  it("rotational brookfield not inline", () => {
    expect(inline("rotational_brookfield")).toBe(false);
  });
});

describe("forNonNewtonian", () => {
  it("rotational brookfield for non newtonian", () => {
    expect(forNonNewtonian("rotational_brookfield")).toBe(true);
  });
  it("capillary tube not for non newtonian", () => {
    expect(forNonNewtonian("capillary_tube_flow")).toBe(false);
  });
});

describe("principle", () => {
  it("falling ball uses stokes law", () => {
    expect(principle("falling_ball_hoeppler")).toBe("ball_fall_time_inclined_tube_stokes_law_density");
  });
});

describe("bestUse", () => {
  it("cone plate for research polymer melt", () => {
    expect(bestUse("cone_plate_rheometer")).toBe("research_polymer_melt_complex_fluid_full_rheology");
  });
});

describe("viscometerTypes", () => {
  it("returns 5 types", () => {
    expect(viscometerTypes()).toHaveLength(5);
  });
});
