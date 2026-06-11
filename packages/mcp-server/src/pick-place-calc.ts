export type PickPlaceType =
  | "manual_vacuum_pen"
  | "semi_auto_desktop"
  | "full_auto_inline"
  | "chip_shooter_high"
  | "flexible_multi_head";

const DATA: Record<PickPlaceType, {
  placementSpeed: number; accuracy: number; feederCapacity: number;
  easeOfUse: number; machineCost: number; automated: boolean;
  forProduction: boolean; pickMethod: string; bestUse: string;
}> = {
  manual_vacuum_pen: { placementSpeed: 2, accuracy: 4, feederCapacity: 1, easeOfUse: 10, machineCost: 1, automated: false, forProduction: false, pickMethod: "hand_vacuum_suction", bestUse: "hobby_one_off_place" },
  semi_auto_desktop: { placementSpeed: 5, accuracy: 7, feederCapacity: 5, easeOfUse: 7, machineCost: 5, automated: true, forProduction: false, pickMethod: "vision_assist_nozzle", bestUse: "prototype_small_batch" },
  full_auto_inline: { placementSpeed: 8, accuracy: 9, feederCapacity: 9, easeOfUse: 5, machineCost: 9, automated: true, forProduction: true, pickMethod: "multi_nozzle_turret", bestUse: "mid_volume_mixed_board" },
  chip_shooter_high: { placementSpeed: 10, accuracy: 8, feederCapacity: 10, easeOfUse: 4, machineCost: 10, automated: true, forProduction: true, pickMethod: "rotary_high_speed", bestUse: "mass_passive_placement" },
  flexible_multi_head: { placementSpeed: 7, accuracy: 10, feederCapacity: 8, easeOfUse: 5, machineCost: 8, automated: true, forProduction: true, pickMethod: "gantry_multi_head", bestUse: "mixed_fine_pitch_line" },
};

const get = (t: PickPlaceType) => DATA[t];

export const placementSpeed = (t: PickPlaceType) => get(t).placementSpeed;
export const accuracy = (t: PickPlaceType) => get(t).accuracy;
export const feederCapacity = (t: PickPlaceType) => get(t).feederCapacity;
export const easeOfUse = (t: PickPlaceType) => get(t).easeOfUse;
export const machineCost = (t: PickPlaceType) => get(t).machineCost;
export const automated = (t: PickPlaceType) => get(t).automated;
export const forProduction = (t: PickPlaceType) => get(t).forProduction;
export const pickMethod = (t: PickPlaceType) => get(t).pickMethod;
export const bestUse = (t: PickPlaceType) => get(t).bestUse;
export const pickPlaces = (): PickPlaceType[] => Object.keys(DATA) as PickPlaceType[];
