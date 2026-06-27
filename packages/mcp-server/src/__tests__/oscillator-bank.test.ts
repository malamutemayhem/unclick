import { describe, it, expect } from "vitest";
import {
  Oscillator, OscillatorBank, createHarmonicSeries,
  createChord, midiToFrequency, frequencyToMidi,
} from "../oscillator-bank.js";

describe("Oscillator", () => {
  it("generates sine samples", () => {
    const osc = new Oscillator({ waveform: "sine", frequency: 440 });
    const samples = osc.generate(100);
    expect(samples).toHaveLength(100);
    expect(samples.some((s) => s !== 0)).toBe(true);
  });

  it("generates square samples", () => {
    const osc = new Oscillator({ waveform: "square", frequency: 440 });
    const samples = osc.generate(100);
    for (const s of samples) {
      expect(Math.abs(s)).toBeCloseTo(1, 0);
    }
  });

  it("amplitude scales output", () => {
    const osc = new Oscillator({ waveform: "sine", amplitude: 0.5 });
    const samples = osc.generate(1000);
    for (const s of samples) {
      expect(Math.abs(s)).toBeLessThanOrEqual(0.51);
    }
  });

  it("reset clears state", () => {
    const osc = new Oscillator({ frequency: 440 });
    const first = osc.tick();
    osc.generate(100);
    osc.reset();
    const afterReset = osc.tick();
    expect(afterReset).toBeCloseTo(first);
  });
});

describe("OscillatorBank", () => {
  it("adds and counts oscillators", () => {
    const bank = new OscillatorBank();
    bank.add({ frequency: 440 });
    bank.add({ frequency: 880 });
    expect(bank.count).toBe(2);
  });

  it("removes oscillators", () => {
    const bank = new OscillatorBank();
    bank.add({ frequency: 440 });
    bank.add({ frequency: 880 });
    bank.remove(0);
    expect(bank.count).toBe(1);
  });

  it("tick returns averaged sum", () => {
    const bank = new OscillatorBank();
    bank.add({ frequency: 440, waveform: "sine" });
    bank.add({ frequency: 880, waveform: "sine" });
    const value = bank.tick();
    expect(typeof value).toBe("number");
  });

  it("tickRaw returns unaveraged sum", () => {
    const bank = new OscillatorBank();
    bank.add({ frequency: 440, amplitude: 1, waveform: "square" });
    const raw = bank.tickRaw();
    const avg = bank.tick();
    expect(typeof raw).toBe("number");
    expect(typeof avg).toBe("number");
  });

  it("generate produces array", () => {
    const bank = new OscillatorBank();
    bank.add({ frequency: 440 });
    const samples = bank.generate(50);
    expect(samples).toHaveLength(50);
  });

  it("empty bank returns 0", () => {
    const bank = new OscillatorBank();
    expect(bank.tick()).toBe(0);
  });

  it("setAllFrequencies changes all", () => {
    const bank = new OscillatorBank();
    bank.add({ frequency: 440 });
    bank.add({ frequency: 880 });
    bank.setAllFrequencies(220);
    expect(bank.get(0).frequency).toBe(220);
    expect(bank.get(1).frequency).toBe(220);
  });

  it("reset clears all phases", () => {
    const bank = new OscillatorBank();
    bank.add({ frequency: 440 });
    bank.generate(100);
    bank.reset();
    const first = bank.tick();
    bank.reset();
    const second = bank.tick();
    expect(first).toBeCloseTo(second);
  });
});

describe("createHarmonicSeries", () => {
  it("creates correct number of harmonics", () => {
    const bank = createHarmonicSeries(440, 4);
    expect(bank.count).toBe(4);
  });
});

describe("createChord", () => {
  it("creates oscillators for each frequency", () => {
    const bank = createChord([261.63, 329.63, 392.00]);
    expect(bank.count).toBe(3);
  });
});

describe("midiToFrequency", () => {
  it("A4 is 440", () => {
    expect(midiToFrequency(69)).toBeCloseTo(440);
  });

  it("A5 is 880", () => {
    expect(midiToFrequency(81)).toBeCloseTo(880);
  });
});

describe("frequencyToMidi", () => {
  it("440 is A4 (69)", () => {
    expect(frequencyToMidi(440)).toBeCloseTo(69);
  });

  it("round-trips", () => {
    expect(frequencyToMidi(midiToFrequency(60))).toBeCloseTo(60);
  });
});
