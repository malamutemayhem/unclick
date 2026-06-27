import { describe, it, expect } from "vitest";
import {
  noteToMidi, midiToNote, midiToFrequency, frequencyToMidi,
  scale, chord, intervalName, transpose, scaleTypes, chordTypes,
} from "../music-theory.js";

describe("noteToMidi / midiToNote", () => {
  it("converts A4 to 69", () => {
    expect(noteToMidi("A4")).toBe(69);
  });

  it("converts C4 to 60", () => {
    expect(noteToMidi("C4")).toBe(60);
  });

  it("roundtrips", () => {
    expect(midiToNote(noteToMidi("G#3"))).toBe("G#3");
  });

  it("throws for invalid note", () => {
    expect(() => noteToMidi("X9")).toThrow();
  });
});

describe("midiToFrequency / frequencyToMidi", () => {
  it("A4 is 440Hz", () => {
    expect(midiToFrequency(69)).toBeCloseTo(440);
  });

  it("roundtrips frequency", () => {
    expect(frequencyToMidi(440)).toBe(69);
  });
});

describe("scale", () => {
  it("returns C major scale", () => {
    expect(scale("C", "major")).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
  });

  it("returns A minor scale", () => {
    expect(scale("A", "minor")).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
  });

  it("throws for unknown scale", () => {
    expect(() => scale("C", "nonexistent")).toThrow();
  });
});

describe("chord", () => {
  it("returns C major chord", () => {
    expect(chord("C", "major")).toEqual(["C", "E", "G"]);
  });

  it("returns A minor chord", () => {
    expect(chord("A", "minor")).toEqual(["A", "C", "E"]);
  });
});

describe("intervalName", () => {
  it("names common intervals", () => {
    expect(intervalName(0)).toBe("unison");
    expect(intervalName(7)).toBe("perfect 5th");
    expect(intervalName(12)).toBe("unison");
  });
});

describe("transpose", () => {
  it("transposes up", () => {
    expect(transpose("C4", 2)).toBe("D4");
  });

  it("transposes across octave", () => {
    expect(transpose("B4", 1)).toBe("C5");
  });
});

describe("types lists", () => {
  it("lists scale types", () => {
    const types = scaleTypes();
    expect(types).toContain("major");
    expect(types).toContain("minor");
  });

  it("lists chord types", () => {
    const types = chordTypes();
    expect(types).toContain("major");
    expect(types).toContain("dom7");
  });
});
