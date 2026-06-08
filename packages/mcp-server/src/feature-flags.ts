export interface Flag {
  enabled: boolean;
  percentage?: number;
  allowlist?: string[];
}

export class FeatureFlags {
  private flags = new Map<string, Flag>();

  define(name: string, flag: Flag): void {
    this.flags.set(name, flag);
  }

  isEnabled(name: string, userId?: string): boolean {
    const flag = this.flags.get(name);
    if (!flag) return false;
    if (!flag.enabled) return false;
    if (userId && flag.allowlist && flag.allowlist.includes(userId)) return true;
    if (flag.percentage !== undefined) {
      return hashToPercent(name + (userId ?? "")) < flag.percentage;
    }
    return true;
  }

  setEnabled(name: string, enabled: boolean): void {
    const flag = this.flags.get(name);
    if (flag) flag.enabled = enabled;
  }

  listFlags(): Array<{ name: string; flag: Flag }> {
    return [...this.flags.entries()].map(([name, flag]) => ({ name, flag }));
  }

  get size(): number {
    return this.flags.size;
  }
}

function hashToPercent(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 100;
}
