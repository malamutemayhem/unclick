export type LuggageTagType = "leather_buckle" | "silicone_bright" | "metal_engraved" | "digital_bluetooth" | "paper_loop_disposable";

export function durability(t: LuggageTagType): number {
  const m: Record<LuggageTagType, number> = {
    leather_buckle: 8, silicone_bright: 7, metal_engraved: 10, digital_bluetooth: 6, paper_loop_disposable: 1,
  };
  return m[t];
}

export function visibility(t: LuggageTagType): number {
  const m: Record<LuggageTagType, number> = {
    leather_buckle: 5, silicone_bright: 10, metal_engraved: 6, digital_bluetooth: 3, paper_loop_disposable: 4,
  };
  return m[t];
}

export function privacyLevel(t: LuggageTagType): number {
  const m: Record<LuggageTagType, number> = {
    leather_buckle: 7, silicone_bright: 4, metal_engraved: 5, digital_bluetooth: 10, paper_loop_disposable: 6,
  };
  return m[t];
}

export function attachSecure(t: LuggageTagType): number {
  const m: Record<LuggageTagType, number> = {
    leather_buckle: 9, silicone_bright: 6, metal_engraved: 10, digital_bluetooth: 7, paper_loop_disposable: 2,
  };
  return m[t];
}

export function tagCost(t: LuggageTagType): number {
  const m: Record<LuggageTagType, number> = {
    leather_buckle: 4, silicone_bright: 1, metal_engraved: 5, digital_bluetooth: 9, paper_loop_disposable: 1,
  };
  return m[t];
}

export function trackable(t: LuggageTagType): boolean {
  const m: Record<LuggageTagType, boolean> = {
    leather_buckle: false, silicone_bright: false, metal_engraved: false, digital_bluetooth: true, paper_loop_disposable: false,
  };
  return m[t];
}

export function waterproof(t: LuggageTagType): boolean {
  const m: Record<LuggageTagType, boolean> = {
    leather_buckle: false, silicone_bright: true, metal_engraved: true, digital_bluetooth: false, paper_loop_disposable: false,
  };
  return m[t];
}

export function attachMethod(t: LuggageTagType): string {
  const m: Record<LuggageTagType, string> = {
    leather_buckle: "buckle_strap_loop",
    silicone_bright: "flexible_loop_snap",
    metal_engraved: "steel_cable_lock",
    digital_bluetooth: "strap_clip_tracker",
    paper_loop_disposable: "plastic_loop_tie",
  };
  return m[t];
}

export function bestTrip(t: LuggageTagType): string {
  const m: Record<LuggageTagType, string> = {
    leather_buckle: "business_travel_classic",
    silicone_bright: "family_vacation_spot",
    metal_engraved: "frequent_flyer_premium",
    digital_bluetooth: "international_track_locate",
    paper_loop_disposable: "airline_provided_temp",
  };
  return m[t];
}

export function luggageTags(): LuggageTagType[] {
  return ["leather_buckle", "silicone_bright", "metal_engraved", "digital_bluetooth", "paper_loop_disposable"];
}
