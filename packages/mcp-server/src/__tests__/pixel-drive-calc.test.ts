import { describe, it, expect } from "vitest";
import {
  mobility, uniformity, leakage, refreshRate,
  pxCost, variableRefresh, forLargeArea, semiconductor,
  bestUse, pixelDrives,
} from "../pixel-drive-calc.js";

describe("mobility", () => {
  it("microdriver cmos highest mobility", () => {
    expect(mobility("microdriver_cmos")).toBeGreaterThan(mobility("tft_amorphous_si"));
  });
});

describe("uniformity", () => {
  it("microdriver cmos best uniformity", () => {
    expect(uniformity("microdriver_cmos")).toBeGreaterThan(uniformity("ltps_low_temp_poly"));
  });
});

describe("leakage", () => {
  it("oxide igzo lowest leakage", () => {
    expect(leakage("oxide_igzo")).toBeGreaterThan(leakage("tft_amorphous_si"));
  });
});

describe("refreshRate", () => {
  it("ltpo hybrid highest refresh rate", () => {
    expect(refreshRate("ltpo_hybrid")).toBeGreaterThan(refreshRate("tft_amorphous_si"));
  });
});

describe("pxCost", () => {
  it("microdriver cmos most expensive", () => {
    expect(pxCost("microdriver_cmos")).toBeGreaterThan(pxCost("tft_amorphous_si"));
  });
});

describe("variableRefresh", () => {
  it("ltpo hybrid supports variable refresh", () => {
    expect(variableRefresh("ltpo_hybrid")).toBe(true);
  });
  it("tft amorphous si no variable refresh", () => {
    expect(variableRefresh("tft_amorphous_si")).toBe(false);
  });
});

describe("forLargeArea", () => {
  it("oxide igzo for large area", () => {
    expect(forLargeArea("oxide_igzo")).toBe(true);
  });
  it("ltpo hybrid not for large area", () => {
    expect(forLargeArea("ltpo_hybrid")).toBe(false);
  });
});

describe("semiconductor", () => {
  it("oxide igzo uses indium gallium zinc oxide", () => {
    expect(semiconductor("oxide_igzo")).toBe("indium_gallium_zinc_oxide");
  });
});

describe("bestUse", () => {
  it("microdriver cmos best for microled ar near eye", () => {
    expect(bestUse("microdriver_cmos")).toBe("microled_ar_near_eye");
  });
});

describe("pixelDrives", () => {
  it("returns 5 types", () => {
    expect(pixelDrives()).toHaveLength(5);
  });
});
