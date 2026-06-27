export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  category?: string;
  points?: number;
  hidden?: boolean;
  tiers?: number[];
}

export interface UnlockedAchievement {
  id: string;
  tier: number;
  unlockedAt: number;
}

export class AchievementTracker {
  private defs: Map<string, AchievementDef> = new Map();
  private progress: Map<string, number> = new Map();
  private unlocked: Map<string, UnlockedAchievement> = new Map();

  register(def: AchievementDef): void {
    this.defs.set(def.id, def);
    this.progress.set(def.id, 0);
  }

  increment(id: string, amount = 1): UnlockedAchievement | null {
    const def = this.defs.get(id);
    if (!def) return null;

    const current = (this.progress.get(id) ?? 0) + amount;
    this.progress.set(id, current);

    const tiers = def.tiers ?? [1];
    const existing = this.unlocked.get(id);
    const currentTier = existing?.tier ?? 0;

    for (let t = tiers.length - 1; t >= 0; t--) {
      if (current >= tiers[t] && t + 1 > currentTier) {
        const unlock: UnlockedAchievement = {
          id,
          tier: t + 1,
          unlockedAt: Date.now(),
        };
        this.unlocked.set(id, unlock);
        return unlock;
      }
    }

    return null;
  }

  getProgress(id: string): number {
    return this.progress.get(id) ?? 0;
  }

  isUnlocked(id: string): boolean {
    return this.unlocked.has(id);
  }

  getTier(id: string): number {
    return this.unlocked.get(id)?.tier ?? 0;
  }

  unlockedCount(): number {
    return this.unlocked.size;
  }

  totalCount(): number {
    return this.defs.size;
  }

  totalPoints(): number {
    let total = 0;
    for (const [id, unlock] of this.unlocked) {
      const def = this.defs.get(id);
      total += (def?.points ?? 0) * unlock.tier;
    }
    return total;
  }

  completionPercentage(): number {
    if (this.defs.size === 0) return 0;
    return (this.unlocked.size / this.defs.size) * 100;
  }

  getByCategory(category: string): AchievementDef[] {
    return Array.from(this.defs.values()).filter((d) => d.category === category);
  }

  getUnlocked(): UnlockedAchievement[] {
    return Array.from(this.unlocked.values());
  }

  getLocked(): AchievementDef[] {
    return Array.from(this.defs.values()).filter((d) => !this.unlocked.has(d.id));
  }

  getVisible(): AchievementDef[] {
    return Array.from(this.defs.values()).filter(
      (d) => !d.hidden || this.unlocked.has(d.id),
    );
  }

  reset(id: string): void {
    this.progress.set(id, 0);
    this.unlocked.delete(id);
  }

  resetAll(): void {
    for (const id of this.defs.keys()) {
      this.progress.set(id, 0);
    }
    this.unlocked.clear();
  }
}
