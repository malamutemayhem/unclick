export type RadiantBarrier = "foil_sheet" | "foil_chip" | "spray_on" | "bubble_foil" | "rigid_board";

export function reflectivity(r: RadiantBarrier): number {
  const m: Record<RadiantBarrier, number> = {
    foil_sheet: 10, foil_chip: 7, spray_on: 6, bubble_foil: 8, rigid_board: 9,
  };
  return m[r];
}

export function installationEase(r: RadiantBarrier): number {
  const m: Record<RadiantBarrier, number> = {
    foil_sheet: 6, foil_chip: 9, spray_on: 8, bubble_foil: 7, rigid_board: 4,
  };
  return m[r];
}

export function durabilityScore(r: RadiantBarrier): number {
  const m: Record<RadiantBarrier, number> = {
    foil_sheet: 8, foil_chip: 5, spray_on: 7, bubble_foil: 6, rigid_board: 10,
  };
  return m[r];
}

export function costPerSqFt(r: RadiantBarrier): number {
  const m: Record<RadiantBarrier, number> = {
    foil_sheet: 4, foil_chip: 3, spray_on: 7, bubble_foil: 5, rigid_board: 9,
  };
  return m[r];
}

export function dustAccumulation(r: RadiantBarrier): number {
  const m: Record<RadiantBarrier, number> = {
    foil_sheet: 6, foil_chip: 3, spray_on: 2, bubble_foil: 5, rigid_board: 4,
  };
  return m[r];
}

export function addsRValue(r: RadiantBarrier): boolean {
  const m: Record<RadiantBarrier, boolean> = {
    foil_sheet: false, foil_chip: false, spray_on: false, bubble_foil: true, rigid_board: true,
  };
  return m[r];
}

export function diyInstallable(r: RadiantBarrier): boolean {
  const m: Record<RadiantBarrier, boolean> = {
    foil_sheet: true, foil_chip: true, spray_on: false, bubble_foil: true, rigid_board: false,
  };
  return m[r];
}

export function installLocation(r: RadiantBarrier): string {
  const m: Record<RadiantBarrier, string> = {
    foil_sheet: "attic_rafter_stapled", foil_chip: "attic_floor_blown",
    spray_on: "roof_deck_underside", bubble_foil: "wall_crawl_space",
    rigid_board: "exterior_wall_roof",
  };
  return m[r];
}

export function bestClimate(r: RadiantBarrier): string {
  const m: Record<RadiantBarrier, string> = {
    foil_sheet: "hot_sunny_cooling_dominant", foil_chip: "hot_existing_attic",
    spray_on: "commercial_metal_roof", bubble_foil: "garage_pole_barn",
    rigid_board: "continuous_insulation_system",
  };
  return m[r];
}

export function radiantBarriers(): RadiantBarrier[] {
  return ["foil_sheet", "foil_chip", "spray_on", "bubble_foil", "rigid_board"];
}
