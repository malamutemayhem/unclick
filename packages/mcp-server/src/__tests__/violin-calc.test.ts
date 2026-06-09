import { describe, it, expect } from "vitest";
import {
  sizeByArmLength, dimensions, stringFrequency, stringTension,
  vibratoRate, fingerPosition, bowWeight, rosinFrequency,
  stringLifeWeeks, practiceMinutes, bridgeHeight, soundpostPosition,
  tuningDifference, violinSizes,
} from "../violin-calc.js";

describe("sizeByArmLength", () => {
  it("full size for adult arm", () => {
    expect(sizeByArmLength(65)).toBe("4/4");
  });

  it("smallest for tiny arm", () => {
    expect(sizeByArmLength(30)).toBe("1/16");
  });
});

describe("dimensions", () => {
  it("4/4 body is 356mm", () => {
    expect(dimensions("4/4").bodyLength).toBe(356);
  });
});

describe("stringFrequency", () => {
  it("A = 440Hz", () => {
    expect(stringFrequency("A")).toBe(440);
  });

  it("G is lowest", () => {
    expect(stringFrequency("G")).toBeLessThan(stringFrequency("E"));
  });
});

describe("stringTension", () => {
  it("positive tension", () => {
    expect(stringTension(440, 330, 1)).toBeGreaterThan(0);
  });
});

describe("vibratoRate", () => {
  it("4-7 Hz", () => {
    expect(vibratoRate().minHz).toBe(4);
    expect(vibratoRate().maxHz).toBe(7);
  });
});

describe("fingerPosition", () => {
  it("positive distance", () => {
    expect(fingerPosition(330, 2)).toBeGreaterThan(0);
  });

  it("higher notes closer to bridge", () => {
    expect(fingerPosition(330, 7)).toBeGreaterThan(fingerPosition(330, 2));
  });
});

describe("bowWeight", () => {
  it("full size heaviest", () => {
    expect(bowWeight("4/4")).toBeGreaterThan(bowWeight("1/2"));
  });
});

describe("rosinFrequency", () => {
  it("more for more playing", () => {
    expect(rosinFrequency(20)).toBeGreaterThan(rosinFrequency(4));
  });
});

describe("stringLifeWeeks", () => {
  it("shorter for heavy practice", () => {
    expect(stringLifeWeeks(20)).toBeLessThan(stringLifeWeeks(3));
  });
});

describe("practiceMinutes", () => {
  it("professional practices most", () => {
    expect(practiceMinutes("professional")).toBeGreaterThan(practiceMinutes("beginner"));
  });
});

describe("bridgeHeight", () => {
  it("taller for larger violin", () => {
    expect(bridgeHeight("4/4")).toBeGreaterThan(bridgeHeight("1/4"));
  });
});

describe("soundpostPosition", () => {
  it("about 27% of body length", () => {
    expect(soundpostPosition(356)).toBeCloseTo(96, 0);
  });
});

describe("tuningDifference", () => {
  it("0 when in tune", () => {
    expect(tuningDifference(440, 440)).toBe(0);
  });

  it("positive when sharp", () => {
    expect(tuningDifference(445, 440)).toBeGreaterThan(0);
  });
});

describe("violinSizes", () => {
  it("returns 7 sizes", () => {
    expect(violinSizes()).toHaveLength(7);
  });
});
