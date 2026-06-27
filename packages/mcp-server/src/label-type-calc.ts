export type LabelType =
  | "pressure_sensitive_psa"
  | "shrink_sleeve_full"
  | "wet_glue_cutstack"
  | "in_mold_iml"
  | "rfid_smart_tag";

const DATA: Record<LabelType, {
  durability: number; coverage: number; speed: number;
  detail: number; lbCost: number; removable: boolean;
  forBeverage: boolean; adhesion: string; bestUse: string;
}> = {
  pressure_sensitive_psa: {
    durability: 7, coverage: 5, speed: 8,
    detail: 8, lbCost: 2, removable: true,
    forBeverage: false, adhesion: "acrylic_pressure_sensitive",
    bestUse: "product_label_shipping_barcode",
  },
  shrink_sleeve_full: {
    durability: 9, coverage: 10, speed: 7,
    detail: 9, lbCost: 3, removable: false,
    forBeverage: true, adhesion: "heat_shrink_conforming",
    bestUse: "beverage_bottle_360_graphics",
  },
  wet_glue_cutstack: {
    durability: 6, coverage: 4, speed: 10,
    detail: 6, lbCost: 1, removable: false,
    forBeverage: true, adhesion: "casein_dextrin_wet_glue",
    bestUse: "high_speed_beer_wine_bottling",
  },
  in_mold_iml: {
    durability: 10, coverage: 8, speed: 6,
    detail: 9, lbCost: 4, removable: false,
    forBeverage: false, adhesion: "fused_to_substrate_molding",
    bestUse: "dairy_tub_ice_cream_container",
  },
  rfid_smart_tag: {
    durability: 5, coverage: 2, speed: 5,
    detail: 3, lbCost: 5, removable: true,
    forBeverage: false, adhesion: "psa_with_embedded_chip",
    bestUse: "inventory_tracking_supply_chain",
  },
};

const get = (t: LabelType) => DATA[t];

export const durability = (t: LabelType) => get(t).durability;
export const coverage = (t: LabelType) => get(t).coverage;
export const speed = (t: LabelType) => get(t).speed;
export const detail = (t: LabelType) => get(t).detail;
export const lbCost = (t: LabelType) => get(t).lbCost;
export const removable = (t: LabelType) => get(t).removable;
export const forBeverage = (t: LabelType) => get(t).forBeverage;
export const adhesion = (t: LabelType) => get(t).adhesion;
export const bestUse = (t: LabelType) => get(t).bestUse;
export const labelTypes = (): LabelType[] => Object.keys(DATA) as LabelType[];
