export type CatalyticConverterType =
  | "three_way_gasoline"
  | "diesel_oxidation"
  | "scr_nox"
  | "lean_nox_trap"
  | "ammonia_slip";

interface CatalyticConverterData {
  conversionRate: number;
  temperatureRange: number;
  durability: number;
  backpressure: number;
  ccCost: number;
  precious: boolean;
  forDiesel: boolean;
  catalyst: string;
  bestUse: string;
}

const DATA: Record<CatalyticConverterType, CatalyticConverterData> = {
  three_way_gasoline: {
    conversionRate: 10, temperatureRange: 7, durability: 8, backpressure: 7, ccCost: 7,
    precious: true, forDiesel: false,
    catalyst: "platinum_palladium_rhodium_ceramic_monolith_honeycomb",
    bestUse: "gasoline_engine_vehicle_co_hc_nox_simultaneous_conversion",
  },
  diesel_oxidation: {
    conversionRate: 8, temperatureRange: 8, durability: 9, backpressure: 8, ccCost: 6,
    precious: true, forDiesel: true,
    catalyst: "platinum_palladium_on_alumina_washcoat_oxidize_co_hc_no",
    bestUse: "diesel_engine_truck_bus_generator_co_hc_oxidation_no_to_no2",
  },
  scr_nox: {
    conversionRate: 9, temperatureRange: 8, durability: 8, backpressure: 7, ccCost: 8,
    precious: false, forDiesel: true,
    catalyst: "vanadium_titanium_iron_zeolite_urea_injection_nox_reduce",
    bestUse: "diesel_truck_power_plant_marine_engine_nox_reduction_scr",
  },
  lean_nox_trap: {
    conversionRate: 7, temperatureRange: 6, durability: 6, backpressure: 6, ccCost: 8,
    precious: true, forDiesel: true,
    catalyst: "barium_carbonate_platinum_nox_adsorb_rich_purge_regenerate",
    bestUse: "lean_burn_gasoline_light_duty_diesel_low_temp_nox_storage",
  },
  ammonia_slip: {
    conversionRate: 8, temperatureRange: 7, durability: 9, backpressure: 8, ccCost: 5,
    precious: false, forDiesel: true,
    catalyst: "base_metal_zeolite_oxidize_excess_nh3_after_scr_cleanup",
    bestUse: "downstream_scr_system_ammonia_cleanup_prevent_nh3_emission",
  },
};

function get(t: CatalyticConverterType): CatalyticConverterData {
  return DATA[t];
}

export const conversionRate = (t: CatalyticConverterType) => get(t).conversionRate;
export const temperatureRange = (t: CatalyticConverterType) => get(t).temperatureRange;
export const durability = (t: CatalyticConverterType) => get(t).durability;
export const backpressure = (t: CatalyticConverterType) => get(t).backpressure;
export const ccCost = (t: CatalyticConverterType) => get(t).ccCost;
export const precious = (t: CatalyticConverterType) => get(t).precious;
export const forDiesel = (t: CatalyticConverterType) => get(t).forDiesel;
export const catalyst = (t: CatalyticConverterType) => get(t).catalyst;
export const bestUse = (t: CatalyticConverterType) => get(t).bestUse;
export const catalyticConverterTypes = (): CatalyticConverterType[] =>
  Object.keys(DATA) as CatalyticConverterType[];
