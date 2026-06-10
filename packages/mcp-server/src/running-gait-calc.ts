export type RunningGait = "heel_strike" | "midfoot" | "forefoot" | "overstriding" | "pose_method";

export function groundContactMs(g: RunningGait): number {
  const m: Record<RunningGait, number> = {
    heel_strike: 250, midfoot: 220, forefoot: 200, overstriding: 280, pose_method: 190,
  };
  return m[g];
}

export function impactForce(g: RunningGait): number {
  const m: Record<RunningGait, number> = {
    heel_strike: 8, midfoot: 6, forefoot: 5, overstriding: 9, pose_method: 4,
  };
  return m[g];
}

export function energyEfficiency(g: RunningGait): number {
  const m: Record<RunningGait, number> = {
    heel_strike: 5, midfoot: 7, forefoot: 8, overstriding: 3, pose_method: 9,
  };
  return m[g];
}

export function injuryRisk(g: RunningGait): number {
  const m: Record<RunningGait, number> = {
    heel_strike: 7, midfoot: 4, forefoot: 5, overstriding: 9, pose_method: 3,
  };
  return m[g];
}

export function cadenceOptimal(g: RunningGait): number {
  const m: Record<RunningGait, number> = {
    heel_strike: 160, midfoot: 175, forefoot: 180, overstriding: 150, pose_method: 185,
  };
  return m[g];
}

export function naturalForBeginner(g: RunningGait): boolean {
  const m: Record<RunningGait, boolean> = {
    heel_strike: true, midfoot: false, forefoot: false, overstriding: true, pose_method: false,
  };
  return m[g];
}

export function requiresCoaching(g: RunningGait): boolean {
  const m: Record<RunningGait, boolean> = {
    heel_strike: false, midfoot: true, forefoot: true, overstriding: false, pose_method: true,
  };
  return m[g];
}

export function primaryMuscle(g: RunningGait): string {
  const m: Record<RunningGait, string> = {
    heel_strike: "quadriceps", midfoot: "glutes", forefoot: "calves",
    overstriding: "hip_flexors", pose_method: "hamstrings",
  };
  return m[g];
}

export function bestTerrain(g: RunningGait): string {
  const m: Record<RunningGait, string> = {
    heel_strike: "road", midfoot: "mixed", forefoot: "track",
    overstriding: "downhill", pose_method: "trail",
  };
  return m[g];
}

export function runningGaits(): RunningGait[] {
  return ["heel_strike", "midfoot", "forefoot", "overstriding", "pose_method"];
}
