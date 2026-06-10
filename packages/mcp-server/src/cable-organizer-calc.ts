export type CableOrganizerType = "velcro_strap_roll" | "cable_box_hide" | "clip_mount_adhesive" | "sleeve_neoprene" | "raceway_wall_channel";

export function bundleCapacity(t: CableOrganizerType): number {
  const m: Record<CableOrganizerType, number> = {
    velcro_strap_roll: 6, cable_box_hide: 9, clip_mount_adhesive: 3, sleeve_neoprene: 8, raceway_wall_channel: 10,
  };
  return m[t];
}

export function accessEase(t: CableOrganizerType): number {
  const m: Record<CableOrganizerType, number> = {
    velcro_strap_roll: 10, cable_box_hide: 5, clip_mount_adhesive: 9, sleeve_neoprene: 4, raceway_wall_channel: 6,
  };
  return m[t];
}

export function aestheticClean(t: CableOrganizerType): number {
  const m: Record<CableOrganizerType, number> = {
    velcro_strap_roll: 5, cable_box_hide: 9, clip_mount_adhesive: 6, sleeve_neoprene: 8, raceway_wall_channel: 10,
  };
  return m[t];
}

export function reusability(t: CableOrganizerType): number {
  const m: Record<CableOrganizerType, number> = {
    velcro_strap_roll: 10, cable_box_hide: 8, clip_mount_adhesive: 4, sleeve_neoprene: 9, raceway_wall_channel: 6,
  };
  return m[t];
}

export function organizerCost(t: CableOrganizerType): number {
  const m: Record<CableOrganizerType, number> = {
    velcro_strap_roll: 2, cable_box_hide: 5, clip_mount_adhesive: 2, sleeve_neoprene: 4, raceway_wall_channel: 6,
  };
  return m[t];
}

export function noDrill(t: CableOrganizerType): boolean {
  const m: Record<CableOrganizerType, boolean> = {
    velcro_strap_roll: true, cable_box_hide: true, clip_mount_adhesive: true, sleeve_neoprene: true, raceway_wall_channel: false,
  };
  return m[t];
}

export function fireRetardant(t: CableOrganizerType): boolean {
  const m: Record<CableOrganizerType, boolean> = {
    velcro_strap_roll: false, cable_box_hide: true, clip_mount_adhesive: false, sleeve_neoprene: false, raceway_wall_channel: true,
  };
  return m[t];
}

export function mountMethod(t: CableOrganizerType): string {
  const m: Record<CableOrganizerType, string> = {
    velcro_strap_roll: "wrap_loop_hook",
    cable_box_hide: "freestanding_lid_box",
    clip_mount_adhesive: "3m_adhesive_clip",
    sleeve_neoprene: "zipper_wrap_tube",
    raceway_wall_channel: "screw_mount_snap_lid",
  };
  return m[t];
}

export function bestSetup(t: CableOrganizerType): string {
  const m: Record<CableOrganizerType, string> = {
    velcro_strap_roll: "quick_bundle_any_cable",
    cable_box_hide: "power_strip_floor_hide",
    clip_mount_adhesive: "desk_edge_route",
    sleeve_neoprene: "standing_desk_bundle",
    raceway_wall_channel: "wall_mount_tv_clean",
  };
  return m[t];
}

export function cableOrganizers(): CableOrganizerType[] {
  return ["velcro_strap_roll", "cable_box_hide", "clip_mount_adhesive", "sleeve_neoprene", "raceway_wall_channel"];
}
