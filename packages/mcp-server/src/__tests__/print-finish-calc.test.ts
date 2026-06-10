import { describe, it, expect } from "vitest";
import {
  glossLevel, durability, tactileFeel, printability,
  processCost, recyclable, requiresSpecialEquipment, applicationMethod,
  bestProduct, printFinishes,
} from "../print-finish-calc.js";

describe("glossLevel", () => {
  it("uv coating highest gloss", () => {
    expect(glossLevel("uv_coating")).toBeGreaterThan(glossLevel("soft_touch"));
  });
});

describe("durability", () => {
  it("lamination most durable", () => {
    expect(durability("lamination")).toBeGreaterThan(durability("aqueous_coating"));
  });
});

describe("tactileFeel", () => {
  it("soft touch best tactile feel", () => {
    expect(tactileFeel("soft_touch")).toBeGreaterThan(tactileFeel("aqueous_coating"));
  });
});

describe("printability", () => {
  it("aqueous coating best printability", () => {
    expect(printability("aqueous_coating")).toBeGreaterThan(printability("lamination"));
  });
});

describe("processCost", () => {
  it("spot varnish most expensive", () => {
    expect(processCost("spot_varnish")).toBeGreaterThan(processCost("aqueous_coating"));
  });
});

describe("recyclable", () => {
  it("aqueous coating is recyclable", () => {
    expect(recyclable("aqueous_coating")).toBe(true);
  });
  it("lamination is not", () => {
    expect(recyclable("lamination")).toBe(false);
  });
});

describe("requiresSpecialEquipment", () => {
  it("uv coating requires special equipment", () => {
    expect(requiresSpecialEquipment("uv_coating")).toBe(true);
  });
  it("aqueous coating does not", () => {
    expect(requiresSpecialEquipment("aqueous_coating")).toBe(false);
  });
});

describe("applicationMethod", () => {
  it("soft touch uses matte laminate rubberized", () => {
    expect(applicationMethod("soft_touch")).toBe("matte_laminate_rubberized");
  });
});

describe("bestProduct", () => {
  it("lamination for book cover menu card", () => {
    expect(bestProduct("lamination")).toBe("book_cover_menu_card");
  });
});

describe("printFinishes", () => {
  it("returns 5 finishes", () => {
    expect(printFinishes()).toHaveLength(5);
  });
});
