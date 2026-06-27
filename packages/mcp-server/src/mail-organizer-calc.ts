export type MailOrganizerType = "wall_mount_metal_tier" | "desktop_wood_sorter" | "rotating_carousel_spin" | "hanging_door_pocket" | "letter_tray_stackable";

export function capacity(t: MailOrganizerType): number {
  const m: Record<MailOrganizerType, number> = {
    wall_mount_metal_tier: 7, desktop_wood_sorter: 6, rotating_carousel_spin: 8, hanging_door_pocket: 5, letter_tray_stackable: 9,
  };
  return m[t];
}

export function accessibility(t: MailOrganizerType): number {
  const m: Record<MailOrganizerType, number> = {
    wall_mount_metal_tier: 8, desktop_wood_sorter: 9, rotating_carousel_spin: 10, hanging_door_pocket: 6, letter_tray_stackable: 7,
  };
  return m[t];
}

export function aesthetics(t: MailOrganizerType): number {
  const m: Record<MailOrganizerType, number> = {
    wall_mount_metal_tier: 7, desktop_wood_sorter: 9, rotating_carousel_spin: 6, hanging_door_pocket: 4, letter_tray_stackable: 5,
  };
  return m[t];
}

export function spaceEfficiency(t: MailOrganizerType): number {
  const m: Record<MailOrganizerType, number> = {
    wall_mount_metal_tier: 9, desktop_wood_sorter: 5, rotating_carousel_spin: 6, hanging_door_pocket: 10, letter_tray_stackable: 7,
  };
  return m[t];
}

export function organizerCost(t: MailOrganizerType): number {
  const m: Record<MailOrganizerType, number> = {
    wall_mount_metal_tier: 3, desktop_wood_sorter: 5, rotating_carousel_spin: 4, hanging_door_pocket: 2, letter_tray_stackable: 2,
  };
  return m[t];
}

export function wallMount(t: MailOrganizerType): boolean {
  const m: Record<MailOrganizerType, boolean> = {
    wall_mount_metal_tier: true, desktop_wood_sorter: false, rotating_carousel_spin: false, hanging_door_pocket: true, letter_tray_stackable: false,
  };
  return m[t];
}

export function expandable(t: MailOrganizerType): boolean {
  const m: Record<MailOrganizerType, boolean> = {
    wall_mount_metal_tier: false, desktop_wood_sorter: false, rotating_carousel_spin: false, hanging_door_pocket: false, letter_tray_stackable: true,
  };
  return m[t];
}

export function buildMaterial(t: MailOrganizerType): string {
  const m: Record<MailOrganizerType, string> = {
    wall_mount_metal_tier: "powder_coat_steel_mesh",
    desktop_wood_sorter: "bamboo_wood_divider",
    rotating_carousel_spin: "acrylic_spin_base",
    hanging_door_pocket: "fabric_pocket_hook",
    letter_tray_stackable: "plastic_tier_stack",
  };
  return m[t];
}

export function bestSpot(t: MailOrganizerType): string {
  const m: Record<MailOrganizerType, string> = {
    wall_mount_metal_tier: "entryway_wall_mudroom",
    desktop_wood_sorter: "home_office_desk",
    rotating_carousel_spin: "shared_office_counter",
    hanging_door_pocket: "behind_door_closet",
    letter_tray_stackable: "desk_corner_cubicle",
  };
  return m[t];
}

export function mailOrganizers(): MailOrganizerType[] {
  return ["wall_mount_metal_tier", "desktop_wood_sorter", "rotating_carousel_spin", "hanging_door_pocket", "letter_tray_stackable"];
}
