export type IroningMethod = "steam_iron" | "dry_iron" | "garment_steamer" | "steam_press" | "rotary_iron";

export function wrinkleRemoval(i: IroningMethod): number {
  const m: Record<IroningMethod, number> = {
    steam_iron: 8, dry_iron: 6, garment_steamer: 7, steam_press: 10, rotary_iron: 9,
  };
  return m[i];
}

export function speedPerGarment(i: IroningMethod): number {
  const m: Record<IroningMethod, number> = {
    steam_iron: 5, dry_iron: 4, garment_steamer: 8, steam_press: 9, rotary_iron: 10,
  };
  return m[i];
}

export function fabricSafety(i: IroningMethod): number {
  const m: Record<IroningMethod, number> = {
    steam_iron: 7, dry_iron: 5, garment_steamer: 10, steam_press: 6, rotary_iron: 4,
  };
  return m[i];
}

export function portability(i: IroningMethod): number {
  const m: Record<IroningMethod, number> = {
    steam_iron: 7, dry_iron: 8, garment_steamer: 9, steam_press: 2, rotary_iron: 1,
  };
  return m[i];
}

export function purchasePrice(i: IroningMethod): number {
  const m: Record<IroningMethod, number> = {
    steam_iron: 3, dry_iron: 2, garment_steamer: 4, steam_press: 8, rotary_iron: 10,
  };
  return m[i];
}

export function requiresBoard(i: IroningMethod): boolean {
  const m: Record<IroningMethod, boolean> = {
    steam_iron: true, dry_iron: true, garment_steamer: false, steam_press: false, rotary_iron: false,
  };
  return m[i];
}

export function suitableForCommercial(i: IroningMethod): boolean {
  const m: Record<IroningMethod, boolean> = {
    steam_iron: false, dry_iron: false, garment_steamer: false, steam_press: true, rotary_iron: true,
  };
  return m[i];
}

export function heatMethod(i: IroningMethod): string {
  const m: Record<IroningMethod, string> = {
    steam_iron: "soleplate_steam_burst", dry_iron: "heated_soleplate_only",
    garment_steamer: "continuous_steam_wand", steam_press: "heated_platen_press",
    rotary_iron: "heated_roller_feed",
  };
  return m[i];
}

export function bestGarment(i: IroningMethod): string {
  const m: Record<IroningMethod, string> = {
    steam_iron: "dress_shirt_trouser", dry_iron: "cotton_linen_flat",
    garment_steamer: "suit_delicate_curtain", steam_press: "uniform_batch_processing",
    rotary_iron: "flat_linen_sheet_tablecloth",
  };
  return m[i];
}

export function ironingMethods(): IroningMethod[] {
  return ["steam_iron", "dry_iron", "garment_steamer", "steam_press", "rotary_iron"];
}
