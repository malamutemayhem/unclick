export type ScrubberType =
  | "packed_tower_counter_flow"
  | "spray_tower_open_chamber"
  | "venturi_high_energy_throat"
  | "wet_electrostatic_ionize"
  | "dry_sorbent_injection_dsi";

interface ScrubberData {
  removal: number;
  particulate: number;
  pressure: number;
  maintenance: number;
  scCost: number;
  wet: boolean;
  forSo2: boolean;
  contact: string;
  bestUse: string;
}

const DATA: Record<ScrubberType, ScrubberData> = {
  packed_tower_counter_flow: {
    removal: 9, particulate: 5, pressure: 6, maintenance: 7, scCost: 6,
    wet: true, forSo2: true,
    contact: "gas_liquid_packing_media_surface",
    bestUse: "acid_gas_so2_hcl_nh3_removal",
  },
  spray_tower_open_chamber: {
    removal: 7, particulate: 6, pressure: 8, maintenance: 8, scCost: 4,
    wet: true, forSo2: true,
    contact: "spray_nozzle_droplet_contact",
    bestUse: "flue_gas_desulfurization_simple",
  },
  venturi_high_energy_throat: {
    removal: 8, particulate: 10, pressure: 3, maintenance: 6, scCost: 5,
    wet: true, forSo2: false,
    contact: "high_velocity_throat_atomize",
    bestUse: "fine_particulate_smoke_dust_mist",
  },
  wet_electrostatic_ionize: {
    removal: 10, particulate: 10, pressure: 7, maintenance: 5, scCost: 9,
    wet: true, forSo2: false,
    contact: "corona_discharge_collect_plate",
    bestUse: "submicron_acid_mist_tar_aerosol",
  },
  dry_sorbent_injection_dsi: {
    removal: 7, particulate: 4, pressure: 9, maintenance: 9, scCost: 3,
    wet: false, forSo2: true,
    contact: "powdered_sorbent_injected_duct",
    bestUse: "retrofit_so2_hcl_low_capital",
  },
};

function get(t: ScrubberType): ScrubberData {
  return DATA[t];
}

export const removal = (t: ScrubberType) => get(t).removal;
export const particulate = (t: ScrubberType) => get(t).particulate;
export const pressure = (t: ScrubberType) => get(t).pressure;
export const maintenance = (t: ScrubberType) => get(t).maintenance;
export const scCost = (t: ScrubberType) => get(t).scCost;
export const wet = (t: ScrubberType) => get(t).wet;
export const forSo2 = (t: ScrubberType) => get(t).forSo2;
export const contact = (t: ScrubberType) => get(t).contact;
export const bestUse = (t: ScrubberType) => get(t).bestUse;
export const scrubberTypes = (): ScrubberType[] =>
  Object.keys(DATA) as ScrubberType[];
