export type GuitarPick = "thin_nylon" | "medium_celluloid" | "heavy_delrin" | "extra_heavy_ultem" | "felt_ukulele";

export function flexibility(g: GuitarPick): number {
  const m: Record<GuitarPick, number> = {
    thin_nylon: 10, medium_celluloid: 7, heavy_delrin: 3, extra_heavy_ultem: 1, felt_ukulele: 8,
  };
  return m[g];
}

export function attackBrightness(g: GuitarPick): number {
  const m: Record<GuitarPick, number> = {
    thin_nylon: 5, medium_celluloid: 7, heavy_delrin: 9, extra_heavy_ultem: 10, felt_ukulele: 2,
  };
  return m[g];
}

export function gripRetention(g: GuitarPick): number {
  const m: Record<GuitarPick, number> = {
    thin_nylon: 4, medium_celluloid: 6, heavy_delrin: 8, extra_heavy_ultem: 9, felt_ukulele: 7,
  };
  return m[g];
}

export function durability(g: GuitarPick): number {
  const m: Record<GuitarPick, number> = {
    thin_nylon: 3, medium_celluloid: 5, heavy_delrin: 9, extra_heavy_ultem: 10, felt_ukulele: 2,
  };
  return m[g];
}

export function pickCost(g: GuitarPick): number {
  const m: Record<GuitarPick, number> = {
    thin_nylon: 1, medium_celluloid: 2, heavy_delrin: 3, extra_heavy_ultem: 5, felt_ukulele: 2,
  };
  return m[g];
}

export function suitableForStrumming(g: GuitarPick): boolean {
  const m: Record<GuitarPick, boolean> = {
    thin_nylon: true, medium_celluloid: true, heavy_delrin: false, extra_heavy_ultem: false, felt_ukulele: true,
  };
  return m[g];
}

export function suitableForLeadGuitar(g: GuitarPick): boolean {
  const m: Record<GuitarPick, boolean> = {
    thin_nylon: false, medium_celluloid: true, heavy_delrin: true, extra_heavy_ultem: true, felt_ukulele: false,
  };
  return m[g];
}

export function material(g: GuitarPick): string {
  const m: Record<GuitarPick, string> = {
    thin_nylon: "injection_molded_nylon_44", medium_celluloid: "traditional_celluloid_73",
    heavy_delrin: "dupont_delrin_acetal_100", extra_heavy_ultem: "polyetherimide_ultem_120",
    felt_ukulele: "pressed_wool_felt_soft",
  };
  return m[g];
}

export function bestPlayStyle(g: GuitarPick): string {
  const m: Record<GuitarPick, string> = {
    thin_nylon: "acoustic_strumming_rhythm", medium_celluloid: "versatile_all_around",
    heavy_delrin: "electric_lead_precision", extra_heavy_ultem: "jazz_bass_heavy_attack",
    felt_ukulele: "ukulele_warm_mellow_tone",
  };
  return m[g];
}

export function guitarPicks(): GuitarPick[] {
  return ["thin_nylon", "medium_celluloid", "heavy_delrin", "extra_heavy_ultem", "felt_ukulele"];
}
