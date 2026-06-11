export type EdgeBanderType =
  | "hot_melt_pur"
  | "hot_air_eva"
  | "laser_edge"
  | "premill_softform"
  | "manual_portable";

interface EdgeBanderData {
  speed: number;
  jointQuality: number;
  edgeRange: number;
  automation: number;
  ebCost: number;
  seamless: boolean;
  forCurved: boolean;
  adhesive: string;
  bestUse: string;
}

const DATA: Record<EdgeBanderType, EdgeBanderData> = {
  hot_melt_pur: {
    speed: 8, jointQuality: 8, edgeRange: 9, automation: 8, ebCost: 7,
    seamless: false, forCurved: false,
    adhesive: "polyurethane_reactive_hot_melt_moisture_cure_strong_bond",
    bestUse: "kitchen_cabinet_office_furniture_melamine_pvc_abs_edge",
  },
  hot_air_eva: {
    speed: 7, jointQuality: 7, edgeRange: 7, automation: 7, ebCost: 5,
    seamless: false, forCurved: false,
    adhesive: "ethylene_vinyl_acetate_hot_melt_glue_pot_roller_application",
    bestUse: "general_furniture_panel_processing_standard_edgebanding",
  },
  laser_edge: {
    speed: 9, jointQuality: 10, edgeRange: 6, automation: 10, ebCost: 10,
    seamless: true, forCurved: false,
    adhesive: "laser_activated_polymer_layer_on_tape_zero_joint_line",
    bestUse: "premium_furniture_seamless_zero_line_edge_high_end_kitchen",
  },
  premill_softform: {
    speed: 5, jointQuality: 8, edgeRange: 10, automation: 6, ebCost: 8,
    seamless: false, forCurved: true,
    adhesive: "hot_melt_softform_unit_profile_wrap_curved_edge_postform",
    bestUse: "curved_panel_postformed_countertop_radius_edge_profile",
  },
  manual_portable: {
    speed: 2, jointQuality: 5, edgeRange: 5, automation: 1, ebCost: 1,
    seamless: false, forCurved: false,
    adhesive: "hot_melt_cartridge_manual_feed_hand_trimming_portable",
    bestUse: "site_work_repair_small_shop_low_volume_edge_touch_up",
  },
};

function get(t: EdgeBanderType): EdgeBanderData {
  return DATA[t];
}

export const speed = (t: EdgeBanderType) => get(t).speed;
export const jointQuality = (t: EdgeBanderType) => get(t).jointQuality;
export const edgeRange = (t: EdgeBanderType) => get(t).edgeRange;
export const automation = (t: EdgeBanderType) => get(t).automation;
export const ebCost = (t: EdgeBanderType) => get(t).ebCost;
export const seamless = (t: EdgeBanderType) => get(t).seamless;
export const forCurved = (t: EdgeBanderType) => get(t).forCurved;
export const adhesive = (t: EdgeBanderType) => get(t).adhesive;
export const bestUse = (t: EdgeBanderType) => get(t).bestUse;
export const edgeBanderTypes = (): EdgeBanderType[] =>
  Object.keys(DATA) as EdgeBanderType[];
