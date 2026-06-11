export type FlowWrapperType =
  | "horizontal_flow"
  | "inverted_flow"
  | "rotary_jaw"
  | "box_motion"
  | "fin_seal_flow";

interface FlowWrapperData {
  sealQuality: number;
  throughput: number;
  productRange: number;
  filmEconomy: number;
  fwCost__: number;
  modified_atm: boolean;
  forBakery: boolean;
  wrapperConfig: string;
  bestUse: string;
}

const DATA: Record<FlowWrapperType, FlowWrapperData> = {
  horizontal_flow: {
    sealQuality: 8, throughput: 9, productRange: 8, filmEconomy: 7, fwCost__: 7,
    modified_atm: false, forBakery: true,
    wrapperConfig: "horizontal_flow_wrapper_infeed_conveyor_form_collar_fin_seal_cut",
    bestUse: "bakery_bar_horizontal_flow_wrapper_pillow_pack_granola_cookie",
  },
  inverted_flow: {
    sealQuality: 8, throughput: 8, productRange: 7, filmEconomy: 7, fwCost__: 7,
    modified_atm: false, forBakery: false,
    wrapperConfig: "inverted_flow_wrapper_product_on_top_seal_below_fragile_gentle",
    bestUse: "chocolate_bar_inverted_flow_wrapper_gentle_handle_seal_below",
  },
  rotary_jaw: {
    sealQuality: 7, throughput: 9, productRange: 6, filmEconomy: 8, fwCost__: 8,
    modified_atm: false, forBakery: true,
    wrapperConfig: "rotary_jaw_flow_wrapper_rotating_seal_jaw_continuous_high_speed",
    bestUse: "candy_wrap_rotary_jaw_flow_wrapper_high_speed_continuous_twist",
  },
  box_motion: {
    sealQuality: 9, throughput: 7, productRange: 9, filmEconomy: 6, fwCost__: 9,
    modified_atm: true, forBakery: true,
    wrapperConfig: "box_motion_flow_wrapper_d_cam_jaw_dwell_time_tight_seal_map_gas",
    bestUse: "fresh_produce_box_motion_flow_wrapper_map_gas_flush_extend_shelf",
  },
  fin_seal_flow: {
    sealQuality: 7, throughput: 8, productRange: 7, filmEconomy: 8, fwCost__: 5,
    modified_atm: false, forBakery: false,
    wrapperConfig: "fin_seal_flow_wrapper_overlap_fin_seal_economical_film_use_simple",
    bestUse: "soap_bar_fin_seal_flow_wrapper_overlap_seal_simple_economical",
  },
};

function get(t: FlowWrapperType): FlowWrapperData {
  return DATA[t];
}

export const sealQuality = (t: FlowWrapperType) => get(t).sealQuality;
export const throughput = (t: FlowWrapperType) => get(t).throughput;
export const productRange = (t: FlowWrapperType) => get(t).productRange;
export const filmEconomy = (t: FlowWrapperType) => get(t).filmEconomy;
export const fwCost__ = (t: FlowWrapperType) => get(t).fwCost__;
export const modified_atm = (t: FlowWrapperType) => get(t).modified_atm;
export const forBakery = (t: FlowWrapperType) => get(t).forBakery;
export const wrapperConfig = (t: FlowWrapperType) => get(t).wrapperConfig;
export const bestUse = (t: FlowWrapperType) => get(t).bestUse;
export const flowWrapperTypes = (): FlowWrapperType[] =>
  Object.keys(DATA) as FlowWrapperType[];
