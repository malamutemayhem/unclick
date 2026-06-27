export type PassportHolderType = "leather_classic" | "rfid_blocking" | "family_organizer" | "neck_wallet_hidden" | "tech_smart_tag";

export function protection(t: PassportHolderType): number {
  const m: Record<PassportHolderType, number> = {
    leather_classic: 6, rfid_blocking: 9, family_organizer: 7, neck_wallet_hidden: 8, tech_smart_tag: 8,
  };
  return m[t];
}

export function cardSlots(t: PassportHolderType): number {
  const m: Record<PassportHolderType, number> = {
    leather_classic: 4, rfid_blocking: 6, family_organizer: 10, neck_wallet_hidden: 3, tech_smart_tag: 5,
  };
  return m[t];
}

export function styleScore(t: PassportHolderType): number {
  const m: Record<PassportHolderType, number> = {
    leather_classic: 10, rfid_blocking: 6, family_organizer: 4, neck_wallet_hidden: 2, tech_smart_tag: 7,
  };
  return m[t];
}

export function concealability(t: PassportHolderType): number {
  const m: Record<PassportHolderType, number> = {
    leather_classic: 3, rfid_blocking: 4, family_organizer: 2, neck_wallet_hidden: 10, tech_smart_tag: 5,
  };
  return m[t];
}

export function holderCost(t: PassportHolderType): number {
  const m: Record<PassportHolderType, number> = {
    leather_classic: 7, rfid_blocking: 5, family_organizer: 6, neck_wallet_hidden: 3, tech_smart_tag: 9,
  };
  return m[t];
}

export function rfidProtection(t: PassportHolderType): boolean {
  const m: Record<PassportHolderType, boolean> = {
    leather_classic: false, rfid_blocking: true, family_organizer: true, neck_wallet_hidden: true, tech_smart_tag: true,
  };
  return m[t];
}

export function trackable(t: PassportHolderType): boolean {
  const m: Record<PassportHolderType, boolean> = {
    leather_classic: false, rfid_blocking: false, family_organizer: false, neck_wallet_hidden: false, tech_smart_tag: true,
  };
  return m[t];
}

export function outerMaterial(t: PassportHolderType): string {
  const m: Record<PassportHolderType, string> = {
    leather_classic: "full_grain_leather",
    rfid_blocking: "nylon_foil_lined",
    family_organizer: "poly_accordion_wallet",
    neck_wallet_hidden: "ripstop_lanyard_pouch",
    tech_smart_tag: "vegan_leather_airtag_slot",
  };
  return m[t];
}

export function bestTraveler(t: PassportHolderType): string {
  const m: Record<PassportHolderType, string> = {
    leather_classic: "luxury_business_trip",
    rfid_blocking: "security_conscious_solo",
    family_organizer: "family_group_vacation",
    neck_wallet_hidden: "backpacker_crowded_city",
    tech_smart_tag: "tech_savvy_frequent_flyer",
  };
  return m[t];
}

export function passportHolders(): PassportHolderType[] {
  return ["leather_classic", "rfid_blocking", "family_organizer", "neck_wallet_hidden", "tech_smart_tag"];
}
