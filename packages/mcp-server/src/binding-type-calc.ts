export type BindingType = "perfect" | "saddle_stitch" | "case_bound" | "spiral" | "coptic";

export function durabilityYears(binding: BindingType): number {
  const m: Record<BindingType, number> = {
    perfect: 10, saddle_stitch: 5, case_bound: 50, spiral: 3, coptic: 30,
  };
  return m[binding];
}

export function layFlatAbility(binding: BindingType): number {
  const m: Record<BindingType, number> = {
    perfect: 4, saddle_stitch: 8, case_bound: 5, spiral: 10, coptic: 10,
  };
  return m[binding];
}

export function pageCapacity(binding: BindingType): number {
  const m: Record<BindingType, number> = {
    perfect: 500, saddle_stitch: 80, case_bound: 1000, spiral: 300, coptic: 200,
  };
  return m[binding];
}

export function productionSpeed(binding: BindingType): number {
  const m: Record<BindingType, number> = {
    perfect: 8, saddle_stitch: 10, case_bound: 3, spiral: 7, coptic: 2,
  };
  return m[binding];
}

export function costPerUnit(binding: BindingType): number {
  const m: Record<BindingType, number> = {
    perfect: 4, saddle_stitch: 2, case_bound: 10, spiral: 3, coptic: 8,
  };
  return m[binding];
}

export function hardCover(binding: BindingType): boolean {
  const m: Record<BindingType, boolean> = {
    perfect: false, saddle_stitch: false, case_bound: true, spiral: false, coptic: true,
  };
  return m[binding];
}

export function handCrafted(binding: BindingType): boolean {
  const m: Record<BindingType, boolean> = {
    perfect: false, saddle_stitch: false, case_bound: false, spiral: false, coptic: true,
  };
  return m[binding];
}

export function bestApplication(binding: BindingType): string {
  const m: Record<BindingType, string> = {
    perfect: "paperback", saddle_stitch: "magazine", case_bound: "reference",
    spiral: "notebook", coptic: "art_journal",
  };
  return m[binding];
}

export function spineVisible(binding: BindingType): boolean {
  const m: Record<BindingType, boolean> = {
    perfect: true, saddle_stitch: false, case_bound: true, spiral: false, coptic: true,
  };
  return m[binding];
}

export function bindingTypes(): BindingType[] {
  return ["perfect", "saddle_stitch", "case_bound", "spiral", "coptic"];
}
