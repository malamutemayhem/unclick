import { describe, it, expect } from "vitest";
import {
  brickSizeCm, dryingDays, strawPercent, compressiveStrengthMpa,
  bricksPerM2Wall, waterResistance, insulationRValue, weightPerBrickKg,
  costPerBrick, adobeMixes,
} from "../adobe-brick-calc.js";

describe("brickSizeCm", () => {
  it("traditional is longest", () => {
    expect(brickSizeCm("traditional").l).toBeGreaterThan(
      brickSizeCm("compressed").l
    );
  });
});

describe("dryingDays", () => {
  it("straw rich takes longest", () => {
    expect(dryingDays("straw_rich")).toBeGreaterThan(dryingDays("compressed"));
  });
});

describe("strawPercent", () => {
  it("straw rich has most straw", () => {
    expect(strawPercent("straw_rich")).toBeGreaterThan(
      strawPercent("traditional")
    );
  });
  it("compressed has no straw", () => {
    expect(strawPercent("compressed")).toBe(0);
  });
});

describe("compressiveStrengthMpa", () => {
  it("compressed is strongest", () => {
    expect(compressiveStrengthMpa("compressed")).toBeGreaterThan(
      compressiveStrengthMpa("straw_rich")
    );
  });
});

describe("bricksPerM2Wall", () => {
  it("returns 12", () => {
    expect(bricksPerM2Wall()).toBe(12);
  });
});

describe("waterResistance", () => {
  it("stabilized has best water resistance", () => {
    expect(waterResistance("stabilized")).toBeGreaterThan(
      waterResistance("traditional")
    );
  });
});

describe("insulationRValue", () => {
  it("straw rich insulates best", () => {
    expect(insulationRValue("straw_rich")).toBeGreaterThan(
      insulationRValue("compressed")
    );
  });
});

describe("weightPerBrickKg", () => {
  it("compressed is heaviest", () => {
    expect(weightPerBrickKg("compressed")).toBeGreaterThan(
      weightPerBrickKg("straw_rich")
    );
  });
});

describe("costPerBrick", () => {
  it("compressed is most expensive", () => {
    expect(costPerBrick("compressed")).toBeGreaterThan(
      costPerBrick("straw_rich")
    );
  });
});

describe("adobeMixes", () => {
  it("returns 5 mixes", () => {
    expect(adobeMixes()).toHaveLength(5);
  });
});
