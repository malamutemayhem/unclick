export type FootrestType = "tilting_platform" | "rocking_curved" | "heated_massage" | "under_desk_hammock" | "adjustable_height";

export function ergonomicSupport(t: FootrestType): number {
  const m: Record<FootrestType, number> = {
    tilting_platform: 8, rocking_curved: 7, heated_massage: 6, under_desk_hammock: 5, adjustable_height: 10,
  };
  return m[t];
}

export function comfortLevel(t: FootrestType): number {
  const m: Record<FootrestType, number> = {
    tilting_platform: 7, rocking_curved: 8, heated_massage: 10, under_desk_hammock: 9, adjustable_height: 7,
  };
  return m[t];
}

export function movement(t: FootrestType): number {
  const m: Record<FootrestType, number> = {
    tilting_platform: 6, rocking_curved: 10, heated_massage: 3, under_desk_hammock: 8, adjustable_height: 4,
  };
  return m[t];
}

export function compactness(t: FootrestType): number {
  const m: Record<FootrestType, number> = {
    tilting_platform: 6, rocking_curved: 5, heated_massage: 4, under_desk_hammock: 10, adjustable_height: 5,
  };
  return m[t];
}

export function restCost(t: FootrestType): number {
  const m: Record<FootrestType, number> = {
    tilting_platform: 4, rocking_curved: 5, heated_massage: 8, under_desk_hammock: 2, adjustable_height: 6,
  };
  return m[t];
}

export function needsPower(t: FootrestType): boolean {
  const m: Record<FootrestType, boolean> = {
    tilting_platform: false, rocking_curved: false, heated_massage: true, under_desk_hammock: false, adjustable_height: false,
  };
  return m[t];
}

export function nonSlipBase(t: FootrestType): boolean {
  const m: Record<FootrestType, boolean> = {
    tilting_platform: true, rocking_curved: true, heated_massage: true, under_desk_hammock: false, adjustable_height: true,
  };
  return m[t];
}

export function surfaceType(t: FootrestType): string {
  const m: Record<FootrestType, string> = {
    tilting_platform: "textured_plastic_flat",
    rocking_curved: "smooth_wood_curve",
    heated_massage: "plush_fabric_vibrate",
    under_desk_hammock: "canvas_strap_swing",
    adjustable_height: "metal_platform_pegs",
  };
  return m[t];
}

export function bestDesk(t: FootrestType): string {
  const m: Record<FootrestType, string> = {
    tilting_platform: "standard_office_sitting",
    rocking_curved: "active_sitting_fidget",
    heated_massage: "cold_office_relaxation",
    under_desk_hammock: "casual_home_office",
    adjustable_height: "standing_desk_combo",
  };
  return m[t];
}

export function footrests(): FootrestType[] {
  return ["tilting_platform", "rocking_curved", "heated_massage", "under_desk_hammock", "adjustable_height"];
}
