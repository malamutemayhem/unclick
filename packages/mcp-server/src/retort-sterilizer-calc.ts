export type RetortSterilizerType =
  | "static_steam"
  | "rotary_water_immersion"
  | "water_spray"
  | "steam_air_overpressure"
  | "continuous_hydrostatic";

interface RetortSterilizerData {
  speed: number;
  uniformity: number;
  containerRange: number;
  energyEfficiency: number;
  rsCost: number;
  continuous: boolean;
  forFlexiblePouch: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<RetortSterilizerType, RetortSterilizerData> = {
  static_steam: {
    speed: 5, uniformity: 6, containerRange: 7, energyEfficiency: 6, rsCost: 4,
    continuous: false, forFlexiblePouch: false,
    heating: "saturated_steam_batch_static_baskets_venting_cooling",
    bestUse: "canned_vegetable_soup_pet_food_metal_can_glass_jar",
  },
  rotary_water_immersion: {
    speed: 7, uniformity: 9, containerRange: 6, energyEfficiency: 7, rsCost: 7,
    continuous: false, forFlexiblePouch: false,
    heating: "hot_water_immersion_reel_rotation_agitation_even_heat",
    bestUse: "viscous_product_sauce_baby_food_enhanced_heat_transfer",
  },
  water_spray: {
    speed: 7, uniformity: 8, containerRange: 9, energyEfficiency: 8, rsCost: 8,
    continuous: false, forFlexiblePouch: true,
    heating: "pressurized_hot_water_spray_cascading_overpressure_control",
    bestUse: "retort_pouch_tray_flexible_container_ready_meal_pet_food",
  },
  steam_air_overpressure: {
    speed: 6, uniformity: 9, containerRange: 10, energyEfficiency: 7, rsCost: 9,
    continuous: false, forFlexiblePouch: true,
    heating: "steam_air_mixture_overpressure_fan_circulate_precise_control",
    bestUse: "plastic_tray_thermoform_cup_flexible_pouch_premium_meal",
  },
  continuous_hydrostatic: {
    speed: 10, uniformity: 8, containerRange: 5, energyEfficiency: 9, rsCost: 10,
    continuous: true, forFlexiblePouch: false,
    heating: "vertical_tower_hydrostatic_pressure_continuous_chain_carrier",
    bestUse: "high_volume_canned_beverage_pet_food_24_7_continuous_line",
  },
};

function get(t: RetortSterilizerType): RetortSterilizerData {
  return DATA[t];
}

export const speed = (t: RetortSterilizerType) => get(t).speed;
export const uniformity = (t: RetortSterilizerType) => get(t).uniformity;
export const containerRange = (t: RetortSterilizerType) => get(t).containerRange;
export const energyEfficiency = (t: RetortSterilizerType) => get(t).energyEfficiency;
export const rsCost = (t: RetortSterilizerType) => get(t).rsCost;
export const continuous = (t: RetortSterilizerType) => get(t).continuous;
export const forFlexiblePouch = (t: RetortSterilizerType) => get(t).forFlexiblePouch;
export const heating = (t: RetortSterilizerType) => get(t).heating;
export const bestUse = (t: RetortSterilizerType) => get(t).bestUse;
export const retortSterilizerTypes = (): RetortSterilizerType[] =>
  Object.keys(DATA) as RetortSterilizerType[];
