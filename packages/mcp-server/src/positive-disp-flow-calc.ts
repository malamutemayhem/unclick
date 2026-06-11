export type PositiveDispFlowType =
  | "oval_gear_precision"
  | "rotary_piston_viscous"
  | "nutating_disc_water"
  | "oscillating_piston_fuel"
  | "tri_rotor_high_press";

interface PositiveDispFlowData {
  accuracy: number;
  viscosityRange: number;
  pressureDrop: number;
  repeatability: number;
  pdCost: number;
  selfPriming: boolean;
  forViscous: boolean;
  meter: string;
  bestUse: string;
}

const DATA: Record<PositiveDispFlowType, PositiveDispFlowData> = {
  oval_gear_precision: {
    accuracy: 9, viscosityRange: 8, pressureDrop: 5, repeatability: 10, pdCost: 6,
    selfPriming: false, forViscous: true,
    meter: "oval_gear_pair_positive_displacement",
    bestUse: "oil_chemical_batch_custody_transfer",
  },
  rotary_piston_viscous: {
    accuracy: 8, viscosityRange: 10, pressureDrop: 4, repeatability: 9, pdCost: 7,
    selfPriming: true, forViscous: true,
    meter: "rotary_piston_swept_volume_chamber",
    bestUse: "heavy_oil_resin_adhesive_high_viscosity",
  },
  nutating_disc_water: {
    accuracy: 6, viscosityRange: 4, pressureDrop: 6, repeatability: 7, pdCost: 3,
    selfPriming: false, forViscous: false,
    meter: "nutating_disc_wobble_plate_chamber",
    bestUse: "residential_commercial_water_metering",
  },
  oscillating_piston_fuel: {
    accuracy: 8, viscosityRange: 7, pressureDrop: 5, repeatability: 9, pdCost: 5,
    selfPriming: false, forViscous: false,
    meter: "oscillating_piston_fuel_dispenser",
    bestUse: "fuel_dispensing_aviation_marine_custody",
  },
  tri_rotor_high_press: {
    accuracy: 9, viscosityRange: 9, pressureDrop: 4, repeatability: 10, pdCost: 8,
    selfPriming: true, forViscous: true,
    meter: "three_rotor_helical_high_pressure_seal",
    bestUse: "hydraulic_oil_high_pressure_test_bench",
  },
};

function get(t: PositiveDispFlowType): PositiveDispFlowData {
  return DATA[t];
}

export const accuracy = (t: PositiveDispFlowType) => get(t).accuracy;
export const viscosityRange = (t: PositiveDispFlowType) => get(t).viscosityRange;
export const pressureDrop = (t: PositiveDispFlowType) => get(t).pressureDrop;
export const repeatability = (t: PositiveDispFlowType) => get(t).repeatability;
export const pdCost = (t: PositiveDispFlowType) => get(t).pdCost;
export const selfPriming = (t: PositiveDispFlowType) => get(t).selfPriming;
export const forViscous = (t: PositiveDispFlowType) => get(t).forViscous;
export const meter = (t: PositiveDispFlowType) => get(t).meter;
export const bestUse = (t: PositiveDispFlowType) => get(t).bestUse;
export const positiveDispFlowTypes = (): PositiveDispFlowType[] =>
  Object.keys(DATA) as PositiveDispFlowType[];
