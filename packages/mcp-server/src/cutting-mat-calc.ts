export type CuttingMatType = "self_healing_grid" | "glass_precision_flat" | "rotary_large_format" | "foldable_travel_small" | "double_sided_metric";

export function selfHealing(t: CuttingMatType): number {
  const m: Record<CuttingMatType, number> = {
    self_healing_grid: 10, glass_precision_flat: 1, rotary_large_format: 9, foldable_travel_small: 7, double_sided_metric: 8,
  };
  return m[t];
}

export function surfaceSize(t: CuttingMatType): number {
  const m: Record<CuttingMatType, number> = {
    self_healing_grid: 7, glass_precision_flat: 6, rotary_large_format: 10, foldable_travel_small: 4, double_sided_metric: 8,
  };
  return m[t];
}

export function gridAccuracy(t: CuttingMatType): number {
  const m: Record<CuttingMatType, number> = {
    self_healing_grid: 8, glass_precision_flat: 10, rotary_large_format: 7, foldable_travel_small: 6, double_sided_metric: 9,
  };
  return m[t];
}

export function portability(t: CuttingMatType): number {
  const m: Record<CuttingMatType, number> = {
    self_healing_grid: 4, glass_precision_flat: 2, rotary_large_format: 3, foldable_travel_small: 10, double_sided_metric: 5,
  };
  return m[t];
}

export function matCost(t: CuttingMatType): number {
  const m: Record<CuttingMatType, number> = {
    self_healing_grid: 5, glass_precision_flat: 8, rotary_large_format: 7, foldable_travel_small: 4, double_sided_metric: 6,
  };
  return m[t];
}

export function doubleSided(t: CuttingMatType): boolean {
  const m: Record<CuttingMatType, boolean> = {
    self_healing_grid: false, glass_precision_flat: false, rotary_large_format: true, foldable_travel_small: false, double_sided_metric: true,
  };
  return m[t];
}

export function bladeProtect(t: CuttingMatType): boolean {
  const m: Record<CuttingMatType, boolean> = {
    self_healing_grid: true, glass_precision_flat: false, rotary_large_format: true, foldable_travel_small: true, double_sided_metric: true,
  };
  return m[t];
}

export function matMaterial(t: CuttingMatType): string {
  const m: Record<CuttingMatType, string> = {
    self_healing_grid: "pvc_three_layer_heal",
    glass_precision_flat: "tempered_glass_non_slip",
    rotary_large_format: "five_layer_pvc_printed",
    foldable_travel_small: "polypropylene_fold_hinge",
    double_sided_metric: "pvc_dual_print_imperial_metric",
  };
  return m[t];
}

export function bestCraft(t: CuttingMatType): string {
  const m: Record<CuttingMatType, string> = {
    self_healing_grid: "general_craft_paper_fabric",
    glass_precision_flat: "precision_model_exact_cut",
    rotary_large_format: "quilting_large_fabric_layout",
    foldable_travel_small: "travel_class_workshop",
    double_sided_metric: "international_dual_measure",
  };
  return m[t];
}

export function cuttingMats(): CuttingMatType[] {
  return ["self_healing_grid", "glass_precision_flat", "rotary_large_format", "foldable_travel_small", "double_sided_metric"];
}
