export type EmbossingMethod = "blind_emboss" | "foil_stamp" | "deboss" | "combo_emboss_foil" | "sculptured";

export function visualImpact(e: EmbossingMethod): number {
  const m: Record<EmbossingMethod, number> = {
    blind_emboss: 6, foil_stamp: 9, deboss: 5, combo_emboss_foil: 10, sculptured: 8,
  };
  return m[e];
}

export function tactileDepth(e: EmbossingMethod): number {
  const m: Record<EmbossingMethod, number> = {
    blind_emboss: 8, foil_stamp: 3, deboss: 7, combo_emboss_foil: 9, sculptured: 10,
  };
  return m[e];
}

export function detailResolution(e: EmbossingMethod): number {
  const m: Record<EmbossingMethod, number> = {
    blind_emboss: 7, foil_stamp: 9, deboss: 6, combo_emboss_foil: 8, sculptured: 10,
  };
  return m[e];
}

export function productionSpeed(e: EmbossingMethod): number {
  const m: Record<EmbossingMethod, number> = {
    blind_emboss: 7, foil_stamp: 6, deboss: 8, combo_emboss_foil: 4, sculptured: 3,
  };
  return m[e];
}

export function dieCost(e: EmbossingMethod): number {
  const m: Record<EmbossingMethod, number> = {
    blind_emboss: 5, foil_stamp: 7, deboss: 5, combo_emboss_foil: 9, sculptured: 10,
  };
  return m[e];
}

export function requiresHeat(e: EmbossingMethod): boolean {
  const m: Record<EmbossingMethod, boolean> = {
    blind_emboss: true, foil_stamp: true, deboss: true, combo_emboss_foil: true, sculptured: true,
  };
  return m[e];
}

export function usesMetallicFoil(e: EmbossingMethod): boolean {
  const m: Record<EmbossingMethod, boolean> = {
    blind_emboss: false, foil_stamp: true, deboss: false, combo_emboss_foil: true, sculptured: false,
  };
  return m[e];
}

export function dieType(e: EmbossingMethod): string {
  const m: Record<EmbossingMethod, string> = {
    blind_emboss: "single_level_brass_die", foil_stamp: "flat_foil_transfer_die",
    deboss: "recessed_impression_die", combo_emboss_foil: "multi_level_foil_die",
    sculptured: "hand_tooled_multilevel",
  };
  return m[e];
}

export function bestApplication(e: EmbossingMethod): string {
  const m: Record<EmbossingMethod, string> = {
    blind_emboss: "elegant_stationery_logo", foil_stamp: "certificate_luxury_label",
    deboss: "leather_cover_journal", combo_emboss_foil: "premium_packaging_invite",
    sculptured: "fine_art_reproduction",
  };
  return m[e];
}

export function embossingMethods(): EmbossingMethod[] {
  return ["blind_emboss", "foil_stamp", "deboss", "combo_emboss_foil", "sculptured"];
}
