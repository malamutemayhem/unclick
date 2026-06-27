import { describe, it, expect } from "vitest";
import {
  calculateDamage, determineTurnOrder, applyHealing,
  isAlive, hpPercentage, TurnTracker,
} from "../combat-system.js";
import type { CombatStats, CombatAction } from "../combat-system.js";

const attacker: CombatStats = { hp: 100, maxHp: 100, attack: 20, defense: 5, speed: 10 };
const defender: CombatStats = { hp: 80, maxHp: 80, attack: 15, defense: 10, speed: 8 };

describe("calculateDamage", () => {
  it("deals positive damage on hit", () => {
    const action: CombatAction = { type: "attack", name: "Strike", accuracy: 1 };
    const result = calculateDamage(attacker, defender, action);
    expect(result.isHit).toBe(true);
    expect(result.damage).toBeGreaterThan(0);
    expect(result.remainingHp).toBeLessThan(defender.hp);
  });

  it("can miss with low accuracy", () => {
    const action: CombatAction = { type: "attack", name: "Wild Swing", accuracy: 0 };
    const result = calculateDamage(attacker, defender, action);
    expect(result.isHit).toBe(false);
    expect(result.damage).toBe(0);
  });

  it("detects KO", () => {
    const weakDefender: CombatStats = { hp: 1, maxHp: 100, attack: 5, defense: 0, speed: 1 };
    const action: CombatAction = { type: "attack", name: "Strike", accuracy: 1, power: 50 };
    const result = calculateDamage(attacker, weakDefender, action);
    expect(result.isKO).toBe(true);
    expect(result.remainingHp).toBe(0);
  });

  it("uses action power when provided", () => {
    const action: CombatAction = { type: "special", name: "Fireball", accuracy: 1, power: 50 };
    const result = calculateDamage(attacker, defender, action);
    expect(result.damage).toBeGreaterThan(0);
  });
});

describe("determineTurnOrder", () => {
  it("orders by speed descending", () => {
    const order = determineTurnOrder([
      { id: "slow", stats: { ...defender, speed: 3 } },
      { id: "fast", stats: { ...attacker, speed: 15 } },
      { id: "mid", stats: { ...attacker, speed: 8 } },
    ]);
    expect(order[0]).toBe("fast");
    expect(order[2]).toBe("slow");
  });
});

describe("applyHealing", () => {
  it("heals up to max", () => {
    const stats = { ...defender, hp: 50 };
    const healed = applyHealing(stats, 100);
    expect(stats.hp).toBe(80);
    expect(healed).toBe(30);
  });
});

describe("utility functions", () => {
  it("isAlive checks hp", () => {
    expect(isAlive(attacker)).toBe(true);
    expect(isAlive({ ...attacker, hp: 0 })).toBe(false);
  });

  it("hpPercentage computes correctly", () => {
    expect(hpPercentage({ ...attacker, hp: 50 })).toBe(50);
  });
});

describe("TurnTracker", () => {
  it("cycles through combatants", () => {
    const tracker = new TurnTracker([
      { id: "a", stats: { ...attacker, speed: 10 } },
      { id: "b", stats: { ...defender, speed: 5 } },
    ]);
    expect(tracker.current()).toBe("a");
    expect(tracker.next()).toBe("b");
    expect(tracker.next()).toBe("a");
    expect(tracker.currentRound()).toBe(2);
  });

  it("removes defeated combatants", () => {
    const tracker = new TurnTracker([
      { id: "a", stats: { ...attacker, speed: 10 } },
      { id: "b", stats: { ...defender, speed: 5 } },
    ]);
    tracker.remove("b");
    expect(tracker.remaining()).toEqual(["a"]);
  });
});
