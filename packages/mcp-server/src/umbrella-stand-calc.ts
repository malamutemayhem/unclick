export type UmbrellaStandType = "ceramic_cylinder_classic" | "metal_wire_frame" | "wooden_bucket_rustic" | "wall_mount_drip_tray" | "plastic_modular_office";

export function capacity(t: UmbrellaStandType): number {
  const m: Record<UmbrellaStandType, number> = {
    ceramic_cylinder_classic: 6, metal_wire_frame: 8, wooden_bucket_rustic: 5, wall_mount_drip_tray: 4, plastic_modular_office: 10,
  };
  return m[t];
}

export function stability(t: UmbrellaStandType): number {
  const m: Record<UmbrellaStandType, number> = {
    ceramic_cylinder_classic: 9, metal_wire_frame: 6, wooden_bucket_rustic: 8, wall_mount_drip_tray: 10, plastic_modular_office: 5,
  };
  return m[t];
}

export function dripCollection(t: UmbrellaStandType): number {
  const m: Record<UmbrellaStandType, number> = {
    ceramic_cylinder_classic: 7, metal_wire_frame: 4, wooden_bucket_rustic: 6, wall_mount_drip_tray: 10, plastic_modular_office: 8,
  };
  return m[t];
}

export function aesthetics(t: UmbrellaStandType): number {
  const m: Record<UmbrellaStandType, number> = {
    ceramic_cylinder_classic: 10, metal_wire_frame: 6, wooden_bucket_rustic: 9, wall_mount_drip_tray: 4, plastic_modular_office: 3,
  };
  return m[t];
}

export function standCost(t: UmbrellaStandType): number {
  const m: Record<UmbrellaStandType, number> = {
    ceramic_cylinder_classic: 7, metal_wire_frame: 3, wooden_bucket_rustic: 6, wall_mount_drip_tray: 4, plastic_modular_office: 2,
  };
  return m[t];
}

export function removableTray(t: UmbrellaStandType): boolean {
  const m: Record<UmbrellaStandType, boolean> = {
    ceramic_cylinder_classic: false, metal_wire_frame: true, wooden_bucket_rustic: false, wall_mount_drip_tray: true, plastic_modular_office: true,
  };
  return m[t];
}

export function holdsWalkingStick(t: UmbrellaStandType): boolean {
  const m: Record<UmbrellaStandType, boolean> = {
    ceramic_cylinder_classic: true, metal_wire_frame: true, wooden_bucket_rustic: true, wall_mount_drip_tray: false, plastic_modular_office: false,
  };
  return m[t];
}

export function standMaterial(t: UmbrellaStandType): string {
  const m: Record<UmbrellaStandType, string> = {
    ceramic_cylinder_classic: "glazed_stoneware_heavy",
    metal_wire_frame: "powder_coated_steel_wire",
    wooden_bucket_rustic: "reclaimed_oak_barrel",
    wall_mount_drip_tray: "aluminum_channel_mount",
    plastic_modular_office: "recycled_pp_stackable",
  };
  return m[t];
}

export function bestSetting(t: UmbrellaStandType): string {
  const m: Record<UmbrellaStandType, string> = {
    ceramic_cylinder_classic: "formal_foyer_entryway",
    metal_wire_frame: "apartment_small_hallway",
    wooden_bucket_rustic: "farmhouse_country_porch",
    wall_mount_drip_tray: "commercial_lobby_office",
    plastic_modular_office: "school_gym_bulk_storage",
  };
  return m[t];
}

export function umbrellaStands(): UmbrellaStandType[] {
  return ["ceramic_cylinder_classic", "metal_wire_frame", "wooden_bucket_rustic", "wall_mount_drip_tray", "plastic_modular_office"];
}
