export type GymnasticsApparatus = "floor" | "vault" | "uneven_bars" | "balance_beam" | "pommel_horse";

export function routineDurationSec(g: GymnasticsApparatus): number {
  const m: Record<GymnasticsApparatus, number> = {
    floor: 90, vault: 6, uneven_bars: 40, balance_beam: 90, pommel_horse: 60,
  };
  return m[g];
}

export function strengthDemand(g: GymnasticsApparatus): number {
  const m: Record<GymnasticsApparatus, number> = {
    floor: 7, vault: 9, uneven_bars: 9, balance_beam: 6, pommel_horse: 10,
  };
  return m[g];
}

export function flexibilityDemand(g: GymnasticsApparatus): number {
  const m: Record<GymnasticsApparatus, number> = {
    floor: 9, vault: 5, uneven_bars: 7, balance_beam: 10, pommel_horse: 4,
  };
  return m[g];
}

export function injuryRisk(g: GymnasticsApparatus): number {
  const m: Record<GymnasticsApparatus, number> = {
    floor: 6, vault: 9, uneven_bars: 8, balance_beam: 7, pommel_horse: 5,
  };
  return m[g];
}

export function maxScore(g: GymnasticsApparatus): number {
  const m: Record<GymnasticsApparatus, number> = {
    floor: 16, vault: 16, uneven_bars: 16, balance_beam: 16, pommel_horse: 16,
  };
  return m[g];
}

export function womenOnly(g: GymnasticsApparatus): boolean {
  const m: Record<GymnasticsApparatus, boolean> = {
    floor: false, vault: false, uneven_bars: true, balance_beam: true, pommel_horse: false,
  };
  return m[g];
}

export function menOnly(g: GymnasticsApparatus): boolean {
  const m: Record<GymnasticsApparatus, boolean> = {
    floor: false, vault: false, uneven_bars: false, balance_beam: false, pommel_horse: true,
  };
  return m[g];
}

export function apparatusHeight(g: GymnasticsApparatus): string {
  const m: Record<GymnasticsApparatus, string> = {
    floor: "ground_level", vault: "135cm", uneven_bars: "170_250cm",
    balance_beam: "125cm", pommel_horse: "115cm",
  };
  return m[g];
}

export function keySkill(g: GymnasticsApparatus): string {
  const m: Record<GymnasticsApparatus, string> = {
    floor: "tumbling_pass", vault: "tsukahara", uneven_bars: "release_move",
    balance_beam: "back_handspring", pommel_horse: "scissors",
  };
  return m[g];
}

export function gymnasticsApparatuses(): GymnasticsApparatus[] {
  return ["floor", "vault", "uneven_bars", "balance_beam", "pommel_horse"];
}
