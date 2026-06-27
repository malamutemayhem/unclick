export type MessengerBagType = "canvas_classic_flap" | "leather_professional" | "waxed_cotton_heritage" | "nylon_tech_slim" | "convertible_backpack_hybrid";

export function laptopFit(t: MessengerBagType): number {
  const m: Record<MessengerBagType, number> = {
    canvas_classic_flap: 6, leather_professional: 8, waxed_cotton_heritage: 5, nylon_tech_slim: 9, convertible_backpack_hybrid: 8,
  };
  return m[t];
}

export function comfort(t: MessengerBagType): number {
  const m: Record<MessengerBagType, number> = {
    canvas_classic_flap: 6, leather_professional: 7, waxed_cotton_heritage: 5, nylon_tech_slim: 8, convertible_backpack_hybrid: 9,
  };
  return m[t];
}

export function durability(t: MessengerBagType): number {
  const m: Record<MessengerBagType, number> = {
    canvas_classic_flap: 7, leather_professional: 9, waxed_cotton_heritage: 8, nylon_tech_slim: 6, convertible_backpack_hybrid: 7,
  };
  return m[t];
}

export function styleAppeal(t: MessengerBagType): number {
  const m: Record<MessengerBagType, number> = {
    canvas_classic_flap: 6, leather_professional: 10, waxed_cotton_heritage: 9, nylon_tech_slim: 5, convertible_backpack_hybrid: 6,
  };
  return m[t];
}

export function bagCost(t: MessengerBagType): number {
  const m: Record<MessengerBagType, number> = {
    canvas_classic_flap: 3, leather_professional: 8, waxed_cotton_heritage: 6, nylon_tech_slim: 4, convertible_backpack_hybrid: 5,
  };
  return m[t];
}

export function waterResist(t: MessengerBagType): boolean {
  const m: Record<MessengerBagType, boolean> = {
    canvas_classic_flap: false, leather_professional: false, waxed_cotton_heritage: true, nylon_tech_slim: true, convertible_backpack_hybrid: false,
  };
  return m[t];
}

export function convertsToBackpack(t: MessengerBagType): boolean {
  const m: Record<MessengerBagType, boolean> = {
    canvas_classic_flap: false, leather_professional: false, waxed_cotton_heritage: false, nylon_tech_slim: false, convertible_backpack_hybrid: true,
  };
  return m[t];
}

export function strapType(t: MessengerBagType): string {
  const m: Record<MessengerBagType, string> = {
    canvas_classic_flap: "cotton_web_adjustable",
    leather_professional: "leather_padded_shoulder",
    waxed_cotton_heritage: "canvas_leather_combo",
    nylon_tech_slim: "nylon_quick_release",
    convertible_backpack_hybrid: "dual_strap_detach",
  };
  return m[t];
}

export function bestUse(t: MessengerBagType): string {
  const m: Record<MessengerBagType, string> = {
    canvas_classic_flap: "casual_campus_daily",
    leather_professional: "business_meeting_client",
    waxed_cotton_heritage: "bike_commute_rain",
    nylon_tech_slim: "tech_office_travel",
    convertible_backpack_hybrid: "flexible_transit_mixed",
  };
  return m[t];
}

export function messengerBags(): MessengerBagType[] {
  return ["canvas_classic_flap", "leather_professional", "waxed_cotton_heritage", "nylon_tech_slim", "convertible_backpack_hybrid"];
}
