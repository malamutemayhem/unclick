export type BrickKilnType =
  | "hoffman_kiln"
  | "tunnel_kiln_brick"
  | "clamp_kiln"
  | "vertical_shaft"
  | "zigzag_kiln";

interface BrickKilnData {
  firingUniformity: number;
  throughput: number;
  energyEfficiency: number;
  emissionControl: number;
  bkCost: number;
  continuous: boolean;
  forHighQuality: boolean;
  kilnConfig: string;
  bestUse: string;
}

const DATA: Record<BrickKilnType, BrickKilnData> = {
  hoffman_kiln: {
    firingUniformity: 8, throughput: 8, energyEfficiency: 8, emissionControl: 6, bkCost: 7,
    continuous: true, forHighQuality: true,
    kilnConfig: "hoffman_kiln_oval_ring_multi_chamber_continuous_fire_preheat",
    bestUse: "medium_brick_factory_hoffman_kiln_continuous_ring_firing_fuel",
  },
  tunnel_kiln_brick: {
    firingUniformity: 10, throughput: 10, energyEfficiency: 9, emissionControl: 9, bkCost: 10,
    continuous: true, forHighQuality: true,
    kilnConfig: "tunnel_kiln_brick_car_preheat_fire_cool_zone_automated_control",
    bestUse: "large_brick_plant_tunnel_kiln_automated_high_quality_control",
  },
  clamp_kiln: {
    firingUniformity: 4, throughput: 5, energyEfficiency: 3, emissionControl: 2, bkCost: 2,
    continuous: false, forHighQuality: false,
    kilnConfig: "clamp_kiln_open_stack_brick_fuel_layer_fire_primitive_batch",
    bestUse: "rural_brick_making_clamp_kiln_simple_low_cost_traditional",
  },
  vertical_shaft: {
    firingUniformity: 7, throughput: 7, energyEfficiency: 7, emissionControl: 5, bkCost: 5,
    continuous: true, forHighQuality: false,
    kilnConfig: "vertical_shaft_brick_kiln_gravity_feed_top_fire_bottom_draw",
    bestUse: "developing_region_vertical_shaft_brick_kiln_compact_efficient",
  },
  zigzag_kiln: {
    firingUniformity: 7, throughput: 7, energyEfficiency: 8, emissionControl: 6, bkCost: 5,
    continuous: true, forHighQuality: false,
    kilnConfig: "zigzag_kiln_serpentine_fire_path_draft_preheat_improve_fuel_use",
    bestUse: "south_asia_zigzag_kiln_improved_draft_fuel_efficient_brick",
  },
};

function get(t: BrickKilnType): BrickKilnData {
  return DATA[t];
}

export const firingUniformity = (t: BrickKilnType) => get(t).firingUniformity;
export const throughput = (t: BrickKilnType) => get(t).throughput;
export const energyEfficiency = (t: BrickKilnType) => get(t).energyEfficiency;
export const emissionControl = (t: BrickKilnType) => get(t).emissionControl;
export const bkCost = (t: BrickKilnType) => get(t).bkCost;
export const continuous = (t: BrickKilnType) => get(t).continuous;
export const forHighQuality = (t: BrickKilnType) => get(t).forHighQuality;
export const kilnConfig = (t: BrickKilnType) => get(t).kilnConfig;
export const bestUse = (t: BrickKilnType) => get(t).bestUse;
export const brickKilnTypes = (): BrickKilnType[] =>
  Object.keys(DATA) as BrickKilnType[];
