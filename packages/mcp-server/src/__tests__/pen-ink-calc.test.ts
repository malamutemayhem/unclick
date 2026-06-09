import { describe, it, expect } from "vitest";
import {
  penDefaults, inkUsagePerPage, pagesPerFill, writingDistance,
  dryingTime, inkCost, nibSize, convertNibWesternToJapanese,
  convertNibJapaneseToWestern, inkMixRatio, inkDilution,
  cartridgeVolume, converterCapacity, sheenAngle, featheringRisk,
  bleedThroughRisk, penTypes, inkColors,
} from "../pen-ink-calc.js";

describe("penDefaults", () => {
  it("fountain pen has ink capacity", () => {
    expect(penDefaults("fountain").inkCapacityMl).toBeGreaterThan(0);
  });

  it("brush has widest line", () => {
    expect(penDefaults("brush").lineWidthMm).toBeGreaterThan(penDefaults("ballpoint").lineWidthMm);
  });
});

describe("inkUsagePerPage", () => {
  it("positive usage", () => {
    expect(inkUsagePerPage(30, 80, 0.4)).toBeGreaterThan(0);
  });
});

describe("pagesPerFill", () => {
  it("more pages with more ink", () => {
    expect(pagesPerFill(1.0, 0.01)).toBeGreaterThan(pagesPerFill(0.5, 0.01));
  });

  it("infinity for zero usage", () => {
    expect(pagesPerFill(1.0, 0)).toBe(Infinity);
  });
});

describe("writingDistance", () => {
  it("positive meters", () => {
    expect(writingDistance(0.5, 0.3)).toBeGreaterThan(0);
  });
});

describe("dryingTime", () => {
  it("dye dries fastest", () => {
    expect(dryingTime("dye")).toBeLessThan(dryingTime("iron_gall"));
  });
});

describe("inkCost", () => {
  it("scales with pages", () => {
    expect(inkCost(30, 15, 0.01, 100)).toBeGreaterThan(0);
  });
});

describe("nibSize", () => {
  it("F = 0.5mm", () => {
    expect(nibSize("F")).toBe(0.5);
  });

  it("B > F", () => {
    expect(nibSize("B")).toBeGreaterThan(nibSize("F"));
  });
});

describe("convertNibWesternToJapanese", () => {
  it("Japanese nib is smaller", () => {
    expect(convertNibWesternToJapanese(0.7)).toBeLessThan(0.7);
  });
});

describe("convertNibJapaneseToWestern", () => {
  it("Western nib is larger", () => {
    expect(convertNibJapaneseToWestern(0.5)).toBeGreaterThan(0.5);
  });

  it("round trips", () => {
    const western = 0.7;
    const japanese = convertNibWesternToJapanese(western);
    expect(convertNibJapaneseToWestern(japanese)).toBeCloseTo(western, 1);
  });
});

describe("inkMixRatio", () => {
  it("percentages sum to 100", () => {
    const ratios = inkMixRatio([3, 1, 1]);
    const sum = ratios.reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(100, 0);
  });

  it("zero parts return zeros", () => {
    expect(inkMixRatio([0, 0])).toEqual([0, 0]);
  });
});

describe("inkDilution", () => {
  it("50% with equal parts", () => {
    expect(inkDilution(5, 5)).toBe(50);
  });

  it("0 for no liquid", () => {
    expect(inkDilution(0, 0)).toBe(0);
  });
});

describe("cartridgeVolume", () => {
  it("standard international = 0.75ml", () => {
    expect(cartridgeVolume("standard_international")).toBe(0.75);
  });
});

describe("converterCapacity", () => {
  it("vacuum holds most", () => {
    expect(converterCapacity("vacuum")).toBeGreaterThan(converterCapacity("piston"));
  });
});

describe("sheenAngle", () => {
  it("positive for valid thickness", () => {
    expect(sheenAngle(0.1)).toBeGreaterThan(0);
  });

  it("0 for no thickness", () => {
    expect(sheenAngle(0)).toBe(0);
  });
});

describe("featheringRisk", () => {
  it("low on thick paper", () => {
    expect(featheringRisk(120, 0.3)).toBe("low");
  });

  it("high on thin paper with broad nib", () => {
    expect(featheringRisk(50, 1.5)).toBe("high");
  });
});

describe("bleedThroughRisk", () => {
  it("low on heavy paper with dry ink", () => {
    expect(bleedThroughRisk(120, "dry")).toBe("low");
  });

  it("higher with wet ink", () => {
    const dry = bleedThroughRisk(80, "dry");
    const wet = bleedThroughRisk(80, "wet");
    const riskOrder = ["low", "moderate", "high"];
    expect(riskOrder.indexOf(wet)).toBeGreaterThanOrEqual(riskOrder.indexOf(dry));
  });
});

describe("penTypes", () => {
  it("returns 6 types", () => {
    expect(penTypes()).toHaveLength(6);
    expect(penTypes()).toContain("fountain");
  });
});

describe("inkColors", () => {
  it("returns 6 colors", () => {
    expect(inkColors()).toHaveLength(6);
    expect(inkColors()).toContain("black");
  });
});
