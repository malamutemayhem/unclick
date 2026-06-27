export type SlingBagType = "mini_chest_compact" | "crossbody_day_medium" | "tactical_molle_organizer" | "anti_theft_hidden_zip" | "tech_sling_cable_port";

export function capacity(t: SlingBagType): number {
  const m: Record<SlingBagType, number> = {
    mini_chest_compact: 2, crossbody_day_medium: 5, tactical_molle_organizer: 7, anti_theft_hidden_zip: 4, tech_sling_cable_port: 5,
  };
  return m[t];
}

export function accessibility(t: SlingBagType): number {
  const m: Record<SlingBagType, number> = {
    mini_chest_compact: 9, crossbody_day_medium: 8, tactical_molle_organizer: 7, anti_theft_hidden_zip: 5, tech_sling_cable_port: 8,
  };
  return m[t];
}

export function security(t: SlingBagType): number {
  const m: Record<SlingBagType, number> = {
    mini_chest_compact: 4, crossbody_day_medium: 5, tactical_molle_organizer: 7, anti_theft_hidden_zip: 10, tech_sling_cable_port: 6,
  };
  return m[t];
}

export function comfort(t: SlingBagType): number {
  const m: Record<SlingBagType, number> = {
    mini_chest_compact: 8, crossbody_day_medium: 7, tactical_molle_organizer: 6, anti_theft_hidden_zip: 7, tech_sling_cable_port: 7,
  };
  return m[t];
}

export function slingCost(t: SlingBagType): number {
  const m: Record<SlingBagType, number> = {
    mini_chest_compact: 2, crossbody_day_medium: 3, tactical_molle_organizer: 5, anti_theft_hidden_zip: 6, tech_sling_cable_port: 5,
  };
  return m[t];
}

export function rfidBlock(t: SlingBagType): boolean {
  const m: Record<SlingBagType, boolean> = {
    mini_chest_compact: false, crossbody_day_medium: false, tactical_molle_organizer: false, anti_theft_hidden_zip: true, tech_sling_cable_port: false,
  };
  return m[t];
}

export function hasChargePort(t: SlingBagType): boolean {
  const m: Record<SlingBagType, boolean> = {
    mini_chest_compact: false, crossbody_day_medium: false, tactical_molle_organizer: false, anti_theft_hidden_zip: false, tech_sling_cable_port: true,
  };
  return m[t];
}

export function strapDesign(t: SlingBagType): string {
  const m: Record<SlingBagType, string> = {
    mini_chest_compact: "thin_cord_minimalist",
    crossbody_day_medium: "wide_padded_adjustable",
    tactical_molle_organizer: "webbing_quick_release",
    anti_theft_hidden_zip: "slash_proof_steel_cable",
    tech_sling_cable_port: "ergonomic_breathable_mesh",
  };
  return m[t];
}

export function bestUse(t: SlingBagType): string {
  const m: Record<SlingBagType, string> = {
    mini_chest_compact: "quick_errands_walk",
    crossbody_day_medium: "sightseeing_day_trip",
    tactical_molle_organizer: "hiking_edc_outdoor",
    anti_theft_hidden_zip: "crowded_city_transit",
    tech_sling_cable_port: "digital_nomad_commute",
  };
  return m[t];
}

export function slingBags(): SlingBagType[] {
  return ["mini_chest_compact", "crossbody_day_medium", "tactical_molle_organizer", "anti_theft_hidden_zip", "tech_sling_cable_port"];
}
