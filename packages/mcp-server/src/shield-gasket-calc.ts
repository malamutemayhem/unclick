export type ShieldGasket =
  | "beryllium_copper_finger"
  | "conductive_fabric_over_foam"
  | "wire_mesh_knit"
  | "conductive_elastomer"
  | "board_level_shield_can";

const DATA: Record<ShieldGasket, {
  shieldEff: number; compression: number; durability: number;
  frequency: number; gskCost: number; reusable: boolean;
  forMobile: boolean; material: string; bestUse: string;
}> = {
  beryllium_copper_finger: {
    shieldEff: 9, compression: 7, durability: 8,
    frequency: 9, gskCost: 6, reusable: true,
    forMobile: false, material: "spring_temper_becu_strip",
    bestUse: "rack_mount_enclosure_seam",
  },
  conductive_fabric_over_foam: {
    shieldEff: 7, compression: 9, durability: 5,
    frequency: 7, gskCost: 3, reusable: false,
    forMobile: true, material: "nickel_copper_nylon_pu_foam",
    bestUse: "laptop_lcd_bezel_seal",
  },
  wire_mesh_knit: {
    shieldEff: 8, compression: 8, durability: 9,
    frequency: 8, gskCost: 5, reusable: true,
    forMobile: false, material: "monel_knitted_wire_tube",
    bestUse: "military_connector_backshell",
  },
  conductive_elastomer: {
    shieldEff: 8, compression: 10, durability: 7,
    frequency: 8, gskCost: 7, reusable: false,
    forMobile: false, material: "silver_filled_silicone",
    bestUse: "hermetic_waterproof_seal",
  },
  board_level_shield_can: {
    shieldEff: 10, compression: 5, durability: 10,
    frequency: 10, gskCost: 4, reusable: false,
    forMobile: true, material: "stamped_mu_metal_solder",
    bestUse: "5g_rf_module_isolation",
  },
};

const get = (t: ShieldGasket) => DATA[t];

export const shieldEff = (t: ShieldGasket) => get(t).shieldEff;
export const compression = (t: ShieldGasket) => get(t).compression;
export const durability = (t: ShieldGasket) => get(t).durability;
export const frequency = (t: ShieldGasket) => get(t).frequency;
export const gskCost = (t: ShieldGasket) => get(t).gskCost;
export const reusable = (t: ShieldGasket) => get(t).reusable;
export const forMobile = (t: ShieldGasket) => get(t).forMobile;
export const material = (t: ShieldGasket) => get(t).material;
export const bestUse = (t: ShieldGasket) => get(t).bestUse;
export const shieldGaskets = (): ShieldGasket[] => Object.keys(DATA) as ShieldGasket[];
