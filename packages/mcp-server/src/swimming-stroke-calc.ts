export type SwimmingStroke = "freestyle" | "backstroke" | "breaststroke" | "butterfly" | "sidestroke";

export function speedKmh(stroke: SwimmingStroke): number {
  const m: Record<SwimmingStroke, number> = {
    freestyle: 7.5, backstroke: 6.5, breaststroke: 5.5, butterfly: 7.0, sidestroke: 4.0,
  };
  return m[stroke];
}

export function caloriesPerHour(stroke: SwimmingStroke): number {
  const m: Record<SwimmingStroke, number> = {
    freestyle: 500, backstroke: 400, breaststroke: 450, butterfly: 700, sidestroke: 300,
  };
  return m[stroke];
}

export function learningDifficulty(stroke: SwimmingStroke): number {
  const m: Record<SwimmingStroke, number> = {
    freestyle: 3, backstroke: 4, breaststroke: 5, butterfly: 10, sidestroke: 2,
  };
  return m[stroke];
}

export function shoulderStress(stroke: SwimmingStroke): number {
  const m: Record<SwimmingStroke, number> = {
    freestyle: 6, backstroke: 5, breaststroke: 3, butterfly: 10, sidestroke: 2,
  };
  return m[stroke];
}

export function breathingEase(stroke: SwimmingStroke): number {
  const m: Record<SwimmingStroke, number> = {
    freestyle: 6, backstroke: 10, breaststroke: 8, butterfly: 3, sidestroke: 9,
  };
  return m[stroke];
}

export function faceInWater(stroke: SwimmingStroke): boolean {
  const m: Record<SwimmingStroke, boolean> = {
    freestyle: true, backstroke: false, breaststroke: true, butterfly: true, sidestroke: false,
  };
  return m[stroke];
}

export function olympicEvent(stroke: SwimmingStroke): boolean {
  const m: Record<SwimmingStroke, boolean> = {
    freestyle: true, backstroke: true, breaststroke: true, butterfly: true, sidestroke: false,
  };
  return m[stroke];
}

export function bestApplication(stroke: SwimmingStroke): string {
  const m: Record<SwimmingStroke, string> = {
    freestyle: "racing", backstroke: "recovery", breaststroke: "endurance",
    butterfly: "sprint", sidestroke: "lifesaving",
  };
  return m[stroke];
}

export function muscleGroupsUsed(stroke: SwimmingStroke): number {
  const m: Record<SwimmingStroke, number> = {
    freestyle: 7, backstroke: 6, breaststroke: 8, butterfly: 10, sidestroke: 5,
  };
  return m[stroke];
}

export function swimmingStrokes(): SwimmingStroke[] {
  return ["freestyle", "backstroke", "breaststroke", "butterfly", "sidestroke"];
}
