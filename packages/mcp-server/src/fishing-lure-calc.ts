export type FishingLureType = "crankbait_diving_lip" | "soft_plastic_worm" | "spinnerbait_blade_skirt" | "topwater_popper" | "jig_head_bucktail";

export function castDistance(t: FishingLureType): number {
  const m: Record<FishingLureType, number> = {
    crankbait_diving_lip: 8, soft_plastic_worm: 6, spinnerbait_blade_skirt: 9, topwater_popper: 7, jig_head_bucktail: 7,
  };
  return m[t];
}

export function actionRealism(t: FishingLureType): number {
  const m: Record<FishingLureType, number> = {
    crankbait_diving_lip: 9, soft_plastic_worm: 10, spinnerbait_blade_skirt: 6, topwater_popper: 7, jig_head_bucktail: 8,
  };
  return m[t];
}

export function depthRange(t: FishingLureType): number {
  const m: Record<FishingLureType, number> = {
    crankbait_diving_lip: 10, soft_plastic_worm: 7, spinnerbait_blade_skirt: 6, topwater_popper: 1, jig_head_bucktail: 9,
  };
  return m[t];
}

export function durability(t: FishingLureType): number {
  const m: Record<FishingLureType, number> = {
    crankbait_diving_lip: 8, soft_plastic_worm: 3, spinnerbait_blade_skirt: 9, topwater_popper: 7, jig_head_bucktail: 10,
  };
  return m[t];
}

export function lureCost(t: FishingLureType): number {
  const m: Record<FishingLureType, number> = {
    crankbait_diving_lip: 7, soft_plastic_worm: 3, spinnerbait_blade_skirt: 6, topwater_popper: 8, jig_head_bucktail: 5,
  };
  return m[t];
}

export function weedless(t: FishingLureType): boolean {
  const m: Record<FishingLureType, boolean> = {
    crankbait_diving_lip: false, soft_plastic_worm: true, spinnerbait_blade_skirt: true, topwater_popper: false, jig_head_bucktail: false,
  };
  return m[t];
}

export function needsTrailer(t: FishingLureType): boolean {
  const m: Record<FishingLureType, boolean> = {
    crankbait_diving_lip: false, soft_plastic_worm: false, spinnerbait_blade_skirt: false, topwater_popper: false, jig_head_bucktail: true,
  };
  return m[t];
}

export function lureMaterial(t: FishingLureType): string {
  const m: Record<FishingLureType, string> = {
    crankbait_diving_lip: "abs_plastic_painted",
    soft_plastic_worm: "pvc_plastisol_scented",
    spinnerbait_blade_skirt: "metal_blade_silicone",
    topwater_popper: "balsa_wood_cupped_face",
    jig_head_bucktail: "lead_head_hair_skirt",
  };
  return m[t];
}

export function bestTarget(t: FishingLureType): string {
  const m: Record<FishingLureType, string> = {
    crankbait_diving_lip: "bass_walleye_structure",
    soft_plastic_worm: "bass_cover_finesse",
    spinnerbait_blade_skirt: "bass_pike_murky_water",
    topwater_popper: "bass_surface_dawn_dusk",
    jig_head_bucktail: "bottom_striper_fluke",
  };
  return m[t];
}

export function fishingLures(): FishingLureType[] {
  return ["crankbait_diving_lip", "soft_plastic_worm", "spinnerbait_blade_skirt", "topwater_popper", "jig_head_bucktail"];
}
