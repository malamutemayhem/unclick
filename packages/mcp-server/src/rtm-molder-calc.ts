export type RtmMolderType =
  | "standard_rtm"
  | "light_rtm"
  | "high_pressure_rtm"
  | "vartm_infusion"
  | "structural_rim";

interface RtmMolderData {
  partQuality: number;
  throughput: number;
  fiberVolume: number;
  surfaceFinish: number;
  rmCost_: number;
  closedMold: boolean;
  forHighVolume: boolean;
  molderConfig: string;
  bestUse: string;
}

const DATA: Record<RtmMolderType, RtmMolderData> = {
  standard_rtm: {
    partQuality: 8, throughput: 7, fiberVolume: 8, surfaceFinish: 9, rmCost_: 7,
    closedMold: true, forHighVolume: false,
    molderConfig: "standard_rtm_molder_matched_die_inject_resin_preform_composite",
    bestUse: "auto_body_standard_rtm_molder_matched_die_inject_resin_panel",
  },
  light_rtm: {
    partQuality: 7, throughput: 6, fiberVolume: 7, surfaceFinish: 8, rmCost_: 5,
    closedMold: true, forHighVolume: false,
    molderConfig: "light_rtm_molder_semi_rigid_counter_mold_low_pressure_inject",
    bestUse: "marine_deck_light_rtm_molder_semi_rigid_low_pressure_inject",
  },
  high_pressure_rtm: {
    partQuality: 9, throughput: 9, fiberVolume: 9, surfaceFinish: 9, rmCost_: 9,
    closedMold: true, forHighVolume: true,
    molderConfig: "high_pressure_rtm_molder_fast_inject_short_cycle_carbon_fiber",
    bestUse: "carbon_roof_high_pressure_rtm_molder_fast_inject_short_cycle",
  },
  vartm_infusion: {
    partQuality: 7, throughput: 4, fiberVolume: 7, surfaceFinish: 6, rmCost_: 4,
    closedMold: false, forHighVolume: false,
    molderConfig: "vartm_infusion_molder_vacuum_bag_flow_media_large_part_boat",
    bestUse: "wind_blade_vartm_infusion_molder_vacuum_bag_flow_media_large",
  },
  structural_rim: {
    partQuality: 7, throughput: 8, fiberVolume: 5, surfaceFinish: 8, rmCost_: 6,
    closedMold: true, forHighVolume: true,
    molderConfig: "structural_rim_molder_impinge_mix_inject_fiber_mat_fast_cure",
    bestUse: "truck_fender_structural_rim_molder_impinge_mix_fiber_fast_cure",
  },
};

function get(t: RtmMolderType): RtmMolderData {
  return DATA[t];
}

export const partQuality = (t: RtmMolderType) => get(t).partQuality;
export const throughput = (t: RtmMolderType) => get(t).throughput;
export const fiberVolume = (t: RtmMolderType) => get(t).fiberVolume;
export const surfaceFinish = (t: RtmMolderType) => get(t).surfaceFinish;
export const rmCost_ = (t: RtmMolderType) => get(t).rmCost_;
export const closedMold = (t: RtmMolderType) => get(t).closedMold;
export const forHighVolume = (t: RtmMolderType) => get(t).forHighVolume;
export const molderConfig = (t: RtmMolderType) => get(t).molderConfig;
export const bestUse = (t: RtmMolderType) => get(t).bestUse;
export const rtmMolderTypes = (): RtmMolderType[] =>
  Object.keys(DATA) as RtmMolderType[];
