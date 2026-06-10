import { describe, it, expect } from "vitest";
import {
  formalStyle, installEase, coverageDepth, versatility,
  valanceCost, hidesHardware, standsAlone, constructionType,
  bestRoom, valances,
} from "../valance-calc.js";

describe("formalStyle", () => {
  it("swag jabots formal most formal", () => {
    expect(formalStyle("swag_jabots_formal")).toBeGreaterThan(formalStyle("rod_pocket_gathered"));
  });
});

describe("installEase", () => {
  it("rod pocket gathered easiest install", () => {
    expect(installEase("rod_pocket_gathered")).toBeGreaterThan(installEase("cornice_board_upholstered"));
  });
});

describe("coverageDepth", () => {
  it("cornice board upholstered deepest coverage", () => {
    expect(coverageDepth("cornice_board_upholstered")).toBeGreaterThan(coverageDepth("rod_pocket_gathered"));
  });
});

describe("versatility", () => {
  it("rod pocket gathered most versatile", () => {
    expect(versatility("rod_pocket_gathered")).toBeGreaterThan(versatility("swag_jabots_formal"));
  });
});

describe("valanceCost", () => {
  it("cornice board upholstered most expensive", () => {
    expect(valanceCost("cornice_board_upholstered")).toBeGreaterThan(valanceCost("rod_pocket_gathered"));
  });
});

describe("hidesHardware", () => {
  it("box pleat tailored hides hardware", () => {
    expect(hidesHardware("box_pleat_tailored")).toBe(true);
  });
  it("rod pocket gathered does not hide hardware", () => {
    expect(hidesHardware("rod_pocket_gathered")).toBe(false);
  });
});

describe("standsAlone", () => {
  it("box pleat tailored stands alone", () => {
    expect(standsAlone("box_pleat_tailored")).toBe(true);
  });
  it("swag jabots formal does not stand alone", () => {
    expect(standsAlone("swag_jabots_formal")).toBe(false);
  });
});

describe("constructionType", () => {
  it("cornice board upholstered uses wood frame foam fabric", () => {
    expect(constructionType("cornice_board_upholstered")).toBe("wood_frame_foam_fabric");
  });
});

describe("bestRoom", () => {
  it("swag jabots formal best for formal dining ballroom", () => {
    expect(bestRoom("swag_jabots_formal")).toBe("formal_dining_ballroom");
  });
});

describe("valances", () => {
  it("returns 5 types", () => {
    expect(valances()).toHaveLength(5);
  });
});
