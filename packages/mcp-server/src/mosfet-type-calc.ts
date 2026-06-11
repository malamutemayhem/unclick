export type MosfetType =
  | "si_planar_mosfet"
  | "si_superjunction"
  | "sic_mosfet"
  | "gan_hemt"
  | "igbt_trench";

const DATA: Record<MosfetType, {
  rdson: number; switchSpeed: number; voltage: number;
  thermal: number; mosCost: number; enhancementMode: boolean;
  forEv: boolean; material: string; bestUse: string;
}> = {
  si_planar_mosfet: {
    rdson: 5, switchSpeed: 6, voltage: 5,
    thermal: 6, mosCost: 2, enhancementMode: true,
    forEv: false, material: "silicon_bulk",
    bestUse: "consumer_dc_dc",
  },
  si_superjunction: {
    rdson: 8, switchSpeed: 7, voltage: 7,
    thermal: 7, mosCost: 4, enhancementMode: true,
    forEv: false, material: "silicon_charge_balance",
    bestUse: "server_psu_pfc",
  },
  sic_mosfet: {
    rdson: 9, switchSpeed: 9, voltage: 10,
    thermal: 10, mosCost: 8, enhancementMode: true,
    forEv: true, material: "silicon_carbide_4h",
    bestUse: "ev_traction_inverter",
  },
  gan_hemt: {
    rdson: 8, switchSpeed: 10, voltage: 6,
    thermal: 7, mosCost: 7, enhancementMode: false,
    forEv: true, material: "gallium_nitride_on_si",
    bestUse: "fast_charger_totem_pole",
  },
  igbt_trench: {
    rdson: 4, switchSpeed: 3, voltage: 10,
    thermal: 9, mosCost: 5, enhancementMode: true,
    forEv: true, material: "silicon_insulated_gate",
    bestUse: "mw_grid_inverter",
  },
};

const get = (t: MosfetType) => DATA[t];

export const rdson = (t: MosfetType) => get(t).rdson;
export const switchSpeed = (t: MosfetType) => get(t).switchSpeed;
export const voltage = (t: MosfetType) => get(t).voltage;
export const thermal = (t: MosfetType) => get(t).thermal;
export const mosCost = (t: MosfetType) => get(t).mosCost;
export const enhancementMode = (t: MosfetType) => get(t).enhancementMode;
export const forEv = (t: MosfetType) => get(t).forEv;
export const material = (t: MosfetType) => get(t).material;
export const bestUse = (t: MosfetType) => get(t).bestUse;
export const mosfetTypes = (): MosfetType[] => Object.keys(DATA) as MosfetType[];
