import { describe, it, expect } from "vitest";
import {
  defaultGauge, stitchesForWidth, rowsForHeight, fabricArea,
  yarnNeeded, yarnWeight, skeinsNeeded, castOnForCircular,
  decreaseEvenly, increaseEvenly, shortRowWrap, estimateTime,
  projectEstimate, needleSizeConvert, ribStitches, buttonSpacing,
  colorworkYarn, yarnWeights,
} from "../knitting-calc.js";

describe("defaultGauge", () => {
  it("worsted has 18 stitches per 10cm", () => {
    expect(defaultGauge("worsted").stitchesPer10cm).toBe(18);
  });

  it("lace has smallest needle", () => {
    expect(defaultGauge("lace").needleMm).toBeLessThan(defaultGauge("worsted").needleMm);
  });
});

describe("stitchesForWidth", () => {
  it("calculates from gauge", () => {
    const gauge = defaultGauge("worsted");
    expect(stitchesForWidth(50, gauge)).toBe(90);
  });
});

describe("rowsForHeight", () => {
  it("calculates from gauge", () => {
    const gauge = defaultGauge("worsted");
    expect(rowsForHeight(30, gauge)).toBe(72);
  });
});

describe("fabricArea", () => {
  it("positive area", () => {
    const gauge = defaultGauge("dk");
    expect(fabricArea(100, 100, gauge)).toBeGreaterThan(0);
  });
});

describe("yarnNeeded", () => {
  it("returns meters", () => {
    const gauge = defaultGauge("worsted");
    expect(yarnNeeded(90, 72, gauge)).toBeGreaterThan(0);
  });
});

describe("yarnWeight", () => {
  it("returns grams", () => {
    expect(yarnWeight(100, "worsted")).toBeGreaterThan(0);
  });
});

describe("skeinsNeeded", () => {
  it("rounds up", () => {
    expect(skeinsNeeded(250, 100)).toBe(3);
  });

  it("exact fit", () => {
    expect(skeinsNeeded(200, 100)).toBe(2);
  });
});

describe("castOnForCircular", () => {
  it("hat circumference", () => {
    const gauge = defaultGauge("worsted");
    expect(castOnForCircular(56, gauge)).toBeGreaterThan(90);
  });
});

describe("decreaseEvenly", () => {
  it("spacing between decreases", () => {
    expect(decreaseEvenly(100, 10)).toBe(10);
  });

  it("0 for no decreases", () => {
    expect(decreaseEvenly(100, 0)).toBe(0);
  });
});

describe("increaseEvenly", () => {
  it("spacing between increases", () => {
    expect(increaseEvenly(80, 8)).toBe(10);
  });
});

describe("shortRowWrap", () => {
  it("returns turning points", () => {
    const points = shortRowWrap(60, 3);
    expect(points).toHaveLength(3);
    expect(points[0]).toBeGreaterThan(points[1]);
  });
});

describe("estimateTime", () => {
  it("hours for stitch count", () => {
    expect(estimateTime(6000, 20)).toBe(5);
  });
});

describe("projectEstimate", () => {
  it("returns complete estimate", () => {
    const gauge = defaultGauge("worsted");
    const est = projectEstimate(50, 60, gauge);
    expect(est.stitches).toBeGreaterThan(0);
    expect(est.rows).toBeGreaterThan(0);
    expect(est.yarnMeters).toBeGreaterThan(0);
    expect(est.yarnGrams).toBeGreaterThan(0);
    expect(est.timeHours).toBeGreaterThan(0);
  });
});

describe("needleSizeConvert", () => {
  it("5.0mm = US 8", () => {
    expect(needleSizeConvert(5.0).us).toBe("8");
  });

  it("unknown size returns N/A", () => {
    expect(needleSizeConvert(7.0).us).toBe("N/A");
  });
});

describe("ribStitches", () => {
  it("divisible by rib repeat", () => {
    expect(ribStitches(100, [2, 2])).toBe(true);
  });

  it("not divisible", () => {
    expect(ribStitches(101, [2, 2])).toBe(false);
  });
});

describe("buttonSpacing", () => {
  it("evenly spaces buttons", () => {
    expect(buttonSpacing(40, 4)).toBe(8);
  });
});

describe("colorworkYarn", () => {
  it("more yarn for more colors", () => {
    const gauge = defaultGauge("dk");
    const single = yarnNeeded(100, 100, gauge);
    const multi = colorworkYarn(100, 100, 3, gauge);
    expect(multi).toBeGreaterThan(single);
  });
});

describe("yarnWeights", () => {
  it("returns 8 weights", () => {
    expect(yarnWeights()).toHaveLength(8);
    expect(yarnWeights()).toContain("worsted");
  });
});
