export type TravelWalletType = "passport_organizer_zip" | "rfid_blocking_slim" | "neck_pouch_hidden" | "family_document_holder" | "tech_cable_passport_combo";

export function documentCapacity(t: TravelWalletType): number {
  const m: Record<TravelWalletType, number> = {
    passport_organizer_zip: 8, rfid_blocking_slim: 5, neck_pouch_hidden: 6, family_document_holder: 10, tech_cable_passport_combo: 7,
  };
  return m[t];
}

export function security(t: TravelWalletType): number {
  const m: Record<TravelWalletType, number> = {
    passport_organizer_zip: 7, rfid_blocking_slim: 9, neck_pouch_hidden: 10, family_document_holder: 6, tech_cable_passport_combo: 7,
  };
  return m[t];
}

export function accessibility(t: TravelWalletType): number {
  const m: Record<TravelWalletType, number> = {
    passport_organizer_zip: 8, rfid_blocking_slim: 9, neck_pouch_hidden: 4, family_document_holder: 7, tech_cable_passport_combo: 7,
  };
  return m[t];
}

export function slimProfile(t: TravelWalletType): number {
  const m: Record<TravelWalletType, number> = {
    passport_organizer_zip: 5, rfid_blocking_slim: 10, neck_pouch_hidden: 7, family_document_holder: 3, tech_cable_passport_combo: 4,
  };
  return m[t];
}

export function walletCost(t: TravelWalletType): number {
  const m: Record<TravelWalletType, number> = {
    passport_organizer_zip: 3, rfid_blocking_slim: 2, neck_pouch_hidden: 2, family_document_holder: 3, tech_cable_passport_combo: 4,
  };
  return m[t];
}

export function rfidBlocking(t: TravelWalletType): boolean {
  const m: Record<TravelWalletType, boolean> = {
    passport_organizer_zip: false, rfid_blocking_slim: true, neck_pouch_hidden: true, family_document_holder: false, tech_cable_passport_combo: true,
  };
  return m[t];
}

export function concealed(t: TravelWalletType): boolean {
  const m: Record<TravelWalletType, boolean> = {
    passport_organizer_zip: false, rfid_blocking_slim: false, neck_pouch_hidden: true, family_document_holder: false, tech_cable_passport_combo: false,
  };
  return m[t];
}

export function closureStyle(t: TravelWalletType): string {
  const m: Record<TravelWalletType, string> = {
    passport_organizer_zip: "wraparound_zip_close",
    rfid_blocking_slim: "bifold_snap_button",
    neck_pouch_hidden: "zip_top_lanyard",
    family_document_holder: "accordion_elastic_band",
    tech_cable_passport_combo: "zip_around_elastic",
  };
  return m[t];
}

export function bestTrip(t: TravelWalletType): string {
  const m: Record<TravelWalletType, string> = {
    passport_organizer_zip: "multi_country_tour",
    rfid_blocking_slim: "business_frequent_fly",
    neck_pouch_hidden: "crowded_city_pickpocket",
    family_document_holder: "family_vacation_group",
    tech_cable_passport_combo: "digital_nomad_remote",
  };
  return m[t];
}

export function travelWallets(): TravelWalletType[] {
  return ["passport_organizer_zip", "rfid_blocking_slim", "neck_pouch_hidden", "family_document_holder", "tech_cable_passport_combo"];
}
