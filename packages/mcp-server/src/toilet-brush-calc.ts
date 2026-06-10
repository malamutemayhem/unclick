export type ToiletBrushType = "traditional_bristle" | "silicone_flat" | "disposable_wand" | "under_rim_curved" | "caddy_hidden_set";

export function scrubPower(t: ToiletBrushType): number {
  const m: Record<ToiletBrushType, number> = {
    traditional_bristle: 8, silicone_flat: 6, disposable_wand: 5, under_rim_curved: 9, caddy_hidden_set: 7,
  };
  return m[t];
}

export function hygieneLevel(t: ToiletBrushType): number {
  const m: Record<ToiletBrushType, number> = {
    traditional_bristle: 3, silicone_flat: 8, disposable_wand: 10, under_rim_curved: 5, caddy_hidden_set: 6,
  };
  return m[t];
}

export function dryingSpeed(t: ToiletBrushType): number {
  const m: Record<ToiletBrushType, number> = {
    traditional_bristle: 3, silicone_flat: 10, disposable_wand: 10, under_rim_curved: 4, caddy_hidden_set: 5,
  };
  return m[t];
}

export function aestheticClean(t: ToiletBrushType): number {
  const m: Record<ToiletBrushType, number> = {
    traditional_bristle: 3, silicone_flat: 7, disposable_wand: 8, under_rim_curved: 4, caddy_hidden_set: 10,
  };
  return m[t];
}

export function brushCost(t: ToiletBrushType): number {
  const m: Record<ToiletBrushType, number> = {
    traditional_bristle: 1, silicone_flat: 4, disposable_wand: 7, under_rim_curved: 3, caddy_hidden_set: 5,
  };
  return m[t];
}

export function replaceableHead(t: ToiletBrushType): boolean {
  const m: Record<ToiletBrushType, boolean> = {
    traditional_bristle: false, silicone_flat: false, disposable_wand: true, under_rim_curved: false, caddy_hidden_set: false,
  };
  return m[t];
}

export function dripFree(t: ToiletBrushType): boolean {
  const m: Record<ToiletBrushType, boolean> = {
    traditional_bristle: false, silicone_flat: true, disposable_wand: true, under_rim_curved: false, caddy_hidden_set: true,
  };
  return m[t];
}

export function bristleType(t: ToiletBrushType): string {
  const m: Record<ToiletBrushType, string> = {
    traditional_bristle: "nylon_stiff_bristle",
    silicone_flat: "flexible_silicone_blade",
    disposable_wand: "preloaded_cleaning_pad",
    under_rim_curved: "angled_bristle_lip_reach",
    caddy_hidden_set: "enclosed_ventilated_holder",
  };
  return m[t];
}

export function bestBathroom(t: ToiletBrushType): string {
  const m: Record<ToiletBrushType, string> = {
    traditional_bristle: "heavy_stain_deep_clean",
    silicone_flat: "modern_quick_dry_bath",
    disposable_wand: "guest_bath_no_touch",
    under_rim_curved: "hard_water_rim_buildup",
    caddy_hidden_set: "minimalist_hidden_storage",
  };
  return m[t];
}

export function toiletBrushes(): ToiletBrushType[] {
  return ["traditional_bristle", "silicone_flat", "disposable_wand", "under_rim_curved", "caddy_hidden_set"];
}
