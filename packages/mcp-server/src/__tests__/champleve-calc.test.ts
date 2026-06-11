import { describe, it, expect } from "vitest";
import {
  depthEven, detailFine, speedCut, repeatAccuracy,
  champCost, powered, chemical, cutMethod,
  bestUse, champleves,
} from "../champleve-calc.js";

describe("depthEven", () => {
  it("photoetch film precise most even depth", () => {
    expect(depthEven("photoetch_film_precise")).toBeGreaterThan(depthEven("graver_carve_hand"));
  });
});

describe("detailFine", () => {
  it("photoetch film precise finest detail", () => {
    expect(detailFine("photoetch_film_precise")).toBeGreaterThan(detailFine("stamp_press_repeat"));
  });
});

describe("speedCut", () => {
  it("stamp press repeat fastest cut", () => {
    expect(speedCut("stamp_press_repeat")).toBeGreaterThan(speedCut("graver_carve_hand"));
  });
});

describe("repeatAccuracy", () => {
  it("photoetch film precise most accurate repeat", () => {
    expect(repeatAccuracy("photoetch_film_precise")).toBeGreaterThan(repeatAccuracy("graver_carve_hand"));
  });
});

describe("champCost", () => {
  it("stamp press repeat most expensive", () => {
    expect(champCost("stamp_press_repeat")).toBeGreaterThan(champCost("acid_etch_copper"));
  });
});

describe("powered", () => {
  it("rotary burr power is powered", () => {
    expect(powered("rotary_burr_power")).toBe(true);
  });
  it("acid etch copper not powered", () => {
    expect(powered("acid_etch_copper")).toBe(false);
  });
});

describe("chemical", () => {
  it("acid etch copper is chemical", () => {
    expect(chemical("acid_etch_copper")).toBe(true);
  });
  it("graver carve hand not chemical", () => {
    expect(chemical("graver_carve_hand")).toBe(false);
  });
});

describe("cutMethod", () => {
  it("rotary burr power uses rotary carbide burr", () => {
    expect(cutMethod("rotary_burr_power")).toBe("rotary_carbide_burr");
  });
});

describe("bestUse", () => {
  it("acid etch copper best for general copper recess", () => {
    expect(bestUse("acid_etch_copper")).toBe("general_copper_recess");
  });
});

describe("champleves", () => {
  it("returns 5 types", () => {
    expect(champleves()).toHaveLength(5);
  });
});
