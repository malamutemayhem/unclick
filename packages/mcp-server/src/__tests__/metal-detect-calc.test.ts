import { describe, it, expect } from "vitest";
import {
  conductivity, detectionDepth, sweepWidth, coverageRate,
  targetId, batteryLife, frequencyForTarget, groundBalance,
  discrimination, pinpointRadius, digDepth, findRate,
  recoverySpeed, detectorTypes, targetMetals,
} from "../metal-detect-calc.js";

describe("conductivity", () => {
  it("silver highest", () => {
    expect(conductivity("silver")).toBeGreaterThan(conductivity("gold"));
  });
});

describe("detectionDepth", () => {
  it("bigger coil = deeper", () => {
    expect(detectionDepth(11, 1)).toBeGreaterThan(detectionDepth(7, 1));
  });
});

describe("sweepWidth", () => {
  it("less than coil diameter", () => {
    expect(sweepWidth(11)).toBeLessThan(11);
  });
});

describe("coverageRate", () => {
  it("positive acres/hr", () => {
    expect(coverageRate(8, 2)).toBeGreaterThan(0);
  });
});

describe("targetId", () => {
  it("high for silver", () => {
    expect(targetId(63)).toContain("high");
  });

  it("low for iron", () => {
    expect(targetId(10)).toContain("low");
  });
});

describe("batteryLife", () => {
  it("positive hours", () => {
    expect(batteryLife(2000, 300)).toBeGreaterThan(0);
  });
});

describe("frequencyForTarget", () => {
  it("gold uses high freq", () => {
    expect(frequencyForTarget("gold")).toBeGreaterThan(frequencyForTarget("silver"));
  });
});

describe("groundBalance", () => {
  it("higher for mineralized", () => {
    expect(groundBalance("high")).toBeGreaterThan(groundBalance("low"));
  });
});

describe("discrimination", () => {
  it("accepts high conductivity", () => {
    expect(discrimination(30, 63)).toBe(true);
  });

  it("rejects low conductivity", () => {
    expect(discrimination(30, 10)).toBe(false);
  });
});

describe("pinpointRadius", () => {
  it("fraction of coil", () => {
    expect(pinpointRadius(11)).toBeLessThan(11);
  });
});

describe("digDepth", () => {
  it("deeper with stronger signal", () => {
    expect(digDepth(90, 11)).toBeGreaterThan(digDepth(50, 11));
  });
});

describe("findRate", () => {
  it("items per hour", () => {
    expect(findRate(4, 12)).toBe(3);
  });

  it("0 for no hours", () => {
    expect(findRate(0, 0)).toBe(0);
  });
});

describe("recoverySpeed", () => {
  it("vlf is fast", () => {
    expect(recoverySpeed("vlf")).toBe("fast");
  });
});

describe("detectorTypes", () => {
  it("returns 4 types", () => {
    expect(detectorTypes()).toHaveLength(4);
  });
});

describe("targetMetals", () => {
  it("returns 6 metals", () => {
    expect(targetMetals()).toHaveLength(6);
  });
});
