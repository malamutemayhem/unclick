import { describe, it, expect } from "vitest";
import {
  speed, quality, variableData, mediaRange,
  dpCost, inkBased, forShortRun, imaging,
  bestUse, digitalPressTypes,
} from "../digital-press-calc.js";

describe("speed", () => {
  it("production inkjet fastest", () => {
    expect(speed("production_inkjet_web")).toBeGreaterThan(speed("uv_flatbed_wide_format"));
  });
});

describe("quality", () => {
  it("indigo best quality", () => {
    expect(quality("indigo_liquid_electro_ink")).toBeGreaterThan(quality("production_inkjet_web"));
  });
});

describe("variableData", () => {
  it("electrophotographic full variable data", () => {
    expect(variableData("electrophotographic_toner")).toBeGreaterThan(variableData("nano_graphic_led_offset"));
  });
});

describe("mediaRange", () => {
  it("uv flatbed widest media range", () => {
    expect(mediaRange("uv_flatbed_wide_format")).toBeGreaterThan(mediaRange("production_inkjet_web"));
  });
});

describe("dpCost", () => {
  it("nanographic most expensive", () => {
    expect(dpCost("nano_graphic_led_offset")).toBeGreaterThan(dpCost("electrophotographic_toner"));
  });
});

describe("inkBased", () => {
  it("production inkjet is ink based", () => {
    expect(inkBased("production_inkjet_web")).toBe(true);
  });
  it("electrophotographic not ink based", () => {
    expect(inkBased("electrophotographic_toner")).toBe(false);
  });
});

describe("forShortRun", () => {
  it("indigo for short run", () => {
    expect(forShortRun("indigo_liquid_electro_ink")).toBe(true);
  });
  it("production inkjet not for short run", () => {
    expect(forShortRun("production_inkjet_web")).toBe(false);
  });
});

describe("imaging", () => {
  it("indigo uses liquid electro ink", () => {
    expect(imaging("indigo_liquid_electro_ink")).toBe("liquid_electro_ink_offset_blanket");
  });
});

describe("bestUse", () => {
  it("electrophotographic for book on demand", () => {
    expect(bestUse("electrophotographic_toner")).toBe("office_document_book_on_demand");
  });
});

describe("digitalPressTypes", () => {
  it("returns 5 types", () => {
    expect(digitalPressTypes()).toHaveLength(5);
  });
});
