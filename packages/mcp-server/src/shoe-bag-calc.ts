export type ShoeBagType = "drawstring_cotton_basic" | "zippered_nylon_clear" | "ventilated_mesh_panel" | "waterproof_pvc_lined" | "padded_sneaker_case";

export function shoeProtection(t: ShoeBagType): number {
  const m: Record<ShoeBagType, number> = {
    drawstring_cotton_basic: 5, zippered_nylon_clear: 7, ventilated_mesh_panel: 4, waterproof_pvc_lined: 8, padded_sneaker_case: 10,
  };
  return m[t];
}

export function breathability(t: ShoeBagType): number {
  const m: Record<ShoeBagType, number> = {
    drawstring_cotton_basic: 8, zippered_nylon_clear: 5, ventilated_mesh_panel: 10, waterproof_pvc_lined: 2, padded_sneaker_case: 6,
  };
  return m[t];
}

export function visibility(t: ShoeBagType): number {
  const m: Record<ShoeBagType, number> = {
    drawstring_cotton_basic: 2, zippered_nylon_clear: 10, ventilated_mesh_panel: 7, waterproof_pvc_lined: 6, padded_sneaker_case: 3,
  };
  return m[t];
}

export function packFlat(t: ShoeBagType): number {
  const m: Record<ShoeBagType, number> = {
    drawstring_cotton_basic: 10, zippered_nylon_clear: 8, ventilated_mesh_panel: 9, waterproof_pvc_lined: 7, padded_sneaker_case: 3,
  };
  return m[t];
}

export function shoeBagCost(t: ShoeBagType): number {
  const m: Record<ShoeBagType, number> = {
    drawstring_cotton_basic: 1, zippered_nylon_clear: 2, ventilated_mesh_panel: 2, waterproof_pvc_lined: 2, padded_sneaker_case: 4,
  };
  return m[t];
}

export function waterproof(t: ShoeBagType): boolean {
  const m: Record<ShoeBagType, boolean> = {
    drawstring_cotton_basic: false, zippered_nylon_clear: false, ventilated_mesh_panel: false, waterproof_pvc_lined: true, padded_sneaker_case: false,
  };
  return m[t];
}

export function separateCompartment(t: ShoeBagType): boolean {
  const m: Record<ShoeBagType, boolean> = {
    drawstring_cotton_basic: false, zippered_nylon_clear: false, ventilated_mesh_panel: false, waterproof_pvc_lined: false, padded_sneaker_case: true,
  };
  return m[t];
}

export function closureType(t: ShoeBagType): string {
  const m: Record<ShoeBagType, string> = {
    drawstring_cotton_basic: "pull_cord_cinch",
    zippered_nylon_clear: "full_zip_around",
    ventilated_mesh_panel: "elastic_top_band",
    waterproof_pvc_lined: "roll_top_clip_seal",
    padded_sneaker_case: "dual_zip_handle",
  };
  return m[t];
}

export function bestShoe(t: ShoeBagType): string {
  const m: Record<ShoeBagType, string> = {
    drawstring_cotton_basic: "dress_shoe_dust_cover",
    zippered_nylon_clear: "gym_bag_quick_find",
    ventilated_mesh_panel: "sweaty_post_workout",
    waterproof_pvc_lined: "muddy_hiking_boot",
    padded_sneaker_case: "collector_sneaker_travel",
  };
  return m[t];
}

export function shoeBags(): ShoeBagType[] {
  return ["drawstring_cotton_basic", "zippered_nylon_clear", "ventilated_mesh_panel", "waterproof_pvc_lined", "padded_sneaker_case"];
}
