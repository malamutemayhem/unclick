export type FileCabinetType = "vertical_two_drawer" | "lateral_wide_drawer" | "mobile_rolling_pedestal" | "fireproof_insulated_safe" | "open_shelf_binder";

export function fileCapacity(t: FileCabinetType): number {
  const m: Record<FileCabinetType, number> = {
    vertical_two_drawer: 6, lateral_wide_drawer: 9, mobile_rolling_pedestal: 4, fireproof_insulated_safe: 5, open_shelf_binder: 8,
  };
  return m[t];
}

export function security(t: FileCabinetType): number {
  const m: Record<FileCabinetType, number> = {
    vertical_two_drawer: 6, lateral_wide_drawer: 7, mobile_rolling_pedestal: 5, fireproof_insulated_safe: 10, open_shelf_binder: 2,
  };
  return m[t];
}

export function accessibility(t: FileCabinetType): number {
  const m: Record<FileCabinetType, number> = {
    vertical_two_drawer: 7, lateral_wide_drawer: 9, mobile_rolling_pedestal: 8, fireproof_insulated_safe: 5, open_shelf_binder: 10,
  };
  return m[t];
}

export function floorSpace(t: FileCabinetType): number {
  const m: Record<FileCabinetType, number> = {
    vertical_two_drawer: 8, lateral_wide_drawer: 4, mobile_rolling_pedestal: 9, fireproof_insulated_safe: 6, open_shelf_binder: 5,
  };
  return m[t];
}

export function cabinetCost(t: FileCabinetType): number {
  const m: Record<FileCabinetType, number> = {
    vertical_two_drawer: 2, lateral_wide_drawer: 3, mobile_rolling_pedestal: 3, fireproof_insulated_safe: 5, open_shelf_binder: 2,
  };
  return m[t];
}

export function hasLock(t: FileCabinetType): boolean {
  const m: Record<FileCabinetType, boolean> = {
    vertical_two_drawer: true, lateral_wide_drawer: true, mobile_rolling_pedestal: true, fireproof_insulated_safe: true, open_shelf_binder: false,
  };
  return m[t];
}

export function onWheels(t: FileCabinetType): boolean {
  const m: Record<FileCabinetType, boolean> = {
    vertical_two_drawer: false, lateral_wide_drawer: false, mobile_rolling_pedestal: true, fireproof_insulated_safe: false, open_shelf_binder: false,
  };
  return m[t];
}

export function drawerOrientation(t: FileCabinetType): string {
  const m: Record<FileCabinetType, string> = {
    vertical_two_drawer: "front_to_back_letter",
    lateral_wide_drawer: "side_to_side_legal",
    mobile_rolling_pedestal: "compact_box_file",
    fireproof_insulated_safe: "insulated_sealed_drawer",
    open_shelf_binder: "open_face_shelf_slot",
  };
  return m[t];
}

export function bestOffice(t: FileCabinetType): string {
  const m: Record<FileCabinetType, string> = {
    vertical_two_drawer: "home_office_compact",
    lateral_wide_drawer: "corporate_shared_dept",
    mobile_rolling_pedestal: "under_desk_personal",
    fireproof_insulated_safe: "legal_records_archive",
    open_shelf_binder: "reference_library_open",
  };
  return m[t];
}

export function fileCabinets(): FileCabinetType[] {
  return ["vertical_two_drawer", "lateral_wide_drawer", "mobile_rolling_pedestal", "fireproof_insulated_safe", "open_shelf_binder"];
}
