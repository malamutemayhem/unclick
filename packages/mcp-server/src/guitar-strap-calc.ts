export type GuitarStrapType = "nylon_basic" | "leather_padded" | "cotton_woven" | "neoprene_comfort" | "vintage_embroidered";

export function comfort(t: GuitarStrapType): number {
  const m: Record<GuitarStrapType, number> = {
    nylon_basic: 4, leather_padded: 9, cotton_woven: 6, neoprene_comfort: 10, vintage_embroidered: 7,
  };
  return m[t];
}

export function durability(t: GuitarStrapType): number {
  const m: Record<GuitarStrapType, number> = {
    nylon_basic: 6, leather_padded: 10, cotton_woven: 5, neoprene_comfort: 7, vintage_embroidered: 8,
  };
  return m[t];
}

export function gripOnShoulder(t: GuitarStrapType): number {
  const m: Record<GuitarStrapType, number> = {
    nylon_basic: 3, leather_padded: 7, cotton_woven: 5, neoprene_comfort: 10, vintage_embroidered: 6,
  };
  return m[t];
}

export function aestheticStyle(t: GuitarStrapType): number {
  const m: Record<GuitarStrapType, number> = {
    nylon_basic: 2, leather_padded: 8, cotton_woven: 6, neoprene_comfort: 4, vintage_embroidered: 10,
  };
  return m[t];
}

export function strapCost(t: GuitarStrapType): number {
  const m: Record<GuitarStrapType, number> = {
    nylon_basic: 1, leather_padded: 7, cotton_woven: 3, neoprene_comfort: 5, vintage_embroidered: 8,
  };
  return m[t];
}

export function adjustable(t: GuitarStrapType): boolean {
  const m: Record<GuitarStrapType, boolean> = {
    nylon_basic: true, leather_padded: true, cotton_woven: true, neoprene_comfort: true, vintage_embroidered: true,
  };
  return m[t];
}

export function machineWash(t: GuitarStrapType): boolean {
  const m: Record<GuitarStrapType, boolean> = {
    nylon_basic: true, leather_padded: false, cotton_woven: true, neoprene_comfort: true, vintage_embroidered: false,
  };
  return m[t];
}

export function strapMaterial(t: GuitarStrapType): string {
  const m: Record<GuitarStrapType, string> = {
    nylon_basic: "woven_nylon_webbing",
    leather_padded: "full_grain_cowhide_padded",
    cotton_woven: "hand_woven_cotton_jacquard",
    neoprene_comfort: "neoprene_foam_core",
    vintage_embroidered: "poly_embroidered_tapestry",
  };
  return m[t];
}

export function bestGuitar(t: GuitarStrapType): string {
  const m: Record<GuitarStrapType, string> = {
    nylon_basic: "student_practice_budget",
    leather_padded: "heavy_les_paul_long_set",
    cotton_woven: "acoustic_singer_songwriter",
    neoprene_comfort: "bass_heavy_instrument",
    vintage_embroidered: "stage_performer_show",
  };
  return m[t];
}

export function guitarStraps(): GuitarStrapType[] {
  return ["nylon_basic", "leather_padded", "cotton_woven", "neoprene_comfort", "vintage_embroidered"];
}
