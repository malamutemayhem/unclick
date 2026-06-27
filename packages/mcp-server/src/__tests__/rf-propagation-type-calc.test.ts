import { describe, it, expect } from "vitest";
import {
  range, reliability, bandwidth, latency,
  rpCost, beyondHorizon, forMobile, mechanism,
  bestUse, rfPropagationTypes,
} from "../rf-propagation-type-calc.js";

describe("range", () => {
  it("skywave longest range", () => {
    expect(range("skywave_ionospheric_hop")).toBeGreaterThan(range("line_of_sight_direct"));
  });
});

describe("reliability", () => {
  it("line of sight most reliable", () => {
    expect(reliability("line_of_sight_direct")).toBeGreaterThan(reliability("ducting_atmospheric_layer"));
  });
});

describe("bandwidth", () => {
  it("line of sight highest bandwidth", () => {
    expect(bandwidth("line_of_sight_direct")).toBeGreaterThan(bandwidth("skywave_ionospheric_hop"));
  });
});

describe("latency", () => {
  it("line of sight lowest latency score highest", () => {
    expect(latency("line_of_sight_direct")).toBeGreaterThan(latency("skywave_ionospheric_hop"));
  });
});

describe("rpCost", () => {
  it("troposcatter most expensive", () => {
    expect(rpCost("troposcatter_diffusion")).toBeGreaterThan(rpCost("ducting_atmospheric_layer"));
  });
});

describe("beyondHorizon", () => {
  it("skywave is beyond horizon", () => {
    expect(beyondHorizon("skywave_ionospheric_hop")).toBe(true);
  });
  it("line of sight not beyond horizon", () => {
    expect(beyondHorizon("line_of_sight_direct")).toBe(false);
  });
});

describe("forMobile", () => {
  it("line of sight for mobile", () => {
    expect(forMobile("line_of_sight_direct")).toBe(true);
  });
  it("skywave not for mobile", () => {
    expect(forMobile("skywave_ionospheric_hop")).toBe(false);
  });
});

describe("mechanism", () => {
  it("troposcatter uses turbulence scatter", () => {
    expect(mechanism("troposcatter_diffusion")).toBe("troposphere_turbulence_scatter");
  });
});

describe("bestUse", () => {
  it("skywave for hf radio", () => {
    expect(bestUse("skywave_ionospheric_hop")).toBe("hf_radio_shortwave_amateur_comms");
  });
});

describe("rfPropagationTypes", () => {
  it("returns 5 types", () => {
    expect(rfPropagationTypes()).toHaveLength(5);
  });
});
