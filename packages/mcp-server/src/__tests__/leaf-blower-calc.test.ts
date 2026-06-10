import { describe, it, expect } from "vitest";
import {
  airSpeed, airVolumeCfm, noiseOutput, portability,
  blowerCost, canVacuum, emissionFree, motorType,
  bestScenario, leafBlowers,
} from "../leaf-blower-calc.js";

describe("airSpeed", () => {
  it("gas backpack fastest air speed", () => {
    expect(airSpeed("gas_backpack")).toBeGreaterThan(airSpeed("electric_corded"));
  });
});

describe("airVolumeCfm", () => {
  it("gas backpack highest volume", () => {
    expect(airVolumeCfm("gas_backpack")).toBeGreaterThan(airVolumeCfm("electric_corded"));
  });
});

describe("noiseOutput", () => {
  it("gas backpack noisiest", () => {
    expect(noiseOutput("gas_backpack")).toBeGreaterThan(noiseOutput("battery_handheld"));
  });
});

describe("portability", () => {
  it("battery handheld most portable", () => {
    expect(portability("battery_handheld")).toBeGreaterThan(portability("wheeled_walk_behind"));
  });
});

describe("blowerCost", () => {
  it("wheeled walk behind most expensive", () => {
    expect(blowerCost("wheeled_walk_behind")).toBeGreaterThan(blowerCost("electric_corded"));
  });
});

describe("canVacuum", () => {
  it("blower vacuum combo can vacuum", () => {
    expect(canVacuum("blower_vacuum_combo")).toBe(true);
  });
  it("gas backpack cannot", () => {
    expect(canVacuum("gas_backpack")).toBe(false);
  });
});

describe("emissionFree", () => {
  it("battery handheld is emission free", () => {
    expect(emissionFree("battery_handheld")).toBe(true);
  });
  it("gas backpack is not", () => {
    expect(emissionFree("gas_backpack")).toBe(false);
  });
});

describe("motorType", () => {
  it("gas backpack uses two stroke high rpm", () => {
    expect(motorType("gas_backpack")).toBe("two_stroke_high_rpm");
  });
});

describe("bestScenario", () => {
  it("battery handheld for quick deck walkway sweep", () => {
    expect(bestScenario("battery_handheld")).toBe("quick_deck_walkway_sweep");
  });
});

describe("leafBlowers", () => {
  it("returns 5 types", () => {
    expect(leafBlowers()).toHaveLength(5);
  });
});
