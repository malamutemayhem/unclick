export type StoneSetterType = "bezel_tube_cabochon" | "prong_claw_faceted" | "channel_row_inset" | "pave_bead_micro" | "flush_gypsy_mount";

export function holdStrength(t: StoneSetterType): number {
  const m: Record<StoneSetterType, number> = {
    bezel_tube_cabochon: 10, prong_claw_faceted: 7, channel_row_inset: 9, pave_bead_micro: 6, flush_gypsy_mount: 10,
  };
  return m[t];
}

export function lightEntry(t: StoneSetterType): number {
  const m: Record<StoneSetterType, number> = {
    bezel_tube_cabochon: 4, prong_claw_faceted: 10, channel_row_inset: 6, pave_bead_micro: 8, flush_gypsy_mount: 3,
  };
  return m[t];
}

export function skillRequired(t: StoneSetterType): number {
  const m: Record<StoneSetterType, number> = {
    bezel_tube_cabochon: 4, prong_claw_faceted: 6, channel_row_inset: 7, pave_bead_micro: 10, flush_gypsy_mount: 8,
  };
  return m[t];
}

export function stoneProtect(t: StoneSetterType): number {
  const m: Record<StoneSetterType, number> = {
    bezel_tube_cabochon: 10, prong_claw_faceted: 6, channel_row_inset: 9, pave_bead_micro: 7, flush_gypsy_mount: 10,
  };
  return m[t];
}

export function settingCost(t: StoneSetterType): number {
  const m: Record<StoneSetterType, number> = {
    bezel_tube_cabochon: 2, prong_claw_faceted: 2, channel_row_inset: 3, pave_bead_micro: 4, flush_gypsy_mount: 3,
  };
  return m[t];
}

export function forCabochon(t: StoneSetterType): boolean {
  const m: Record<StoneSetterType, boolean> = {
    bezel_tube_cabochon: true, prong_claw_faceted: false, channel_row_inset: false, pave_bead_micro: false, flush_gypsy_mount: true,
  };
  return m[t];
}

export function showsFullStone(t: StoneSetterType): boolean {
  const m: Record<StoneSetterType, boolean> = {
    bezel_tube_cabochon: false, prong_claw_faceted: true, channel_row_inset: false, pave_bead_micro: true, flush_gypsy_mount: false,
  };
  return m[t];
}

export function metalNeeded(t: StoneSetterType): string {
  const m: Record<StoneSetterType, string> = {
    bezel_tube_cabochon: "bezel_strip_wrap",
    prong_claw_faceted: "wire_prong_basket",
    channel_row_inset: "milled_channel_wall",
    pave_bead_micro: "drilled_seat_bead",
    flush_gypsy_mount: "thick_plate_recess",
  };
  return m[t];
}

export function bestStone(t: StoneSetterType): string {
  const m: Record<StoneSetterType, string> = {
    bezel_tube_cabochon: "turquoise_opal_cab",
    prong_claw_faceted: "diamond_sapphire_cut",
    channel_row_inset: "baguette_row_band",
    pave_bead_micro: "melee_diamond_surface",
    flush_gypsy_mount: "men_band_single_stone",
  };
  return m[t];
}

export function stoneSetters(): StoneSetterType[] {
  return ["bezel_tube_cabochon", "prong_claw_faceted", "channel_row_inset", "pave_bead_micro", "flush_gypsy_mount"];
}
