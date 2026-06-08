import { describe, it, expect } from "vitest";
import { MidiSequencer } from "../midi-sequencer.js";

describe("MidiSequencer", () => {
  it("adds tracks and notes", () => {
    const seq = new MidiSequencer();
    const t = seq.addTrack("Piano");
    seq.addNote(t, 60, 100, 0, 1);
    seq.addNote(t, 64, 80, 1, 1);
    expect(seq.trackCount()).toBe(1);
    expect(seq.totalNotes()).toBe(2);
  });

  it("gets notes at a specific time", () => {
    const seq = new MidiSequencer();
    const t = seq.addTrack("Drums");
    seq.addNote(t, 36, 127, 0, 0.5);
    seq.addNote(t, 38, 100, 1, 0.5);
    const notes = seq.getNotesAtTime(0.25);
    expect(notes.length).toBe(1);
    expect(notes[0].pitch).toBe(36);
  });

  it("calculates duration", () => {
    const seq = new MidiSequencer();
    const t = seq.addTrack("Lead");
    seq.addNote(t, 60, 100, 0, 2);
    seq.addNote(t, 64, 100, 3, 1);
    expect(seq.duration()).toBe(4);
  });

  it("transposes a track", () => {
    const seq = new MidiSequencer();
    const t = seq.addTrack("Bass");
    seq.addNote(t, 48, 100, 0, 1);
    seq.transpose(t, 12);
    expect(seq.getTrack(t)?.notes[0].pitch).toBe(60);
  });

  it("clamps pitch values", () => {
    const seq = new MidiSequencer();
    const t = seq.addTrack("Test");
    seq.addNote(t, 200, 100, 0, 1);
    expect(seq.getTrack(t)?.notes[0].pitch).toBe(127);
  });

  it("quantizes notes", () => {
    const seq = new MidiSequencer();
    const t = seq.addTrack("Keys");
    seq.addNote(t, 60, 100, 0.3, 0.7);
    seq.quantize(0.5);
    const note = seq.getTrack(t)?.notes[0];
    expect(note?.start).toBe(0.5);
    expect(note?.duration).toBe(0.5);
  });

  it("converts beats to seconds", () => {
    const seq = new MidiSequencer();
    seq.setTempo(120);
    expect(seq.beatsToSeconds(4)).toBe(2);
    expect(seq.secondsToBeats(2)).toBe(4);
  });

  it("converts pitch to note name", () => {
    const seq = new MidiSequencer();
    expect(seq.pitchToNoteName(60)).toBe("C4");
    expect(seq.pitchToNoteName(69)).toBe("A4");
    expect(seq.pitchToNoteName(72)).toBe("C5");
  });

  it("manages tempo", () => {
    const seq = new MidiSequencer();
    seq.setTempo(140);
    expect(seq.getTempo()).toBe(140);
  });

  it("manages time signature", () => {
    const seq = new MidiSequencer();
    seq.setTimeSignature(3, 4);
    expect(seq.getTimeSignature()).toEqual({ beats: 3, unit: 4 });
  });
});
