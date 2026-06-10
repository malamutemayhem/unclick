import { describe, it, expect } from "vitest";
import {
  durability, foldClean, printAccept, aesthetic,
  clothCost, paperBacked, waterResist, clothWeave,
  bestUse, bookCloths,
} from "../book-cloth-calc.js";

describe("durability", () => {
  it("buckram starch stiff most durable", () => {
    expect(durability("buckram_starch_stiff")).toBeGreaterThan(durability("japanese_tissue_wrap"));
  });
});

describe("foldClean", () => {
  it("japanese tissue wrap cleanest fold", () => {
    expect(foldClean("japanese_tissue_wrap")).toBeGreaterThan(foldClean("cotton_canvas_print"));
  });
});

describe("printAccept", () => {
  it("cotton canvas print best print accept", () => {
    expect(printAccept("cotton_canvas_print")).toBeGreaterThan(printAccept("silk_shantung_lux"));
  });
});

describe("aesthetic", () => {
  it("silk shantung lux best aesthetic", () => {
    expect(aesthetic("silk_shantung_lux")).toBeGreaterThan(aesthetic("buckram_starch_stiff"));
  });
});

describe("clothCost", () => {
  it("silk shantung lux most expensive", () => {
    expect(clothCost("silk_shantung_lux")).toBeGreaterThan(clothCost("buckram_starch_stiff"));
  });
});

describe("paperBacked", () => {
  it("buckram starch stiff is paper backed", () => {
    expect(paperBacked("buckram_starch_stiff")).toBe(true);
  });
  it("japanese tissue wrap not paper backed", () => {
    expect(paperBacked("japanese_tissue_wrap")).toBe(false);
  });
});

describe("waterResist", () => {
  it("buckram starch stiff is water resistant", () => {
    expect(waterResist("buckram_starch_stiff")).toBe(true);
  });
  it("linen natural weave not water resistant", () => {
    expect(waterResist("linen_natural_weave")).toBe(false);
  });
});

describe("clothWeave", () => {
  it("buckram starch stiff uses open weave starched", () => {
    expect(clothWeave("buckram_starch_stiff")).toBe("open_weave_starched");
  });
});

describe("bestUse", () => {
  it("silk shantung lux best for luxury edition cover", () => {
    expect(bestUse("silk_shantung_lux")).toBe("luxury_edition_cover");
  });
});

describe("bookCloths", () => {
  it("returns 5 types", () => {
    expect(bookCloths()).toHaveLength(5);
  });
});
