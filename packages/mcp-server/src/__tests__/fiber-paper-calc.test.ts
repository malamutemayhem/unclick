import { describe, it, expect } from "vitest";
import {
  heatResist, flexibility, insulation, reusability,
  paperCost, carvable, shelfLiner, fiberType,
  bestUse, fiberPapers,
} from "../fiber-paper-calc.js";

describe("heatResist", () => {
  it("rigid board form best heat resist", () => {
    expect(heatResist("rigid_board_form")).toBeGreaterThan(heatResist("thin_1mm_shelf"));
  });
});

describe("flexibility", () => {
  it("thin 1mm shelf most flexible", () => {
    expect(flexibility("thin_1mm_shelf")).toBeGreaterThan(flexibility("rigid_board_form"));
  });
});

describe("insulation", () => {
  it("rigid board form best insulation", () => {
    expect(insulation("rigid_board_form")).toBeGreaterThan(insulation("thin_1mm_shelf"));
  });
});

describe("reusability", () => {
  it("rigid board form most reusable", () => {
    expect(reusability("rigid_board_form")).toBeGreaterThan(reusability("thin_1mm_shelf"));
  });
});

describe("paperCost", () => {
  it("rigid board form most expensive", () => {
    expect(paperCost("rigid_board_form")).toBeGreaterThan(paperCost("thin_1mm_shelf"));
  });
});

describe("carvable", () => {
  it("thick 6mm mold is carvable", () => {
    expect(carvable("thick_6mm_mold")).toBe(true);
  });
  it("thin 1mm shelf not carvable", () => {
    expect(carvable("thin_1mm_shelf")).toBe(false);
  });
});

describe("shelfLiner", () => {
  it("thin 1mm shelf is shelf liner", () => {
    expect(shelfLiner("thin_1mm_shelf")).toBe(true);
  });
  it("medium 3mm dam not shelf liner", () => {
    expect(shelfLiner("medium_3mm_dam")).toBe(false);
  });
});

describe("fiberType", () => {
  it("thin 1mm shelf uses alumina silica sheet", () => {
    expect(fiberType("thin_1mm_shelf")).toBe("alumina_silica_sheet");
  });
});

describe("bestUse", () => {
  it("thick 6mm mold best for slump mold carve", () => {
    expect(bestUse("thick_6mm_mold")).toBe("slump_mold_carve");
  });
});

describe("fiberPapers", () => {
  it("returns 5 types", () => {
    expect(fiberPapers()).toHaveLength(5);
  });
});
