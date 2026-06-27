export type RubberStampType = "red_rubber_wood" | "clear_photopolymer" | "foam_mounted_cushion" | "deep_etch_art" | "self_inking_office";

export function impressDetail(t: RubberStampType): number {
  const m: Record<RubberStampType, number> = {
    red_rubber_wood: 8, clear_photopolymer: 9, foam_mounted_cushion: 4, deep_etch_art: 10, self_inking_office: 6,
  };
  return m[t];
}

export function inkCoverage(t: RubberStampType): number {
  const m: Record<RubberStampType, number> = {
    red_rubber_wood: 8, clear_photopolymer: 7, foam_mounted_cushion: 9, deep_etch_art: 10, self_inking_office: 6,
  };
  return m[t];
}

export function easeOfUse(t: RubberStampType): number {
  const m: Record<RubberStampType, number> = {
    red_rubber_wood: 7, clear_photopolymer: 9, foam_mounted_cushion: 10, deep_etch_art: 5, self_inking_office: 10,
  };
  return m[t];
}

export function durability(t: RubberStampType): number {
  const m: Record<RubberStampType, number> = {
    red_rubber_wood: 9, clear_photopolymer: 6, foam_mounted_cushion: 4, deep_etch_art: 10, self_inking_office: 8,
  };
  return m[t];
}

export function stampCost(t: RubberStampType): number {
  const m: Record<RubberStampType, number> = {
    red_rubber_wood: 3, clear_photopolymer: 2, foam_mounted_cushion: 1, deep_etch_art: 5, self_inking_office: 3,
  };
  return m[t];
}

export function seeThrough(t: RubberStampType): boolean {
  const m: Record<RubberStampType, boolean> = {
    red_rubber_wood: false, clear_photopolymer: true, foam_mounted_cushion: false, deep_etch_art: false, self_inking_office: false,
  };
  return m[t];
}

export function selfInking(t: RubberStampType): boolean {
  const m: Record<RubberStampType, boolean> = {
    red_rubber_wood: false, clear_photopolymer: false, foam_mounted_cushion: false, deep_etch_art: false, self_inking_office: true,
  };
  return m[t];
}

export function stampMat(t: RubberStampType): string {
  const m: Record<RubberStampType, string> = {
    red_rubber_wood: "vulcanized_rubber_wood",
    clear_photopolymer: "photopolymer_acrylic",
    foam_mounted_cushion: "eva_foam_adhesive",
    deep_etch_art: "deep_cut_rubber",
    self_inking_office: "rubber_built_in_pad",
  };
  return m[t];
}

export function bestUse(t: RubberStampType): string {
  const m: Record<RubberStampType, string> = {
    red_rubber_wood: "card_making_classic",
    clear_photopolymer: "precise_placement_layer",
    foam_mounted_cushion: "kids_craft_simple",
    deep_etch_art: "fine_art_print",
    self_inking_office: "repeat_office_mark",
  };
  return m[t];
}

export function rubberStamps(): RubberStampType[] {
  return ["red_rubber_wood", "clear_photopolymer", "foam_mounted_cushion", "deep_etch_art", "self_inking_office"];
}
