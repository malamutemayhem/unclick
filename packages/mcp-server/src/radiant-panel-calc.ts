export type RadiantPanelType =
  | "ceiling_hydronic_panel"
  | "floor_embedded_pex"
  | "wall_mounted_electric"
  | "ceiling_electric_film"
  | "chilled_beam_passive";

interface RadiantPanelData {
  comfort: number;
  efficiency: number;
  response: number;
  aesthetic: number;
  rpCost: number;
  hydronic: boolean;
  forCooling: boolean;
  emitter: string;
  bestUse: string;
}

const DATA: Record<RadiantPanelType, RadiantPanelData> = {
  ceiling_hydronic_panel: {
    comfort: 9, efficiency: 9, response: 7, aesthetic: 9, rpCost: 8,
    hydronic: true, forCooling: true,
    emitter: "copper_pipe_aluminum_fin_panel",
    bestUse: "office_lab_radiant_heat_cool",
  },
  floor_embedded_pex: {
    comfort: 10, efficiency: 9, response: 3, aesthetic: 10, rpCost: 7,
    hydronic: true, forCooling: false,
    emitter: "pex_tubing_concrete_slab",
    bestUse: "residential_slab_on_grade",
  },
  wall_mounted_electric: {
    comfort: 6, efficiency: 6, response: 9, aesthetic: 5, rpCost: 3,
    hydronic: false, forCooling: false,
    emitter: "electric_resistance_wall_panel",
    bestUse: "spot_heat_bathroom_small_room",
  },
  ceiling_electric_film: {
    comfort: 7, efficiency: 7, response: 8, aesthetic: 10, rpCost: 5,
    hydronic: false, forCooling: false,
    emitter: "carbon_film_ceiling_radiant",
    bestUse: "renovation_no_wet_system",
  },
  chilled_beam_passive: {
    comfort: 8, efficiency: 10, response: 5, aesthetic: 8, rpCost: 9,
    hydronic: true, forCooling: true,
    emitter: "finned_coil_natural_convection",
    bestUse: "office_low_energy_chilled_beam",
  },
};

function get(t: RadiantPanelType): RadiantPanelData {
  return DATA[t];
}

export const comfort = (t: RadiantPanelType) => get(t).comfort;
export const efficiency = (t: RadiantPanelType) => get(t).efficiency;
export const response = (t: RadiantPanelType) => get(t).response;
export const aesthetic = (t: RadiantPanelType) => get(t).aesthetic;
export const rpCost = (t: RadiantPanelType) => get(t).rpCost;
export const hydronic = (t: RadiantPanelType) => get(t).hydronic;
export const forCooling = (t: RadiantPanelType) => get(t).forCooling;
export const emitter = (t: RadiantPanelType) => get(t).emitter;
export const bestUse = (t: RadiantPanelType) => get(t).bestUse;
export const radiantPanelTypes = (): RadiantPanelType[] =>
  Object.keys(DATA) as RadiantPanelType[];
