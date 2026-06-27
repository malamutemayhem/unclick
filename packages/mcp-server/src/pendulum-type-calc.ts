export type PendulumType = "simple" | "compound" | "torsion" | "conical" | "foucault";

export function accuracySecondsPerDay(pendulum: PendulumType): number {
  const m: Record<PendulumType, number> = {
    simple: 5, compound: 3, torsion: 8, conical: 10, foucault: 15,
  };
  return m[pendulum];
}

export function periodStability(pendulum: PendulumType): number {
  const m: Record<PendulumType, number> = {
    simple: 7, compound: 9, torsion: 6, conical: 5, foucault: 4,
  };
  return m[pendulum];
}

export function temperatureSensitivity(pendulum: PendulumType): number {
  const m: Record<PendulumType, number> = {
    simple: 7, compound: 4, torsion: 5, conical: 6, foucault: 8,
  };
  return m[pendulum];
}

export function lengthMeters(pendulum: PendulumType): number {
  const m: Record<PendulumType, number> = {
    simple: 1, compound: 0.8, torsion: 0.3, conical: 1.5, foucault: 20,
  };
  return m[pendulum];
}

export function spaceRequired(pendulum: PendulumType): number {
  const m: Record<PendulumType, number> = {
    simple: 4, compound: 3, torsion: 2, conical: 5, foucault: 10,
  };
  return m[pendulum];
}

export function demonstratesRotation(pendulum: PendulumType): boolean {
  const m: Record<PendulumType, boolean> = {
    simple: false, compound: false, torsion: false, conical: false, foucault: true,
  };
  return m[pendulum];
}

export function enclosable(pendulum: PendulumType): boolean {
  const m: Record<PendulumType, boolean> = {
    simple: true, compound: true, torsion: true, conical: false, foucault: false,
  };
  return m[pendulum];
}

export function bestApplication(pendulum: PendulumType): string {
  const m: Record<PendulumType, string> = {
    simple: "wall_clock", compound: "precision_clock", torsion: "mantle_clock",
    conical: "governor", foucault: "museum_exhibit",
  };
  return m[pendulum];
}

export function buildCost(pendulum: PendulumType): number {
  const m: Record<PendulumType, number> = {
    simple: 30, compound: 100, torsion: 50, conical: 80, foucault: 5000,
  };
  return m[pendulum];
}

export function pendulumTypes(): PendulumType[] {
  return ["simple", "compound", "torsion", "conical", "foucault"];
}
