export type ScaffoldType = "tube_coupler" | "frame" | "system" | "suspended" | "cantilever";

export function loadCapacity(s: ScaffoldType): number {
  const m: Record<ScaffoldType, number> = {
    tube_coupler: 8, frame: 6, system: 9, suspended: 4, cantilever: 7,
  };
  return m[s];
}

export function assemblySpeed(s: ScaffoldType): number {
  const m: Record<ScaffoldType, number> = {
    tube_coupler: 4, frame: 9, system: 8, suspended: 5, cantilever: 3,
  };
  return m[s];
}

export function versatility(s: ScaffoldType): number {
  const m: Record<ScaffoldType, number> = {
    tube_coupler: 10, frame: 5, system: 8, suspended: 6, cantilever: 7,
  };
  return m[s];
}

export function rentalCost(s: ScaffoldType): number {
  const m: Record<ScaffoldType, number> = {
    tube_coupler: 5, frame: 3, system: 7, suspended: 8, cantilever: 9,
  };
  return m[s];
}

export function safetyRating(s: ScaffoldType): number {
  const m: Record<ScaffoldType, number> = {
    tube_coupler: 7, frame: 6, system: 9, suspended: 5, cantilever: 4,
  };
  return m[s];
}

export function requiresEngineer(s: ScaffoldType): boolean {
  const m: Record<ScaffoldType, boolean> = {
    tube_coupler: false, frame: false, system: false, suspended: true, cantilever: true,
  };
  return m[s];
}

export function reusableComponents(s: ScaffoldType): boolean {
  const m: Record<ScaffoldType, boolean> = {
    tube_coupler: true, frame: true, system: true, suspended: false, cantilever: true,
  };
  return m[s];
}

export function primaryMaterial(s: ScaffoldType): string {
  const m: Record<ScaffoldType, string> = {
    tube_coupler: "steel_tube_48mm", frame: "welded_steel_frame",
    system: "modular_rosette_node", suspended: "wire_rope_platform",
    cantilever: "needle_beam_outrigger",
  };
  return m[s];
}

export function bestApplication(s: ScaffoldType): string {
  const m: Record<ScaffoldType, string> = {
    tube_coupler: "complex_geometry_industrial", frame: "simple_facade_residential",
    system: "large_commercial_project", suspended: "high_rise_window_cleaning",
    cantilever: "bridge_overpass_work",
  };
  return m[s];
}

export function scaffoldTypes(): ScaffoldType[] {
  return ["tube_coupler", "frame", "system", "suspended", "cantilever"];
}
