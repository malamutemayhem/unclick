export interface Skill {
  name: string;
  description: string;
  keywords: string[];
  handler: (input: string) => unknown;
}

export interface MatchResult {
  skill: Skill;
  score: number;
}

export class SkillRouter {
  private skills: Skill[] = [];

  register(skill: Skill): void {
    this.skills.push(skill);
  }

  unregister(name: string): boolean {
    const idx = this.skills.findIndex((s) => s.name === name);
    if (idx === -1) return false;
    this.skills.splice(idx, 1);
    return true;
  }

  match(query: string, threshold = 0.1): MatchResult | undefined {
    const results = this.matchAll(query, threshold);
    return results.length > 0 ? results[0] : undefined;
  }

  matchAll(query: string, threshold = 0.1): MatchResult[] {
    const queryTokens = new Set(query.toLowerCase().split(/\s+/).filter(Boolean));
    const results: MatchResult[] = [];

    for (const skill of this.skills) {
      const skillTokens = new Set([
        ...skill.keywords.map((k) => k.toLowerCase()),
        ...skill.description.toLowerCase().split(/\s+/),
      ]);
      const intersection = [...queryTokens].filter((t) => skillTokens.has(t));
      const score = queryTokens.size > 0 ? intersection.length / queryTokens.size : 0;
      if (score >= threshold) {
        results.push({ skill, score });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }

  route(query: string, threshold = 0.1): unknown | undefined {
    const best = this.match(query, threshold);
    if (!best) return undefined;
    return best.skill.handler(query);
  }

  list(): Skill[] {
    return [...this.skills];
  }

  get size(): number {
    return this.skills.length;
  }
}
