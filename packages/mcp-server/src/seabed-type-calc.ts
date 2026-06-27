export type SeabedType = "continental_shelf" | "abyssal_plain" | "mid_ocean_ridge" | "trench" | "seamount";

export function depthMeters(seabed: SeabedType): number {
  const m: Record<SeabedType, number> = {
    continental_shelf: 200, abyssal_plain: 4000, mid_ocean_ridge: 2500, trench: 10000, seamount: 1500,
  };
  return m[seabed];
}

export function areaMillionKm2(seabed: SeabedType): number {
  const m: Record<SeabedType, number> = {
    continental_shelf: 32, abyssal_plain: 225, mid_ocean_ridge: 23, trench: 2, seamount: 8,
  };
  return m[seabed];
}

export function biodiversity(seabed: SeabedType): number {
  const m: Record<SeabedType, number> = {
    continental_shelf: 10, abyssal_plain: 3, mid_ocean_ridge: 7, trench: 4, seamount: 8,
  };
  return m[seabed];
}

export function geologicalActivity(seabed: SeabedType): number {
  const m: Record<SeabedType, number> = {
    continental_shelf: 2, abyssal_plain: 1, mid_ocean_ridge: 10, trench: 9, seamount: 6,
  };
  return m[seabed];
}

export function mineralResources(seabed: SeabedType): number {
  const m: Record<SeabedType, number> = {
    continental_shelf: 8, abyssal_plain: 6, mid_ocean_ridge: 9, trench: 3, seamount: 7,
  };
  return m[seabed];
}

export function tectonicBoundary(seabed: SeabedType): boolean {
  const m: Record<SeabedType, boolean> = {
    continental_shelf: false, abyssal_plain: false, mid_ocean_ridge: true, trench: true, seamount: false,
  };
  return m[seabed];
}

export function sunlitZone(seabed: SeabedType): boolean {
  const m: Record<SeabedType, boolean> = {
    continental_shelf: true, abyssal_plain: false, mid_ocean_ridge: false, trench: false, seamount: false,
  };
  return m[seabed];
}

export function sedimentType(seabed: SeabedType): string {
  const m: Record<SeabedType, string> = {
    continental_shelf: "terrigenous", abyssal_plain: "pelagic_clay",
    mid_ocean_ridge: "metalliferous", trench: "turbidite", seamount: "biogenic_ooze",
  };
  return m[seabed];
}

export function explorationDifficulty(seabed: SeabedType): number {
  const m: Record<SeabedType, number> = {
    continental_shelf: 2, abyssal_plain: 7, mid_ocean_ridge: 8, trench: 10, seamount: 6,
  };
  return m[seabed];
}

export function seabedTypes(): SeabedType[] {
  return ["continental_shelf", "abyssal_plain", "mid_ocean_ridge", "trench", "seamount"];
}
