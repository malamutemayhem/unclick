import { describe, it, expect } from "vitest";
import { SkillTree } from "../skill-tree.js";
import type { Skill } from "../skill-tree.js";

const skills: Skill[] = [
  { id: "str", name: "Strength", description: "Increase attack", maxLevel: 5, cost: 1, effects: { attack: 2 } },
  { id: "def", name: "Defense", description: "Increase defense", maxLevel: 3, cost: 2, effects: { defense: 3 } },
  { id: "rage", name: "Rage", description: "Powerful attack", maxLevel: 1, cost: 3, prerequisites: ["str"], effects: { attack: 10 } },
];

describe("SkillTree", () => {
  it("starts with no unlocked skills", () => {
    const tree = new SkillTree(skills);
    expect(tree.isUnlocked("str")).toBe(false);
    expect(tree.getLevel("str")).toBe(0);
  });

  it("unlocks skills with points", () => {
    const tree = new SkillTree(skills, 5);
    expect(tree.unlock("str")).toBe(true);
    expect(tree.isUnlocked("str")).toBe(true);
    expect(tree.getLevel("str")).toBe(1);
    expect(tree.availablePoints()).toBe(4);
  });

  it("levels up skills", () => {
    const tree = new SkillTree(skills, 10);
    tree.unlock("str");
    tree.unlock("str");
    expect(tree.getLevel("str")).toBe(2);
  });

  it("prevents exceeding max level", () => {
    const tree = new SkillTree(skills, 100);
    for (let i = 0; i < 10; i++) tree.unlock("str");
    expect(tree.getLevel("str")).toBe(5);
    expect(tree.isMaxed("str")).toBe(true);
  });

  it("enforces prerequisites", () => {
    const tree = new SkillTree(skills, 10);
    expect(tree.canUnlock("rage")).toBe(false);
    tree.unlock("str");
    expect(tree.canUnlock("rage")).toBe(true);
  });

  it("prevents unlock without points", () => {
    const tree = new SkillTree(skills, 0);
    expect(tree.canUnlock("str")).toBe(false);
    expect(tree.unlock("str")).toBe(false);
  });

  it("computes aggregate effects", () => {
    const tree = new SkillTree(skills, 10);
    tree.unlock("str");
    tree.unlock("str");
    const effects = tree.getEffects();
    expect(effects.get("attack")).toBe(4);
  });

  it("lists unlocked skills", () => {
    const tree = new SkillTree(skills, 10);
    tree.unlock("str");
    tree.unlock("def");
    expect(tree.unlockedSkills()).toHaveLength(2);
  });

  it("lists available skills", () => {
    const tree = new SkillTree(skills, 10);
    const avail = tree.availableSkills();
    expect(avail.map((s) => s.id)).toContain("str");
    expect(avail.map((s) => s.id)).toContain("def");
    expect(avail.map((s) => s.id)).not.toContain("rage");
  });

  it("resets and refunds points", () => {
    const tree = new SkillTree(skills, 10);
    tree.unlock("str");
    tree.unlock("str");
    tree.unlock("def");
    const spent = tree.totalInvested();
    tree.reset();
    expect(tree.getLevel("str")).toBe(0);
    expect(tree.availablePoints()).toBe(10 - spent + spent);
  });

  it("addPoints increases available", () => {
    const tree = new SkillTree(skills, 0);
    tree.addPoints(5);
    expect(tree.availablePoints()).toBe(5);
  });
});
