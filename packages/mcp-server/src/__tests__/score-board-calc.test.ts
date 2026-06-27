import { describe, it, expect } from "vitest";
import {
  scoreAccuracy, channelRange, durability, portability,
  boardCost, magnetic, metric, surfaceType,
  bestUse, scoreBoards,
} from "../score-board-calc.js";

describe("scoreAccuracy", () => {
  it("glass board precision most accurate score", () => {
    expect(scoreAccuracy("glass_board_precision")).toBeGreaterThan(scoreAccuracy("mini_board_travel"));
  });
});

describe("channelRange", () => {
  it("imperial board inch widest channel range", () => {
    expect(channelRange("imperial_board_inch")).toBeGreaterThan(channelRange("mini_board_travel"));
  });
});

describe("durability", () => {
  it("glass board precision most durable", () => {
    expect(durability("glass_board_precision")).toBeGreaterThan(durability("mini_board_travel"));
  });
});

describe("portability", () => {
  it("mini board travel most portable", () => {
    expect(portability("mini_board_travel")).toBeGreaterThan(portability("glass_board_precision"));
  });
});

describe("boardCost", () => {
  it("glass board precision most expensive", () => {
    expect(boardCost("glass_board_precision")).toBeGreaterThan(boardCost("mini_board_travel"));
  });
});

describe("magnetic", () => {
  it("magnetic board lock is magnetic", () => {
    expect(magnetic("magnetic_board_lock")).toBe(true);
  });
  it("imperial board inch not magnetic", () => {
    expect(magnetic("imperial_board_inch")).toBe(false);
  });
});

describe("metric", () => {
  it("metric board cm is metric", () => {
    expect(metric("metric_board_cm")).toBe(true);
  });
  it("imperial board inch not metric", () => {
    expect(metric("imperial_board_inch")).toBe(false);
  });
});

describe("surfaceType", () => {
  it("glass board precision uses tempered glass flat", () => {
    expect(surfaceType("glass_board_precision")).toBe("tempered_glass_flat");
  });
});

describe("bestUse", () => {
  it("imperial board inch best for general card score", () => {
    expect(bestUse("imperial_board_inch")).toBe("general_card_score");
  });
});

describe("scoreBoards", () => {
  it("returns 5 types", () => {
    expect(scoreBoards()).toHaveLength(5);
  });
});
