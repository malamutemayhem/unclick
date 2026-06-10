export type BindingMethod = "perfect" | "saddle_stitch" | "case_bound" | "spiral" | "coptic";

export function durabilityScore(b: BindingMethod): number {
  const m: Record<BindingMethod, number> = {
    perfect: 6, saddle_stitch: 4, case_bound: 10, spiral: 7, coptic: 8,
  };
  return m[b];
}

export function costPerUnit(b: BindingMethod): number {
  const m: Record<BindingMethod, number> = {
    perfect: 5, saddle_stitch: 2, case_bound: 10, spiral: 4, coptic: 8,
  };
  return m[b];
}

export function pageCapacity(b: BindingMethod): number {
  const m: Record<BindingMethod, number> = {
    perfect: 8, saddle_stitch: 3, case_bound: 10, spiral: 7, coptic: 6,
  };
  return m[b];
}

export function layFlatAbility(b: BindingMethod): number {
  const m: Record<BindingMethod, number> = {
    perfect: 4, saddle_stitch: 7, case_bound: 3, spiral: 10, coptic: 9,
  };
  return m[b];
}

export function productionSpeed(b: BindingMethod): number {
  const m: Record<BindingMethod, number> = {
    perfect: 9, saddle_stitch: 10, case_bound: 3, spiral: 7, coptic: 2,
  };
  return m[b];
}

export function spineVisible(b: BindingMethod): boolean {
  const m: Record<BindingMethod, boolean> = {
    perfect: true, saddle_stitch: false, case_bound: true, spiral: false, coptic: true,
  };
  return m[b];
}

export function handcraftFriendly(b: BindingMethod): boolean {
  const m: Record<BindingMethod, boolean> = {
    perfect: false, saddle_stitch: true, case_bound: false, spiral: false, coptic: true,
  };
  return m[b];
}

export function typicalProduct(b: BindingMethod): string {
  const m: Record<BindingMethod, string> = {
    perfect: "paperback_books", saddle_stitch: "magazines_booklets",
    case_bound: "hardcover_books", spiral: "notebooks_manuals",
    coptic: "journals_sketchbooks",
  };
  return m[b];
}

export function spineType(b: BindingMethod): string {
  const m: Record<BindingMethod, string> = {
    perfect: "glued_flat", saddle_stitch: "folded_stapled",
    case_bound: "sewn_glued_cover", spiral: "wire_coil",
    coptic: "exposed_chain_stitch",
  };
  return m[b];
}

export function bindingMethods(): BindingMethod[] {
  return ["perfect", "saddle_stitch", "case_bound", "spiral", "coptic"];
}
