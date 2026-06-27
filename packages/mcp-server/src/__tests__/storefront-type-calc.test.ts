import { describe, it, expect } from "vitest";
import {
  thermal, structural, aesthetic, security,
  sfCost, thermBroken, forCommercial, frame,
  bestUse, storefrontTypeTypes,
} from "../storefront-type-calc.js";

describe("thermal", () => {
  it("entrance vestibule best thermal", () => {
    expect(thermal("entrance_vestibule_system")).toBeGreaterThan(thermal("center_set_butt_glaze"));
  });
});

describe("structural", () => {
  it("blast resistant strongest", () => {
    expect(structural("blast_resistant_laminated")).toBeGreaterThan(structural("standard_flush_glaze"));
  });
});

describe("aesthetic", () => {
  it("butt glaze best aesthetic", () => {
    expect(aesthetic("center_set_butt_glaze")).toBeGreaterThan(aesthetic("blast_resistant_laminated"));
  });
});

describe("security", () => {
  it("blast resistant highest security", () => {
    expect(security("blast_resistant_laminated")).toBeGreaterThan(security("center_set_butt_glaze"));
  });
});

describe("sfCost", () => {
  it("blast resistant most expensive", () => {
    expect(sfCost("blast_resistant_laminated")).toBeGreaterThan(sfCost("standard_flush_glaze"));
  });
});

describe("thermBroken", () => {
  it("standard is thermally broken", () => {
    expect(thermBroken("standard_flush_glaze")).toBe(true);
  });
  it("butt glaze not thermally broken", () => {
    expect(thermBroken("center_set_butt_glaze")).toBe(false);
  });
});

describe("forCommercial", () => {
  it("all types for commercial", () => {
    expect(forCommercial("standard_flush_glaze")).toBe(true);
  });
});

describe("frame", () => {
  it("offset uses deep pocket", () => {
    expect(frame("offset_set_structural")).toBe("offset_glazing_pocket_deep");
  });
});

describe("bestUse", () => {
  it("blast resistant for government", () => {
    expect(bestUse("blast_resistant_laminated")).toBe("government_embassy_high_security");
  });
});

describe("storefrontTypeTypes", () => {
  it("returns 5 types", () => {
    expect(storefrontTypeTypes()).toHaveLength(5);
  });
});
