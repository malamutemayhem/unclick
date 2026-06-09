import { describe, it, expect } from "vitest";
import {
  deckSize, majorArcanaCount, minorArcanaCount, cardsPerSuit,
  spreadSize, drawProbability, majorArcanaProbability,
  reversalProbability, suitElement, cardNumber, readingTime,
  shufflesRecommended, collectionValue, spreadTypes,
} from "../tarot-calc.js";

describe("deckSize", () => {
  it("is 78", () => {
    expect(deckSize()).toBe(78);
  });
});

describe("majorArcanaCount", () => {
  it("is 22", () => {
    expect(majorArcanaCount()).toBe(22);
  });
});

describe("minorArcanaCount", () => {
  it("is 56", () => {
    expect(minorArcanaCount()).toBe(56);
  });
  it("major + minor = deck", () => {
    expect(majorArcanaCount() + minorArcanaCount()).toBe(deckSize());
  });
});

describe("cardsPerSuit", () => {
  it("is 14", () => {
    expect(cardsPerSuit()).toBe(14);
  });
});

describe("spreadSize", () => {
  it("celtic cross is 10", () => {
    expect(spreadSize("celtic_cross")).toBe(10);
  });
  it("single is 1", () => {
    expect(spreadSize("single")).toBe(1);
  });
});

describe("drawProbability", () => {
  it("1 in 78", () => {
    expect(drawProbability(1, 78)).toBeCloseTo(0.0128, 3);
  });
  it("zero deck returns 0", () => {
    expect(drawProbability(1, 0)).toBe(0);
  });
});

describe("majorArcanaProbability", () => {
  it("increases with more cards", () => {
    expect(majorArcanaProbability(3)).toBeGreaterThan(majorArcanaProbability(1));
  });
  it("invalid returns 0", () => {
    expect(majorArcanaProbability(0)).toBe(0);
  });
});

describe("reversalProbability", () => {
  it("is 0.5", () => {
    expect(reversalProbability()).toBe(0.5);
  });
});

describe("suitElement", () => {
  it("wands = fire", () => {
    expect(suitElement("wands")).toBe("fire");
  });
  it("cups = water", () => {
    expect(suitElement("cups")).toBe("water");
  });
});

describe("cardNumber", () => {
  it("king is 14", () => {
    expect(cardNumber("king")).toBe(14);
  });
  it("5 is 5", () => {
    expect(cardNumber("5")).toBe(5);
  });
  it("invalid returns null", () => {
    expect(cardNumber("foo")).toBeNull();
  });
});

describe("readingTime", () => {
  it("celtic cross is 45 min", () => {
    expect(readingTime("celtic_cross")).toBe(45);
  });
});

describe("shufflesRecommended", () => {
  it("is 7", () => {
    expect(shufflesRecommended()).toBe(7);
  });
});

describe("collectionValue", () => {
  it("positive value", () => {
    expect(collectionValue(5, 30)).toBe(150);
  });
});

describe("spreadTypes", () => {
  it("returns 5 types", () => {
    expect(spreadTypes()).toHaveLength(5);
  });
});
