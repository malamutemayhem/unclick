import { describe, it, expect } from "vitest";
import {
  catalogValue, centering, perforationGauge, watermarkDetection,
  albumPages, mountSize, hingeArea, plateBlock, firstDayCoverValue,
  sheetValue, grading, insuranceValue, printMethods, stampConditions,
} from "../stamp-calc.js";

describe("catalogValue", () => {
  it("mint is highest", () => {
    expect(catalogValue(1000, "mint")).toBeGreaterThan(catalogValue(1000, "used_light"));
  });

  it("damaged is lowest", () => {
    expect(catalogValue(1000, "damaged")).toBeLessThan(catalogValue(1000, "used_heavy"));
  });
});

describe("centering", () => {
  it("superb for perfect", () => {
    expect(centering(1, 1, 1, 1)).toBe("superb");
  });

  it("good for off-center", () => {
    expect(centering(0.5, 3, 0.5, 3)).toBe("good");
  });
});

describe("perforationGauge", () => {
  it("doubles holes/cm", () => {
    expect(perforationGauge(6)).toBe(12);
  });
});

describe("watermarkDetection", () => {
  it("returns description", () => {
    expect(watermarkDetection("fluid")).toContain("benzine");
  });
});

describe("albumPages", () => {
  it("rounds up", () => {
    expect(albumPages(13)).toBe(3);
  });
});

describe("mountSize", () => {
  it("adds 3mm margin", () => {
    const m = mountSize(25, 30);
    expect(m.width).toBe(28);
    expect(m.height).toBe(33);
  });
});

describe("hingeArea", () => {
  it("positive mm2", () => {
    expect(hingeArea(30)).toBeGreaterThan(0);
  });
});

describe("plateBlock", () => {
  it("rows x cols", () => {
    expect(plateBlock(2, 2)).toBe(4);
  });
});

describe("firstDayCoverValue", () => {
  it("cachet increases value", () => {
    expect(firstDayCoverValue(100, true)).toBeGreaterThan(firstDayCoverValue(100, false));
  });
});

describe("sheetValue", () => {
  it("positive for mint sheet", () => {
    expect(sheetValue(100, 5, 10, "mint")).toBeGreaterThan(0);
  });
});

describe("grading", () => {
  it("high for superb mint", () => {
    expect(grading("superb", "original", 0)).toBeGreaterThan(90);
  });

  it("lower with faults", () => {
    expect(grading("fine", "hinged", 2)).toBeLessThan(grading("fine", "original", 0));
  });
});

describe("insuranceValue", () => {
  it("fraction of catalog", () => {
    expect(insuranceValue(1000)).toBeLessThan(1000);
  });
});

describe("printMethods", () => {
  it("returns 5 methods", () => {
    expect(printMethods()).toHaveLength(5);
  });
});

describe("stampConditions", () => {
  it("returns 5 conditions", () => {
    expect(stampConditions()).toHaveLength(5);
  });
});
