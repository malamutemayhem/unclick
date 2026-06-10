export type MoneyBeltType = "under_shirt_flat" | "waist_pouch_zippered" | "neck_wallet_lanyard" | "leg_strap_hidden" | "rfid_block_crossbody";

export function concealability(t: MoneyBeltType): number {
  const m: Record<MoneyBeltType, number> = {
    under_shirt_flat: 10, waist_pouch_zippered: 7, neck_wallet_lanyard: 6, leg_strap_hidden: 9, rfid_block_crossbody: 4,
  };
  return m[t];
}

export function capacity(t: MoneyBeltType): number {
  const m: Record<MoneyBeltType, number> = {
    under_shirt_flat: 6, waist_pouch_zippered: 8, neck_wallet_lanyard: 5, leg_strap_hidden: 4, rfid_block_crossbody: 10,
  };
  return m[t];
}

export function comfort(t: MoneyBeltType): number {
  const m: Record<MoneyBeltType, number> = {
    under_shirt_flat: 7, waist_pouch_zippered: 6, neck_wallet_lanyard: 5, leg_strap_hidden: 4, rfid_block_crossbody: 9,
  };
  return m[t];
}

export function accessSpeed(t: MoneyBeltType): number {
  const m: Record<MoneyBeltType, number> = {
    under_shirt_flat: 3, waist_pouch_zippered: 6, neck_wallet_lanyard: 7, leg_strap_hidden: 2, rfid_block_crossbody: 10,
  };
  return m[t];
}

export function beltCost(t: MoneyBeltType): number {
  const m: Record<MoneyBeltType, number> = {
    under_shirt_flat: 4, waist_pouch_zippered: 5, neck_wallet_lanyard: 3, leg_strap_hidden: 6, rfid_block_crossbody: 8,
  };
  return m[t];
}

export function rfidProtection(t: MoneyBeltType): boolean {
  const m: Record<MoneyBeltType, boolean> = {
    under_shirt_flat: false, waist_pouch_zippered: false, neck_wallet_lanyard: false, leg_strap_hidden: false, rfid_block_crossbody: true,
  };
  return m[t];
}

export function waterResistant(t: MoneyBeltType): boolean {
  const m: Record<MoneyBeltType, boolean> = {
    under_shirt_flat: true, waist_pouch_zippered: true, neck_wallet_lanyard: false, leg_strap_hidden: true, rfid_block_crossbody: true,
  };
  return m[t];
}

export function beltMaterial(t: MoneyBeltType): string {
  const m: Record<MoneyBeltType, string> = {
    under_shirt_flat: "moisture_wick_mesh_flat",
    waist_pouch_zippered: "ripstop_nylon_elastic_band",
    neck_wallet_lanyard: "lightweight_polyester_cord",
    leg_strap_hidden: "elastic_strap_lycra_pocket",
    rfid_block_crossbody: "rfid_fabric_zippered_sling",
  };
  return m[t];
}

export function bestTrip(t: MoneyBeltType): string {
  const m: Record<MoneyBeltType, string> = {
    under_shirt_flat: "crowded_city_pickpocket_risk",
    waist_pouch_zippered: "hiking_active_adventure",
    neck_wallet_lanyard: "airport_quick_document_show",
    leg_strap_hidden: "high_risk_area_deep_hide",
    rfid_block_crossbody: "urban_daily_tourist_carry",
  };
  return m[t];
}

export function moneyBelts(): MoneyBeltType[] {
  return ["under_shirt_flat", "waist_pouch_zippered", "neck_wallet_lanyard", "leg_strap_hidden", "rfid_block_crossbody"];
}
