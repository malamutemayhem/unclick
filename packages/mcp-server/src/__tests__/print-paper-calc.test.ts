import { describe, it, expect } from "vitest";
import {
  inkAbsorb, printDetail, durability, surfaceTexture,
  paperCost, archival, forWoodcut, paperFiber,
  bestUse, printPapers,
} from "../print-paper-calc.js";

describe("inkAbsorb", () => {
  it("hosho japanese smooth best ink absorb", () => {
    expect(inkAbsorb("hosho_japanese_smooth")).toBeGreaterThan(inkAbsorb("newsprint_practice_cheap"));
  });
});

describe("printDetail", () => {
  it("hosho japanese smooth most print detail", () => {
    expect(printDetail("hosho_japanese_smooth")).toBeGreaterThan(printDetail("newsprint_practice_cheap"));
  });
});

describe("durability", () => {
  it("rives bfk heavy most durable", () => {
    expect(durability("rives_bfk_heavy")).toBeGreaterThan(durability("newsprint_practice_cheap"));
  });
});

describe("surfaceTexture", () => {
  it("stonehenge cotton warm most texture", () => {
    expect(surfaceTexture("stonehenge_cotton_warm")).toBeGreaterThan(surfaceTexture("newsprint_practice_cheap"));
  });
});

describe("paperCost", () => {
  it("rives bfk heavy most expensive", () => {
    expect(paperCost("rives_bfk_heavy")).toBeGreaterThan(paperCost("newsprint_practice_cheap"));
  });
});

describe("archival", () => {
  it("rives bfk heavy is archival", () => {
    expect(archival("rives_bfk_heavy")).toBe(true);
  });
  it("newsprint practice cheap is not archival", () => {
    expect(archival("newsprint_practice_cheap")).toBe(false);
  });
});

describe("forWoodcut", () => {
  it("mulberry thin soft is for woodcut", () => {
    expect(forWoodcut("mulberry_thin_soft")).toBe(true);
  });
  it("newsprint practice cheap is not for woodcut", () => {
    expect(forWoodcut("newsprint_practice_cheap")).toBe(false);
  });
});

describe("paperFiber", () => {
  it("mulberry thin soft uses kozo mulberry fiber", () => {
    expect(paperFiber("mulberry_thin_soft")).toBe("kozo_mulberry_fiber");
  });
});

describe("bestUse", () => {
  it("rives bfk heavy best for intaglio edition print", () => {
    expect(bestUse("rives_bfk_heavy")).toBe("intaglio_edition_print");
  });
});

describe("printPapers", () => {
  it("returns 5 types", () => {
    expect(printPapers()).toHaveLength(5);
  });
});
