import { describe, it, expect } from "vitest";
import {
  abilityModifier, proficiencyBonus, rollAbilityScore,
  generateAbilityScores, pointBuy, isValidPointBuy,
  hitPoints, armorClass, attackBonus, saveDC,
  passivePerception, initiative, carryingCapacity,
  experienceForLevel, levelFromXP, challengeRating,
  encounterDifficulty, formatScores,
} from "../rpg-stat.js";

describe("abilityModifier", () => {
  it("10 gives +0", () => {
    expect(abilityModifier(10)).toBe(0);
  });

  it("20 gives +5", () => {
    expect(abilityModifier(20)).toBe(5);
  });

  it("8 gives -1", () => {
    expect(abilityModifier(8)).toBe(-1);
  });
});

describe("proficiencyBonus", () => {
  it("+2 at level 1", () => {
    expect(proficiencyBonus(1)).toBe(2);
  });

  it("+6 at level 20", () => {
    expect(proficiencyBonus(20)).toBe(6);
  });
});

describe("rollAbilityScore", () => {
  it("between 3 and 18", () => {
    const score = rollAbilityScore(42);
    expect(score).toBeGreaterThanOrEqual(3);
    expect(score).toBeLessThanOrEqual(18);
  });

  it("deterministic with seed", () => {
    expect(rollAbilityScore(123)).toBe(rollAbilityScore(123));
  });
});

describe("generateAbilityScores", () => {
  it("generates all 6 scores", () => {
    const scores = generateAbilityScores(42);
    expect(scores.strength).toBeGreaterThanOrEqual(3);
    expect(scores.dexterity).toBeGreaterThanOrEqual(3);
    expect(scores.charisma).toBeGreaterThanOrEqual(3);
  });
});

describe("pointBuy", () => {
  it("standard array costs 27", () => {
    const scores = { strength: 15, dexterity: 14, constitution: 13, intelligence: 12, wisdom: 10, charisma: 8 };
    expect(pointBuy(scores)).toBe(27);
  });
});

describe("isValidPointBuy", () => {
  it("valid standard array", () => {
    const scores = { strength: 15, dexterity: 14, constitution: 13, intelligence: 12, wisdom: 10, charisma: 8 };
    expect(isValidPointBuy(scores)).toBe(true);
  });

  it("invalid with scores > 15", () => {
    const scores = { strength: 18, dexterity: 14, constitution: 13, intelligence: 12, wisdom: 10, charisma: 8 };
    expect(isValidPointBuy(scores)).toBe(false);
  });
});

describe("hitPoints", () => {
  it("level 1 fighter with d10", () => {
    expect(hitPoints(1, 10, 2)).toBe(12);
  });

  it("increases with level", () => {
    expect(hitPoints(5, 10, 2)).toBeGreaterThan(hitPoints(1, 10, 2));
  });
});

describe("armorClass", () => {
  it("chain mail base 16 no dex", () => {
    expect(armorClass(3, 16, 0, 0)).toBe(16);
  });

  it("adds shield", () => {
    expect(armorClass(2, 12, 2)).toBe(16);
  });
});

describe("attackBonus / saveDC", () => {
  it("computes attack bonus", () => {
    expect(attackBonus(3, 2, 1)).toBe(6);
  });

  it("computes save DC", () => {
    expect(saveDC(4, 3)).toBe(15);
  });
});

describe("passivePerception", () => {
  it("10 + wis + prof if proficient", () => {
    expect(passivePerception(2, 3, true)).toBe(15);
  });
});

describe("carryingCapacity", () => {
  it("strength * 15", () => {
    expect(carryingCapacity(15)).toBe(225);
  });
});

describe("experienceForLevel / levelFromXP", () => {
  it("level 2 needs 300 XP", () => {
    expect(experienceForLevel(2)).toBe(300);
  });

  it("300 XP = level 2", () => {
    expect(levelFromXP(300)).toBe(2);
  });
});

describe("challengeRating", () => {
  it("CR 1 gives 200 XP", () => {
    expect(challengeRating(1).xp).toBe(200);
  });
});

describe("encounterDifficulty", () => {
  it("classifies encounter", () => {
    const difficulty = encounterDifficulty([5, 5, 5, 5], 2000);
    expect(["easy", "medium", "hard", "deadly"]).toContain(difficulty);
  });
});

describe("formatScores", () => {
  it("formats ability scores", () => {
    const scores = generateAbilityScores(42);
    const formatted = formatScores(scores);
    expect(formatted).toContain("STR");
    expect(formatted).toContain("DEX");
  });
});
