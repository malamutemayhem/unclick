import { describe, it, expect } from "vitest";
import {
  paintCoverage, thinningRatio, dryingTime, layersNeeded,
  brushForArea, modelSurface, primerAmount, varnishCoats,
  wetPaletteDuration, paintPotLife, assemblyTime, paintTime,
  colorSchemeCount, batchSize, paintTypes,
} from "../miniature-paint.js";

describe("paintCoverage", () => {
  it("scales with models", () => {
    expect(paintCoverage(0.5, 10)).toBe(5);
  });
});

describe("thinningRatio", () => {
  it("contrast is ready to use", () => {
    expect(thinningRatio("contrast")).toContain("ready");
  });
});

describe("dryingTime", () => {
  it("oil slowest", () => {
    expect(dryingTime("oil")).toBeGreaterThan(dryingTime("acrylic"));
  });
});

describe("layersNeeded", () => {
  it("more on black base", () => {
    expect(layersNeeded("acrylic", "black")).toBeGreaterThan(layersNeeded("acrylic", "white"));
  });
});

describe("brushForArea", () => {
  it("tiny area = tiny brush", () => {
    expect(brushForArea(1)).toBe("000");
  });

  it("large area = large brush", () => {
    expect(brushForArea(150)).toBe("3");
  });
});

describe("modelSurface", () => {
  it("larger scale = more surface", () => {
    expect(modelSurface(54)).toBeGreaterThan(modelSurface(28));
  });
});

describe("primerAmount", () => {
  it("positive ml", () => {
    expect(primerAmount(50)).toBeGreaterThan(0);
  });
});

describe("varnishCoats", () => {
  it("matte needs 1", () => {
    expect(varnishCoats("matte")).toBe(1);
  });
});

describe("wetPaletteDuration", () => {
  it("48 hours", () => {
    expect(wetPaletteDuration()).toBe(48);
  });
});

describe("paintPotLife", () => {
  it("positive weeks", () => {
    expect(paintPotLife(17, 3, 0.5)).toBeGreaterThan(0);
  });

  it("infinite with no usage", () => {
    expect(paintPotLife(17, 0, 0.5)).toBe(Infinity);
  });
});

describe("assemblyTime", () => {
  it("3 min per part", () => {
    expect(assemblyTime(10)).toBe(30);
  });
});

describe("paintTime", () => {
  it("competition takes longest", () => {
    expect(paintTime(50, "competition")).toBeGreaterThan(paintTime(50, "tabletop"));
  });
});

describe("colorSchemeCount", () => {
  it("sums colors", () => {
    expect(colorSchemeCount(3, 2)).toBe(5);
  });
});

describe("batchSize", () => {
  it("positive count", () => {
    expect(batchSize(10, 45)).toBeGreaterThan(0);
  });
});

describe("paintTypes", () => {
  it("returns 6 types", () => {
    expect(paintTypes()).toHaveLength(6);
  });
});
