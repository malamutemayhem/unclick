export type ExhibitDesign = "chronological" | "thematic" | "immersive" | "interactive" | "object_focused";

export function visitorEngagement(e: ExhibitDesign): number {
  const m: Record<ExhibitDesign, number> = {
    chronological: 5, thematic: 7, immersive: 10, interactive: 9, object_focused: 4,
  };
  return m[e];
}

export function educationalDepth(e: ExhibitDesign): number {
  const m: Record<ExhibitDesign, number> = {
    chronological: 8, thematic: 9, immersive: 6, interactive: 7, object_focused: 10,
  };
  return m[e];
}

export function designCost(e: ExhibitDesign): number {
  const m: Record<ExhibitDesign, number> = {
    chronological: 4, thematic: 5, immersive: 10, interactive: 8, object_focused: 3,
  };
  return m[e];
}

export function flexibilityToReinstall(e: ExhibitDesign): number {
  const m: Record<ExhibitDesign, number> = {
    chronological: 7, thematic: 9, immersive: 3, interactive: 5, object_focused: 10,
  };
  return m[e];
}

export function accessibilityScore(e: ExhibitDesign): number {
  const m: Record<ExhibitDesign, number> = {
    chronological: 7, thematic: 7, immersive: 5, interactive: 9, object_focused: 6,
  };
  return m[e];
}

export function requiresTechnology(e: ExhibitDesign): boolean {
  const m: Record<ExhibitDesign, boolean> = {
    chronological: false, thematic: false, immersive: true, interactive: true, object_focused: false,
  };
  return m[e];
}

export function suitableForTraveling(e: ExhibitDesign): boolean {
  const m: Record<ExhibitDesign, boolean> = {
    chronological: true, thematic: true, immersive: false, interactive: false, object_focused: true,
  };
  return m[e];
}

export function narrativeStyle(e: ExhibitDesign): string {
  const m: Record<ExhibitDesign, string> = {
    chronological: "linear_timeline", thematic: "grouped_concept_cluster",
    immersive: "spatial_sensory_environment", interactive: "hands_on_discovery",
    object_focused: "single_masterwork_deep_dive",
  };
  return m[e];
}

export function bestMuseumType(e: ExhibitDesign): string {
  const m: Record<ExhibitDesign, string> = {
    chronological: "history_archaeology", thematic: "art_science_crossover",
    immersive: "contemporary_art_science_center", interactive: "children_natural_history",
    object_focused: "fine_art_antiquities",
  };
  return m[e];
}

export function exhibitDesigns(): ExhibitDesign[] {
  return ["chronological", "thematic", "immersive", "interactive", "object_focused"];
}
