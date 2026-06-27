export type AirfoilType = "symmetric" | "cambered" | "supercritical" | "laminar_flow" | "reflexed";

export function liftCoefficient(a: AirfoilType): number {
  const m: Record<AirfoilType, number> = {
    symmetric: 5, cambered: 8, supercritical: 9, laminar_flow: 7, reflexed: 4,
  };
  return m[a];
}

export function dragCoefficient(a: AirfoilType): number {
  const m: Record<AirfoilType, number> = {
    symmetric: 5, cambered: 6, supercritical: 4, laminar_flow: 2, reflexed: 7,
  };
  return m[a];
}

export function stallResistance(a: AirfoilType): number {
  const m: Record<AirfoilType, number> = {
    symmetric: 6, cambered: 7, supercritical: 8, laminar_flow: 4, reflexed: 5,
  };
  return m[a];
}

export function speedRange(a: AirfoilType): number {
  const m: Record<AirfoilType, number> = {
    symmetric: 8, cambered: 6, supercritical: 10, laminar_flow: 7, reflexed: 5,
  };
  return m[a];
}

export function manufacturingEase(a: AirfoilType): number {
  const m: Record<AirfoilType, number> = {
    symmetric: 9, cambered: 7, supercritical: 4, laminar_flow: 3, reflexed: 6,
  };
  return m[a];
}

export function inverted(a: AirfoilType): boolean {
  const m: Record<AirfoilType, boolean> = {
    symmetric: true, cambered: false, supercritical: false, laminar_flow: false, reflexed: false,
  };
  return m[a];
}

export function selfStable(a: AirfoilType): boolean {
  const m: Record<AirfoilType, boolean> = {
    symmetric: false, cambered: false, supercritical: false, laminar_flow: false, reflexed: true,
  };
  return m[a];
}

export function bestApplication(a: AirfoilType): string {
  const m: Record<AirfoilType, string> = {
    symmetric: "aerobatic", cambered: "general_aviation",
    supercritical: "airliner", laminar_flow: "glider", reflexed: "flying_wing",
  };
  return m[a];
}

export function thicknessRatio(a: AirfoilType): number {
  const m: Record<AirfoilType, number> = {
    symmetric: 0.09, cambered: 0.12, supercritical: 0.11, laminar_flow: 0.15, reflexed: 0.10,
  };
  return m[a];
}

export function airfoilTypes(): AirfoilType[] {
  return ["symmetric", "cambered", "supercritical", "laminar_flow", "reflexed"];
}
