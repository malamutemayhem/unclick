import { describe, it, expect } from "vitest";
import {
  waterRemoval, sheetStrength, nipPressure, energySaving,
  psCost, extendedNip, forBoard, pressConfig,
  bestUse, pressSectionTypes,
} from "../press-section-calc.js";

describe("waterRemoval", () => {
  it("shoe press best water removal", () => {
    expect(waterRemoval("shoe_press")).toBeGreaterThan(waterRemoval("suction_press"));
  });
});

describe("sheetStrength", () => {
  it("shoe press best sheet strength", () => {
    expect(sheetStrength("shoe_press")).toBeGreaterThan(sheetStrength("suction_press"));
  });
});

describe("nipPressure", () => {
  it("shoe press highest nip pressure", () => {
    expect(nipPressure("shoe_press")).toBeGreaterThan(nipPressure("suction_press"));
  });
});

describe("energySaving", () => {
  it("shoe press best energy saving", () => {
    expect(energySaving("shoe_press")).toBeGreaterThan(energySaving("suction_press"));
  });
});

describe("psCost", () => {
  it("shoe press most expensive", () => {
    expect(psCost("shoe_press")).toBeGreaterThan(psCost("suction_press"));
  });
});

describe("extendedNip", () => {
  it("shoe press has extended nip", () => {
    expect(extendedNip("shoe_press")).toBe(true);
  });
  it("tri nip not extended nip", () => {
    expect(extendedNip("tri_nip")).toBe(false);
  });
});

describe("forBoard", () => {
  it("tri nip for board", () => {
    expect(forBoard("tri_nip")).toBe(true);
  });
  it("straight through not for board", () => {
    expect(forBoard("straight_through")).toBe(false);
  });
});

describe("pressConfig", () => {
  it("suction press uses vacuum draw water through felt", () => {
    expect(pressConfig("suction_press")).toBe("suction_press_roll_vacuum_draw_water_through_felt_older_design");
  });
});

describe("bestUse", () => {
  it("blind drilled for tissue towel", () => {
    expect(bestUse("blind_drilled")).toBe("tissue_towel_paper_blind_drilled_roll_groove_fast_nip_dewater");
  });
});

describe("pressSectionTypes", () => {
  it("returns 5 types", () => {
    expect(pressSectionTypes()).toHaveLength(5);
  });
});
