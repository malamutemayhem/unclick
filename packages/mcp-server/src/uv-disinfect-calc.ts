export type UvDisinfectType =
  | "low_pressure_lp_monochrome"
  | "medium_pressure_mp_polychrome"
  | "low_pressure_high_output_lpho"
  | "uv_led_solid_state"
  | "amalgam_lamp_high_power";

interface UvDisinfectData {
  dose: number;
  efficiency: number;
  lifespan: number;
  footprint: number;
  uvCost: number;
  led: boolean;
  forDrinking: boolean;
  lamp: string;
  bestUse: string;
}

const DATA: Record<UvDisinfectType, UvDisinfectData> = {
  low_pressure_lp_monochrome: {
    dose: 7, efficiency: 9, lifespan: 7, footprint: 5, uvCost: 4,
    led: false, forDrinking: true,
    lamp: "mercury_vapor_254nm_germicidal",
    bestUse: "small_municipal_drinking_basic",
  },
  medium_pressure_mp_polychrome: {
    dose: 10, efficiency: 5, lifespan: 5, footprint: 8, uvCost: 7,
    led: false, forDrinking: true,
    lamp: "broad_spectrum_200_400nm_quartz",
    bestUse: "large_flow_wastewater_chloramine_break",
  },
  low_pressure_high_output_lpho: {
    dose: 8, efficiency: 8, lifespan: 8, footprint: 7, uvCost: 6,
    led: false, forDrinking: true,
    lamp: "amalgam_high_output_254nm_cool",
    bestUse: "medium_municipal_reuse_high_flow",
  },
  uv_led_solid_state: {
    dose: 5, efficiency: 6, lifespan: 9, footprint: 10, uvCost: 8,
    led: true, forDrinking: false,
    lamp: "led_chip_265nm_solid_state",
    bestUse: "point_of_use_compact_portable_niche",
  },
  amalgam_lamp_high_power: {
    dose: 9, efficiency: 8, lifespan: 8, footprint: 7, uvCost: 6,
    led: false, forDrinking: true,
    lamp: "amalgam_mercury_high_watt_stable",
    bestUse: "large_municipal_stable_output_cold",
  },
};

function get(t: UvDisinfectType): UvDisinfectData {
  return DATA[t];
}

export const dose = (t: UvDisinfectType) => get(t).dose;
export const efficiency = (t: UvDisinfectType) => get(t).efficiency;
export const lifespan = (t: UvDisinfectType) => get(t).lifespan;
export const footprint = (t: UvDisinfectType) => get(t).footprint;
export const uvCost = (t: UvDisinfectType) => get(t).uvCost;
export const led = (t: UvDisinfectType) => get(t).led;
export const forDrinking = (t: UvDisinfectType) => get(t).forDrinking;
export const lamp = (t: UvDisinfectType) => get(t).lamp;
export const bestUse = (t: UvDisinfectType) => get(t).bestUse;
export const uvDisinfectTypes = (): UvDisinfectType[] =>
  Object.keys(DATA) as UvDisinfectType[];
