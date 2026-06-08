import { describe, it, expect } from "vitest";
import { ChordProgressionEngine } from "../chord-progression.js";

describe("ChordProgressionEngine", () => {
  it("generates C major scale", () => {
    const scale = ChordProgressionEngine.getScale("C", "major");
    expect(scale).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
  });

  it("generates A minor scale", () => {
    const scale = ChordProgressionEngine.getScale("A", "minor");
    expect(scale).toEqual(["A", "B", "C", "D", "E", "F", "G"]);
  });

  it("generates C major chord", () => {
    const chord = ChordProgressionEngine.getChord("C", "major");
    expect(chord).toEqual(["C", "E", "G"]);
  });

  it("generates A minor chord", () => {
    const chord = ChordProgressionEngine.getChord("A", "minor");
    expect(chord).toEqual(["A", "C", "E"]);
  });

  it("generates diatonic chords in C major", () => {
    const chords = ChordProgressionEngine.diatonicChords("C", "major");
    expect(chords.length).toBe(7);
    expect(chords[0].quality).toBe("major");
    expect(chords[1].quality).toBe("minor");
    expect(chords[6].quality).toBe("diminished");
  });

  it("generates I-IV-V-I progression", () => {
    const prog = ChordProgressionEngine.progression("C", [1, 4, 5, 1]);
    expect(prog.length).toBe(4);
    expect(prog[0].root).toBe("C");
    expect(prog[1].root).toBe("F");
    expect(prog[2].root).toBe("G");
  });

  it("lists common progressions", () => {
    const common = ChordProgressionEngine.commonProgressions();
    expect(Object.keys(common).length).toBeGreaterThan(3);
  });

  it("transposes notes", () => {
    const transposed = ChordProgressionEngine.transpose(["C", "E", "G"], 2);
    expect(transposed).toEqual(["D", "F#", "A"]);
  });

  it("computes interval", () => {
    expect(ChordProgressionEngine.interval("C", "E")).toBe(4);
    expect(ChordProgressionEngine.interval("C", "G")).toBe(7);
  });

  it("lists available scales", () => {
    expect(ChordProgressionEngine.availableScales()).toContain("major");
    expect(ChordProgressionEngine.availableScales()).toContain("pentatonic");
  });

  it("generates dom7 chord", () => {
    const chord = ChordProgressionEngine.getChord("G", "dom7");
    expect(chord.length).toBe(4);
    expect(chord).toEqual(["G", "B", "D", "F"]);
  });
});
