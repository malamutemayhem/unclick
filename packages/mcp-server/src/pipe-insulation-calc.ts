export type PipeInsulationType =
  | "fiberglass_preformed_section"
  | "mineral_wool_rock_wrap"
  | "elastomeric_foam_rubber"
  | "calcium_silicate_high_temp"
  | "aerogel_blanket_thin_layer";

interface PipeInsulationData {
  thermal: number;
  tempRange: number;
  moisture: number;
  fireRating: number;
  piCost: number;
  closedCell: boolean;
  forCold: boolean;
  jacket: string;
  bestUse: string;
}

const DATA: Record<PipeInsulationType, PipeInsulationData> = {
  fiberglass_preformed_section: {
    thermal: 7, tempRange: 7, moisture: 4, fireRating: 8, piCost: 3,
    closedCell: false, forCold: false,
    jacket: "aluminum_pvc_all_service_jacket",
    bestUse: "hot_water_steam_hvac_pipe_general",
  },
  mineral_wool_rock_wrap: {
    thermal: 7, tempRange: 9, moisture: 3, fireRating: 10, piCost: 4,
    closedCell: false, forCold: false,
    jacket: "stainless_steel_band_wire",
    bestUse: "high_temp_exhaust_boiler_pipe",
  },
  elastomeric_foam_rubber: {
    thermal: 8, tempRange: 5, moisture: 10, fireRating: 5, piCost: 6,
    closedCell: true, forCold: true,
    jacket: "self_seal_no_jacket_required",
    bestUse: "chilled_water_refrigerant_condensate",
  },
  calcium_silicate_high_temp: {
    thermal: 6, tempRange: 10, moisture: 5, fireRating: 10, piCost: 7,
    closedCell: false, forCold: false,
    jacket: "aluminum_stainless_band_clamp",
    bestUse: "steam_turbine_high_pressure_pipe",
  },
  aerogel_blanket_thin_layer: {
    thermal: 10, tempRange: 8, moisture: 7, fireRating: 7, piCost: 10,
    closedCell: false, forCold: true,
    jacket: "aluminum_foil_laminate_thin",
    bestUse: "space_constrained_retrofit_subsea",
  },
};

function get(t: PipeInsulationType): PipeInsulationData {
  return DATA[t];
}

export const thermal = (t: PipeInsulationType) => get(t).thermal;
export const tempRange = (t: PipeInsulationType) => get(t).tempRange;
export const moisture = (t: PipeInsulationType) => get(t).moisture;
export const fireRating = (t: PipeInsulationType) => get(t).fireRating;
export const piCost = (t: PipeInsulationType) => get(t).piCost;
export const closedCell = (t: PipeInsulationType) => get(t).closedCell;
export const forCold = (t: PipeInsulationType) => get(t).forCold;
export const jacket = (t: PipeInsulationType) => get(t).jacket;
export const bestUse = (t: PipeInsulationType) => get(t).bestUse;
export const pipeInsulationTypes = (): PipeInsulationType[] =>
  Object.keys(DATA) as PipeInsulationType[];
