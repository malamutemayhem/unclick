export type RoadMillingType =
  | "cold_milling_large"
  | "cold_milling_compact"
  | "micro_milling"
  | "half_lane"
  | "rotary_stabilizer";

interface RoadMillingData {
  cuttingWidth: number;
  cuttingDepth: number;
  speed: number;
  surfaceFinish: number;
  rmCost: number;
  fullLane: boolean;
  forPrecision: boolean;
  drum: string;
  bestUse: string;
}

const DATA: Record<RoadMillingType, RoadMillingData> = {
  cold_milling_large: {
    cuttingWidth: 10, cuttingDepth: 10, speed: 8, surfaceFinish: 6, rmCost: 9,
    fullLane: true, forPrecision: false,
    drum: "large_diameter_drum_carbide_pick_full_depth_removal_conveyor",
    bestUse: "highway_full_depth_removal_reconstruction_high_production",
  },
  cold_milling_compact: {
    cuttingWidth: 6, cuttingDepth: 7, speed: 7, surfaceFinish: 7, rmCost: 6,
    fullLane: false, forPrecision: false,
    drum: "compact_frame_drum_tight_radius_urban_manhole_edge_work",
    bestUse: "urban_road_repair_parking_lot_patch_limited_access_site",
  },
  micro_milling: {
    cuttingWidth: 7, cuttingDepth: 3, speed: 5, surfaceFinish: 10, rmCost: 8,
    fullLane: true, forPrecision: true,
    drum: "fine_spacing_pick_micro_texture_smooth_profile_correction",
    bestUse: "surface_retexture_rumble_strip_removal_skid_resistance",
  },
  half_lane: {
    cuttingWidth: 8, cuttingDepth: 8, speed: 9, surfaceFinish: 6, rmCost: 7,
    fullLane: false, forPrecision: false,
    drum: "medium_width_drum_half_lane_offset_cut_partial_removal",
    bestUse: "divided_highway_lane_transition_shoulder_repair_overlay",
  },
  rotary_stabilizer: {
    cuttingWidth: 9, cuttingDepth: 9, speed: 6, surfaceFinish: 4, rmCost: 8,
    fullLane: true, forPrecision: false,
    drum: "mixing_chamber_drum_cement_foam_bitumen_injection_recycle",
    bestUse: "full_depth_reclamation_soil_stabilization_base_recycling",
  },
};

function get(t: RoadMillingType): RoadMillingData {
  return DATA[t];
}

export const cuttingWidth = (t: RoadMillingType) => get(t).cuttingWidth;
export const cuttingDepth = (t: RoadMillingType) => get(t).cuttingDepth;
export const speed = (t: RoadMillingType) => get(t).speed;
export const surfaceFinish = (t: RoadMillingType) => get(t).surfaceFinish;
export const rmCost = (t: RoadMillingType) => get(t).rmCost;
export const fullLane = (t: RoadMillingType) => get(t).fullLane;
export const forPrecision = (t: RoadMillingType) => get(t).forPrecision;
export const drum = (t: RoadMillingType) => get(t).drum;
export const bestUse = (t: RoadMillingType) => get(t).bestUse;
export const roadMillingTypes = (): RoadMillingType[] =>
  Object.keys(DATA) as RoadMillingType[];
