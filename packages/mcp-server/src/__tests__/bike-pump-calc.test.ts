import { describe, it, expect } from "vitest";
import {
  maxPressure, inflationSpeed, portability, accuracy,
  pumpCost, hasGauge, dualValve, pumpMechanism,
  bestRider, bikePumps,
} from "../bike-pump-calc.js";

describe("maxPressure", () => {
  it("track high pressure highest max pressure", () => {
    expect(maxPressure("track_high_pressure")).toBeGreaterThan(maxPressure("mini_frame_mount"));
  });
});

describe("inflationSpeed", () => {
  it("co2 cartridge inflator fastest inflation", () => {
    expect(inflationSpeed("co2_cartridge_inflator")).toBeGreaterThan(inflationSpeed("mini_frame_mount"));
  });
});

describe("portability", () => {
  it("co2 cartridge inflator most portable", () => {
    expect(portability("co2_cartridge_inflator")).toBeGreaterThan(portability("floor_stand_gauge"));
  });
});

describe("accuracy", () => {
  it("track high pressure most accurate", () => {
    expect(accuracy("track_high_pressure")).toBeGreaterThan(accuracy("mini_frame_mount"));
  });
});

describe("pumpCost", () => {
  it("track high pressure most expensive", () => {
    expect(pumpCost("track_high_pressure")).toBeGreaterThan(pumpCost("co2_cartridge_inflator"));
  });
});

describe("hasGauge", () => {
  it("floor stand gauge has gauge", () => {
    expect(hasGauge("floor_stand_gauge")).toBe(true);
  });
  it("mini frame mount does not", () => {
    expect(hasGauge("mini_frame_mount")).toBe(false);
  });
});

describe("dualValve", () => {
  it("floor stand gauge has dual valve", () => {
    expect(dualValve("floor_stand_gauge")).toBe(true);
  });
  it("track high pressure does not", () => {
    expect(dualValve("track_high_pressure")).toBe(false);
  });
});

describe("pumpMechanism", () => {
  it("co2 cartridge inflator uses threaded co2 release", () => {
    expect(pumpMechanism("co2_cartridge_inflator")).toBe("threaded_co2_release");
  });
});

describe("bestRider", () => {
  it("track high pressure best for bike shop professional", () => {
    expect(bestRider("track_high_pressure")).toBe("bike_shop_professional");
  });
});

describe("bikePumps", () => {
  it("returns 5 types", () => {
    expect(bikePumps()).toHaveLength(5);
  });
});
