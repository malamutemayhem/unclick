export type HullState = "fresh_green" | "fresh_brown" | "dried" | "powdered" | "extract";

export function hullWeightGPerLiter(state: HullState): number {
  const weights: Record<HullState, number> = {
    fresh_green: 200, fresh_brown: 250, dried: 100, powdered: 50, extract: 30,
  };
  return weights[state];
}

export function soakTimeHours(state: HullState): number {
  const hours: Record<HullState, number> = {
    fresh_green: 48, fresh_brown: 24, dried: 12, powdered: 4, extract: 1,
  };
  return hours[state];
}

export function simmerTimeMinutes(state: HullState): number {
  const minutes: Record<HullState, number> = {
    fresh_green: 120, fresh_brown: 90, dried: 60, powdered: 30, extract: 15,
  };
  return minutes[state];
}

export function colorDepth(state: HullState): number {
  const depths: Record<HullState, number> = {
    fresh_green: 3, fresh_brown: 5, dried: 4, powdered: 4, extract: 5,
  };
  return depths[state];
}

export function mordantRequired(): boolean {
  return false;
}

export function lightFastnessRating(): number {
  return 4;
}

export function washFastnessRating(): number {
  return 3;
}

export function stainingWarning(): boolean {
  return true;
}

export function costPerLiter(state: HullState): number {
  const costs: Record<HullState, number> = {
    fresh_green: 0.5, fresh_brown: 0.5, dried: 2, powdered: 5, extract: 10,
  };
  return costs[state];
}

export function hullStates(): HullState[] {
  return ["fresh_green", "fresh_brown", "dried", "powdered", "extract"];
}
