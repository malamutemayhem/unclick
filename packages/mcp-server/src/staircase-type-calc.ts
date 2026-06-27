export type StaircaseType = "straight" | "l_shaped" | "spiral" | "curved" | "floating";

export function spaceRequired(stair: StaircaseType): number {
  const m: Record<StaircaseType, number> = {
    straight: 8, l_shaped: 6, spiral: 3, curved: 7, floating: 7,
  };
  return m[stair];
}

export function buildDifficulty(stair: StaircaseType): number {
  const m: Record<StaircaseType, number> = {
    straight: 2, l_shaped: 5, spiral: 7, curved: 9, floating: 8,
  };
  return m[stair];
}

export function safetyRating(stair: StaircaseType): number {
  const m: Record<StaircaseType, number> = {
    straight: 9, l_shaped: 8, spiral: 5, curved: 7, floating: 6,
  };
  return m[stair];
}

export function aestheticAppeal(stair: StaircaseType): number {
  const m: Record<StaircaseType, number> = {
    straight: 4, l_shaped: 5, spiral: 8, curved: 10, floating: 9,
  };
  return m[stair];
}

export function maxFloors(stair: StaircaseType): number {
  const m: Record<StaircaseType, number> = {
    straight: 4, l_shaped: 6, spiral: 10, curved: 5, floating: 3,
  };
  return m[stair];
}

export function wheelchairAccessible(stair: StaircaseType): boolean {
  const m: Record<StaircaseType, boolean> = {
    straight: false, l_shaped: false, spiral: false, curved: false, floating: false,
  };
  return m[stair];
}

export function openRiser(stair: StaircaseType): boolean {
  const m: Record<StaircaseType, boolean> = {
    straight: false, l_shaped: false, spiral: false, curved: false, floating: true,
  };
  return m[stair];
}

export function bestBuilding(stair: StaircaseType): string {
  const m: Record<StaircaseType, string> = {
    straight: "residential", l_shaped: "commercial", spiral: "tower",
    curved: "mansion", floating: "modern_loft",
  };
  return m[stair];
}

export function costEstimate(stair: StaircaseType): number {
  const m: Record<StaircaseType, number> = {
    straight: 2000, l_shaped: 4000, spiral: 6000, curved: 12000, floating: 10000,
  };
  return m[stair];
}

export function staircaseTypes(): StaircaseType[] {
  return ["straight", "l_shaped", "spiral", "curved", "floating"];
}
