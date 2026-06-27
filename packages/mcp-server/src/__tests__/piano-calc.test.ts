import { describe, it, expect } from "vitest";
import {
  totalKeys, keyColor, frequency, midiFromFreq, octave,
  noteName, tuningCents, stringTension, hammerWeight,
  practiceMinutes, tuningInterval, pedalFunction,
  movingWeight, roomSize, pianoTypes,
} from "../piano-calc.js";

describe("totalKeys", () => {
  it("grand has 88", () => {
    expect(totalKeys("grand")).toBe(88);
  });

  it("keyboard has 61", () => {
    expect(totalKeys("keyboard")).toBe(61);
  });
});

describe("keyColor", () => {
  it("middle C is white", () => {
    expect(keyColor(60)).toBe("white");
  });

  it("C# is black", () => {
    expect(keyColor(61)).toBe("black");
  });
});

describe("frequency", () => {
  it("A4 is 440Hz", () => {
    expect(frequency(69)).toBe(440);
  });
});

describe("midiFromFreq", () => {
  it("440Hz is 69", () => {
    expect(midiFromFreq(440)).toBe(69);
  });
});

describe("octave", () => {
  it("middle C is octave 4", () => {
    expect(octave(60)).toBe(4);
  });
});

describe("noteName", () => {
  it("A4", () => {
    expect(noteName(69)).toBe("A4");
  });
});

describe("tuningCents", () => {
  it("0 when in tune", () => {
    expect(tuningCents(440, 440)).toBe(0);
  });

  it("positive when sharp", () => {
    expect(tuningCents(445, 440)).toBeGreaterThan(0);
  });
});

describe("stringTension", () => {
  it("positive newtons", () => {
    expect(stringTension(440, 0.6, 0.005)).toBeGreaterThan(0);
  });
});

describe("hammerWeight", () => {
  it("positive grams", () => {
    expect(hammerWeight(44)).toBeGreaterThan(0);
  });
});

describe("practiceMinutes", () => {
  it("professional most", () => {
    expect(practiceMinutes("professional")).toBeGreaterThan(practiceMinutes("beginner"));
  });
});

describe("tuningInterval", () => {
  it("concert most frequent", () => {
    expect(tuningInterval("concert")).toBeLessThan(tuningInterval("home"));
  });
});

describe("pedalFunction", () => {
  it("sustain lifts dampers", () => {
    expect(pedalFunction("sustain")).toContain("dampers");
  });
});

describe("movingWeight", () => {
  it("grand heaviest", () => {
    expect(movingWeight("grand")).toBeGreaterThan(movingWeight("upright"));
  });
});

describe("roomSize", () => {
  it("grand needs most space", () => {
    expect(roomSize("grand")).toBeGreaterThan(roomSize("digital"));
  });
});

describe("pianoTypes", () => {
  it("returns 5 types", () => {
    expect(pianoTypes()).toHaveLength(5);
  });
});
