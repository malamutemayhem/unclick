export type WrappingMachineType =
  | "stretch_wrap_turntable"
  | "stretch_wrap_rotary_arm"
  | "shrink_wrap_tunnel"
  | "flow_wrap_horizontal"
  | "pallet_hood_stretch";

interface WrappingMachineData {
  speed: number;
  filmUsage: number;
  loadStability: number;
  automation: number;
  wmCost: number;
  heatRequired: boolean;
  forPallet: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<WrappingMachineType, WrappingMachineData> = {
  stretch_wrap_turntable: {
    speed: 6, filmUsage: 7, loadStability: 8, automation: 6, wmCost: 4,
    heatRequired: false, forPallet: true,
    method: "rotating_turntable_stretch_film_roll_carriage_wrap",
    bestUse: "standard_pallet_wrapping_warehouse_shipping_dock",
  },
  stretch_wrap_rotary_arm: {
    speed: 9, filmUsage: 7, loadStability: 9, automation: 9, wmCost: 8,
    heatRequired: false, forPallet: true,
    method: "rotating_arm_around_stationary_load_high_speed",
    bestUse: "heavy_unstable_pallet_inline_high_throughput_wrap",
  },
  shrink_wrap_tunnel: {
    speed: 8, filmUsage: 5, loadStability: 7, automation: 8, wmCost: 6,
    heatRequired: true, forPallet: false,
    method: "polyolefin_film_seal_then_heat_tunnel_shrink_tight",
    bestUse: "retail_product_multipack_bundle_display_ready_shrink",
  },
  flow_wrap_horizontal: {
    speed: 10, filmUsage: 8, loadStability: 6, automation: 9, wmCost: 7,
    heatRequired: true, forPallet: false,
    method: "horizontal_pillow_pack_form_fill_seal_continuous",
    bestUse: "bakery_bar_biscuit_single_serve_snack_flow_pack",
  },
  pallet_hood_stretch: {
    speed: 7, filmUsage: 9, loadStability: 10, automation: 8, wmCost: 9,
    heatRequired: false, forPallet: true,
    method: "stretch_hood_elastic_film_top_cover_five_side_seal",
    bestUse: "outdoor_stored_pallet_building_material_weather_wrap",
  },
};

function get(t: WrappingMachineType): WrappingMachineData {
  return DATA[t];
}

export const speed = (t: WrappingMachineType) => get(t).speed;
export const filmUsage = (t: WrappingMachineType) => get(t).filmUsage;
export const loadStability = (t: WrappingMachineType) => get(t).loadStability;
export const automation = (t: WrappingMachineType) => get(t).automation;
export const wmCost = (t: WrappingMachineType) => get(t).wmCost;
export const heatRequired = (t: WrappingMachineType) => get(t).heatRequired;
export const forPallet = (t: WrappingMachineType) => get(t).forPallet;
export const method = (t: WrappingMachineType) => get(t).method;
export const bestUse = (t: WrappingMachineType) => get(t).bestUse;
export const wrappingMachineTypes = (): WrappingMachineType[] =>
  Object.keys(DATA) as WrappingMachineType[];
