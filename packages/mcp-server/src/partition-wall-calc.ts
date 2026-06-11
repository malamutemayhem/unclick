export type PartitionWallType =
  | "metal_stud_gypsum_board"
  | "demountable_relocatable"
  | "glass_frameless_tempered"
  | "masonry_cmu_block_wall"
  | "operable_folding_acoustic";

interface PartitionWallData {
  acoustic: number;
  fireRating: number;
  flexibility: number;
  aesthetic: number;
  pwCost: number;
  relocatable: boolean;
  forOffice: boolean;
  construction: string;
  bestUse: string;
}

const DATA: Record<PartitionWallType, PartitionWallData> = {
  metal_stud_gypsum_board: {
    acoustic: 7, fireRating: 8, flexibility: 5, aesthetic: 6, pwCost: 4,
    relocatable: false, forOffice: true,
    construction: "steel_stud_gypsum_insulation",
    bestUse: "standard_office_corridor_division",
  },
  demountable_relocatable: {
    acoustic: 6, fireRating: 5, flexibility: 10, aesthetic: 8, pwCost: 8,
    relocatable: true, forOffice: true,
    construction: "aluminum_frame_panel_clip",
    bestUse: "flexible_office_frequent_reconfig",
  },
  glass_frameless_tempered: {
    acoustic: 4, fireRating: 3, flexibility: 7, aesthetic: 10, pwCost: 9,
    relocatable: false, forOffice: true,
    construction: "tempered_laminated_glass_silicone",
    bestUse: "executive_suite_conference_visual",
  },
  masonry_cmu_block_wall: {
    acoustic: 9, fireRating: 10, flexibility: 1, aesthetic: 4, pwCost: 6,
    relocatable: false, forOffice: false,
    construction: "concrete_masonry_unit_grout_rebar",
    bestUse: "mechanical_room_fire_separation",
  },
  operable_folding_acoustic: {
    acoustic: 8, fireRating: 4, flexibility: 9, aesthetic: 7, pwCost: 10,
    relocatable: true, forOffice: false,
    construction: "panel_track_ceiling_seal_fold",
    bestUse: "ballroom_convention_flexible_divide",
  },
};

function get(t: PartitionWallType): PartitionWallData {
  return DATA[t];
}

export const acoustic = (t: PartitionWallType) => get(t).acoustic;
export const fireRating = (t: PartitionWallType) => get(t).fireRating;
export const flexibility = (t: PartitionWallType) => get(t).flexibility;
export const aesthetic = (t: PartitionWallType) => get(t).aesthetic;
export const pwCost = (t: PartitionWallType) => get(t).pwCost;
export const relocatable = (t: PartitionWallType) => get(t).relocatable;
export const forOffice = (t: PartitionWallType) => get(t).forOffice;
export const construction = (t: PartitionWallType) => get(t).construction;
export const bestUse = (t: PartitionWallType) => get(t).bestUse;
export const partitionWallTypes = (): PartitionWallType[] =>
  Object.keys(DATA) as PartitionWallType[];
