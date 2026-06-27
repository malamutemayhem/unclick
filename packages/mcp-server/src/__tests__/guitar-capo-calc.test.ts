import { describe, it, expect } from "vitest";
import {
  tuningStability, speedOfUse, pressureControl, versatility,
  capoCost, oneHanded, partialCapo, clampMechanism,
  bestGuitar, guitarCapos,
} from "../guitar-capo-calc.js";

describe("tuningStability", () => {
  it("screw adjust precise best tuning stability", () => {
    expect(tuningStability("screw_adjust_precise")).toBeGreaterThan(tuningStability("partial_drop_tune"));
  });
});

describe("speedOfUse", () => {
  it("spring clamp trigger fastest speed of use", () => {
    expect(speedOfUse("spring_clamp_trigger")).toBeGreaterThan(speedOfUse("screw_adjust_precise"));
  });
});

describe("pressureControl", () => {
  it("screw adjust precise best pressure control", () => {
    expect(pressureControl("screw_adjust_precise")).toBeGreaterThan(pressureControl("spring_clamp_trigger"));
  });
});

describe("versatility", () => {
  it("partial drop tune most versatile", () => {
    expect(versatility("partial_drop_tune")).toBeGreaterThan(versatility("toggle_latch_flip"));
  });
});

describe("capoCost", () => {
  it("partial drop tune most expensive", () => {
    expect(capoCost("partial_drop_tune")).toBeGreaterThan(capoCost("spring_clamp_trigger"));
  });
});

describe("oneHanded", () => {
  it("spring clamp trigger is one handed", () => {
    expect(oneHanded("spring_clamp_trigger")).toBe(true);
  });
  it("screw adjust precise is not one handed", () => {
    expect(oneHanded("screw_adjust_precise")).toBe(false);
  });
});

describe("partialCapo", () => {
  it("partial drop tune is partial capo", () => {
    expect(partialCapo("partial_drop_tune")).toBe(true);
  });
  it("spring clamp trigger is not partial capo", () => {
    expect(partialCapo("spring_clamp_trigger")).toBe(false);
  });
});

describe("clampMechanism", () => {
  it("screw adjust precise uses threaded knob bar", () => {
    expect(clampMechanism("screw_adjust_precise")).toBe("threaded_knob_bar");
  });
});

describe("bestGuitar", () => {
  it("spring clamp trigger best for acoustic steel string", () => {
    expect(bestGuitar("spring_clamp_trigger")).toBe("acoustic_steel_string");
  });
});

describe("guitarCapos", () => {
  it("returns 5 types", () => {
    expect(guitarCapos()).toHaveLength(5);
  });
});
