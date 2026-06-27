export type OilWaterSeparatorType =
  | "gravity_api"
  | "coalescing_plate"
  | "dissolved_air_flotation_ows"
  | "centrifugal_disc"
  | "membrane_ultrafiltration";

interface OilWaterSeparatorData {
  separationEfficiency: number;
  flowCapacity: number;
  oilDropletSize: number;
  maintenanceInterval: number;
  owsCost: number;
  passive: boolean;
  forEmulsion: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<OilWaterSeparatorType, OilWaterSeparatorData> = {
  gravity_api: {
    separationEfficiency: 6, flowCapacity: 10, oilDropletSize: 4, maintenanceInterval: 9, owsCost: 4,
    passive: true, forEmulsion: false,
    mechanism: "density_difference_gravity_settle_skim_weir_sludge_scrape",
    bestUse: "refinery_tank_farm_large_volume_free_oil_primary_separation",
  },
  coalescing_plate: {
    separationEfficiency: 8, flowCapacity: 8, oilDropletSize: 7, maintenanceInterval: 7, owsCost: 5,
    passive: true, forEmulsion: false,
    mechanism: "corrugated_oleophilic_plate_pack_merge_small_drops_rise_fast",
    bestUse: "parking_garage_wash_bay_stormwater_runoff_general_industry",
  },
  dissolved_air_flotation_ows: {
    separationEfficiency: 9, flowCapacity: 8, oilDropletSize: 8, maintenanceInterval: 6, owsCost: 7,
    passive: false, forEmulsion: true,
    mechanism: "microbubble_inject_attach_oil_droplet_float_skim_surface",
    bestUse: "food_processing_slaughterhouse_emulsified_oil_fat_grease",
  },
  centrifugal_disc: {
    separationEfficiency: 9, flowCapacity: 6, oilDropletSize: 9, maintenanceInterval: 5, owsCost: 8,
    passive: false, forEmulsion: true,
    mechanism: "high_speed_disc_stack_centrifuge_g_force_separate_three_phase",
    bestUse: "bilge_water_marine_fuel_purification_lube_oil_reclaim",
  },
  membrane_ultrafiltration: {
    separationEfficiency: 10, flowCapacity: 5, oilDropletSize: 10, maintenanceInterval: 4, owsCost: 9,
    passive: false, forEmulsion: true,
    mechanism: "ceramic_polymer_membrane_0_01um_pore_reject_oil_pass_water",
    bestUse: "metalworking_coolant_recovery_produced_water_reuse_zero_oil",
  },
};

function get(t: OilWaterSeparatorType): OilWaterSeparatorData {
  return DATA[t];
}

export const separationEfficiency = (t: OilWaterSeparatorType) => get(t).separationEfficiency;
export const flowCapacity = (t: OilWaterSeparatorType) => get(t).flowCapacity;
export const oilDropletSize = (t: OilWaterSeparatorType) => get(t).oilDropletSize;
export const maintenanceInterval = (t: OilWaterSeparatorType) => get(t).maintenanceInterval;
export const owsCost = (t: OilWaterSeparatorType) => get(t).owsCost;
export const passive = (t: OilWaterSeparatorType) => get(t).passive;
export const forEmulsion = (t: OilWaterSeparatorType) => get(t).forEmulsion;
export const mechanism = (t: OilWaterSeparatorType) => get(t).mechanism;
export const bestUse = (t: OilWaterSeparatorType) => get(t).bestUse;
export const oilWaterSeparatorTypes = (): OilWaterSeparatorType[] =>
  Object.keys(DATA) as OilWaterSeparatorType[];
