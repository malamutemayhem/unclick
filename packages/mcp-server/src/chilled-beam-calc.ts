export type ChilledBeamType =
  | "passive_chilled_ceiling"
  | "active_induction_2_pipe"
  | "active_induction_4_pipe"
  | "multi_service_chilled_beam"
  | "radiant_chilled_slab";

interface ChilledBeamData {
  capacity: number;
  comfort: number;
  noise: number;
  energy: number;
  cbCost: number;
  ventilated: boolean;
  forPerimeter: boolean;
  induction: string;
  bestUse: string;
}

const DATA: Record<ChilledBeamType, ChilledBeamData> = {
  passive_chilled_ceiling: {
    capacity: 5, comfort: 9, noise: 10, energy: 9, cbCost: 5,
    ventilated: false, forPerimeter: false,
    induction: "natural_convection_ceiling_panel",
    bestUse: "interior_zone_low_load_office",
  },
  active_induction_2_pipe: {
    capacity: 7, comfort: 8, noise: 8, energy: 8, cbCost: 7,
    ventilated: true, forPerimeter: false,
    induction: "primary_air_nozzle_2_pipe_coil",
    bestUse: "standard_office_floor_cooling",
  },
  active_induction_4_pipe: {
    capacity: 9, comfort: 9, noise: 7, energy: 7, cbCost: 9,
    ventilated: true, forPerimeter: true,
    induction: "primary_air_nozzle_4_pipe_hc",
    bestUse: "perimeter_zone_heating_cooling",
  },
  multi_service_chilled_beam: {
    capacity: 8, comfort: 8, noise: 7, energy: 8, cbCost: 10,
    ventilated: true, forPerimeter: true,
    induction: "integrated_light_sprinkler_beam",
    bestUse: "high_end_lab_office_integrated",
  },
  radiant_chilled_slab: {
    capacity: 6, comfort: 10, noise: 10, energy: 10, cbCost: 6,
    ventilated: false, forPerimeter: false,
    induction: "embedded_pex_slab_radiant_cool",
    bestUse: "mass_timber_exposed_slab_office",
  },
};

function get(t: ChilledBeamType): ChilledBeamData {
  return DATA[t];
}

export const capacity = (t: ChilledBeamType) => get(t).capacity;
export const comfort = (t: ChilledBeamType) => get(t).comfort;
export const noise = (t: ChilledBeamType) => get(t).noise;
export const energy = (t: ChilledBeamType) => get(t).energy;
export const cbCost = (t: ChilledBeamType) => get(t).cbCost;
export const ventilated = (t: ChilledBeamType) => get(t).ventilated;
export const forPerimeter = (t: ChilledBeamType) => get(t).forPerimeter;
export const induction = (t: ChilledBeamType) => get(t).induction;
export const bestUse = (t: ChilledBeamType) => get(t).bestUse;
export const chilledBeamTypes = (): ChilledBeamType[] =>
  Object.keys(DATA) as ChilledBeamType[];
