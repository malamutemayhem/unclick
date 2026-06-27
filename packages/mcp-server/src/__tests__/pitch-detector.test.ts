import { describe, it, expect } from "vitest";
import { PitchDetector } from "../pitch-detector.js";

describe("PitchDetector", () => {
  it("converts A4 frequency to note", () => {
    const result = PitchDetector.frequencyToNote(440);
    expect(result.note).toBe("A");
    expect(result.octave).toBe(4);
    expect(result.cents).toBe(0);
  });

  it("converts middle C frequency", () => {
    const result = PitchDetector.frequencyToNote(261.63);
    expect(result.note).toBe("C");
    expect(result.octave).toBe(4);
  });

  it("converts note to frequency", () => {
    expect(PitchDetector.noteToFrequency("A", 4)).toBeCloseTo(440);
    expect(PitchDetector.noteToFrequency("A", 5)).toBeCloseTo(880);
  });

  it("converts MIDI to frequency", () => {
    expect(PitchDetector.midiToFrequency(69)).toBeCloseTo(440);
    expect(PitchDetector.midiToFrequency(60)).toBeCloseTo(261.63, 0);
  });

  it("converts frequency to MIDI", () => {
    expect(PitchDetector.frequencyToMidi(440)).toBe(69);
    expect(PitchDetector.frequencyToMidi(261.63)).toBe(60);
  });

  it("calculates interval in semitones", () => {
    expect(PitchDetector.interval(440, 880)).toBeCloseTo(12);
    expect(PitchDetector.interval(440, 660)).toBeCloseTo(7, 0);
  });

  it("generates harmonics", () => {
    const harmonics = PitchDetector.harmonics(100, 5);
    expect(harmonics).toEqual([100, 200, 300, 400, 500]);
  });

  it("detects octaves", () => {
    expect(PitchDetector.isOctave(440, 880)).toBe(true);
    expect(PitchDetector.isOctave(440, 1760)).toBe(true);
    expect(PitchDetector.isOctave(440, 500)).toBe(false);
  });

  it("throws on unknown note", () => {
    expect(() => PitchDetector.noteToFrequency("X", 4)).toThrow();
  });

  it("autocorrelation returns a pitch result", () => {
    const sampleRate = 44100;
    const freq = 200;
    const signal = Array.from({ length: 4000 }, (_, i) =>
      Math.sin(2 * Math.PI * freq * i / sampleRate),
    );
    const result = PitchDetector.autocorrelation(signal, sampleRate);
    expect(result.frequency).toBeGreaterThan(0);
    expect(result.confidence).toBeGreaterThan(0);
    expect(typeof result.note).toBe("string");
  });
});
