import { describe, it, expect } from "vitest";
import {
  complexity, replayValue, playerInteraction, playTimeMinutes,
  gameCost, soloMode, needsExpansion, mechanicType,
  bestGroup, boardGames,
} from "../board-game-calc.js";

describe("complexity", () => {
  it("war miniature most complex", () => {
    expect(complexity("war_miniature")).toBeGreaterThan(complexity("party_social"));
  });
});

describe("replayValue", () => {
  it("deck builder highest replay value", () => {
    expect(replayValue("deck_builder")).toBeGreaterThan(replayValue("cooperative_team"));
  });
});

describe("playerInteraction", () => {
  it("party social most player interaction", () => {
    expect(playerInteraction("party_social")).toBeGreaterThan(playerInteraction("deck_builder"));
  });
});

describe("playTimeMinutes", () => {
  it("party social quickest play time", () => {
    expect(playTimeMinutes("party_social")).toBeGreaterThan(playTimeMinutes("war_miniature"));
  });
});

describe("gameCost", () => {
  it("war miniature most expensive", () => {
    expect(gameCost("war_miniature")).toBeGreaterThan(gameCost("party_social"));
  });
});

describe("soloMode", () => {
  it("strategy euro has solo mode", () => {
    expect(soloMode("strategy_euro")).toBe(true);
  });
  it("party social does not", () => {
    expect(soloMode("party_social")).toBe(false);
  });
});

describe("needsExpansion", () => {
  it("deck builder needs expansion", () => {
    expect(needsExpansion("deck_builder")).toBe(true);
  });
  it("strategy euro does not", () => {
    expect(needsExpansion("strategy_euro")).toBe(false);
  });
});

describe("mechanicType", () => {
  it("strategy euro uses worker placement resource", () => {
    expect(mechanicType("strategy_euro")).toBe("worker_placement_resource");
  });
});

describe("bestGroup", () => {
  it("party social for large group casual fun", () => {
    expect(bestGroup("party_social")).toBe("large_group_casual_fun");
  });
});

describe("boardGames", () => {
  it("returns 5 types", () => {
    expect(boardGames()).toHaveLength(5);
  });
});
