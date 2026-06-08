import { describe, it, expect } from "vitest";
import { formatNumber, formatBytes, formatPercent, formatOrdinal, formatCompact, padNumber, clamp, lerp, inverseLerp, remap } from "../format-number.js";

describe("formatNumber", () => {
  it("formats with thousands separator", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  it("formats with decimals", () => {
    expect(formatNumber(1234.5, { decimals: 2 })).toBe("1,234.50");
  });

  it("custom separators", () => {
    expect(formatNumber(1234.56, { decimals: 2, thousandsSep: ".", decimalSep: "," })).toBe("1.234,56");
  });
});

describe("formatBytes", () => {
  it("formats bytes", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1048576)).toBe("1 MB");
    expect(formatBytes(1073741824)).toBe("1 GB");
  });

  it("formats with decimals", () => {
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
  });
});

describe("formatPercent", () => {
  it("formats percentage", () => {
    expect(formatPercent(0.75)).toBe("75.0%");
    expect(formatPercent(0.333, 0)).toBe("33%");
  });
});

describe("formatOrdinal", () => {
  it("formats ordinals", () => {
    expect(formatOrdinal(1)).toBe("1st");
    expect(formatOrdinal(2)).toBe("2nd");
    expect(formatOrdinal(3)).toBe("3rd");
    expect(formatOrdinal(4)).toBe("4th");
    expect(formatOrdinal(11)).toBe("11th");
    expect(formatOrdinal(21)).toBe("21st");
  });
});

describe("formatCompact", () => {
  it("formats large numbers", () => {
    expect(formatCompact(1500)).toBe("1.5K");
    expect(formatCompact(2500000)).toBe("2.5M");
    expect(formatCompact(3000000000)).toBe("3B");
  });

  it("keeps small numbers as-is", () => {
    expect(formatCompact(42)).toBe("42");
  });
});

describe("padNumber", () => {
  it("pads with zeros", () => {
    expect(padNumber(5, 3)).toBe("005");
    expect(padNumber(42, 2)).toBe("42");
  });

  it("handles negatives", () => {
    expect(padNumber(-5, 3)).toBe("-005");
  });
});

describe("math helpers", () => {
  it("clamp", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("lerp", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, 0)).toBe(0);
    expect(lerp(0, 10, 1)).toBe(10);
  });

  it("inverseLerp", () => {
    expect(inverseLerp(0, 10, 5)).toBe(0.5);
  });

  it("remap", () => {
    expect(remap(5, 0, 10, 0, 100)).toBe(50);
  });
});
