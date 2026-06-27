export type ParachuteType = "round" | "ram_air" | "cruciform" | "drogue" | "parafoil";

export function glideRatio(p: ParachuteType): number {
  const m: Record<ParachuteType, number> = {
    round: 1, ram_air: 10, cruciform: 3, drogue: 1, parafoil: 8,
  };
  return m[p];
}

export function steerability(p: ParachuteType): number {
  const m: Record<ParachuteType, number> = {
    round: 2, ram_air: 10, cruciform: 4, drogue: 1, parafoil: 8,
  };
  return m[p];
}

export function openingReliability(p: ParachuteType): number {
  const m: Record<ParachuteType, number> = {
    round: 10, ram_air: 7, cruciform: 9, drogue: 10, parafoil: 7,
  };
  return m[p];
}

export function packVolume(p: ParachuteType): number {
  const m: Record<ParachuteType, number> = {
    round: 7, ram_air: 5, cruciform: 6, drogue: 2, parafoil: 8,
  };
  return m[p];
}

export function descentRate(p: ParachuteType): number {
  const m: Record<ParachuteType, number> = {
    round: 5, ram_air: 3, cruciform: 4, drogue: 9, parafoil: 3,
  };
  return m[p];
}

export function allowsLandingFlare(p: ParachuteType): boolean {
  const m: Record<ParachuteType, boolean> = {
    round: false, ram_air: true, cruciform: false, drogue: false, parafoil: true,
  };
  return m[p];
}

export function militaryApproved(p: ParachuteType): boolean {
  const m: Record<ParachuteType, boolean> = {
    round: true, ram_air: true, cruciform: true, drogue: true, parafoil: false,
  };
  return m[p];
}

export function canopyShape(p: ParachuteType): string {
  const m: Record<ParachuteType, string> = {
    round: "hemispherical_dome", ram_air: "rectangular_cells",
    cruciform: "cross_shaped_gore", drogue: "small_conical",
    parafoil: "elliptical_tapered",
  };
  return m[p];
}

export function bestApplication(p: ParachuteType): string {
  const m: Record<ParachuteType, string> = {
    round: "static_line_mass_drop", ram_air: "sport_skydiving",
    cruciform: "cargo_precision_drop", drogue: "aircraft_drag_brake",
    parafoil: "tandem_student_jump",
  };
  return m[p];
}

export function parachuteTypes(): ParachuteType[] {
  return ["round", "ram_air", "cruciform", "drogue", "parafoil"];
}
