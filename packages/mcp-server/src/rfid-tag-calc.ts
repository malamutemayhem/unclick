export type RfidTagType =
  | "lf_125khz_prox"
  | "hf_13mhz_smart"
  | "uhf_rain_epc"
  | "nfc_forum_tag"
  | "active_beacon_rtls";

const DATA: Record<RfidTagType, {
  readRange: number; dataCapacity: number; readSpeed: number;
  tagCost: number; durability: number; passive: boolean;
  forSupplyChain: boolean; frequency: string; bestUse: string;
}> = {
  lf_125khz_prox: { readRange: 2, dataCapacity: 1, readSpeed: 3, tagCost: 1, durability: 8, passive: true, forSupplyChain: false, frequency: "lf_125_134khz", bestUse: "access_control_badge" },
  hf_13mhz_smart: { readRange: 4, dataCapacity: 5, readSpeed: 5, tagCost: 2, durability: 7, passive: true, forSupplyChain: false, frequency: "hf_13_56mhz", bestUse: "library_laundry_ticket" },
  uhf_rain_epc: { readRange: 9, dataCapacity: 4, readSpeed: 9, tagCost: 1, durability: 6, passive: true, forSupplyChain: true, frequency: "uhf_860_960mhz", bestUse: "warehouse_pallet_track" },
  nfc_forum_tag: { readRange: 2, dataCapacity: 6, readSpeed: 6, tagCost: 2, durability: 7, passive: true, forSupplyChain: false, frequency: "hf_13_56mhz_nfc", bestUse: "product_auth_tap" },
  active_beacon_rtls: { readRange: 10, dataCapacity: 8, readSpeed: 8, tagCost: 8, durability: 5, passive: false, forSupplyChain: true, frequency: "uhf_active_2g4", bestUse: "real_time_asset_locate" },
};

const get = (t: RfidTagType) => DATA[t];

export const readRange = (t: RfidTagType) => get(t).readRange;
export const dataCapacity = (t: RfidTagType) => get(t).dataCapacity;
export const readSpeed = (t: RfidTagType) => get(t).readSpeed;
export const tagCost = (t: RfidTagType) => get(t).tagCost;
export const durability = (t: RfidTagType) => get(t).durability;
export const passive = (t: RfidTagType) => get(t).passive;
export const forSupplyChain = (t: RfidTagType) => get(t).forSupplyChain;
export const frequency = (t: RfidTagType) => get(t).frequency;
export const bestUse = (t: RfidTagType) => get(t).bestUse;
export const rfidTags = (): RfidTagType[] => Object.keys(DATA) as RfidTagType[];
