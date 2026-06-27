import { describe, it, expect } from "vitest";
import {
  openFiber, alignStraight, speedCard, fiberRange,
  cardCost, curved, forCotton, toothPitch,
  bestUse, flickCards,
} from "../flick-card-calc.js";

describe("openFiber", () => {
  it("coarse tooth heavy best fiber open", () => {
    expect(openFiber("coarse_tooth_heavy")).toBeGreaterThan(openFiber("medium_tooth_general"));
  });
});

describe("alignStraight", () => {
  it("fine tooth soft straightest align", () => {
    expect(alignStraight("fine_tooth_soft")).toBeGreaterThan(alignStraight("coarse_tooth_heavy"));
  });
});

describe("speedCard", () => {
  it("coarse tooth heavy fastest card", () => {
    expect(speedCard("coarse_tooth_heavy")).toBeGreaterThan(speedCard("fine_tooth_soft"));
  });
});

describe("fiberRange", () => {
  it("medium tooth general widest fiber range", () => {
    expect(fiberRange("medium_tooth_general")).toBeGreaterThan(fiberRange("cotton_card_special"));
  });
});

describe("cardCost", () => {
  it("curved back ergonomic most expensive", () => {
    expect(cardCost("curved_back_ergonomic")).toBeGreaterThan(cardCost("medium_tooth_general"));
  });
});

describe("curved", () => {
  it("curved back ergonomic is curved", () => {
    expect(curved("curved_back_ergonomic")).toBe(true);
  });
  it("fine tooth soft not curved", () => {
    expect(curved("fine_tooth_soft")).toBe(false);
  });
});

describe("forCotton", () => {
  it("cotton card special is for cotton", () => {
    expect(forCotton("cotton_card_special")).toBe(true);
  });
  it("medium tooth general not for cotton", () => {
    expect(forCotton("medium_tooth_general")).toBe(false);
  });
});

describe("toothPitch", () => {
  it("cotton card special uses extra fine pitch", () => {
    expect(toothPitch("cotton_card_special")).toBe("extra_fine_pitch");
  });
});

describe("bestUse", () => {
  it("medium tooth general best for general fiber flick", () => {
    expect(bestUse("medium_tooth_general")).toBe("general_fiber_flick");
  });
});

describe("flickCards", () => {
  it("returns 5 types", () => {
    expect(flickCards()).toHaveLength(5);
  });
});
