export type GasAbsorberType =
  | "packed_tower_countercurrent"
  | "spray_tower_open"
  | "tray_absorber_crossflow"
  | "venturi_scrubber_contact"
  | "falling_film_absorber";

interface GasAbsorberData {
  massTransfer: number;
  capacity: number;
  pressureDrop: number;
  turndown: number;
  gaCost: number;
  wetted: boolean;
  forAcidGas: boolean;
  internals: string;
  bestUse: string;
}

const DATA: Record<GasAbsorberType, GasAbsorberData> = {
  packed_tower_countercurrent: {
    massTransfer: 9, capacity: 8, pressureDrop: 7, turndown: 6, gaCost: 6,
    wetted: true, forAcidGas: true,
    internals: "random_structured_pack_liquid_distrib",
    bestUse: "co2_h2s_acid_gas_amine_solvent_absorb",
  },
  spray_tower_open: {
    massTransfer: 4, capacity: 9, pressureDrop: 10, turndown: 8, gaCost: 3,
    wetted: true, forAcidGas: false,
    internals: "spray_nozzle_tier_no_packing_open",
    bestUse: "flue_gas_desulfurize_lime_slurry_scrub",
  },
  tray_absorber_crossflow: {
    massTransfer: 8, capacity: 7, pressureDrop: 5, turndown: 8, gaCost: 7,
    wetted: true, forAcidGas: true,
    internals: "sieve_valve_tray_liquid_seal_downcomer",
    bestUse: "nox_absorb_nitric_acid_plant_tail_gas",
  },
  venturi_scrubber_contact: {
    massTransfer: 7, capacity: 8, pressureDrop: 3, turndown: 5, gaCost: 4,
    wetted: true, forAcidGas: false,
    internals: "converge_throat_high_velocity_drop",
    bestUse: "particulate_scrub_incinerator_dust_gas",
  },
  falling_film_absorber: {
    massTransfer: 10, capacity: 5, pressureDrop: 9, turndown: 4, gaCost: 8,
    wetted: true, forAcidGas: true,
    internals: "vertical_tube_film_flow_shell_cool",
    bestUse: "hcl_absorb_exothermic_heat_remove",
  },
};

function get(t: GasAbsorberType): GasAbsorberData {
  return DATA[t];
}

export const massTransfer = (t: GasAbsorberType) => get(t).massTransfer;
export const capacity = (t: GasAbsorberType) => get(t).capacity;
export const pressureDrop = (t: GasAbsorberType) => get(t).pressureDrop;
export const turndown = (t: GasAbsorberType) => get(t).turndown;
export const gaCost = (t: GasAbsorberType) => get(t).gaCost;
export const wetted = (t: GasAbsorberType) => get(t).wetted;
export const forAcidGas = (t: GasAbsorberType) => get(t).forAcidGas;
export const internals = (t: GasAbsorberType) => get(t).internals;
export const bestUse = (t: GasAbsorberType) => get(t).bestUse;
export const gasAbsorberTypes = (): GasAbsorberType[] =>
  Object.keys(DATA) as GasAbsorberType[];
