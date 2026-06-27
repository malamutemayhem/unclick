import { describe, it, expect } from "vitest";
import {
  dyeCompatibility, dyeAmount, waterAmount, auxiliaryAmount,
  dyeTemp, dyeTime, colorDepth, washFastness, lightFastness,
  overdyeResult, skeinPrep, costPerSkein, dyeTypes,
} from "../yarn-dye.js";

describe("dyeCompatibility", () => {
  it("wool works with acid dye", () => {
    expect(dyeCompatibility("wool")).toContain("acid");
  });

  it("polyester only works with disperse", () => {
    expect(dyeCompatibility("polyester")).toEqual(["disperse"]);
  });
});

describe("dyeAmount", () => {
  it("2% default", () => {
    expect(dyeAmount(100)).toBe(2);
  });
});

describe("waterAmount", () => {
  it("30:1 ratio", () => {
    expect(waterAmount(100)).toBe(3000);
  });
});

describe("auxiliaryAmount", () => {
  it("acid dye needs citric acid", () => {
    expect(auxiliaryAmount("acid", 100).name).toBe("citric acid");
  });
});

describe("dyeTemp", () => {
  it("fiber reactive is coolest", () => {
    expect(dyeTemp("fiber_reactive")).toBeLessThan(dyeTemp("acid"));
  });
});

describe("dyeTime", () => {
  it("positive minutes", () => {
    expect(dyeTime("acid")).toBeGreaterThan(0);
  });
});

describe("colorDepth", () => {
  it("pale at low DOS", () => {
    expect(colorDepth(0.3)).toBe("pale");
  });

  it("very dark at high DOS", () => {
    expect(colorDepth(5)).toBe("very dark");
  });
});

describe("washFastness", () => {
  it("fiber reactive is excellent", () => {
    expect(washFastness("fiber_reactive")).toBe("excellent");
  });
});

describe("lightFastness", () => {
  it("natural is poor", () => {
    expect(lightFastness("natural")).toBe("poor");
  });
});

describe("overdyeResult", () => {
  it("yellow + blue = green", () => {
    expect(overdyeResult("yellow", "blue")).toBe("green");
  });

  it("unknown combo returns custom", () => {
    expect(overdyeResult("orange", "pink")).toBe("custom");
  });
});

describe("skeinPrep", () => {
  it("30 minute soak", () => {
    expect(skeinPrep(100).soakMinutes).toBe(30);
  });
});

describe("costPerSkein", () => {
  it("positive cost", () => {
    expect(costPerSkein(2, 0.5, 10, 0.02)).toBeGreaterThan(0);
  });
});

describe("dyeTypes", () => {
  it("returns 5 types", () => {
    expect(dyeTypes()).toHaveLength(5);
  });
});
