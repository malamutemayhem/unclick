export type StorageBinType = "clear_plastic_snap" | "fabric_collapsible" | "vacuum_seal_bag" | "weather_tight_outdoor" | "stackable_industrial";

export function storageVolume(t: StorageBinType): number {
  const m: Record<StorageBinType, number> = {
    clear_plastic_snap: 8, fabric_collapsible: 5, vacuum_seal_bag: 9, weather_tight_outdoor: 9, stackable_industrial: 10,
  };
  return m[t];
}

export function contentVisibility(t: StorageBinType): number {
  const m: Record<StorageBinType, number> = {
    clear_plastic_snap: 10, fabric_collapsible: 3, vacuum_seal_bag: 6, weather_tight_outdoor: 4, stackable_industrial: 7,
  };
  return m[t];
}

export function emptyStorage(t: StorageBinType): number {
  const m: Record<StorageBinType, number> = {
    clear_plastic_snap: 2, fabric_collapsible: 10, vacuum_seal_bag: 10, weather_tight_outdoor: 2, stackable_industrial: 1,
  };
  return m[t];
}

export function weatherResist(t: StorageBinType): number {
  const m: Record<StorageBinType, number> = {
    clear_plastic_snap: 6, fabric_collapsible: 2, vacuum_seal_bag: 8, weather_tight_outdoor: 10, stackable_industrial: 7,
  };
  return m[t];
}

export function binCost(t: StorageBinType): number {
  const m: Record<StorageBinType, number> = {
    clear_plastic_snap: 3, fabric_collapsible: 2, vacuum_seal_bag: 2, weather_tight_outdoor: 6, stackable_industrial: 5,
  };
  return m[t];
}

export function airtightSeal(t: StorageBinType): boolean {
  const m: Record<StorageBinType, boolean> = {
    clear_plastic_snap: false, fabric_collapsible: false, vacuum_seal_bag: true, weather_tight_outdoor: true, stackable_industrial: false,
  };
  return m[t];
}

export function foldFlat(t: StorageBinType): boolean {
  const m: Record<StorageBinType, boolean> = {
    clear_plastic_snap: false, fabric_collapsible: true, vacuum_seal_bag: true, weather_tight_outdoor: false, stackable_industrial: false,
  };
  return m[t];
}

export function material(t: StorageBinType): string {
  const m: Record<StorageBinType, string> = {
    clear_plastic_snap: "polypropylene_snap_lid",
    fabric_collapsible: "canvas_polyester_fold",
    vacuum_seal_bag: "thick_plastic_valve_seal",
    weather_tight_outdoor: "hdpe_gasket_latch",
    stackable_industrial: "heavy_duty_tote_nesting",
  };
  return m[t];
}

export function bestUse(t: StorageBinType): string {
  const m: Record<StorageBinType, string> = {
    clear_plastic_snap: "closet_pantry_sort",
    fabric_collapsible: "shelf_cube_insert",
    vacuum_seal_bag: "seasonal_clothes_compress",
    weather_tight_outdoor: "garage_shed_deck",
    stackable_industrial: "workshop_warehouse",
  };
  return m[t];
}

export function storageBins(): StorageBinType[] {
  return ["clear_plastic_snap", "fabric_collapsible", "vacuum_seal_bag", "weather_tight_outdoor", "stackable_industrial"];
}
