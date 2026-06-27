export type BiomassBoilerType =
  | "stoker_grate_fired"
  | "fluidized_bed_bfb"
  | "circulating_fbc_cfb"
  | "gasification_syngas"
  | "pellet_boiler_auto";

interface BiomassBoilerData {
  efficiency: number;
  fuelFlex: number;
  emissions: number;
  automation: number;
  bbCost: number;
  automated: boolean;
  forLargeScale: boolean;
  combustion: string;
  bestUse: string;
}

const DATA: Record<BiomassBoilerType, BiomassBoilerData> = {
  stoker_grate_fired: {
    efficiency: 7, fuelFlex: 8, emissions: 5, automation: 6, bbCost: 6,
    automated: true, forLargeScale: true,
    combustion: "moving_grate_underfire_overfire_air_staged_combustion",
    bestUse: "wood_waste_sawmill_residue_industrial_steam_heat",
  },
  fluidized_bed_bfb: {
    efficiency: 8, fuelFlex: 9, emissions: 8, automation: 8, bbCost: 8,
    automated: true, forLargeScale: true,
    combustion: "sand_bed_fluidized_low_temp_combustion_limestone_sox",
    bestUse: "mixed_fuel_high_moisture_waste_combined_heat_power",
  },
  circulating_fbc_cfb: {
    efficiency: 9, fuelFlex: 10, emissions: 9, automation: 9, bbCost: 10,
    automated: true, forLargeScale: true,
    combustion: "circulating_solids_loop_cyclone_high_residence_time",
    bestUse: "utility_scale_co_firing_coal_biomass_waste_blend",
  },
  gasification_syngas: {
    efficiency: 8, fuelFlex: 7, emissions: 9, automation: 7, bbCost: 9,
    automated: true, forLargeScale: false,
    combustion: "partial_oxidation_syngas_clean_burn_gas_engine_turbine",
    bestUse: "distributed_generation_clean_syngas_chp_small_scale",
  },
  pellet_boiler_auto: {
    efficiency: 9, fuelFlex: 3, emissions: 8, automation: 10, bbCost: 5,
    automated: true, forLargeScale: false,
    combustion: "auger_feed_pellet_modulating_burner_ash_auto_clean",
    bestUse: "commercial_building_district_heating_residential_large",
  },
};

function get(t: BiomassBoilerType): BiomassBoilerData {
  return DATA[t];
}

export const efficiency = (t: BiomassBoilerType) => get(t).efficiency;
export const fuelFlex = (t: BiomassBoilerType) => get(t).fuelFlex;
export const emissions = (t: BiomassBoilerType) => get(t).emissions;
export const automation = (t: BiomassBoilerType) => get(t).automation;
export const bbCost = (t: BiomassBoilerType) => get(t).bbCost;
export const automated = (t: BiomassBoilerType) => get(t).automated;
export const forLargeScale = (t: BiomassBoilerType) => get(t).forLargeScale;
export const combustion = (t: BiomassBoilerType) => get(t).combustion;
export const bestUse = (t: BiomassBoilerType) => get(t).bestUse;
export const biomassBoilerTypes = (): BiomassBoilerType[] =>
  Object.keys(DATA) as BiomassBoilerType[];
