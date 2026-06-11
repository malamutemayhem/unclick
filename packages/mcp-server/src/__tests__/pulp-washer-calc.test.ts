import { describe, it, expect } from "vitest";
import {
  washEfficiency, throughput, waterUsage, pulpLoss,
  pwCost, enclosed, forKraft, washerConfig,
  bestUse, pulpWasherTypes,
} from "../pulp-washer-calc.js";

describe("washEfficiency", () => {
  it("diffusion washer best wash efficiency", () => {
    expect(washEfficiency("diffusion_washer")).toBeGreaterThan(washEfficiency("rotary_drum"));
  });
});

describe("throughput", () => {
  it("twin roll highest throughput", () => {
    expect(throughput("twin_roll")).toBeGreaterThan(throughput("displacement_press"));
  });
});

describe("waterUsage", () => {
  it("displacement press best water usage", () => {
    expect(waterUsage("displacement_press")).toBeGreaterThan(waterUsage("rotary_drum"));
  });
});

describe("pulpLoss", () => {
  it("displacement press least pulp loss", () => {
    expect(pulpLoss("displacement_press")).toBeGreaterThan(pulpLoss("belt_press"));
  });
});

describe("pwCost", () => {
  it("displacement press most expensive", () => {
    expect(pwCost("displacement_press")).toBeGreaterThan(pwCost("rotary_drum"));
  });
});

describe("enclosed", () => {
  it("diffusion washer is enclosed", () => {
    expect(enclosed("diffusion_washer")).toBe(true);
  });
  it("rotary drum not enclosed", () => {
    expect(enclosed("rotary_drum")).toBe(false);
  });
});

describe("forKraft", () => {
  it("rotary drum for kraft", () => {
    expect(forKraft("rotary_drum")).toBe(true);
  });
  it("displacement press not for kraft", () => {
    expect(forKraft("displacement_press")).toBe(false);
  });
});

describe("washerConfig", () => {
  it("belt press uses twin belt squeeze dewater", () => {
    expect(washerConfig("belt_press")).toBe("belt_press_pulp_washer_twin_belt_squeeze_dewater_wash_compact");
  });
});

describe("bestUse", () => {
  it("twin roll for high capacity kraft mill", () => {
    expect(bestUse("twin_roll")).toBe("high_capacity_kraft_mill_twin_roll_washer_press_displace_wash");
  });
});

describe("pulpWasherTypes", () => {
  it("returns 5 types", () => {
    expect(pulpWasherTypes()).toHaveLength(5);
  });
});
