import { describe, it, expect } from "vitest";
import {
  carvingEase, detailHold, printEditions, inkTransfer,
  blockCost, beginner, transparent, blockMaterial,
  bestUse, linoBlocks,
} from "../lino-block-calc.js";

describe("carvingEase", () => {
  it("soft cut easy easiest to carve", () => {
    expect(carvingEase("soft_cut_easy")).toBeGreaterThan(carvingEase("battleship_grey_pro"));
  });
});

describe("detailHold", () => {
  it("battleship grey pro best detail hold", () => {
    expect(detailHold("battleship_grey_pro")).toBeGreaterThan(detailHold("soft_cut_easy"));
  });
});

describe("printEditions", () => {
  it("battleship grey pro most editions", () => {
    expect(printEditions("battleship_grey_pro")).toBeGreaterThan(printEditions("soft_cut_easy"));
  });
});

describe("inkTransfer", () => {
  it("battleship grey pro best ink transfer", () => {
    expect(inkTransfer("battleship_grey_pro")).toBeGreaterThan(inkTransfer("soft_cut_easy"));
  });
});

describe("blockCost", () => {
  it("mounted wood back most expensive", () => {
    expect(blockCost("mounted_wood_back")).toBeGreaterThan(blockCost("grey_traditional_firm"));
  });
});

describe("beginner", () => {
  it("soft cut easy is beginner friendly", () => {
    expect(beginner("soft_cut_easy")).toBe(true);
  });
  it("battleship grey pro is not beginner friendly", () => {
    expect(beginner("battleship_grey_pro")).toBe(false);
  });
});

describe("transparent", () => {
  it("clear carve see is transparent", () => {
    expect(transparent("clear_carve_see")).toBe(true);
  });
  it("grey traditional firm is not transparent", () => {
    expect(transparent("grey_traditional_firm")).toBe(false);
  });
});

describe("blockMaterial", () => {
  it("soft cut easy uses rubber vinyl blend", () => {
    expect(blockMaterial("soft_cut_easy")).toBe("rubber_vinyl_blend");
  });
});

describe("bestUse", () => {
  it("battleship grey pro best for large edition pro", () => {
    expect(bestUse("battleship_grey_pro")).toBe("large_edition_pro");
  });
});

describe("linoBlocks", () => {
  it("returns 5 types", () => {
    expect(linoBlocks()).toHaveLength(5);
  });
});
