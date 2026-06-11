export type GlassFurnaceType =
  | "cross_fired_regen"
  | "end_fired_regen"
  | "oxy_fuel"
  | "electric_cold_top"
  | "pot_furnace";

interface GlassFurnaceData {
  meltRate: number;
  energyEfficiency: number;
  glassQuality: number;
  capacity: number;
  gfCost: number;
  continuous: boolean;
  forFlat: boolean;
  furnaceConfig: string;
  bestUse: string;
}

const DATA: Record<GlassFurnaceType, GlassFurnaceData> = {
  cross_fired_regen: {
    meltRate: 10, energyEfficiency: 8, glassQuality: 8, capacity: 10, gfCost: 10,
    continuous: true, forFlat: true,
    furnaceConfig: "cross_fired_regenerative_side_port_checker_brick_heat_recovery",
    bestUse: "large_flat_glass_float_line_container_cross_fired_regenerative",
  },
  end_fired_regen: {
    meltRate: 9, energyEfficiency: 9, glassQuality: 9, capacity: 8, gfCost: 9,
    continuous: true, forFlat: true,
    furnaceConfig: "end_fired_regenerative_horseshoe_flame_two_port_heat_recovery",
    bestUse: "medium_flat_container_glass_end_fired_horseshoe_flame_furnace",
  },
  oxy_fuel: {
    meltRate: 8, energyEfficiency: 10, glassQuality: 10, capacity: 7, gfCost: 8,
    continuous: true, forFlat: false,
    furnaceConfig: "oxy_fuel_burner_pure_oxygen_no_nitrogen_low_emission_clean",
    bestUse: "specialty_glass_fiber_low_emission_oxy_fuel_clean_melt_furnace",
  },
  electric_cold_top: {
    meltRate: 6, energyEfficiency: 9, glassQuality: 9, capacity: 6, gfCost: 7,
    continuous: true, forFlat: false,
    furnaceConfig: "electric_cold_top_molybdenum_electrode_submerged_melt_no_flame",
    bestUse: "borosilicate_fiber_glass_electric_cold_top_electrode_melt_clean",
  },
  pot_furnace: {
    meltRate: 3, energyEfficiency: 4, glassQuality: 7, capacity: 3, gfCost: 4,
    continuous: false, forFlat: false,
    furnaceConfig: "pot_furnace_clay_crucible_small_batch_artisan_color_glass_melt",
    bestUse: "artisan_studio_glass_small_batch_color_specialty_pot_crucible",
  },
};

function get(t: GlassFurnaceType): GlassFurnaceData {
  return DATA[t];
}

export const meltRate = (t: GlassFurnaceType) => get(t).meltRate;
export const energyEfficiency = (t: GlassFurnaceType) => get(t).energyEfficiency;
export const glassQuality = (t: GlassFurnaceType) => get(t).glassQuality;
export const capacity = (t: GlassFurnaceType) => get(t).capacity;
export const gfCost = (t: GlassFurnaceType) => get(t).gfCost;
export const continuous = (t: GlassFurnaceType) => get(t).continuous;
export const forFlat = (t: GlassFurnaceType) => get(t).forFlat;
export const furnaceConfig = (t: GlassFurnaceType) => get(t).furnaceConfig;
export const bestUse = (t: GlassFurnaceType) => get(t).bestUse;
export const glassFurnaceTypes = (): GlassFurnaceType[] =>
  Object.keys(DATA) as GlassFurnaceType[];
