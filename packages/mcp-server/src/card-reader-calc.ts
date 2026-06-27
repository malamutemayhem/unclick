export type CardReaderType =
  | "proximity_125khz"
  | "smart_card_13_56mhz"
  | "multi_tech_dual_freq"
  | "biometric_fingerprint"
  | "mobile_credential_ble";

interface CardReaderData {
  security: number;
  speed: number;
  convenience: number;
  durability: number;
  crCost: number;
  encrypted: boolean;
  forHighSecurity: boolean;
  protocol: string;
  bestUse: string;
}

const DATA: Record<CardReaderType, CardReaderData> = {
  proximity_125khz: {
    security: 3, speed: 9, convenience: 8, durability: 8, crCost: 2,
    encrypted: false, forHighSecurity: false,
    protocol: "wiegand_26_bit_125khz",
    bestUse: "basic_office_parking_access",
  },
  smart_card_13_56mhz: {
    security: 8, speed: 8, convenience: 7, durability: 8, crCost: 5,
    encrypted: true, forHighSecurity: true,
    protocol: "desfire_ev2_aes_128_osdp",
    bestUse: "corporate_government_secure",
  },
  multi_tech_dual_freq: {
    security: 7, speed: 7, convenience: 9, durability: 8, crCost: 6,
    encrypted: true, forHighSecurity: false,
    protocol: "dual_125khz_13_56mhz_osdp",
    bestUse: "migration_legacy_to_smart",
  },
  biometric_fingerprint: {
    security: 10, speed: 6, convenience: 5, durability: 6, crCost: 8,
    encrypted: true, forHighSecurity: true,
    protocol: "template_on_card_match",
    bestUse: "data_center_lab_high_security",
  },
  mobile_credential_ble: {
    security: 7, speed: 8, convenience: 10, durability: 9, crCost: 7,
    encrypted: true, forHighSecurity: false,
    protocol: "ble_nfc_phone_credential",
    bestUse: "modern_office_keyless_entry",
  },
};

function get(t: CardReaderType): CardReaderData {
  return DATA[t];
}

export const security = (t: CardReaderType) => get(t).security;
export const speed = (t: CardReaderType) => get(t).speed;
export const convenience = (t: CardReaderType) => get(t).convenience;
export const durability = (t: CardReaderType) => get(t).durability;
export const crCost = (t: CardReaderType) => get(t).crCost;
export const encrypted = (t: CardReaderType) => get(t).encrypted;
export const forHighSecurity = (t: CardReaderType) => get(t).forHighSecurity;
export const protocol = (t: CardReaderType) => get(t).protocol;
export const bestUse = (t: CardReaderType) => get(t).bestUse;
export const cardReaderTypes = (): CardReaderType[] =>
  Object.keys(DATA) as CardReaderType[];
