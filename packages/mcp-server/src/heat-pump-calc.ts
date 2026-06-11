export type HeatPumpType =
  | "air_source_split"
  | "ground_source"
  | "water_source"
  | "co2_transcritical"
  | "air_to_water";

interface HeatPumpData {
  cop: number;
  capacity: number;
  coldClimate: number;
  installEase: number;
  hpCost: number;
  reversible: boolean;
  forNewBuild: boolean;
  refrigerant: string;
  bestUse: string;
}

const DATA: Record<HeatPumpType, HeatPumpData> = {
  air_source_split: {
    cop: 7, capacity: 6, coldClimate: 5, installEase: 9, hpCost: 5,
    reversible: true, forNewBuild: false,
    refrigerant: "r410a_or_r32_split_system_inverter_outdoor_indoor_unit",
    bestUse: "residential_retrofit_apartment_office_heating_cooling_dual",
  },
  ground_source: {
    cop: 10, capacity: 8, coldClimate: 10, installEase: 3, hpCost: 9,
    reversible: true, forNewBuild: true,
    refrigerant: "r410a_closed_loop_ground_borehole_horizontal_trench",
    bestUse: "new_build_home_school_stable_ground_temp_high_efficiency",
  },
  water_source: {
    cop: 9, capacity: 9, coldClimate: 8, installEase: 5, hpCost: 7,
    reversible: true, forNewBuild: true,
    refrigerant: "r410a_water_loop_lake_river_well_source_high_cop_stable",
    bestUse: "lakeside_campus_hotel_district_loop_water_body_available",
  },
  co2_transcritical: {
    cop: 8, capacity: 7, coldClimate: 9, installEase: 4, hpCost: 8,
    reversible: false, forNewBuild: true,
    refrigerant: "r744_co2_natural_transcritical_cycle_high_water_temp_90c",
    bestUse: "hot_water_heating_commercial_kitchen_laundry_pool_high_temp",
  },
  air_to_water: {
    cop: 7, capacity: 7, coldClimate: 6, installEase: 7, hpCost: 6,
    reversible: true, forNewBuild: false,
    refrigerant: "r32_monobloc_air_to_water_hydronic_underfloor_radiator",
    bestUse: "hydronic_underfloor_heating_radiator_retrofit_boiler_replace",
  },
};

function get(t: HeatPumpType): HeatPumpData {
  return DATA[t];
}

export const cop = (t: HeatPumpType) => get(t).cop;
export const capacity = (t: HeatPumpType) => get(t).capacity;
export const coldClimate = (t: HeatPumpType) => get(t).coldClimate;
export const installEase = (t: HeatPumpType) => get(t).installEase;
export const hpCost = (t: HeatPumpType) => get(t).hpCost;
export const reversible = (t: HeatPumpType) => get(t).reversible;
export const forNewBuild = (t: HeatPumpType) => get(t).forNewBuild;
export const refrigerant = (t: HeatPumpType) => get(t).refrigerant;
export const bestUse = (t: HeatPumpType) => get(t).bestUse;
export const heatPumpTypes = (): HeatPumpType[] =>
  Object.keys(DATA) as HeatPumpType[];
