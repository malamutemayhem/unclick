import { describe, it, expect } from "vitest";
import {
  hookGape, threadSize, tailLength, bodyLength,
  hackleWraps, hackleSize, wingLength, headCementDrops,
  beadSize, tyingTime, materialCost, costPerFly,
  dozenTime, flyStyles,
} from "../fly-tying.js";

describe("hookGape", () => {
  it("bigger for bigger hooks", () => {
    expect(hookGape(2)).toBeGreaterThan(hookGape(16));
  });
});

describe("threadSize", () => {
  it("finer for small hooks", () => {
    expect(threadSize(20)).toBe("16/0");
  });
});

describe("tailLength", () => {
  it("streamer longest", () => {
    expect(tailLength(4, "streamer")).toBeGreaterThan(tailLength(4, "dry"));
  });

  it("terrestrial has no tail", () => {
    expect(tailLength(4, "terrestrial")).toBe(0);
  });
});

describe("bodyLength", () => {
  it("70% of shank", () => {
    expect(bodyLength(10)).toBe(7);
  });
});

describe("hackleWraps", () => {
  it("dry fly has most", () => {
    expect(hackleWraps("dry")).toBeGreaterThan(hackleWraps("wet"));
  });
});

describe("hackleSize", () => {
  it("matches hook size", () => {
    expect(hackleSize(12)).toBe(12);
  });
});

describe("wingLength", () => {
  it("0 for nymph", () => {
    expect(wingLength(4, "nymph")).toBe(0);
  });
});

describe("headCementDrops", () => {
  it("2 drops", () => {
    expect(headCementDrops()).toBe(2);
  });
});

describe("beadSize", () => {
  it("smaller for smaller hooks", () => {
    expect(beadSize(18)).toBeLessThan(beadSize(6));
  });
});

describe("tyingTime", () => {
  it("streamer takes longest", () => {
    expect(tyingTime("streamer")).toBeGreaterThan(tyingTime("nymph"));
  });
});

describe("materialCost", () => {
  it("sums costs", () => {
    expect(materialCost(0.1, 0.05, 0.5)).toBe(0.65);
  });
});

describe("costPerFly", () => {
  it("divides by count", () => {
    expect(costPerFly(6, 12)).toBe(0.5);
  });
});

describe("dozenTime", () => {
  it("12x single", () => {
    expect(dozenTime("dry")).toBe(96);
  });
});

describe("flyStyles", () => {
  it("returns 6 styles", () => {
    expect(flyStyles()).toHaveLength(6);
  });
});
