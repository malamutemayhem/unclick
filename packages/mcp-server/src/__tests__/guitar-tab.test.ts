import { describe, it, expect } from "vitest";
import {
  getTuning, noteAtFret, noteName, midiToFrequency,
  frequencyToMidi, fretboardNotes, findNote,
  chordDiagram, tabLine, scalePattern, capoEquivalent,
  fretPosition, COMMON_CHORDS,
} from "../guitar-tab.js";

describe("getTuning", () => {
  it("standard tuning has 6 strings", () => {
    const t = getTuning("standard");
    expect(t.strings.length).toBe(6);
    expect(t.notes[0]).toBe("E2");
  });

  it("drop D changes lowest string", () => {
    const t = getTuning("dropD");
    expect(t.notes[0]).toBe("D2");
  });
});

describe("noteAtFret", () => {
  it("open low E is E2", () => {
    expect(noteAtFret(40, 0)).toBe("E2");
  });

  it("5th fret on low E is A2", () => {
    expect(noteAtFret(40, 5)).toBe("A2");
  });
});

describe("noteName", () => {
  it("midi 69 is A", () => {
    expect(noteName(69)).toBe("A");
  });
});

describe("midiToFrequency / frequencyToMidi", () => {
  it("A4 = 440Hz", () => {
    expect(midiToFrequency(69)).toBeCloseTo(440);
  });

  it("round trips", () => {
    expect(frequencyToMidi(440)).toBe(69);
  });
});

describe("fretboardNotes", () => {
  it("returns 6 strings", () => {
    const board = fretboardNotes("standard", 5);
    expect(board.length).toBe(6);
    expect(board[0].length).toBe(6);
  });
});

describe("findNote", () => {
  it("finds E on multiple strings", () => {
    const positions = findNote("standard", "E");
    expect(positions.length).toBeGreaterThan(2);
  });
});

describe("chordDiagram", () => {
  it("formats chord", () => {
    const diagram = chordDiagram({ name: "C", frets: [-1, 3, 2, 0, 1, 0] });
    expect(diagram).toContain("C");
    expect(diagram).toContain("X");
  });
});

describe("tabLine", () => {
  it("formats tab", () => {
    const line = tabLine([0, 1, 0, 2, 3, null]);
    expect(line).toContain("e|");
    expect(line).toContain("E|");
  });
});

describe("scalePattern", () => {
  it("C major has 7 notes", () => {
    expect(scalePattern("C", "major").length).toBe(7);
  });

  it("A pentatonic has 5 notes", () => {
    expect(scalePattern("A", "pentatonic").length).toBe(5);
  });
});

describe("capoEquivalent", () => {
  it("capo 2 raises all strings", () => {
    const notes = capoEquivalent("standard", 2);
    expect(notes.length).toBe(6);
    expect(notes[0]).not.toBe("E2");
  });
});

describe("fretPosition", () => {
  it("12th fret is half scale length", () => {
    expect(fretPosition(25.5, 12)).toBeCloseTo(12.75, 0);
  });
});

describe("COMMON_CHORDS", () => {
  it("has standard chords", () => {
    const chords = COMMON_CHORDS();
    expect(chords.length).toBeGreaterThan(5);
    expect(chords.some(c => c.name === "C")).toBe(true);
  });
});
