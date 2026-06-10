import { describe, it, expect } from "vitest";
import {
  curveFollow, chipClear, edgeLife, sharpenEase,
  graverCost, forBeading, insideCut, grindFace,
  bestUse, roundGravers,
} from "../round-graver-calc.js";

describe("curveFollow", () => {
  it("ring size inside best curve follow", () => {
    expect(curveFollow("ring_size_inside")).toBeGreaterThan(curveFollow("bead_raise_cup"));
  });
});

describe("chipClear", () => {
  it("wire line narrow best chip clear", () => {
    expect(chipClear("wire_line_narrow")).toBeGreaterThan(chipClear("bead_raise_cup"));
  });
});

describe("edgeLife", () => {
  it("oval section wide longest edge life", () => {
    expect(edgeLife("oval_section_wide")).toBeGreaterThan(edgeLife("wire_line_narrow"));
  });
});

describe("sharpenEase", () => {
  it("standard round point easiest sharpen", () => {
    expect(sharpenEase("standard_round_point")).toBeGreaterThan(sharpenEase("bead_raise_cup"));
  });
});

describe("graverCost", () => {
  it("bead raise cup most expensive", () => {
    expect(graverCost("bead_raise_cup")).toBeGreaterThan(graverCost("standard_round_point"));
  });
});

describe("forBeading", () => {
  it("bead raise cup is for beading", () => {
    expect(forBeading("bead_raise_cup")).toBe(true);
  });
  it("standard round point not for beading", () => {
    expect(forBeading("standard_round_point")).toBe(false);
  });
});

describe("insideCut", () => {
  it("ring size inside is inside cut", () => {
    expect(insideCut("ring_size_inside")).toBe(true);
  });
  it("standard round point not inside cut", () => {
    expect(insideCut("standard_round_point")).toBe(false);
  });
});

describe("grindFace", () => {
  it("bead raise cup uses concave cup face", () => {
    expect(grindFace("bead_raise_cup")).toBe("concave_cup_face");
  });
});

describe("bestUse", () => {
  it("ring size inside best for ring inside engrave", () => {
    expect(bestUse("ring_size_inside")).toBe("ring_inside_engrave");
  });
});

describe("roundGravers", () => {
  it("returns 5 types", () => {
    expect(roundGravers()).toHaveLength(5);
  });
});
