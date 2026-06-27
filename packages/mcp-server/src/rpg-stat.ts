export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Character {
  name: string;
  level: number;
  class_: string;
  abilities: AbilityScores;
  hp: number;
  maxHp: number;
  ac: number;
}

export function abilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function proficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

export function rollAbilityScore(seed?: number): number {
  let s = seed ?? Math.floor(Math.random() * 1e9);
  const rng = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s % 6) + 1; };
  const rolls = [rng(), rng(), rng(), rng()];
  rolls.sort((a, b) => b - a);
  return rolls[0] + rolls[1] + rolls[2];
}

export function generateAbilityScores(seed?: number): AbilityScores {
  const base = seed ?? 42;
  return {
    strength: rollAbilityScore(base),
    dexterity: rollAbilityScore(base + 100),
    constitution: rollAbilityScore(base + 200),
    intelligence: rollAbilityScore(base + 300),
    wisdom: rollAbilityScore(base + 400),
    charisma: rollAbilityScore(base + 500),
  };
}

export function pointBuy(scores: AbilityScores): number {
  let total = 0;
  const vals = Object.values(scores);
  for (const score of vals) {
    if (score <= 13) total += score - 8;
    else if (score === 14) total += 7;
    else if (score === 15) total += 9;
    else total += 9 + (score - 15) * 2;
  }
  return total;
}

export function isValidPointBuy(scores: AbilityScores, budget = 27): boolean {
  const vals = Object.values(scores);
  if (vals.some(v => v < 8 || v > 15)) return false;
  return pointBuy(scores) <= budget;
}

export function hitPoints(level: number, hitDie: number, conMod: number): number {
  const firstLevel = hitDie + conMod;
  const avgRoll = Math.floor(hitDie / 2) + 1;
  const remaining = (level - 1) * (avgRoll + conMod);
  return Math.max(1, firstLevel + remaining);
}

export function armorClass(dexMod: number, armorBase: number, shieldBonus = 0, maxDex?: number): number {
  const effectiveDex = maxDex !== undefined ? Math.min(dexMod, maxDex) : dexMod;
  return armorBase + effectiveDex + shieldBonus;
}

export function attackBonus(abilityMod: number, profBonus: number, magicBonus = 0): number {
  return abilityMod + profBonus + magicBonus;
}

export function saveDC(abilityMod: number, profBonus: number): number {
  return 8 + abilityMod + profBonus;
}

export function passivePerception(wisMod: number, profBonus: number, proficient: boolean): number {
  return 10 + wisMod + (proficient ? profBonus : 0);
}

export function initiative(dexMod: number, bonus = 0): number {
  return dexMod + bonus;
}

export function carryingCapacity(strength: number): number {
  return strength * 15;
}

export function encumbered(strength: number): number {
  return strength * 5;
}

export function heavilyEncumbered(strength: number): number {
  return strength * 10;
}

export function experienceForLevel(level: number): number {
  const xpTable = [0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000,
    64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000];
  return xpTable[Math.min(level, 20)] ?? 0;
}

export function levelFromXP(xp: number): number {
  for (let l = 20; l >= 1; l--) {
    if (xp >= experienceForLevel(l)) return l;
  }
  return 1;
}

export function challengeRating(cr: number): { xp: number; profBonus: number } {
  const crXP: Record<number, number> = {
    0: 10, 0.125: 25, 0.25: 50, 0.5: 100,
    1: 200, 2: 450, 3: 700, 4: 1100, 5: 1800,
    6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900,
    11: 7200, 12: 8400, 13: 10000, 14: 11500, 15: 13000,
    16: 15000, 17: 18000, 18: 20000, 19: 22000, 20: 25000,
  };
  const profBonus = Math.max(2, Math.ceil(cr / 4) + 1);
  return { xp: crXP[cr] ?? 0, profBonus: Math.min(profBonus, 9) };
}

export function encounterDifficulty(partyLevels: number[], monsterXP: number): string {
  const thresholds = partyLevels.map(l => {
    const easy = l * 25;
    const medium = l * 50;
    const hard = l * 75;
    const deadly = l * 100;
    return { easy, medium, hard, deadly };
  });
  const totals = thresholds.reduce((acc, t) => ({
    easy: acc.easy + t.easy,
    medium: acc.medium + t.medium,
    hard: acc.hard + t.hard,
    deadly: acc.deadly + t.deadly,
  }), { easy: 0, medium: 0, hard: 0, deadly: 0 });

  if (monsterXP >= totals.deadly) return "deadly";
  if (monsterXP >= totals.hard) return "hard";
  if (monsterXP >= totals.medium) return "medium";
  return "easy";
}

export function formatScores(scores: AbilityScores): string {
  const keys: (keyof AbilityScores)[] = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
  return keys.map(k => {
    const mod = abilityModifier(scores[k]);
    const sign = mod >= 0 ? "+" : "";
    return `${k.substring(0, 3).toUpperCase()}: ${scores[k]} (${sign}${mod})`;
  }).join(" | ");
}
