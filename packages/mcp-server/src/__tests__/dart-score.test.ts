import { describe, it, expect } from "vitest";
import {
  regionScore, maxScore, averagePerDart, averagePerVisit,
  checkoutDouble, isCheckout, dartsForCheckout, cricketMarks,
  legsToWin, setsToWin, throwDistance, boardHeight,
  ratingFromAvg, gameTypes,
} from "../dart-score.js";

describe("regionScore", () => {
  it("triple 20 = 60", () => {
    expect(regionScore(20, "triple")).toBe(60);
  });
  it("double 20 = 40", () => {
    expect(regionScore(20, "double")).toBe(40);
  });
  it("inner bull = 50", () => {
    expect(regionScore(0, "inner_bull")).toBe(50);
  });
  it("outer bull = 25", () => {
    expect(regionScore(0, "outer_bull")).toBe(25);
  });
  it("single 20 = 20", () => {
    expect(regionScore(20, "single")).toBe(20);
  });
});

describe("maxScore", () => {
  it("is 180", () => {
    expect(maxScore()).toBe(180);
  });
});

describe("averagePerDart", () => {
  it("computes average", () => {
    expect(averagePerDart(180, 3)).toBe(60);
  });
  it("zero darts returns 0", () => {
    expect(averagePerDart(100, 0)).toBe(0);
  });
});

describe("averagePerVisit", () => {
  it("computes visit average", () => {
    expect(averagePerVisit(300, 5)).toBe(60);
  });
});

describe("checkoutDouble", () => {
  it("40 checkout = D20", () => {
    expect(checkoutDouble(40)).toBe(20);
  });
  it("odd number returns null", () => {
    expect(checkoutDouble(7)).toBeNull();
  });
  it("too high returns null", () => {
    expect(checkoutDouble(42)).toBeNull();
  });
});

describe("isCheckout", () => {
  it("170 is checkable", () => {
    expect(isCheckout(170)).toBe(true);
  });
  it("169 is not checkable", () => {
    expect(isCheckout(169)).toBe(false);
  });
  it("2 is checkable", () => {
    expect(isCheckout(2)).toBe(true);
  });
});

describe("dartsForCheckout", () => {
  it("D20 (40) needs 1 dart", () => {
    expect(dartsForCheckout(40)).toBe(1);
  });
  it("60 needs 2 darts", () => {
    expect(dartsForCheckout(60)).toBe(2);
  });
  it("170 needs 3 darts", () => {
    expect(dartsForCheckout(170)).toBe(3);
  });
});

describe("cricketMarks", () => {
  it("triple = 3 marks", () => {
    expect(cricketMarks("triple")).toBe(3);
  });
  it("single = 1 mark", () => {
    expect(cricketMarks("single")).toBe(1);
  });
});

describe("legsToWin", () => {
  it("first to 5 = 5", () => {
    expect(legsToWin("first_to", 5)).toBe(5);
  });
  it("best of 7 = 4", () => {
    expect(legsToWin("best_of", 7)).toBe(4);
  });
});

describe("setsToWin", () => {
  it("best of 5 = 3", () => {
    expect(setsToWin(5)).toBe(3);
  });
});

describe("throwDistance", () => {
  it("is 2.37m", () => {
    expect(throwDistance()).toBe(2.37);
  });
});

describe("boardHeight", () => {
  it("is 1.73m", () => {
    expect(boardHeight()).toBe(1.73);
  });
});

describe("ratingFromAvg", () => {
  it("100+ is professional", () => {
    expect(ratingFromAvg(105)).toBe("professional");
  });
  it("20 is novice", () => {
    expect(ratingFromAvg(20)).toBe("novice");
  });
});

describe("gameTypes", () => {
  it("returns 5 types", () => {
    expect(gameTypes()).toHaveLength(5);
  });
});
