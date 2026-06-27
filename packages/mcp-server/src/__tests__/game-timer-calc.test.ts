import { describe, it, expect } from "vitest";
import {
  accuracy, easeOfUse, ambiance, customization,
  timerCost, needsPower, multiPlayer, timerMechanism,
  bestGame, gameTimers,
} from "../game-timer-calc.js";

describe("accuracy", () => {
  it("chess clock dual most accurate", () => {
    expect(accuracy("chess_clock_dual")).toBeGreaterThan(accuracy("sand_hourglass_classic"));
  });
});

describe("easeOfUse", () => {
  it("sand hourglass classic easiest to use", () => {
    expect(easeOfUse("sand_hourglass_classic")).toBeGreaterThan(easeOfUse("chess_clock_dual"));
  });
});

describe("ambiance", () => {
  it("sand hourglass classic best ambiance", () => {
    expect(ambiance("sand_hourglass_classic")).toBeGreaterThan(ambiance("app_phone_timer"));
  });
});

describe("customization", () => {
  it("app phone timer most customizable", () => {
    expect(customization("app_phone_timer")).toBeGreaterThan(customization("sand_hourglass_classic"));
  });
});

describe("timerCost", () => {
  it("chess clock dual most expensive", () => {
    expect(timerCost("chess_clock_dual")).toBeGreaterThan(timerCost("sand_hourglass_classic"));
  });
});

describe("needsPower", () => {
  it("digital countdown button needs power", () => {
    expect(needsPower("digital_countdown_button")).toBe(true);
  });
  it("sand hourglass classic does not need power", () => {
    expect(needsPower("sand_hourglass_classic")).toBe(false);
  });
});

describe("multiPlayer", () => {
  it("chess clock dual is multi player", () => {
    expect(multiPlayer("chess_clock_dual")).toBe(true);
  });
  it("sand hourglass classic is not multi player", () => {
    expect(multiPlayer("sand_hourglass_classic")).toBe(false);
  });
});

describe("timerMechanism", () => {
  it("sand hourglass classic uses gravity sand flow", () => {
    expect(timerMechanism("sand_hourglass_classic")).toBe("gravity_sand_flow");
  });
});

describe("bestGame", () => {
  it("chess clock dual best for chess go two player", () => {
    expect(bestGame("chess_clock_dual")).toBe("chess_go_two_player");
  });
});

describe("gameTimers", () => {
  it("returns 5 types", () => {
    expect(gameTimers()).toHaveLength(5);
  });
});
