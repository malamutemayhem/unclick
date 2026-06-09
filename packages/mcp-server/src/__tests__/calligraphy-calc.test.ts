import { describe, it, expect } from "vitest";
import {
  scriptSpec, xHeight, ascenderHeight, descenderDepth,
  totalLineHeight, lineSpacing, linesPerPage, charsPerLine,
  guidelineSpacing, inkUsageMl, practicePages, nibRecommendation,
  envelopeAddresses, slantAngle, scripts,
} from "../calligraphy-calc.js";

describe("scriptSpec", () => {
  it("italic at 45 degrees", () => {
    expect(scriptSpec("italic").penAngleDeg).toBe(45);
  });
});

describe("xHeight", () => {
  it("nib width x nib widths", () => {
    expect(xHeight(2, 5)).toBe(10);
  });
});

describe("ascenderHeight", () => {
  it("positive height", () => {
    expect(ascenderHeight(2, 4)).toBe(8);
  });
});

describe("descenderDepth", () => {
  it("positive depth", () => {
    expect(descenderDepth(2, 4)).toBe(8);
  });
});

describe("totalLineHeight", () => {
  it("sum of x + ascender + descender", () => {
    const spec = scriptSpec("italic");
    expect(totalLineHeight(spec)).toBe(spec.nibWidthMm * (spec.xHeightNibs + spec.ascenderNibs + spec.descenderNibs));
  });
});

describe("lineSpacing", () => {
  it("multiplied total height", () => {
    expect(lineSpacing(26, 1.5)).toBe(39);
  });
});

describe("linesPerPage", () => {
  it("reasonable count for A4", () => {
    expect(linesPerPage(297, 39)).toBeGreaterThan(4);
  });
});

describe("charsPerLine", () => {
  it("depends on width and char size", () => {
    expect(charsPerLine(210, 5)).toBeGreaterThan(20);
  });
});

describe("guidelineSpacing", () => {
  it("descender is negative", () => {
    const spec = scriptSpec("italic");
    const guide = guidelineSpacing(spec);
    expect(guide.descender).toBeLessThan(0);
  });

  it("baseline is 0", () => {
    expect(guidelineSpacing(scriptSpec("roman")).baseline).toBe(0);
  });
});

describe("inkUsageMl", () => {
  it("positive usage", () => {
    expect(inkUsageMl(500)).toBeGreaterThan(0);
  });
});

describe("practicePages", () => {
  it("copperplate needs most practice", () => {
    expect(practicePages("copperplate")).toBeGreaterThan(practicePages("italic"));
  });
});

describe("nibRecommendation", () => {
  it("broad for italic", () => {
    expect(nibRecommendation("italic")).toBe("broad");
  });

  it("pointed for copperplate", () => {
    expect(nibRecommendation("copperplate")).toBe("pointed");
  });
});

describe("envelopeAddresses", () => {
  it("positive hours", () => {
    expect(envelopeAddresses(100)).toBeGreaterThan(0);
  });
});

describe("slantAngle", () => {
  it("copperplate most slanted", () => {
    expect(slantAngle("copperplate")).toBeGreaterThan(slantAngle("italic"));
  });

  it("uncial is upright", () => {
    expect(slantAngle("uncial")).toBe(0);
  });
});

describe("scripts", () => {
  it("returns 6 scripts", () => {
    expect(scripts()).toHaveLength(6);
    expect(scripts()).toContain("italic");
  });
});
