export interface Skill {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  cost: number;
  prerequisites?: string[];
  effects?: Record<string, number>;
}

export class SkillTree {
  private skills: Map<string, Skill> = new Map();
  private levels: Map<string, number> = new Map();
  private points: number;

  constructor(skills: Skill[], initialPoints = 0) {
    for (const skill of skills) {
      this.skills.set(skill.id, skill);
      this.levels.set(skill.id, 0);
    }
    this.points = initialPoints;
  }

  canUnlock(skillId: string): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;
    const currentLevel = this.levels.get(skillId) ?? 0;
    if (currentLevel >= skill.maxLevel) return false;
    if (this.points < skill.cost) return false;
    if (skill.prerequisites) {
      for (const prereq of skill.prerequisites) {
        if ((this.levels.get(prereq) ?? 0) === 0) return false;
      }
    }
    return true;
  }

  unlock(skillId: string): boolean {
    if (!this.canUnlock(skillId)) return false;
    const skill = this.skills.get(skillId)!;
    this.levels.set(skillId, (this.levels.get(skillId) ?? 0) + 1);
    this.points -= skill.cost;
    return true;
  }

  getLevel(skillId: string): number {
    return this.levels.get(skillId) ?? 0;
  }

  isUnlocked(skillId: string): boolean {
    return (this.levels.get(skillId) ?? 0) > 0;
  }

  isMaxed(skillId: string): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;
    return (this.levels.get(skillId) ?? 0) >= skill.maxLevel;
  }

  availablePoints(): number {
    return this.points;
  }

  addPoints(amount: number): void {
    this.points += amount;
  }

  getEffects(): Map<string, number> {
    const effects = new Map<string, number>();
    for (const [skillId, level] of this.levels) {
      if (level === 0) continue;
      const skill = this.skills.get(skillId);
      if (!skill?.effects) continue;
      for (const [key, value] of Object.entries(skill.effects)) {
        effects.set(key, (effects.get(key) ?? 0) + value * level);
      }
    }
    return effects;
  }

  unlockedSkills(): Skill[] {
    return Array.from(this.skills.values()).filter(
      (s) => (this.levels.get(s.id) ?? 0) > 0,
    );
  }

  availableSkills(): Skill[] {
    return Array.from(this.skills.values()).filter((s) => this.canUnlock(s.id));
  }

  totalInvested(): number {
    let total = 0;
    for (const [skillId, level] of this.levels) {
      const skill = this.skills.get(skillId);
      if (skill) total += skill.cost * level;
    }
    return total;
  }

  reset(): void {
    this.points += this.totalInvested();
    for (const id of this.levels.keys()) {
      this.levels.set(id, 0);
    }
  }
}
