export type CoatingPanType =
  | "standard_pan"
  | "perforated_pan"
  | "fluid_bed_coat"
  | "continuous_coater"
  | "electrostatic_coat";

interface CoatingPanData {
  coatUniformity: number;
  throughput: number;
  dryingEfficiency: number;
  coatThickness: number;
  cpCost: number;
  continuous: boolean;
  forEnteric: boolean;
  panConfig: string;
  bestUse: string;
}

const DATA: Record<CoatingPanType, CoatingPanData> = {
  standard_pan: {
    coatUniformity: 6, throughput: 6, dryingEfficiency: 5, coatThickness: 8, cpCost: 4,
    continuous: false, forEnteric: false,
    panConfig: "standard_pan_coating_rotating_drum_spray_nozzle_sugar_film_coat",
    bestUse: "traditional_pharma_standard_pan_sugar_coating_confectionery",
  },
  perforated_pan: {
    coatUniformity: 9, throughput: 9, dryingEfficiency: 9, coatThickness: 9, cpCost: 8,
    continuous: false, forEnteric: true,
    panConfig: "perforated_pan_coating_rotating_drum_perforated_air_through_dry",
    bestUse: "modern_pharma_perforated_pan_film_coating_enteric_sustained",
  },
  fluid_bed_coat: {
    coatUniformity: 10, throughput: 7, dryingEfficiency: 10, coatThickness: 10, cpCost: 9,
    continuous: false, forEnteric: true,
    panConfig: "fluid_bed_coat_wurster_bottom_spray_fluidize_coat_dry_uniform",
    bestUse: "pharma_fluid_bed_wurster_coating_pellet_granule_precise_uniform",
  },
  continuous_coater: {
    coatUniformity: 8, throughput: 10, dryingEfficiency: 8, coatThickness: 7, cpCost: 10,
    continuous: true, forEnteric: true,
    panConfig: "continuous_coater_inclined_pan_inlet_outlet_nonstop_coat_dry",
    bestUse: "high_volume_pharma_continuous_coater_nonstop_tablet_film_coat",
  },
  electrostatic_coat: {
    coatUniformity: 9, throughput: 7, dryingEfficiency: 8, coatThickness: 8, cpCost: 8,
    continuous: false, forEnteric: false,
    panConfig: "electrostatic_coat_charge_powder_attract_tablet_surface_even",
    bestUse: "specialty_pharma_electrostatic_dry_powder_coat_solvent_free",
  },
};

function get(t: CoatingPanType): CoatingPanData {
  return DATA[t];
}

export const coatUniformity = (t: CoatingPanType) => get(t).coatUniformity;
export const throughput = (t: CoatingPanType) => get(t).throughput;
export const dryingEfficiency = (t: CoatingPanType) => get(t).dryingEfficiency;
export const coatThickness = (t: CoatingPanType) => get(t).coatThickness;
export const cpCost = (t: CoatingPanType) => get(t).cpCost;
export const continuous = (t: CoatingPanType) => get(t).continuous;
export const forEnteric = (t: CoatingPanType) => get(t).forEnteric;
export const panConfig = (t: CoatingPanType) => get(t).panConfig;
export const bestUse = (t: CoatingPanType) => get(t).bestUse;
export const coatingPanTypes = (): CoatingPanType[] =>
  Object.keys(DATA) as CoatingPanType[];
