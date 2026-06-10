export type ShootingStance = "square" | "open" | "closed" | "natural" | "oblique";

export function stability(s: ShootingStance): number {
  const m: Record<ShootingStance, number> = {
    square: 8, open: 7, closed: 6, natural: 9, oblique: 5,
  };
  return m[s];
}

export function consistency(s: ShootingStance): number {
  const m: Record<ShootingStance, number> = {
    square: 9, open: 7, closed: 6, natural: 8, oblique: 5,
  };
  return m[s];
}

export function stringClearance(s: ShootingStance): number {
  const m: Record<ShootingStance, number> = {
    square: 5, open: 9, closed: 4, natural: 7, oblique: 8,
  };
  return m[s];
}

export function comfortLevel(s: ShootingStance): number {
  const m: Record<ShootingStance, number> = {
    square: 7, open: 8, closed: 5, natural: 10, oblique: 6,
  };
  return m[s];
}

export function learningEase(s: ShootingStance): number {
  const m: Record<ShootingStance, number> = {
    square: 10, open: 7, closed: 6, natural: 8, oblique: 5,
  };
  return m[s];
}

export function beginnerRecommended(s: ShootingStance): boolean {
  const m: Record<ShootingStance, boolean> = {
    square: true, open: false, closed: false, natural: true, oblique: false,
  };
  return m[s];
}

export function usedInCompetition(s: ShootingStance): boolean {
  const m: Record<ShootingStance, boolean> = {
    square: true, open: true, closed: true, natural: true, oblique: true,
  };
  return m[s];
}

export function bodyAlignment(s: ShootingStance): string {
  const m: Record<ShootingStance, string> = {
    square: "perpendicular_to_target", open: "front_foot_back",
    closed: "front_foot_forward", natural: "slight_open_relaxed",
    oblique: "angled_45_degrees",
  };
  return m[s];
}

export function bestFor(s: ShootingStance): string {
  const m: Record<ShootingStance, string> = {
    square: "beginners_consistency", open: "string_clearance",
    closed: "wind_resistance", natural: "comfort_endurance",
    oblique: "instinctive_shooting",
  };
  return m[s];
}

export function shootingStances(): ShootingStance[] {
  return ["square", "open", "closed", "natural", "oblique"];
}
