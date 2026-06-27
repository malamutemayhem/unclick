import { describe, it, expect } from "vitest";
import {
  detail, speed, coverage, durability,
  hsCost, foilless, forCurved, foilType,
  bestUse, hotStampTypes,
} from "../hot-stamp-calc.js";

describe("detail", () => {
  it("digital foil highest detail", () => {
    expect(detail("digital_foil_toner")).toBeGreaterThan(detail("silicone_roller_curved"));
  });
});

describe("speed", () => {
  it("rotary die fastest", () => {
    expect(speed("rotary_die_continuous")).toBeGreaterThan(speed("flat_die_foil"));
  });
});

describe("coverage", () => {
  it("silicone roller best coverage", () => {
    expect(coverage("silicone_roller_curved")).toBeGreaterThan(coverage("digital_foil_toner"));
  });
});

describe("durability", () => {
  it("combo emboss most durable", () => {
    expect(durability("combo_emboss_foil")).toBeGreaterThan(durability("digital_foil_toner"));
  });
});

describe("hsCost", () => {
  it("combo emboss most expensive", () => {
    expect(hsCost("combo_emboss_foil")).toBeGreaterThan(hsCost("silicone_roller_curved"));
  });
});

describe("foilless", () => {
  it("digital foil is foilless", () => {
    expect(foilless("digital_foil_toner")).toBe(true);
  });
  it("flat die not foilless", () => {
    expect(foilless("flat_die_foil")).toBe(false);
  });
});

describe("forCurved", () => {
  it("silicone roller for curved surfaces", () => {
    expect(forCurved("silicone_roller_curved")).toBe(true);
  });
  it("flat die not for curved", () => {
    expect(forCurved("flat_die_foil")).toBe(false);
  });
});

describe("foilType", () => {
  it("combo emboss uses sculptured brass die", () => {
    expect(foilType("combo_emboss_foil")).toBe("multi_level_sculptured_brass_die");
  });
});

describe("bestUse", () => {
  it("flat die for luxury book cover", () => {
    expect(bestUse("flat_die_foil")).toBe("book_cover_certificate_luxury_box");
  });
});

describe("hotStampTypes", () => {
  it("returns 5 types", () => {
    expect(hotStampTypes()).toHaveLength(5);
  });
});
