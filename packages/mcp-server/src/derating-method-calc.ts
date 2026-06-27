export type DeratingMethod =
  | "voltage_linear"
  | "power_thermal"
  | "current_step"
  | "frequency_margin"
  | "temperature_curve";

const DATA: Record<DeratingMethod, {
  safetyMargin: number; precision: number; simplicity: number;
  applicability: number; drCost: number; automatic: boolean;
  forHiRel: boolean; basis: string; bestUse: string;
}> = {
  voltage_linear: {
    safetyMargin: 7, precision: 6, simplicity: 9,
    applicability: 9, drCost: 1, automatic: false,
    forHiRel: true, basis: "percent_rated_voltage",
    bestUse: "capacitor_dielectric_life",
  },
  power_thermal: {
    safetyMargin: 8, precision: 8, simplicity: 6,
    applicability: 8, drCost: 3, automatic: false,
    forHiRel: true, basis: "junction_ambient_slope",
    bestUse: "semiconductor_thermal_limit",
  },
  current_step: {
    safetyMargin: 7, precision: 7, simplicity: 8,
    applicability: 7, drCost: 2, automatic: false,
    forHiRel: false, basis: "percent_rated_current",
    bestUse: "inductor_saturation_guard",
  },
  frequency_margin: {
    safetyMargin: 6, precision: 5, simplicity: 7,
    applicability: 5, drCost: 2, automatic: true,
    forHiRel: false, basis: "max_clock_speed_margin",
    bestUse: "digital_timing_guardband",
  },
  temperature_curve: {
    safetyMargin: 9, precision: 9, simplicity: 4,
    applicability: 10, drCost: 4, automatic: true,
    forHiRel: true, basis: "arrhenius_activation_model",
    bestUse: "mission_profile_lifetime",
  },
};

const get = (t: DeratingMethod) => DATA[t];

export const safetyMargin = (t: DeratingMethod) => get(t).safetyMargin;
export const precision = (t: DeratingMethod) => get(t).precision;
export const simplicity = (t: DeratingMethod) => get(t).simplicity;
export const applicability = (t: DeratingMethod) => get(t).applicability;
export const drCost = (t: DeratingMethod) => get(t).drCost;
export const automatic = (t: DeratingMethod) => get(t).automatic;
export const forHiRel = (t: DeratingMethod) => get(t).forHiRel;
export const basis = (t: DeratingMethod) => get(t).basis;
export const bestUse = (t: DeratingMethod) => get(t).bestUse;
export const deratingMethods = (): DeratingMethod[] => Object.keys(DATA) as DeratingMethod[];
