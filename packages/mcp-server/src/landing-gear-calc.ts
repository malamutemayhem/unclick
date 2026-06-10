export type LandingGear = "tricycle" | "tailwheel" | "tandem" | "float" | "ski";

export function groundStability(l: LandingGear): number {
  const m: Record<LandingGear, number> = {
    tricycle: 9, tailwheel: 5, tandem: 4, float: 3, ski: 6,
  };
  return m[l];
}

export function crosswindTolerance(l: LandingGear): number {
  const m: Record<LandingGear, number> = {
    tricycle: 8, tailwheel: 4, tandem: 3, float: 2, ski: 5,
  };
  return m[l];
}

export function dragScore(l: LandingGear): number {
  const m: Record<LandingGear, number> = {
    tricycle: 5, tailwheel: 4, tandem: 3, float: 9, ski: 7,
  };
  return m[l];
}

export function maintenanceComplexity(l: LandingGear): number {
  const m: Record<LandingGear, number> = {
    tricycle: 6, tailwheel: 3, tandem: 7, float: 8, ski: 4,
  };
  return m[l];
}

export function weightPenalty(l: LandingGear): number {
  const m: Record<LandingGear, number> = {
    tricycle: 5, tailwheel: 3, tandem: 6, float: 9, ski: 4,
  };
  return m[l];
}

export function retractable(l: LandingGear): boolean {
  const m: Record<LandingGear, boolean> = {
    tricycle: true, tailwheel: true, tandem: true, float: false, ski: false,
  };
  return m[l];
}

export function waterCapable(l: LandingGear): boolean {
  const m: Record<LandingGear, boolean> = {
    tricycle: false, tailwheel: false, tandem: false, float: true, ski: false,
  };
  return m[l];
}

export function typicalAircraft(l: LandingGear): string {
  const m: Record<LandingGear, string> = {
    tricycle: "commercial_airliner", tailwheel: "vintage_acrobatic",
    tandem: "bicycle_glider", float: "bush_seaplane",
    ski: "arctic_bush_plane",
  };
  return m[l];
}

export function surfaceRequirement(l: LandingGear): string {
  const m: Record<LandingGear, string> = {
    tricycle: "paved_runway", tailwheel: "grass_gravel",
    tandem: "smooth_runway", float: "calm_water",
    ski: "snow_ice",
  };
  return m[l];
}

export function landingGears(): LandingGear[] {
  return ["tricycle", "tailwheel", "tandem", "float", "ski"];
}
