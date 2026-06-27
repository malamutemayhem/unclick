import { describe, it, expect } from "vitest";
import {
  holeCount, reedCount, blowNote, drawNote, bendAvailable,
  crossHarpPosition, frequency, reedGap, tuningCents,
  practiceMinutes, maintenanceInterval, costRange, harmonicaTypes,
} from "../harmonica-calc.js";

describe("holeCount", () => {
  it("diatonic has 10", () => {
    expect(holeCount("diatonic")).toBe(10);
  });
  it("chord has most", () => {
    expect(holeCount("chord")).toBeGreaterThan(holeCount("diatonic"));
  });
});

describe("reedCount", () => {
  it("diatonic has 20", () => {
    expect(reedCount("diatonic")).toBe(20);
  });
});

describe("blowNote", () => {
  it("hole 1 = C", () => {
    expect(blowNote(1, "C")).toBe("C");
  });
  it("invalid hole returns invalid", () => {
    expect(blowNote(0, "C")).toBe("invalid");
  });
});

describe("drawNote", () => {
  it("hole 1 = D", () => {
    expect(drawNote(1)).toBe("D");
  });
  it("hole 4 = D", () => {
    expect(drawNote(4)).toBe("D");
  });
});

describe("bendAvailable", () => {
  it("hole 1 draw has bends", () => {
    expect(bendAvailable(1, "draw")).toBeGreaterThan(0);
  });
  it("hole 8 blow has bends", () => {
    expect(bendAvailable(8, "blow")).toBe(1);
  });
});

describe("crossHarpPosition", () => {
  it("G song uses C harp", () => {
    expect(crossHarpPosition("G")).toBe("C");
  });
});

describe("frequency", () => {
  it("A4 = 440 Hz", () => {
    expect(frequency("A", 4)).toBe(440);
  });
  it("invalid note returns 0", () => {
    expect(frequency("X", 4)).toBe(0);
  });
});

describe("reedGap", () => {
  it("half of thickness", () => {
    expect(reedGap(0.5)).toBe(0.25);
  });
});

describe("tuningCents", () => {
  it("same frequency = 0 cents", () => {
    expect(tuningCents(440, 440)).toBe(0);
  });
  it("sharp is positive", () => {
    expect(tuningCents(445, 440)).toBeGreaterThan(0);
  });
});

describe("practiceMinutes", () => {
  it("advanced longest", () => {
    expect(practiceMinutes("advanced")).toBeGreaterThan(practiceMinutes("beginner"));
  });
});

describe("maintenanceInterval", () => {
  it("more play = more maintenance", () => {
    expect(maintenanceInterval(10)).toBeLessThan(maintenanceInterval(1));
  });
});

describe("costRange", () => {
  it("chord most expensive", () => {
    expect(costRange("chord").max).toBeGreaterThan(costRange("diatonic").max);
  });
});

describe("harmonicaTypes", () => {
  it("returns 6 types", () => {
    expect(harmonicaTypes()).toHaveLength(6);
  });
});
