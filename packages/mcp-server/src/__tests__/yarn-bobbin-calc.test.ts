import { describe, it, expect } from "vitest";
import {
  tensionControl, yarnCapacity, tangeFree, setupSpeed,
  bobbinCost, reusable, adjustable, bobbinStyle,
  bestUse, yarnBobbins,
} from "../yarn-bobbin-calc.js";

describe("tensionControl", () => {
  it("spring bobbin tension best tension control", () => {
    expect(tensionControl("spring_bobbin_tension")).toBeGreaterThan(tensionControl("butterfly_wrap_hand"));
  });
});

describe("yarnCapacity", () => {
  it("cardboard bobbin flat highest yarn capacity", () => {
    expect(yarnCapacity("cardboard_bobbin_flat")).toBeGreaterThan(yarnCapacity("butterfly_wrap_hand"));
  });
});

describe("tangeFree", () => {
  it("spring bobbin tension most tangle free", () => {
    expect(tangeFree("spring_bobbin_tension")).toBeGreaterThan(tangeFree("butterfly_wrap_hand"));
  });
});

describe("setupSpeed", () => {
  it("butterfly wrap hand fastest setup", () => {
    expect(setupSpeed("butterfly_wrap_hand")).toBeGreaterThan(setupSpeed("spring_bobbin_tension"));
  });
});

describe("bobbinCost", () => {
  it("spring bobbin tension most expensive", () => {
    expect(bobbinCost("spring_bobbin_tension")).toBeGreaterThan(bobbinCost("butterfly_wrap_hand"));
  });
});

describe("reusable", () => {
  it("plastic bobbin clip is reusable", () => {
    expect(reusable("plastic_bobbin_clip")).toBe(true);
  });
  it("butterfly wrap hand not reusable", () => {
    expect(reusable("butterfly_wrap_hand")).toBe(false);
  });
});

describe("adjustable", () => {
  it("spring bobbin tension is adjustable", () => {
    expect(adjustable("spring_bobbin_tension")).toBe(true);
  });
  it("plastic bobbin clip not adjustable", () => {
    expect(adjustable("plastic_bobbin_clip")).toBe(false);
  });
});

describe("bobbinStyle", () => {
  it("wood bobbin peg uses turned wood spool", () => {
    expect(bobbinStyle("wood_bobbin_peg")).toBe("turned_wood_spool");
  });
});

describe("bestUse", () => {
  it("cardboard bobbin flat best for economy bulk color", () => {
    expect(bestUse("cardboard_bobbin_flat")).toBe("economy_bulk_color");
  });
});

describe("yarnBobbins", () => {
  it("returns 5 types", () => {
    expect(yarnBobbins()).toHaveLength(5);
  });
});
