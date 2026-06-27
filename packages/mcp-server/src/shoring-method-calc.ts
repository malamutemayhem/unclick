export type ShoringMethod = "timber_shoring" | "steel_beam" | "hydraulic_jack" | "post_shore" | "flying_form";

export function loadBearing(s: ShoringMethod): number {
  const m: Record<ShoringMethod, number> = {
    timber_shoring: 4, steel_beam: 9, hydraulic_jack: 8, post_shore: 6, flying_form: 10,
  };
  return m[s];
}

export function adjustability(s: ShoringMethod): number {
  const m: Record<ShoringMethod, number> = {
    timber_shoring: 2, steel_beam: 5, hydraulic_jack: 10, post_shore: 7, flying_form: 4,
  };
  return m[s];
}

export function installSpeed(s: ShoringMethod): number {
  const m: Record<ShoringMethod, number> = {
    timber_shoring: 3, steel_beam: 5, hydraulic_jack: 7, post_shore: 8, flying_form: 9,
  };
  return m[s];
}

export function equipmentCost(s: ShoringMethod): number {
  const m: Record<ShoringMethod, number> = {
    timber_shoring: 2, steel_beam: 6, hydraulic_jack: 8, post_shore: 4, flying_form: 10,
  };
  return m[s];
}

export function heightCapacity(s: ShoringMethod): number {
  const m: Record<ShoringMethod, number> = {
    timber_shoring: 3, steel_beam: 8, hydraulic_jack: 6, post_shore: 5, flying_form: 10,
  };
  return m[s];
}

export function requiresCrane(s: ShoringMethod): boolean {
  const m: Record<ShoringMethod, boolean> = {
    timber_shoring: false, steel_beam: true, hydraulic_jack: false, post_shore: false, flying_form: true,
  };
  return m[s];
}

export function reusable(s: ShoringMethod): boolean {
  const m: Record<ShoringMethod, boolean> = {
    timber_shoring: false, steel_beam: true, hydraulic_jack: true, post_shore: true, flying_form: true,
  };
  return m[s];
}

export function supportType(s: ShoringMethod): string {
  const m: Record<ShoringMethod, string> = {
    timber_shoring: "vertical_dead_shore", steel_beam: "horizontal_needle_beam",
    hydraulic_jack: "adjustable_prop_tower", post_shore: "telescopic_single_prop",
    flying_form: "table_form_crane_moved",
  };
  return m[s];
}

export function bestApplication(s: ShoringMethod): string {
  const m: Record<ShoringMethod, string> = {
    timber_shoring: "light_renovation_work", steel_beam: "heavy_structural_support",
    hydraulic_jack: "bridge_deck_precise_level", post_shore: "slab_formwork_support",
    flying_form: "high_rise_repetitive_floor",
  };
  return m[s];
}

export function shoringMethods(): ShoringMethod[] {
  return ["timber_shoring", "steel_beam", "hydraulic_jack", "post_shore", "flying_form"];
}
