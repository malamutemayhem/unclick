export type DiscHarrowType =
  | "offset_tandem"
  | "single_offset"
  | "vertical_tillage"
  | "compact_disc"
  | "heavy_duty_primary";

interface DiscHarrowData {
  soilPenetration: number;
  residueMixing: number;
  fieldSpeed: number;
  soilFinish: number;
  dhCost: number;
  hydraulicAdjust: boolean;
  forPrimary: boolean;
  discConfig: string;
  bestUse: string;
}

const DATA: Record<DiscHarrowType, DiscHarrowData> = {
  offset_tandem: {
    soilPenetration: 8, residueMixing: 8, fieldSpeed: 8, soilFinish: 8, dhCost: 6,
    hydraulicAdjust: true, forPrimary: false,
    discConfig: "tandem_gang_offset_angled_disc_blade_front_rear_gang_tillage",
    bestUse: "secondary_tillage_seedbed_prep_residue_incorporation_standard",
  },
  single_offset: {
    soilPenetration: 9, residueMixing: 7, fieldSpeed: 7, soilFinish: 6, dhCost: 5,
    hydraulicAdjust: false, forPrimary: true,
    discConfig: "single_gang_offset_large_blade_aggressive_primary_tillage_cut",
    bestUse: "primary_tillage_heavy_residue_corn_stalk_field_initial_pass",
  },
  vertical_tillage: {
    soilPenetration: 5, residueMixing: 10, fieldSpeed: 10, soilFinish: 9, dhCost: 8,
    hydraulicAdjust: true, forPrimary: false,
    discConfig: "straight_set_wavy_blade_shallow_angle_size_residue_no_invert",
    bestUse: "minimal_tillage_residue_sizing_surface_prep_no_soil_inversion",
  },
  compact_disc: {
    soilPenetration: 6, residueMixing: 7, fieldSpeed: 9, soilFinish: 8, dhCost: 4,
    hydraulicAdjust: false, forPrimary: false,
    discConfig: "compact_frame_small_blade_light_duty_garden_orchard_vineyard",
    bestUse: "orchard_vineyard_small_field_compact_tractor_light_tillage",
  },
  heavy_duty_primary: {
    soilPenetration: 10, residueMixing: 9, fieldSpeed: 6, soilFinish: 5, dhCost: 9,
    hydraulicAdjust: true, forPrimary: true,
    discConfig: "heavy_frame_large_notched_blade_deep_angle_primary_breaking",
    bestUse: "virgin_ground_breaking_heavy_clay_sod_primary_disc_plowing",
  },
};

function get(t: DiscHarrowType): DiscHarrowData {
  return DATA[t];
}

export const soilPenetration = (t: DiscHarrowType) => get(t).soilPenetration;
export const residueMixing = (t: DiscHarrowType) => get(t).residueMixing;
export const fieldSpeed = (t: DiscHarrowType) => get(t).fieldSpeed;
export const soilFinish = (t: DiscHarrowType) => get(t).soilFinish;
export const dhCost = (t: DiscHarrowType) => get(t).dhCost;
export const hydraulicAdjust = (t: DiscHarrowType) => get(t).hydraulicAdjust;
export const forPrimary = (t: DiscHarrowType) => get(t).forPrimary;
export const discConfig = (t: DiscHarrowType) => get(t).discConfig;
export const bestUse = (t: DiscHarrowType) => get(t).bestUse;
export const discHarrowTypes = (): DiscHarrowType[] =>
  Object.keys(DATA) as DiscHarrowType[];
