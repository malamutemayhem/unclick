export type FacetLapType = "cast_iron_charge" | "copper_fine_polish" | "ceramic_oxide_bond" | "tin_lead_alloy" | "composite_resin_disc";

export function cuttingRate(t: FacetLapType): number {
  const m: Record<FacetLapType, number> = {
    cast_iron_charge: 10, copper_fine_polish: 5, ceramic_oxide_bond: 8, tin_lead_alloy: 4, composite_resin_disc: 7,
  };
  return m[t];
}

export function polishQuality(t: FacetLapType): number {
  const m: Record<FacetLapType, number> = {
    cast_iron_charge: 5, copper_fine_polish: 10, ceramic_oxide_bond: 7, tin_lead_alloy: 9, composite_resin_disc: 8,
  };
  return m[t];
}

export function flatness(t: FacetLapType): number {
  const m: Record<FacetLapType, number> = {
    cast_iron_charge: 9, copper_fine_polish: 8, ceramic_oxide_bond: 10, tin_lead_alloy: 7, composite_resin_disc: 6,
  };
  return m[t];
}

export function lapLife(t: FacetLapType): number {
  const m: Record<FacetLapType, number> = {
    cast_iron_charge: 9, copper_fine_polish: 6, ceramic_oxide_bond: 10, tin_lead_alloy: 5, composite_resin_disc: 7,
  };
  return m[t];
}

export function lapCost(t: FacetLapType): number {
  const m: Record<FacetLapType, number> = {
    cast_iron_charge: 2, copper_fine_polish: 3, ceramic_oxide_bond: 3, tin_lead_alloy: 2, composite_resin_disc: 1,
  };
  return m[t];
}

export function needsCharge(t: FacetLapType): boolean {
  const m: Record<FacetLapType, boolean> = {
    cast_iron_charge: true, copper_fine_polish: true, ceramic_oxide_bond: false, tin_lead_alloy: true, composite_resin_disc: false,
  };
  return m[t];
}

export function preCharged(t: FacetLapType): boolean {
  const m: Record<FacetLapType, boolean> = {
    cast_iron_charge: false, copper_fine_polish: false, ceramic_oxide_bond: true, tin_lead_alloy: false, composite_resin_disc: true,
  };
  return m[t];
}

export function lapMaterial(t: FacetLapType): string {
  const m: Record<FacetLapType, string> = {
    cast_iron_charge: "grey_cast_iron",
    copper_fine_polish: "solid_copper_disc",
    ceramic_oxide_bond: "aluminum_oxide_bond",
    tin_lead_alloy: "tin_lead_soft_alloy",
    composite_resin_disc: "phenolic_resin_matrix",
  };
  return m[t];
}

export function bestUse(t: FacetLapType): string {
  const m: Record<FacetLapType, string> = {
    cast_iron_charge: "rough_facet_grind",
    copper_fine_polish: "final_mirror_polish",
    ceramic_oxide_bond: "medium_pre_polish",
    tin_lead_alloy: "soft_stone_polish",
    composite_resin_disc: "general_purpose_lap",
  };
  return m[t];
}

export function facetLaps(): FacetLapType[] {
  return ["cast_iron_charge", "copper_fine_polish", "ceramic_oxide_bond", "tin_lead_alloy", "composite_resin_disc"];
}
