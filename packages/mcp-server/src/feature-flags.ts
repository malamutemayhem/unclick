export interface FeatureFlag {
  name: string;
  enabled: boolean;
  rolloutPercent?: number;
  targetUsers?: string[];
  metadata?: Record<string, unknown>;
}

export class FeatureFlagManager {
  private flags = new Map<string, FeatureFlag>();

  define(flag: FeatureFlag): void {
    this.flags.set(flag.name, flag);
  }

  isEnabled(name: string, userId?: string): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    if (!flag.enabled) return false;
    if (flag.targetUsers && userId) {
      return flag.targetUsers.includes(userId);
    }
    if (flag.rolloutPercent !== undefined && userId) {
      const hash = this.hashUser(userId, name);
      return hash < flag.rolloutPercent;
    }
    if (flag.targetUsers && !userId) return false;
    if (flag.rolloutPercent !== undefined && !userId) return false;
    return flag.enabled;
  }

  toggle(name: string): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    flag.enabled = !flag.enabled;
    return true;
  }

  enable(name: string): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    flag.enabled = true;
    return true;
  }

  disable(name: string): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    flag.enabled = false;
    return true;
  }

  list(): FeatureFlag[] {
    return [...this.flags.values()];
  }

  get(name: string): FeatureFlag | undefined {
    return this.flags.get(name);
  }

  remove(name: string): boolean {
    return this.flags.delete(name);
  }

  enabledFlags(userId?: string): string[] {
    return this.list().filter((f) => this.isEnabled(f.name, userId)).map((f) => f.name);
  }

  private hashUser(userId: string, flagName: string): number {
    let hash = 0;
    const str = `${userId}:${flagName}`;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) & 0x7fffffff;
    }
    return hash % 100;
  }
}
