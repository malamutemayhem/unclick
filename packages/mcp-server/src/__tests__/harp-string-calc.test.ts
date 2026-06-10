import { describe, it, expect } from "vitest";
import {
  stringCount, octaveRange, heightCm,
  weightKg, portability, chromaticCapable,
  sustainCharacter, bestGenre, costEstimate, harpSizes,
} from "../harp-string-calc.js";

describe("stringCount", () => {
  it("pedal harp has most strings", () => {
    expect(stringCount("pedal")).toBeGreaterThan(
      stringCount("lap")
    );
  });
});

describe("octaveRange", () => {
  it("pedal has widest range", () => {
    expect(octaveRange("pedal")).toBeGreaterThan(
      octaveRange("lap")
    );
  });
});

describe("heightCm", () => {
  it("pedal is tallest", () => {
    expect(heightCm("pedal")).toBeGreaterThan(
      heightCm("lap")
    );
  });
});

describe("weightKg", () => {
  it("pedal is heaviest", () => {
    expect(weightKg("pedal")).toBeGreaterThan(
      weightKg("lap")
    );
  });
});

describe("portability", () => {
  it("lap harp is most portable", () => {
    expect(portability("lap")).toBeGreaterThan(
      portability("pedal")
    );
  });
});

describe("chromaticCapable", () => {
  it("pedal is chromatic", () => {
    expect(chromaticCapable("pedal")).toBe(true);
  });
  it("lap is not", () => {
    expect(chromaticCapable("lap")).toBe(false);
  });
});

describe("sustainCharacter", () => {
  it("wire strung sustains longest", () => {
    expect(sustainCharacter("wire_strung")).toBeGreaterThan(
      sustainCharacter("lap")
    );
  });
});

describe("bestGenre", () => {
  it("pedal is best for orchestral", () => {
    expect(bestGenre("pedal")).toBe("orchestral");
  });
});

describe("costEstimate", () => {
  it("pedal costs most", () => {
    expect(costEstimate("pedal")).toBeGreaterThan(
      costEstimate("lap")
    );
  });
});

describe("harpSizes", () => {
  it("returns 5 sizes", () => {
    expect(harpSizes()).toHaveLength(5);
  });
});
