import { describe, it, expect } from "vitest";
import {
  stringCount, operatorCount, buildHours, materialCost,
  mouthPlateSize, controlBarLength, stageWidth, stageHeight,
  screenOpacity, voiceProjection, showDuration, rehearsalHours,
  audienceCapacity, puppetTypes,
} from "../puppet-calc.js";

describe("stringCount", () => {
  it("marionette has 9 strings", () => {
    expect(stringCount("marionette")).toBe(9);
  });
  it("hand puppet has 0", () => {
    expect(stringCount("hand")).toBe(0);
  });
});

describe("operatorCount", () => {
  it("rod puppet needs 2", () => {
    expect(operatorCount("rod")).toBe(2);
  });
  it("hand puppet needs 1", () => {
    expect(operatorCount("hand")).toBe(1);
  });
});

describe("buildHours", () => {
  it("marionette takes longer than finger", () => {
    expect(buildHours("marionette", 1)).toBeGreaterThan(buildHours("finger", 1));
  });
  it("higher complexity = more time", () => {
    expect(buildHours("hand", 3)).toBeGreaterThan(buildHours("hand", 1));
  });
});

describe("materialCost", () => {
  it("positive cost", () => {
    expect(materialCost("fabric", 30)).toBeGreaterThan(0);
  });
  it("latex most expensive", () => {
    expect(materialCost("latex", 30)).toBeGreaterThan(materialCost("foam", 30));
  });
});

describe("mouthPlateSize", () => {
  it("70% of head width", () => {
    expect(mouthPlateSize(10)).toBe(7);
  });
});

describe("controlBarLength", () => {
  it("positive cm", () => {
    expect(controlBarLength(50)).toBeGreaterThan(0);
  });
});

describe("stageWidth", () => {
  it("wider for more puppets", () => {
    expect(stageWidth(3, 20)).toBeGreaterThan(stageWidth(1, 20));
  });
});

describe("stageHeight", () => {
  it("3x puppet height", () => {
    expect(stageHeight(30)).toBe(90);
  });
});

describe("screenOpacity", () => {
  it("shadow is translucent", () => {
    expect(screenOpacity("shadow")).toContain("translucent");
  });
  it("hand is opaque", () => {
    expect(screenOpacity("hand")).toContain("opaque");
  });
});

describe("voiceProjection", () => {
  it("close is conversational", () => {
    expect(voiceProjection(2)).toBe("conversational");
  });
  it("far needs amplification", () => {
    expect(voiceProjection(10)).toContain("amplified");
  });
});

describe("showDuration", () => {
  it("3 acts x 15 min = 45", () => {
    expect(showDuration(3)).toBe(45);
  });
});

describe("rehearsalHours", () => {
  it("positive hours", () => {
    expect(rehearsalHours(45, 3)).toBeGreaterThan(0);
  });
});

describe("audienceCapacity", () => {
  it("large > small", () => {
    expect(audienceCapacity("large")).toBeGreaterThan(audienceCapacity("small"));
  });
});

describe("puppetTypes", () => {
  it("returns 6 types", () => {
    expect(puppetTypes()).toHaveLength(6);
  });
});
