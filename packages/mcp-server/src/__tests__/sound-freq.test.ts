import { describe, it, expect } from "vitest";
import {
  noteFrequency, frequencyToNote, interval, intervalName,
  harmonicSeries, beatFrequency, wavelength, speedOfSound,
  dopplerShift, decibelAdd, decibelFromRatio, ratioFromDecibel,
  distanceAttenuation, reverberationTime, hearingRange,
  frequencyBand, equalTemperament, justIntonation, schroederFrequency,
} from "../sound-freq.js";

describe("noteFrequency", () => {
  it("A4 = 440", () => {
    expect(noteFrequency("A", 4)).toBe(440);
  });

  it("A5 = 880", () => {
    expect(noteFrequency("A", 5)).toBe(880);
  });

  it("custom tuning", () => {
    expect(noteFrequency("A", 4, 432)).toBe(432);
  });
});

describe("frequencyToNote", () => {
  it("440 = A4", () => {
    const r = frequencyToNote(440);
    expect(r.note).toBe("A");
    expect(r.octave).toBe(4);
    expect(r.cents).toBe(0);
  });
});

describe("interval", () => {
  it("octave = 12 semitones", () => {
    expect(interval(220, 440)).toBeCloseTo(12, 0);
  });
});

describe("intervalName", () => {
  it("0 = unison", () => {
    expect(intervalName(0)).toBe("unison");
  });

  it("7 = perfect 5th", () => {
    expect(intervalName(7)).toBe("perfect 5th");
  });
});

describe("harmonicSeries", () => {
  it("first harmonic = fundamental", () => {
    const h = harmonicSeries(100, 5);
    expect(h[0]).toBe(100);
    expect(h).toHaveLength(5);
  });

  it("second harmonic = 2x", () => {
    expect(harmonicSeries(100, 2)[1]).toBe(200);
  });
});

describe("beatFrequency", () => {
  it("difference of two frequencies", () => {
    expect(beatFrequency(440, 442)).toBe(2);
  });
});

describe("wavelength", () => {
  it("positive for audible freq", () => {
    expect(wavelength(440)).toBeGreaterThan(0);
  });

  it("infinity at 0 Hz", () => {
    expect(wavelength(0)).toBe(Infinity);
  });
});

describe("speedOfSound", () => {
  it("about 343 m/s at 20C", () => {
    expect(speedOfSound(20)).toBeCloseTo(343, 0);
  });
});

describe("dopplerShift", () => {
  it("higher when approaching", () => {
    expect(dopplerShift(440, 30)).toBeGreaterThan(440);
  });
});

describe("decibelAdd", () => {
  it("same dB + same dB = +3 dB", () => {
    expect(decibelAdd(60, 60)).toBeCloseTo(63, 0);
  });
});

describe("decibelFromRatio", () => {
  it("ratio 10 = 10 dB", () => {
    expect(decibelFromRatio(10)).toBe(10);
  });
});

describe("ratioFromDecibel", () => {
  it("10 dB = ratio 10", () => {
    expect(ratioFromDecibel(10)).toBeCloseTo(10, 0);
  });
});

describe("distanceAttenuation", () => {
  it("0 at reference distance", () => {
    expect(distanceAttenuation(1, 1)).toBe(0);
  });

  it("negative at greater distance", () => {
    expect(distanceAttenuation(10, 1)).toBeLessThan(0);
  });
});

describe("reverberationTime", () => {
  it("positive for valid room", () => {
    expect(reverberationTime(200, 50)).toBeGreaterThan(0);
  });

  it("infinity for zero absorption", () => {
    expect(reverberationTime(200, 0)).toBe(Infinity);
  });
});

describe("hearingRange", () => {
  it("20 Hz to 20 kHz", () => {
    expect(hearingRange().minHz).toBe(20);
    expect(hearingRange().maxHz).toBe(20000);
  });
});

describe("frequencyBand", () => {
  it("bass for low freq", () => {
    expect(frequencyBand(100)).toBe("bass");
  });

  it("ultrasonic above 20kHz", () => {
    expect(frequencyBand(25000)).toBe("ultrasonic");
  });
});

describe("equalTemperament", () => {
  it("12 steps up = octave", () => {
    expect(equalTemperament(440, 12)).toBeCloseTo(880, 0);
  });
});

describe("justIntonation", () => {
  it("perfect fifth = 3/2", () => {
    expect(justIntonation(440, [3, 2])).toBeCloseTo(660, 0);
  });
});

describe("schroederFrequency", () => {
  it("positive for valid room", () => {
    expect(schroederFrequency(1.5, 200)).toBeGreaterThan(0);
  });
});
