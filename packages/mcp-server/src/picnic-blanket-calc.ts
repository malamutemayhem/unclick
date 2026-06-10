export type PicnicBlanketType = "fleece_waterproof_back" | "woven_cotton_classic" | "straw_roll_up_beach" | "padded_quilted_thick" | "nylon_ultralight_camp";

export function comfort(t: PicnicBlanketType): number {
  const m: Record<PicnicBlanketType, number> = {
    fleece_waterproof_back: 8, woven_cotton_classic: 9, straw_roll_up_beach: 4, padded_quilted_thick: 10, nylon_ultralight_camp: 5,
  };
  return m[t];
}

export function waterResist(t: PicnicBlanketType): number {
  const m: Record<PicnicBlanketType, number> = {
    fleece_waterproof_back: 10, woven_cotton_classic: 2, straw_roll_up_beach: 5, padded_quilted_thick: 7, nylon_ultralight_camp: 9,
  };
  return m[t];
}

export function packSize(t: PicnicBlanketType): number {
  const m: Record<PicnicBlanketType, number> = {
    fleece_waterproof_back: 5, woven_cotton_classic: 4, straw_roll_up_beach: 6, padded_quilted_thick: 2, nylon_ultralight_camp: 10,
  };
  return m[t];
}

export function cleanEase(t: PicnicBlanketType): number {
  const m: Record<PicnicBlanketType, number> = {
    fleece_waterproof_back: 8, woven_cotton_classic: 5, straw_roll_up_beach: 9, padded_quilted_thick: 3, nylon_ultralight_camp: 10,
  };
  return m[t];
}

export function blanketCost(t: PicnicBlanketType): number {
  const m: Record<PicnicBlanketType, number> = {
    fleece_waterproof_back: 4, woven_cotton_classic: 5, straw_roll_up_beach: 3, padded_quilted_thick: 6, nylon_ultralight_camp: 5,
  };
  return m[t];
}

export function machineWash(t: PicnicBlanketType): boolean {
  const m: Record<PicnicBlanketType, boolean> = {
    fleece_waterproof_back: true, woven_cotton_classic: true, straw_roll_up_beach: false, padded_quilted_thick: true, nylon_ultralight_camp: true,
  };
  return m[t];
}

export function sandResist(t: PicnicBlanketType): boolean {
  const m: Record<PicnicBlanketType, boolean> = {
    fleece_waterproof_back: false, woven_cotton_classic: false, straw_roll_up_beach: true, padded_quilted_thick: false, nylon_ultralight_camp: true,
  };
  return m[t];
}

export function topFabric(t: PicnicBlanketType): string {
  const m: Record<PicnicBlanketType, string> = {
    fleece_waterproof_back: "polar_fleece_peva_back",
    woven_cotton_classic: "herringbone_cotton_woven",
    straw_roll_up_beach: "woven_straw_mat_vinyl",
    padded_quilted_thick: "quilted_polyester_fill",
    nylon_ultralight_camp: "ripstop_nylon_compact",
  };
  return m[t];
}

export function bestOuting(t: PicnicBlanketType): string {
  const m: Record<PicnicBlanketType, string> = {
    fleece_waterproof_back: "park_damp_grass_family",
    woven_cotton_classic: "garden_summer_aesthetic",
    straw_roll_up_beach: "sandy_beach_lakeside",
    padded_quilted_thick: "outdoor_concert_festival",
    nylon_ultralight_camp: "backpacking_trail_light",
  };
  return m[t];
}

export function picnicBlankets(): PicnicBlanketType[] {
  return ["fleece_waterproof_back", "woven_cotton_classic", "straw_roll_up_beach", "padded_quilted_thick", "nylon_ultralight_camp"];
}
