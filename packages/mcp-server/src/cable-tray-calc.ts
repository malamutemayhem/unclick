export type CableTrayType = "under_desk_mesh" | "j_channel_adhesive" | "spine_vertebrae_flex" | "raceway_wall_mount" | "basket_open_wire";

export function cableCapacity(t: CableTrayType): number {
  const m: Record<CableTrayType, number> = {
    under_desk_mesh: 10, j_channel_adhesive: 5, spine_vertebrae_flex: 6, raceway_wall_mount: 7, basket_open_wire: 9,
  };
  return m[t];
}

export function installEase(t: CableTrayType): number {
  const m: Record<CableTrayType, number> = {
    under_desk_mesh: 7, j_channel_adhesive: 10, spine_vertebrae_flex: 6, raceway_wall_mount: 5, basket_open_wire: 8,
  };
  return m[t];
}

export function accessibility(t: CableTrayType): number {
  const m: Record<CableTrayType, number> = {
    under_desk_mesh: 8, j_channel_adhesive: 4, spine_vertebrae_flex: 9, raceway_wall_mount: 3, basket_open_wire: 10,
  };
  return m[t];
}

export function aestheticClean(t: CableTrayType): number {
  const m: Record<CableTrayType, number> = {
    under_desk_mesh: 8, j_channel_adhesive: 9, spine_vertebrae_flex: 7, raceway_wall_mount: 10, basket_open_wire: 5,
  };
  return m[t];
}

export function trayCost(t: CableTrayType): number {
  const m: Record<CableTrayType, number> = {
    under_desk_mesh: 5, j_channel_adhesive: 3, spine_vertebrae_flex: 7, raceway_wall_mount: 6, basket_open_wire: 4,
  };
  return m[t];
}

export function noDrilling(t: CableTrayType): boolean {
  const m: Record<CableTrayType, boolean> = {
    under_desk_mesh: false, j_channel_adhesive: true, spine_vertebrae_flex: false, raceway_wall_mount: false, basket_open_wire: false,
  };
  return m[t];
}

export function heightAdjustFriendly(t: CableTrayType): boolean {
  const m: Record<CableTrayType, boolean> = {
    under_desk_mesh: false, j_channel_adhesive: false, spine_vertebrae_flex: true, raceway_wall_mount: false, basket_open_wire: false,
  };
  return m[t];
}

export function trayMaterial(t: CableTrayType): string {
  const m: Record<CableTrayType, string> = {
    under_desk_mesh: "steel_mesh_powder_coat",
    j_channel_adhesive: "pvc_channel_3m_tape",
    spine_vertebrae_flex: "abs_linked_segments",
    raceway_wall_mount: "rigid_pvc_snap_cover",
    basket_open_wire: "galvanized_wire_grid",
  };
  return m[t];
}

export function bestDesk(t: CableTrayType): string {
  const m: Record<CableTrayType, string> = {
    under_desk_mesh: "fixed_desk_multi_cable",
    j_channel_adhesive: "rental_no_damage_route",
    spine_vertebrae_flex: "standing_desk_up_down",
    raceway_wall_mount: "wall_tv_clean_run",
    basket_open_wire: "server_rack_open_access",
  };
  return m[t];
}

export function cableTrays(): CableTrayType[] {
  return ["under_desk_mesh", "j_channel_adhesive", "spine_vertebrae_flex", "raceway_wall_mount", "basket_open_wire"];
}
