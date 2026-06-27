export type BindingStyle = "coptic" | "japanese_stab" | "kettle_stitch" | "perfect" | "case_bound";

export function pageCapacity(style: BindingStyle): number {
  const p: Record<BindingStyle, number> = {
    coptic: 200, japanese_stab: 50, kettle_stitch: 300, perfect: 500, case_bound: 400,
  };
  return p[style];
}

export function laysFlat(style: BindingStyle): boolean {
  const l: Record<BindingStyle, boolean> = {
    coptic: true, japanese_stab: false, kettle_stitch: true, perfect: false, case_bound: false,
  };
  return l[style];
}

export function durabilityRating(style: BindingStyle): number {
  const d: Record<BindingStyle, number> = {
    coptic: 8, japanese_stab: 5, kettle_stitch: 9, perfect: 4, case_bound: 10,
  };
  return d[style];
}

export function toolsRequired(style: BindingStyle): number {
  const t: Record<BindingStyle, number> = {
    coptic: 4, japanese_stab: 3, kettle_stitch: 5, perfect: 6, case_bound: 8,
  };
  return t[style];
}

export function constructionHours(style: BindingStyle): number {
  const c: Record<BindingStyle, number> = {
    coptic: 3, japanese_stab: 1, kettle_stitch: 4, perfect: 2, case_bound: 6,
  };
  return c[style];
}

export function exposedSpine(style: BindingStyle): boolean {
  const e: Record<BindingStyle, boolean> = {
    coptic: true, japanese_stab: true, kettle_stitch: false, perfect: false, case_bound: false,
  };
  return e[style];
}

export function bestApplication(style: BindingStyle): string {
  const b: Record<BindingStyle, string> = {
    coptic: "art_journals", japanese_stab: "photo_albums", kettle_stitch: "notebooks",
    perfect: "paperbacks", case_bound: "hardcovers",
  };
  return b[style];
}

export function skillLevel(style: BindingStyle): number {
  const s: Record<BindingStyle, number> = {
    coptic: 6, japanese_stab: 3, kettle_stitch: 7, perfect: 4, case_bound: 9,
  };
  return s[style];
}

export function costPerBook(style: BindingStyle): number {
  const c: Record<BindingStyle, number> = {
    coptic: 10, japanese_stab: 5, kettle_stitch: 12, perfect: 3, case_bound: 20,
  };
  return c[style];
}

export function bindingStyles(): BindingStyle[] {
  return ["coptic", "japanese_stab", "kettle_stitch", "perfect", "case_bound"];
}
