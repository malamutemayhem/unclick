export interface FeatureFlag {
  name: string;
  enabled: boolean;
  percentage?: number;
  allowList?: string[];
  denyList?: string[];
  metadata?: Record<string, unknown>;
}

export class FeatureFlagManager {
  private flags = new Map<string, FeatureFlag>();

  register(flag: FeatureFlag): void {
    this.flags.set(flag.name, flag);
  }

  isEnabled(name: string, userId?: string): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    if (!flag.enabled) return false;
    if (userId && flag.denyList?.includes(userId)) return false;
    if (userId && flag.allowList?.includes(userId)) return true;
    if (flag.percentage !== undefined) {
      const hash = simpleHash(userId ?? name);
      return (hash % 100) < flag.percentage;
    }
    return true;
  }

  toggle(name: string): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    flag.enabled = !flag.enabled;
    return true;
  }

  setPercentage(name: string, pct: number): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    flag.percentage = Math.max(0, Math.min(100, pct));
    return true;
  }

  getFlag(name: string): FeatureFlag | undefined {
    return this.flags.get(name);
  }

  listFlags(): FeatureFlag[] {
    return [...this.flags.values()];
  }

  enabledFlags(userId?: string): string[] {
    return [...this.flags.values()]
      .filter((f) => this.isEnabled(f.name, userId))
      .map((f) => f.name);
  }

  remove(name: string): boolean {
    return this.flags.delete(name);
  }

  clear(): void {
    this.flags.clear();
  }
}

function simpleHash(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}
