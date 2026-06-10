import { describe, it, expect } from "vitest";
import {
  successRate, skillRequired, equipmentCost, queenQuantity,
  geneticControl, beginnerFriendly, requiresSeparateColony, keyTool,
  bestScenario, queenRearingMethods,
} from "../queen-rearing-calc.js";

describe("successRate", () => {
  it("grafting highest success rate", () => {
    expect(successRate("grafting")).toBeGreaterThan(successRate("walk_away"));
  });
});

describe("skillRequired", () => {
  it("grafting most skill", () => {
    expect(skillRequired("grafting")).toBeGreaterThan(skillRequired("walk_away"));
  });
});

describe("equipmentCost", () => {
  it("cloake board most expensive", () => {
    expect(equipmentCost("cloake_board")).toBeGreaterThan(equipmentCost("walk_away"));
  });
});

describe("queenQuantity", () => {
  it("grafting produces most queens", () => {
    expect(queenQuantity("grafting")).toBeGreaterThan(queenQuantity("walk_away"));
  });
});

describe("geneticControl", () => {
  it("grafting best genetic control", () => {
    expect(geneticControl("grafting")).toBeGreaterThan(geneticControl("walk_away"));
  });
});

describe("beginnerFriendly", () => {
  it("walk away is beginner friendly", () => {
    expect(beginnerFriendly("walk_away")).toBe(true);
  });
  it("grafting is not", () => {
    expect(beginnerFriendly("grafting")).toBe(false);
  });
});

describe("requiresSeparateColony", () => {
  it("grafting requires separate colony", () => {
    expect(requiresSeparateColony("grafting")).toBe(true);
  });
  it("walk away does not", () => {
    expect(requiresSeparateColony("walk_away")).toBe(false);
  });
});

describe("keyTool", () => {
  it("grafting uses grafting needle", () => {
    expect(keyTool("grafting")).toBe("grafting_needle");
  });
});

describe("bestScenario", () => {
  it("walk away for emergency requeening", () => {
    expect(bestScenario("walk_away")).toBe("emergency_requeening");
  });
});

describe("queenRearingMethods", () => {
  it("returns 5 methods", () => {
    expect(queenRearingMethods()).toHaveLength(5);
  });
});
