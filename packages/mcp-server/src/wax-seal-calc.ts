export type WaxSealType = "traditional_stick" | "glue_gun_bead" | "self_adhesive" | "wicked_candle" | "electric_melter";

export function sealQuality(t: WaxSealType): number {
  const m: Record<WaxSealType, number> = {
    traditional_stick: 9, glue_gun_bead: 8, self_adhesive: 5, wicked_candle: 7, electric_melter: 10,
  };
  return m[t];
}

export function easeOfUse(t: WaxSealType): number {
  const m: Record<WaxSealType, number> = {
    traditional_stick: 4, glue_gun_bead: 8, self_adhesive: 10, wicked_candle: 5, electric_melter: 9,
  };
  return m[t];
}

export function batchSpeed(t: WaxSealType): number {
  const m: Record<WaxSealType, number> = {
    traditional_stick: 3, glue_gun_bead: 8, self_adhesive: 10, wicked_candle: 4, electric_melter: 9,
  };
  return m[t];
}

export function colorRange(t: WaxSealType): number {
  const m: Record<WaxSealType, number> = {
    traditional_stick: 7, glue_gun_bead: 10, self_adhesive: 6, wicked_candle: 5, electric_melter: 10,
  };
  return m[t];
}

export function sealCost(t: WaxSealType): number {
  const m: Record<WaxSealType, number> = {
    traditional_stick: 4, glue_gun_bead: 5, self_adhesive: 7, wicked_candle: 3, electric_melter: 8,
  };
  return m[t];
}

export function mailSafe(t: WaxSealType): boolean {
  const m: Record<WaxSealType, boolean> = {
    traditional_stick: false, glue_gun_bead: true, self_adhesive: true, wicked_candle: false, electric_melter: true,
  };
  return m[t];
}

export function openFlame(t: WaxSealType): boolean {
  const m: Record<WaxSealType, boolean> = {
    traditional_stick: true, glue_gun_bead: false, self_adhesive: false, wicked_candle: true, electric_melter: false,
  };
  return m[t];
}

export function meltMethod(t: WaxSealType): string {
  const m: Record<WaxSealType, string> = {
    traditional_stick: "open_flame_drip",
    glue_gun_bead: "electric_gun_trigger",
    self_adhesive: "pre_made_peel_stick",
    wicked_candle: "candle_wick_pool",
    electric_melter: "spoon_furnace_pour",
  };
  return m[t];
}

export function bestProject(t: WaxSealType): string {
  const m: Record<WaxSealType, string> = {
    traditional_stick: "classic_letter_ceremony",
    glue_gun_bead: "wedding_invitation_bulk",
    self_adhesive: "quick_gift_tag",
    wicked_candle: "vintage_journal_art",
    electric_melter: "small_business_branding",
  };
  return m[t];
}

export function waxSeals(): WaxSealType[] {
  return ["traditional_stick", "glue_gun_bead", "self_adhesive", "wicked_candle", "electric_melter"];
}
