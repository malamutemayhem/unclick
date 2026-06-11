import { describe, it, expect } from "vitest";
import {
  inkHold, detailTransfer, durability, cleanEase,
  monoCost, transparent, reusable, surfaceFinish,
  bestUse, monotypes,
} from "../monotype-calc.js";

describe("inkHold", () => {
  it("gelatin plate soft best ink hold", () => {
    expect(inkHold("gelatin_plate_soft")).toBeGreaterThan(inkHold("mylar_sheet_clear"));
  });
});

describe("detailTransfer", () => {
  it("metal plate durable best detail transfer", () => {
    expect(detailTransfer("metal_plate_durable")).toBeGreaterThan(detailTransfer("mylar_sheet_clear"));
  });
});

describe("durability", () => {
  it("metal plate durable most durable", () => {
    expect(durability("metal_plate_durable")).toBeGreaterThan(durability("gelatin_plate_soft"));
  });
});

describe("cleanEase", () => {
  it("mylar sheet clear easiest clean", () => {
    expect(cleanEase("mylar_sheet_clear")).toBeGreaterThan(cleanEase("metal_plate_durable"));
  });
});

describe("monoCost", () => {
  it("metal plate durable most expensive", () => {
    expect(monoCost("metal_plate_durable")).toBeGreaterThan(monoCost("mylar_sheet_clear"));
  });
});

describe("transparent", () => {
  it("glass plate smooth is transparent", () => {
    expect(transparent("glass_plate_smooth")).toBe(true);
  });
  it("metal plate durable not transparent", () => {
    expect(transparent("metal_plate_durable")).toBe(false);
  });
});

describe("reusable", () => {
  it("glass plate smooth is reusable", () => {
    expect(reusable("glass_plate_smooth")).toBe(true);
  });
  it("gelatin plate soft not reusable", () => {
    expect(reusable("gelatin_plate_soft")).toBe(false);
  });
});

describe("surfaceFinish", () => {
  it("plexiglass plate light uses clear acrylic sheet", () => {
    expect(surfaceFinish("plexiglass_plate_light")).toBe("clear_acrylic_sheet");
  });
});

describe("bestUse", () => {
  it("glass plate smooth best for general monotype print", () => {
    expect(bestUse("glass_plate_smooth")).toBe("general_monotype_print");
  });
});

describe("monotypes", () => {
  it("returns 5 types", () => {
    expect(monotypes()).toHaveLength(5);
  });
});
