export type TripodType = "aluminum_travel" | "carbon_fiber" | "tabletop_mini" | "video_fluid" | "monopod";

export function loadCapacity(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 6, carbon_fiber: 8, tabletop_mini: 3, video_fluid: 10, monopod: 5,
  };
  return m[t];
}

export function stability(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 7, carbon_fiber: 9, tabletop_mini: 4, video_fluid: 10, monopod: 3,
  };
  return m[t];
}

export function portability(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 7, carbon_fiber: 8, tabletop_mini: 10, video_fluid: 2, monopod: 9,
  };
  return m[t];
}

export function maxHeight(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 7, carbon_fiber: 8, tabletop_mini: 2, video_fluid: 9, monopod: 10,
  };
  return m[t];
}

export function tripodCost(t: TripodType): number {
  const m: Record<TripodType, number> = {
    aluminum_travel: 4, carbon_fiber: 8, tabletop_mini: 2, video_fluid: 9, monopod: 3,
  };
  return m[t];
}

export function hasFluidHead(t: TripodType): boolean {
  const m: Record<TripodType, boolean> = {
    aluminum_travel: false, carbon_fiber: false, tabletop_mini: false, video_fluid: true, monopod: false,
  };
  return m[t];
}

export function foldingLegs(t: TripodType): boolean {
  const m: Record<TripodType, boolean> = {
    aluminum_travel: true, carbon_fiber: true, tabletop_mini: true, video_fluid: true, monopod: false,
  };
  return m[t];
}

export function legMaterial(t: TripodType): string {
  const m: Record<TripodType, string> = {
    aluminum_travel: "anodized_aluminum_alloy", carbon_fiber: "layered_carbon_fiber_tube",
    tabletop_mini: "reinforced_abs_plastic", video_fluid: "heavy_aluminum_twin_tube",
    monopod: "carbon_aluminum_single_pole",
  };
  return m[t];
}

export function bestUse(t: TripodType): string {
  const m: Record<TripodType, string> = {
    aluminum_travel: "travel_landscape_photography", carbon_fiber: "professional_field_work",
    tabletop_mini: "vlogging_product_macro", video_fluid: "cinema_broadcast_interview",
    monopod: "sports_wildlife_event",
  };
  return m[t];
}

export function tripodTypes(): TripodType[] {
  return ["aluminum_travel", "carbon_fiber", "tabletop_mini", "video_fluid", "monopod"];
}
