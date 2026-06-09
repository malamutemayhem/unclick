import { describe, it, expect } from "vitest";
import {
  tineCount, frequency, tineLength, resonanceFreq, soundholeDiameter,
  bridgePosition, tuningRange, practiceMinutes, tineSpacing,
  bodyVolumeCc, sustainSeconds, kalimbaSizes,
} from "../kalimba-calc.js";

describe("tineCount", () => {
  it("17_key = 17", () => {
    expect(tineCount("17_key")).toBe(17);
  });
});

describe("frequency", () => {
  it("A4 = 440 Hz", () => {
    expect(frequency(9, 4)).toBeCloseTo(440, 0);
  });
});

describe("tineLength", () => {
  it("positive length", () => {
    expect(tineLength(440, 7800)).toBeGreaterThan(0);
  });
  it("zero freq = 0", () => {
    expect(tineLength(0, 7800)).toBe(0);
  });
});

describe("resonanceFreq", () => {
  it("positive Hz", () => {
    expect(resonanceFreq(12)).toBeGreaterThan(0);
  });
  it("zero length = 0", () => {
    expect(resonanceFreq(0)).toBe(0);
  });
});

describe("soundholeDiameter", () => {
  it("30% of width", () => {
    expect(soundholeDiameter(10)).toBe(3);
  });
});

describe("bridgePosition", () => {
  it("40% of tine length", () => {
    expect(bridgePosition(50)).toBe(20);
  });
});

describe("tuningRange", () => {
  it("17_key range", () => {
    const r = tuningRange("17_key");
    expect(r.low).toBe("C4");
    expect(r.high).toBe("E6");
  });
});

describe("practiceMinutes", () => {
  it("beginner = 15", () => {
    expect(practiceMinutes("beginner")).toBe(15);
  });
  it("advanced = 60", () => {
    expect(practiceMinutes("advanced")).toBe(60);
  });
});

describe("tineSpacing", () => {
  it("positive spacing", () => {
    expect(tineSpacing(120, 17)).toBeGreaterThan(0);
  });
});

describe("bodyVolumeCc", () => {
  it("correct volume", () => {
    expect(bodyVolumeCc(15, 10, 4)).toBe(600);
  });
});

describe("sustainSeconds", () => {
  it("phosphor_bronze longest", () => {
    expect(sustainSeconds("phosphor_bronze")).toBeGreaterThan(sustainSeconds("steel"));
  });
});

describe("kalimbaSizes", () => {
  it("returns 5 sizes", () => {
    expect(kalimbaSizes()).toHaveLength(5);
  });
});
