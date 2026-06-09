import { describe, it, expect } from "vitest";
import {
  hardness, difficulty, blankSize, carvingTime, knifeAngle,
  sharpeningInterval, stopStrops, grainDirection, finishCoats,
  oilAmount, bandaidEstimate, projectIdeas, woodTypes,
} from "../whittling-calc.js";

describe("hardness", () => {
  it("walnut is hardest", () => {
    expect(hardness("walnut")).toBeGreaterThan(hardness("basswood"));
  });
  it("balsa is softest", () => {
    expect(hardness("balsa")).toBe(100);
  });
});

describe("difficulty", () => {
  it("balsa is very easy", () => {
    expect(difficulty("balsa")).toBe("very easy");
  });
  it("walnut is challenging", () => {
    expect(difficulty("walnut")).toBe("challenging");
  });
});

describe("blankSize", () => {
  it("30% larger than finished", () => {
    expect(blankSize(10)).toBe(13);
  });
});

describe("carvingTime", () => {
  it("harder wood takes longer", () => {
    expect(carvingTime(100, 1010)).toBeGreaterThan(carvingTime(100, 410));
  });
});

describe("knifeAngle", () => {
  it("detail knife has lowest angle", () => {
    expect(knifeAngle("detail")).toBeLessThanOrEqual(knifeAngle("chip"));
  });
});

describe("sharpeningInterval", () => {
  it("at least once per session", () => {
    expect(sharpeningInterval(30)).toBeGreaterThanOrEqual(1);
  });
});

describe("stopStrops", () => {
  it("positive count", () => {
    expect(stopStrops(3)).toBeGreaterThan(0);
  });
});

describe("grainDirection", () => {
  it("across grain is for rough", () => {
    expect(grainDirection(false)).toContain("rough");
  });
  it("with grain for smooth", () => {
    expect(grainDirection(true)).toContain("smoother");
  });
});

describe("finishCoats", () => {
  it("soft wood needs 3 coats", () => {
    expect(finishCoats("basswood")).toBe(3);
  });
  it("hard wood needs 2 coats", () => {
    expect(finishCoats("walnut")).toBe(2);
  });
});

describe("oilAmount", () => {
  it("positive ml", () => {
    expect(oilAmount(100)).toBeGreaterThan(0);
  });
});

describe("bandaidEstimate", () => {
  it("beginner needs most", () => {
    expect(bandaidEstimate("beginner")).toBeGreaterThan(bandaidEstimate("expert"));
  });
});

describe("projectIdeas", () => {
  it("more ideas at higher skill", () => {
    expect(projectIdeas(5).length).toBeGreaterThan(projectIdeas(1).length);
  });
});

describe("woodTypes", () => {
  it("returns 6 types", () => {
    expect(woodTypes()).toHaveLength(6);
  });
});
