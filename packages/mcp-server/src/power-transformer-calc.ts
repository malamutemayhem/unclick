export type PowerTransformerType =
  | "oil_immersed_core"
  | "dry_type_cast_resin"
  | "pad_mounted_dist"
  | "auto_transformer_step"
  | "instrument_ct_vt";

interface PowerTransformerData {
  efficiency: number;
  coolingCapacity: number;
  overloadTolerance: number;
  noiseLevel: number;
  ptCost: number;
  oilFilled: boolean;
  forIndoor: boolean;
  cooling: string;
  bestUse: string;
}

const DATA: Record<PowerTransformerType, PowerTransformerData> = {
  oil_immersed_core: {
    efficiency: 10, coolingCapacity: 10, overloadTolerance: 9, noiseLevel: 5, ptCost: 7,
    oilFilled: true, forIndoor: false,
    cooling: "onan_onaf_mineral_oil_radiator_fan_cooled",
    bestUse: "substation_power_transmission_large_utility",
  },
  dry_type_cast_resin: {
    efficiency: 8, coolingCapacity: 6, overloadTolerance: 7, noiseLevel: 7, ptCost: 8,
    oilFilled: false, forIndoor: true,
    cooling: "an_af_air_natural_forced_epoxy_cast_resin",
    bestUse: "commercial_building_indoor_fire_sensitive_area",
  },
  pad_mounted_dist: {
    efficiency: 9, coolingCapacity: 8, overloadTolerance: 8, noiseLevel: 6, ptCost: 5,
    oilFilled: true, forIndoor: false,
    cooling: "onan_sealed_tank_pad_mounted_loop_feed",
    bestUse: "underground_residential_distribution_network",
  },
  auto_transformer_step: {
    efficiency: 9, coolingCapacity: 7, overloadTolerance: 6, noiseLevel: 6, ptCost: 4,
    oilFilled: false, forIndoor: true,
    cooling: "air_cooled_single_winding_voltage_step_adjust",
    bestUse: "voltage_regulation_motor_start_buck_boost",
  },
  instrument_ct_vt: {
    efficiency: 10, coolingCapacity: 3, overloadTolerance: 4, noiseLevel: 9, ptCost: 3,
    oilFilled: false, forIndoor: true,
    cooling: "natural_air_epoxy_insulated_metering_class",
    bestUse: "metering_protection_relay_current_voltage_sense",
  },
};

function get(t: PowerTransformerType): PowerTransformerData {
  return DATA[t];
}

export const efficiency = (t: PowerTransformerType) => get(t).efficiency;
export const coolingCapacity = (t: PowerTransformerType) => get(t).coolingCapacity;
export const overloadTolerance = (t: PowerTransformerType) => get(t).overloadTolerance;
export const noiseLevel = (t: PowerTransformerType) => get(t).noiseLevel;
export const ptCost = (t: PowerTransformerType) => get(t).ptCost;
export const oilFilled = (t: PowerTransformerType) => get(t).oilFilled;
export const forIndoor = (t: PowerTransformerType) => get(t).forIndoor;
export const cooling = (t: PowerTransformerType) => get(t).cooling;
export const bestUse = (t: PowerTransformerType) => get(t).bestUse;
export const powerTransformerTypes = (): PowerTransformerType[] =>
  Object.keys(DATA) as PowerTransformerType[];
