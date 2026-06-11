import { describe, it, expect } from "vitest";
import {
  hewFlat, controlSwing, edgeKeep, weightBalance,
  hatchetCost, singleBevel, forShingle, headProfile,
  bestUse, broadHatchets,
} from "../broad-hatchet-calc.js";

describe("hewFlat", () => {
  it("kent pattern right flattest hew", () => {
    expect(hewFlat("kent_pattern_right")).toBeGreaterThan(hewFlat("carving_hatchet_light"));
  });
});

describe("controlSwing", () => {
  it("carving hatchet light best control swing", () => {
    expect(controlSwing("carving_hatchet_light")).toBeGreaterThan(controlSwing("ship_carpenter_curved"));
  });
});

describe("edgeKeep", () => {
  it("kent pattern right best edge keep", () => {
    expect(edgeKeep("kent_pattern_right")).toBeGreaterThan(edgeKeep("shingling_hatchet_roof"));
  });
});

describe("weightBalance", () => {
  it("carving hatchet light best weight balance", () => {
    expect(weightBalance("carving_hatchet_light")).toBeGreaterThan(weightBalance("ship_carpenter_curved"));
  });
});

describe("hatchetCost", () => {
  it("ship carpenter curved most expensive", () => {
    expect(hatchetCost("ship_carpenter_curved")).toBeGreaterThan(hatchetCost("carving_hatchet_light"));
  });
});

describe("singleBevel", () => {
  it("kent pattern right is single bevel", () => {
    expect(singleBevel("kent_pattern_right")).toBe(true);
  });
  it("carving hatchet light not single bevel", () => {
    expect(singleBevel("carving_hatchet_light")).toBe(false);
  });
});

describe("forShingle", () => {
  it("shingling hatchet roof is for shingle", () => {
    expect(forShingle("shingling_hatchet_roof")).toBe(true);
  });
  it("kent pattern right not for shingle", () => {
    expect(forShingle("kent_pattern_right")).toBe(false);
  });
});

describe("headProfile", () => {
  it("kent pattern left uses left hand bevel", () => {
    expect(headProfile("kent_pattern_left")).toBe("left_hand_bevel");
  });
});

describe("bestUse", () => {
  it("shingling hatchet roof best for roof shingle split", () => {
    expect(bestUse("shingling_hatchet_roof")).toBe("roof_shingle_split");
  });
});

describe("broadHatchets", () => {
  it("returns 5 types", () => {
    expect(broadHatchets()).toHaveLength(5);
  });
});
