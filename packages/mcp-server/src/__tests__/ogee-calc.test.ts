import { describe, it, expect } from "vitest";
import {
  profileDepthMm, curveRadiusMm, inflectionPointMm, moldingLengthM,
  miterAngle, cornerCount, paintVolumeMl, routerBitDiameterMm,
  cuttingSpeedMps, costPerMeter, ogeeApplications,
} from "../ogee-calc.js";

describe("profileDepthMm", () => {
  it("30% of height", () => {
    expect(profileDepthMm(100)).toBe(30);
  });
});

describe("curveRadiusMm", () => {
  it("45% of height", () => {
    expect(curveRadiusMm(100)).toBe(45);
  });
});

describe("inflectionPointMm", () => {
  it("50% of height", () => {
    expect(inflectionPointMm(100)).toBe(50);
  });
});

describe("moldingLengthM", () => {
  it("longer than perimeter", () => {
    expect(moldingLengthM(16, 10)).toBeGreaterThan(16);
  });
});

describe("miterAngle", () => {
  it("45 for 90-degree corner", () => {
    expect(miterAngle(90)).toBe(45);
  });
});

describe("cornerCount", () => {
  it("equals sides", () => {
    expect(cornerCount(4)).toBe(4);
  });
});

describe("paintVolumeMl", () => {
  it("positive ml", () => {
    expect(paintVolumeMl(16, 50, 2)).toBeGreaterThan(0);
  });
});

describe("routerBitDiameterMm", () => {
  it("2.2x depth", () => {
    expect(routerBitDiameterMm(30)).toBe(66);
  });
});

describe("cuttingSpeedMps", () => {
  it("softwood faster than stone", () => {
    expect(cuttingSpeedMps("softwood")).toBeGreaterThan(cuttingSpeedMps("stone"));
  });
});

describe("costPerMeter", () => {
  it("arch most expensive", () => {
    expect(costPerMeter("arch")).toBeGreaterThan(costPerMeter("baseboard"));
  });
});

describe("ogeeApplications", () => {
  it("returns 5 applications", () => {
    expect(ogeeApplications()).toHaveLength(5);
  });
});
