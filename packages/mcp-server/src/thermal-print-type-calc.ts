export type ThermalPrintType =
  | "direct_thermal_receipt"
  | "thermal_transfer_ribbon"
  | "dye_sublimation_photo"
  | "thermal_wax_label"
  | "retransfer_card_edge";

interface ThermalPrintData {
  speed: number;
  quality: number;
  durability: number;
  colorRange: number;
  tpCost: number;
  ribbonFree: boolean;
  forLabel: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<ThermalPrintType, ThermalPrintData> = {
  direct_thermal_receipt: {
    speed: 9, quality: 5, durability: 2, colorRange: 1, tpCost: 2,
    ribbonFree: true, forLabel: true,
    method: "heat_sensitive_paper_darken",
    bestUse: "receipt_shipping_label_short_life",
  },
  thermal_transfer_ribbon: {
    speed: 8, quality: 7, durability: 8, colorRange: 3, tpCost: 4,
    ribbonFree: false, forLabel: true,
    method: "wax_resin_ribbon_melt_transfer",
    bestUse: "barcode_asset_tag_durable_label",
  },
  dye_sublimation_photo: {
    speed: 4, quality: 10, durability: 7, colorRange: 10, tpCost: 7,
    ribbonFree: false, forLabel: false,
    method: "dye_vaporize_diffuse_into_coat",
    bestUse: "photo_print_id_card_continuous",
  },
  thermal_wax_label: {
    speed: 7, quality: 6, durability: 5, colorRange: 4, tpCost: 3,
    ribbonFree: false, forLabel: true,
    method: "wax_ribbon_low_temp_melt",
    bestUse: "paper_label_low_abrasion_indoor",
  },
  retransfer_card_edge: {
    speed: 3, quality: 9, durability: 9, colorRange: 9, tpCost: 8,
    ribbonFree: false, forLabel: false,
    method: "print_film_then_fuse_to_card",
    bestUse: "id_card_edge_to_edge_secure",
  },
};

function get(t: ThermalPrintType): ThermalPrintData {
  return DATA[t];
}

export const speed = (t: ThermalPrintType) => get(t).speed;
export const quality = (t: ThermalPrintType) => get(t).quality;
export const durability = (t: ThermalPrintType) => get(t).durability;
export const colorRange = (t: ThermalPrintType) => get(t).colorRange;
export const tpCost = (t: ThermalPrintType) => get(t).tpCost;
export const ribbonFree = (t: ThermalPrintType) => get(t).ribbonFree;
export const forLabel = (t: ThermalPrintType) => get(t).forLabel;
export const method = (t: ThermalPrintType) => get(t).method;
export const bestUse = (t: ThermalPrintType) => get(t).bestUse;
export const thermalPrintTypes = (): ThermalPrintType[] =>
  Object.keys(DATA) as ThermalPrintType[];
