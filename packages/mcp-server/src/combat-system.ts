export interface CombatStats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critChance?: number;
  critMultiplier?: number;
}

export interface CombatAction {
  type: "attack" | "defend" | "special";
  name: string;
  power?: number;
  accuracy?: number;
}

export interface CombatResult {
  damage: number;
  isCrit: boolean;
  isHit: boolean;
  isKO: boolean;
  remainingHp: number;
}

export function calculateDamage(
  attacker: CombatStats,
  defender: CombatStats,
  action: CombatAction,
): CombatResult {
  const accuracy = action.accuracy ?? 1;
  const isHit = Math.random() < accuracy;

  if (!isHit) {
    return { damage: 0, isCrit: false, isHit: false, isKO: false, remainingHp: defender.hp };
  }

  const basePower = action.power ?? attacker.attack;
  const rawDamage = Math.max(1, basePower - defender.defense * 0.5);

  const critChance = attacker.critChance ?? 0.05;
  const isCrit = Math.random() < critChance;
  const critMult = isCrit ? (attacker.critMultiplier ?? 2) : 1;

  const variance = 0.85 + Math.random() * 0.3;
  const damage = Math.max(1, Math.floor(rawDamage * critMult * variance));

  const remainingHp = Math.max(0, defender.hp - damage);
  return { damage, isCrit, isHit: true, isKO: remainingHp <= 0, remainingHp };
}

export function determineTurnOrder(combatants: { id: string; stats: CombatStats }[]): string[] {
  return [...combatants]
    .sort((a, b) => b.stats.speed - a.stats.speed)
    .map((c) => c.id);
}

export function applyHealing(stats: CombatStats, amount: number): number {
  const healed = Math.min(amount, stats.maxHp - stats.hp);
  stats.hp += healed;
  return healed;
}

export function isAlive(stats: CombatStats): boolean {
  return stats.hp > 0;
}

export function hpPercentage(stats: CombatStats): number {
  return (stats.hp / stats.maxHp) * 100;
}

export class TurnTracker {
  private order: string[] = [];
  private index = 0;
  private round = 1;

  constructor(combatants: { id: string; stats: CombatStats }[]) {
    this.order = determineTurnOrder(combatants);
  }

  current(): string {
    return this.order[this.index];
  }

  next(): string {
    this.index++;
    if (this.index >= this.order.length) {
      this.index = 0;
      this.round++;
    }
    return this.order[this.index];
  }

  currentRound(): number {
    return this.round;
  }

  remove(id: string): void {
    const i = this.order.indexOf(id);
    if (i === -1) return;
    this.order.splice(i, 1);
    if (this.index >= this.order.length) this.index = 0;
  }

  remaining(): string[] {
    return [...this.order];
  }
}
