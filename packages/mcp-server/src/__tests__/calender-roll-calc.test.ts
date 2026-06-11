import { describe, it, expect } from "vitest";
import {
  sheetSpeed, thicknessControl, surfaceFinish, rollWidth,
  crCost, heated, forFilm, rollConfig,
  bestUse, calenderRollTypes,
} from "../calender-roll-calc.js";

describe("sheetSpeed", () => {
  it("four roll z config fastest sheet speed", () => {
    expect(sheetSpeed("four_roll_z_config")).toBeGreaterThan(sheetSpeed("two_roll_sheet"));
  });
});

describe("thicknessControl", () => {
  it("four roll z config best thickness control", () => {
    expect(thicknessControl("four_roll_z_config")).toBeGreaterThan(thicknessControl("two_roll_sheet"));
  });
});

describe("surfaceFinish", () => {
  it("embossing calender best surface finish", () => {
    expect(surfaceFinish("embossing_calender")).toBeGreaterThan(surfaceFinish("two_roll_sheet"));
  });
});

describe("rollWidth", () => {
  it("four roll z config widest roll width", () => {
    expect(rollWidth("four_roll_z_config")).toBeGreaterThan(rollWidth("two_roll_sheet"));
  });
});

describe("crCost", () => {
  it("four roll z config most expensive", () => {
    expect(crCost("four_roll_z_config")).toBeGreaterThan(crCost("two_roll_sheet"));
  });
});

describe("heated", () => {
  it("all calender rolls are heated", () => {
    expect(heated("two_roll_sheet")).toBe(true);
    expect(heated("four_roll_z_config")).toBe(true);
  });
});

describe("forFilm", () => {
  it("four roll z config for film", () => {
    expect(forFilm("four_roll_z_config")).toBe(true);
  });
  it("two roll sheet not for film", () => {
    expect(forFilm("two_roll_sheet")).toBe(false);
  });
});

describe("rollConfig", () => {
  it("embossing calender uses engraved roll pattern", () => {
    expect(rollConfig("embossing_calender")).toBe("embossing_calender_engraved_roll_pattern_texture_surface_vinyl");
  });
});

describe("bestUse", () => {
  it("three roll inverted l for pvc film", () => {
    expect(bestUse("three_roll_inverted_l")).toBe("pvc_film_sheet_flooring_vinyl_three_roll_inverted_l_calender");
  });
});

describe("calenderRollTypes", () => {
  it("returns 5 types", () => {
    expect(calenderRollTypes()).toHaveLength(5);
  });
});
