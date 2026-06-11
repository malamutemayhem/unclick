export type CeilingTileType =
  | "mineral_fiber_acoustic_lay"
  | "fiberglass_sound_absorb"
  | "metal_pan_aluminum_steel"
  | "gypsum_vinyl_face_clean"
  | "wood_fiber_decorative_slat";

interface CeilingTileData {
  acoustic: number;
  fireRating: number;
  aesthetic: number;
  moisture: number;
  ctCost: number;
  washable: boolean;
  forOffice: boolean;
  edge: string;
  bestUse: string;
}

const DATA: Record<CeilingTileType, CeilingTileData> = {
  mineral_fiber_acoustic_lay: {
    acoustic: 8, fireRating: 8, aesthetic: 6, moisture: 5, ctCost: 3,
    washable: false, forOffice: true,
    edge: "tegular_reveal_edge_shadow_line",
    bestUse: "office_classroom_standard_acoustic",
  },
  fiberglass_sound_absorb: {
    acoustic: 10, fireRating: 7, aesthetic: 5, moisture: 4, ctCost: 5,
    washable: false, forOffice: true,
    edge: "square_lay_in_flat_grid",
    bestUse: "recording_studio_theater_absorb",
  },
  metal_pan_aluminum_steel: {
    acoustic: 5, fireRating: 10, aesthetic: 8, moisture: 10, ctCost: 8,
    washable: true, forOffice: false,
    edge: "snap_in_clip_concealed_grid",
    bestUse: "clean_room_kitchen_outdoor_soffit",
  },
  gypsum_vinyl_face_clean: {
    acoustic: 6, fireRating: 9, aesthetic: 7, moisture: 8, ctCost: 6,
    washable: true, forOffice: true,
    edge: "beveled_tegular_vinyl_wrap",
    bestUse: "healthcare_food_service_cleanable",
  },
  wood_fiber_decorative_slat: {
    acoustic: 7, fireRating: 5, aesthetic: 10, moisture: 3, ctCost: 9,
    washable: false, forOffice: false,
    edge: "tongue_groove_linear_slat",
    bestUse: "lobby_restaurant_decorative_feature",
  },
};

function get(t: CeilingTileType): CeilingTileData {
  return DATA[t];
}

export const acoustic = (t: CeilingTileType) => get(t).acoustic;
export const fireRating = (t: CeilingTileType) => get(t).fireRating;
export const aesthetic = (t: CeilingTileType) => get(t).aesthetic;
export const moisture = (t: CeilingTileType) => get(t).moisture;
export const ctCost = (t: CeilingTileType) => get(t).ctCost;
export const washable = (t: CeilingTileType) => get(t).washable;
export const forOffice = (t: CeilingTileType) => get(t).forOffice;
export const edge = (t: CeilingTileType) => get(t).edge;
export const bestUse = (t: CeilingTileType) => get(t).bestUse;
export const ceilingTileTypes = (): CeilingTileType[] =>
  Object.keys(DATA) as CeilingTileType[];
