export type EmiGasket =
  | "beryllium_copper_finger"
  | "fabric_over_foam"
  | "oriented_wire_mesh"
  | "form_in_place_fip"
  | "elastomer_filled_silicone";

const DATA: Record<EmiGasket, {
  shieldEffect: number; compression: number; durability: number;
  environmental: number; egCost: number; reusable: boolean;
  forOutdoor: boolean; material: string; bestUse: string;
}> = {
  beryllium_copper_finger: {
    shieldEffect: 10, compression: 6, durability: 9,
    environmental: 5, egCost: 7, reusable: true,
    forOutdoor: false, material: "becu_stamped_spring_finger",
    bestUse: "mil_spec_connector_flange",
  },
  fabric_over_foam: {
    shieldEffect: 7, compression: 9, durability: 5,
    environmental: 7, egCost: 3, reusable: false,
    forOutdoor: false, material: "nickel_copper_fabric_pu_core",
    bestUse: "telecom_rack_door_seal",
  },
  oriented_wire_mesh: {
    shieldEffect: 8, compression: 7, durability: 8,
    environmental: 8, egCost: 5, reusable: true,
    forOutdoor: true, material: "monel_knitted_wire_strip",
    bestUse: "outdoor_enclosure_panel_joint",
  },
  form_in_place_fip: {
    shieldEffect: 6, compression: 10, durability: 6,
    environmental: 6, egCost: 4, reusable: false,
    forOutdoor: false, material: "conductive_epoxy_dispensed",
    bestUse: "handheld_device_lid_groove",
  },
  elastomer_filled_silicone: {
    shieldEffect: 9, compression: 8, durability: 10,
    environmental: 10, egCost: 8, reusable: true,
    forOutdoor: true, material: "silver_aluminum_silicone_sheet",
    bestUse: "avionics_harsh_env_seal",
  },
};

const get = (t: EmiGasket) => DATA[t];

export const shieldEffect = (t: EmiGasket) => get(t).shieldEffect;
export const compression = (t: EmiGasket) => get(t).compression;
export const durability = (t: EmiGasket) => get(t).durability;
export const environmental = (t: EmiGasket) => get(t).environmental;
export const egCost = (t: EmiGasket) => get(t).egCost;
export const reusable = (t: EmiGasket) => get(t).reusable;
export const forOutdoor = (t: EmiGasket) => get(t).forOutdoor;
export const material = (t: EmiGasket) => get(t).material;
export const bestUse = (t: EmiGasket) => get(t).bestUse;
export const emiGaskets = (): EmiGasket[] => Object.keys(DATA) as EmiGasket[];
