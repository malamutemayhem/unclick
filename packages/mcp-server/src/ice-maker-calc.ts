export type IceMakerType = "countertop_bullet" | "undercounter_clear" | "portable_nugget" | "freezer_tray_mold" | "commercial_flake";

export function iceClarity(t: IceMakerType): number {
  const m: Record<IceMakerType, number> = {
    countertop_bullet: 4, undercounter_clear: 10, portable_nugget: 3, freezer_tray_mold: 5, commercial_flake: 2,
  };
  return m[t];
}

export function productionSpeed(t: IceMakerType): number {
  const m: Record<IceMakerType, number> = {
    countertop_bullet: 7, undercounter_clear: 6, portable_nugget: 8, freezer_tray_mold: 1, commercial_flake: 10,
  };
  return m[t];
}

export function iceShape(t: IceMakerType): number {
  const m: Record<IceMakerType, number> = {
    countertop_bullet: 4, undercounter_clear: 8, portable_nugget: 6, freezer_tray_mold: 10, commercial_flake: 3,
  };
  return m[t];
}

export function storageCapacity(t: IceMakerType): number {
  const m: Record<IceMakerType, number> = {
    countertop_bullet: 5, undercounter_clear: 8, portable_nugget: 4, freezer_tray_mold: 2, commercial_flake: 10,
  };
  return m[t];
}

export function makerCost(t: IceMakerType): number {
  const m: Record<IceMakerType, number> = {
    countertop_bullet: 4, undercounter_clear: 9, portable_nugget: 7, freezer_tray_mold: 1, commercial_flake: 10,
  };
  return m[t];
}

export function selfCleaning(t: IceMakerType): boolean {
  const m: Record<IceMakerType, boolean> = {
    countertop_bullet: true, undercounter_clear: true, portable_nugget: true, freezer_tray_mold: false, commercial_flake: false,
  };
  return m[t];
}

export function plumbingRequired(t: IceMakerType): boolean {
  const m: Record<IceMakerType, boolean> = {
    countertop_bullet: false, undercounter_clear: true, portable_nugget: false, freezer_tray_mold: false, commercial_flake: true,
  };
  return m[t];
}

export function iceType(t: IceMakerType): string {
  const m: Record<IceMakerType, string> = {
    countertop_bullet: "hollow_bullet_cylinder",
    undercounter_clear: "full_cube_crystal_clear",
    portable_nugget: "chewable_sonic_nugget",
    freezer_tray_mold: "silicone_sphere_custom",
    commercial_flake: "thin_flake_crushed",
  };
  return m[t];
}

export function bestSetup(t: IceMakerType): string {
  const m: Record<IceMakerType, string> = {
    countertop_bullet: "kitchen_counter_daily",
    undercounter_clear: "home_bar_built_in",
    portable_nugget: "office_dorm_snack",
    freezer_tray_mold: "craft_cocktail_sphere",
    commercial_flake: "restaurant_seafood_display",
  };
  return m[t];
}

export function iceMakers(): IceMakerType[] {
  return ["countertop_bullet", "undercounter_clear", "portable_nugget", "freezer_tray_mold", "commercial_flake"];
}
