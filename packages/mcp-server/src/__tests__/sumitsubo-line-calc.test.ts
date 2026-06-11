import { describe, it, expect } from "vitest";
import {
  lineAccuracy, markVisible, speedSnap, lineLength,
  lineCost, digital, traditional, inkMethod,
  bestUse, sumitsuboLines,
} from "../sumitsubo-line-calc.js";

describe("lineAccuracy", () => {
  it("laser line digital most accurate line", () => {
    expect(lineAccuracy("laser_line_digital")).toBeGreaterThan(lineAccuracy("string_ink_simple"));
  });
});

describe("markVisible", () => {
  it("chalk line modern most visible mark", () => {
    expect(markVisible("chalk_line_modern")).toBeGreaterThan(markVisible("laser_line_digital"));
  });
});

describe("speedSnap", () => {
  it("chalk line modern fastest snap", () => {
    expect(speedSnap("chalk_line_modern")).toBeGreaterThan(speedSnap("string_ink_simple"));
  });
});

describe("lineLength", () => {
  it("laser line digital longest line", () => {
    expect(lineLength("laser_line_digital")).toBeGreaterThan(lineLength("string_ink_simple"));
  });
});

describe("lineCost", () => {
  it("laser line digital most expensive", () => {
    expect(lineCost("laser_line_digital")).toBeGreaterThan(lineCost("string_ink_simple"));
  });
});

describe("digital", () => {
  it("laser line digital is digital", () => {
    expect(digital("laser_line_digital")).toBe(true);
  });
  it("traditional ink pot not digital", () => {
    expect(digital("traditional_ink_pot")).toBe(false);
  });
});

describe("traditional", () => {
  it("traditional ink pot is traditional", () => {
    expect(traditional("traditional_ink_pot")).toBe(true);
  });
  it("chalk line modern not traditional", () => {
    expect(traditional("chalk_line_modern")).toBe(false);
  });
});

describe("inkMethod", () => {
  it("chalk line modern uses chalk powder fill", () => {
    expect(inkMethod("chalk_line_modern")).toBe("chalk_powder_fill");
  });
});

describe("bestUse", () => {
  it("traditional ink pot best for traditional timber mark", () => {
    expect(bestUse("traditional_ink_pot")).toBe("traditional_timber_mark");
  });
});

describe("sumitsuboLines", () => {
  it("returns 5 types", () => {
    expect(sumitsuboLines()).toHaveLength(5);
  });
});
