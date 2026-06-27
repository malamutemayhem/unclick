import { describe, it, expect } from "vitest";
import {
  seatCount, seatWidthCm, seatHeightCm, canopyHeightCm,
  recessDepthCm, archHeightCm, shaftDiameterCm, carvingHours,
  paintLayers, restorationCost, sediliaStyles,
} from "../sedilia-calc.js";

describe("seatCount", () => {
  it("always 3", () => {
    expect(seatCount()).toBe(3);
  });
});

describe("seatWidthCm", () => {
  it("third of recess", () => {
    expect(seatWidthCm(180)).toBe(60);
  });
});

describe("seatHeightCm", () => {
  it("increases with step", () => {
    expect(seatHeightCm(2, 40)).toBeGreaterThan(seatHeightCm(1, 40));
  });
});

describe("canopyHeightCm", () => {
  it("2.5x seat height", () => {
    expect(canopyHeightCm(50)).toBe(125);
  });
});

describe("recessDepthCm", () => {
  it("60% of wall", () => {
    expect(recessDepthCm(80)).toBe(48);
  });
});

describe("archHeightCm", () => {
  it("ogee taller than plain", () => {
    expect(archHeightCm(125, "ogee")).toBeGreaterThan(archHeightCm(125, "plain"));
  });
});

describe("shaftDiameterCm", () => {
  it("positive diameter", () => {
    expect(shaftDiameterCm(125)).toBeGreaterThan(0);
  });
});

describe("carvingHours", () => {
  it("cinquefoil longest", () => {
    expect(carvingHours("cinquefoil")).toBeGreaterThan(carvingHours("plain"));
  });
});

describe("paintLayers", () => {
  it("polychrome more layers", () => {
    expect(paintLayers(true)).toBeGreaterThan(paintLayers(false));
  });
});

describe("restorationCost", () => {
  it("cinquefoil most expensive", () => {
    expect(restorationCost("cinquefoil", 500)).toBeGreaterThan(restorationCost("plain", 500));
  });
});

describe("sediliaStyles", () => {
  it("returns 5 styles", () => {
    expect(sediliaStyles()).toHaveLength(5);
  });
});
