export type FilingCabinetType = "vertical_two_drawer" | "lateral_wide_four" | "mobile_pedestal_roll" | "fireproof_safe_rated" | "open_shelf_binder";

export function fileCapacity(t: FilingCabinetType): number {
  const m: Record<FilingCabinetType, number> = {
    vertical_two_drawer: 4, lateral_wide_four: 10, mobile_pedestal_roll: 3, fireproof_safe_rated: 6, open_shelf_binder: 8,
  };
  return m[t];
}

export function accessibility(t: FilingCabinetType): number {
  const m: Record<FilingCabinetType, number> = {
    vertical_two_drawer: 6, lateral_wide_four: 8, mobile_pedestal_roll: 9, fireproof_safe_rated: 5, open_shelf_binder: 10,
  };
  return m[t];
}

export function security(t: FilingCabinetType): number {
  const m: Record<FilingCabinetType, number> = {
    vertical_two_drawer: 5, lateral_wide_four: 6, mobile_pedestal_roll: 4, fireproof_safe_rated: 10, open_shelf_binder: 1,
  };
  return m[t];
}

export function spaceEfficiency(t: FilingCabinetType): number {
  const m: Record<FilingCabinetType, number> = {
    vertical_two_drawer: 8, lateral_wide_four: 4, mobile_pedestal_roll: 10, fireproof_safe_rated: 5, open_shelf_binder: 6,
  };
  return m[t];
}

export function cabinetCost(t: FilingCabinetType): number {
  const m: Record<FilingCabinetType, number> = {
    vertical_two_drawer: 3, lateral_wide_four: 6, mobile_pedestal_roll: 4, fireproof_safe_rated: 9, open_shelf_binder: 2,
  };
  return m[t];
}

export function lockable(t: FilingCabinetType): boolean {
  const m: Record<FilingCabinetType, boolean> = {
    vertical_two_drawer: true, lateral_wide_four: true, mobile_pedestal_roll: true, fireproof_safe_rated: true, open_shelf_binder: false,
  };
  return m[t];
}

export function hasWheels(t: FilingCabinetType): boolean {
  const m: Record<FilingCabinetType, boolean> = {
    vertical_two_drawer: false, lateral_wide_four: false, mobile_pedestal_roll: true, fireproof_safe_rated: false, open_shelf_binder: false,
  };
  return m[t];
}

export function buildMaterial(t: FilingCabinetType): string {
  const m: Record<FilingCabinetType, string> = {
    vertical_two_drawer: "cold_rolled_steel_paint",
    lateral_wide_four: "heavy_gauge_steel",
    mobile_pedestal_roll: "steel_frame_caster_base",
    fireproof_safe_rated: "insulated_steel_ul_rated",
    open_shelf_binder: "laminate_wood_open",
  };
  return m[t];
}

export function bestOffice(t: FilingCabinetType): string {
  const m: Record<FilingCabinetType, string> = {
    vertical_two_drawer: "small_home_office_basic",
    lateral_wide_four: "large_office_department",
    mobile_pedestal_roll: "under_desk_personal",
    fireproof_safe_rated: "legal_medical_archive",
    open_shelf_binder: "library_reference_quick",
  };
  return m[t];
}

export function filingCabinets(): FilingCabinetType[] {
  return ["vertical_two_drawer", "lateral_wide_four", "mobile_pedestal_roll", "fireproof_safe_rated", "open_shelf_binder"];
}
