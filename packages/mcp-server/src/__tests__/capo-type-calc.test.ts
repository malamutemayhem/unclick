import { describe, it, expect } from "vitest";
import {
  clampPressure, tuningStability, speedOfUse, fretboardContact,
  capoCost, oneHandOperable, partialFretCapable, clampMechanism,
  bestInstrument, capoTypes,
} from "../capo-type-calc.js";

describe("clampPressure", () => {
  it("screw adjust strongest pressure", () => {
    expect(clampPressure("screw_adjust")).toBeGreaterThan(clampPressure("partial_cut"));
  });
});

describe("tuningStability", () => {
  it("screw adjust best stability", () => {
    expect(tuningStability("screw_adjust")).toBeGreaterThan(tuningStability("spring_clamp"));
  });
});

describe("speedOfUse", () => {
  it("spring clamp fastest", () => {
    expect(speedOfUse("spring_clamp")).toBeGreaterThan(speedOfUse("spider_individual"));
  });
});

describe("fretboardContact", () => {
  it("spider individual best contact", () => {
    expect(fretboardContact("spider_individual")).toBeGreaterThan(fretboardContact("partial_cut"));
  });
});

describe("capoCost", () => {
  it("spider individual most expensive", () => {
    expect(capoCost("spider_individual")).toBeGreaterThan(capoCost("spring_clamp"));
  });
});

describe("oneHandOperable", () => {
  it("spring clamp is one hand", () => {
    expect(oneHandOperable("spring_clamp")).toBe(true);
  });
  it("screw adjust is not", () => {
    expect(oneHandOperable("screw_adjust")).toBe(false);
  });
});

describe("partialFretCapable", () => {
  it("partial cut supports partial fret", () => {
    expect(partialFretCapable("partial_cut")).toBe(true);
  });
  it("spring clamp does not", () => {
    expect(partialFretCapable("spring_clamp")).toBe(false);
  });
});

describe("clampMechanism", () => {
  it("toggle latch uses lever lock flip clamp", () => {
    expect(clampMechanism("toggle_latch")).toBe("lever_lock_flip_clamp");
  });
});

describe("bestInstrument", () => {
  it("screw adjust for classical nylon precise", () => {
    expect(bestInstrument("screw_adjust")).toBe("classical_nylon_precise");
  });
});

describe("capoTypes", () => {
  it("returns 5 types", () => {
    expect(capoTypes()).toHaveLength(5);
  });
});
