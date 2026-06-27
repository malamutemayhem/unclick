import { describe, it, expect } from "vitest";
import {
  noteToMidi, midiToNote, midiToFrequency, frequencyToMidi,
  getScale, getScaleFrequencies, interval, transpose,
  isInScale, getRelativeMinor, getRelativeMajor, listScaleTypes,
  centsFromEqual,
} from "../music-scale.js";

describe("noteToMidi", () => {
  it("converts A4 to 69", () => {
    expect(noteToMidi("A", 4)).toBe(69);
  });

  it("converts C4 to 60", () => {
    expect(noteToMidi("C", 4)).toBe(60);
  });
});

describe("midiToNote", () => {
  it("converts 69 to A4", () => {
    const { name, octave } = midiToNote(69);
    expect(name).toBe("A");
    expect(octave).toBe(4);
  });

  it("converts 60 to C4", () => {
    const { name, octave } = midiToNote(60);
    expect(name).toBe("C");
    expect(octave).toBe(4);
  });
});

describe("midiToFrequency", () => {
  it("A4 is 440Hz", () => {
    expect(midiToFrequency(69)).toBeCloseTo(440);
  });

  it("A5 is 880Hz", () => {
    expect(midiToFrequency(81)).toBeCloseTo(880);
  });
});

describe("frequencyToMidi", () => {
  it("440Hz is midi 69", () => {
    expect(frequencyToMidi(440)).toBeCloseTo(69);
  });
});

describe("getScale", () => {
  it("C major scale", () => {
    const scale = getScale("C", "major");
    expect(scale).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
  });

  it("A minor scale", () => {
    const scale = getScale("A", "minor");
    expect(scale).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
  });

  it("pentatonic major", () => {
    const scale = getScale("C", "pentatonicMajor");
    expect(scale.length).toBe(5);
  });

  it("returns empty for unknown scale", () => {
    expect(getScale("C", "nonexistent")).toEqual([]);
  });
});

describe("getScaleFrequencies", () => {
  it("returns frequencies for C4 major", () => {
    const freqs = getScaleFrequencies("C", 4, "major");
    expect(freqs.length).toBe(8);
    expect(freqs[0]).toBeCloseTo(261.63, 0);
  });
});

describe("interval", () => {
  it("names intervals", () => {
    expect(interval(0)).toBe("unison");
    expect(interval(7)).toBe("perfect 5th");
    expect(interval(12)).toBe("octave");
  });
});

describe("transpose", () => {
  it("transposes up", () => {
    expect(transpose("C", 4)).toBe("E");
  });

  it("wraps around", () => {
    expect(transpose("A", 4)).toBe("C#");
  });

  it("transposes down", () => {
    expect(transpose("C", -3)).toBe("A");
  });
});

describe("isInScale", () => {
  it("C is in C major", () => {
    expect(isInScale("C", "C", "major")).toBe(true);
  });

  it("C# is not in C major", () => {
    expect(isInScale("C#", "C", "major")).toBe(false);
  });
});

describe("relative keys", () => {
  it("A minor is relative minor of C major", () => {
    expect(getRelativeMinor("C")).toBe("A");
  });

  it("C major is relative major of A minor", () => {
    expect(getRelativeMajor("A")).toBe("C");
  });
});

describe("listScaleTypes", () => {
  it("returns scale types", () => {
    const types = listScaleTypes();
    expect(types).toContain("major");
    expect(types).toContain("minor");
    expect(types).toContain("blues");
  });
});

describe("centsFromEqual", () => {
  it("returns 0 for in-tune note", () => {
    expect(centsFromEqual(440, 69)).toBeCloseTo(0);
  });

  it("positive for sharp note", () => {
    expect(centsFromEqual(445, 69)).toBeGreaterThan(0);
  });
});
