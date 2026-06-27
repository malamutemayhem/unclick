import { describe, it, expect } from "vitest";
import {
  speed, jointQuality, edgeRange, automation,
  ebCost, seamless, forCurved, adhesive,
  bestUse, edgeBanderTypes,
} from "../edge-bander-calc.js";

describe("speed", () => {
  it("laser edge fastest", () => {
    expect(speed("laser_edge")).toBeGreaterThan(speed("manual_portable"));
  });
});

describe("jointQuality", () => {
  it("laser edge best joint quality", () => {
    expect(jointQuality("laser_edge")).toBeGreaterThan(jointQuality("manual_portable"));
  });
});

describe("edgeRange", () => {
  it("premill softform widest edge range", () => {
    expect(edgeRange("premill_softform")).toBeGreaterThan(edgeRange("laser_edge"));
  });
});

describe("automation", () => {
  it("laser edge most automated", () => {
    expect(automation("laser_edge")).toBeGreaterThan(automation("manual_portable"));
  });
});

describe("ebCost", () => {
  it("laser edge most expensive", () => {
    expect(ebCost("laser_edge")).toBeGreaterThan(ebCost("manual_portable"));
  });
});

describe("seamless", () => {
  it("laser edge is seamless", () => {
    expect(seamless("laser_edge")).toBe(true);
  });
  it("hot melt pur not seamless", () => {
    expect(seamless("hot_melt_pur")).toBe(false);
  });
});

describe("forCurved", () => {
  it("premill softform for curved", () => {
    expect(forCurved("premill_softform")).toBe(true);
  });
  it("laser edge not for curved", () => {
    expect(forCurved("laser_edge")).toBe(false);
  });
});

describe("adhesive", () => {
  it("hot air eva uses ethylene vinyl acetate", () => {
    expect(adhesive("hot_air_eva")).toBe("ethylene_vinyl_acetate_hot_melt_glue_pot_roller_application");
  });
});

describe("bestUse", () => {
  it("laser edge for premium furniture", () => {
    expect(bestUse("laser_edge")).toBe("premium_furniture_seamless_zero_line_edge_high_end_kitchen");
  });
});

describe("edgeBanderTypes", () => {
  it("returns 5 types", () => {
    expect(edgeBanderTypes()).toHaveLength(5);
  });
});
