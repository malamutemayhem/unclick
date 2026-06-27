export type DownspoutTypeType =
  | "rectangular_corrugated_std"
  | "round_smooth_classic"
  | "scupper_through_wall_outlet"
  | "chain_rain_decorative_guide"
  | "internal_roof_drain_leader";

interface DownspoutTypeData {
  capacity: number;
  aesthetic: number;
  durability: number;
  noise: number;
  dsCost: number;
  enclosed: boolean;
  forCommercial: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<DownspoutTypeType, DownspoutTypeData> = {
  rectangular_corrugated_std: {
    capacity: 7, aesthetic: 5, durability: 7, noise: 5, dsCost: 3,
    enclosed: true, forCommercial: false,
    material: "aluminum_corrugated_rectangular",
    bestUse: "residential_standard_gutter_drain",
  },
  round_smooth_classic: {
    capacity: 6, aesthetic: 8, durability: 8, noise: 7, dsCost: 5,
    enclosed: true, forCommercial: false,
    material: "copper_aluminum_round_smooth_tube",
    bestUse: "historic_home_half_round_gutter",
  },
  scupper_through_wall_outlet: {
    capacity: 9, aesthetic: 4, durability: 9, noise: 3, dsCost: 6,
    enclosed: false, forCommercial: true,
    material: "sheet_metal_through_wall_box",
    bestUse: "flat_roof_parapet_overflow_outlet",
  },
  chain_rain_decorative_guide: {
    capacity: 3, aesthetic: 10, durability: 5, noise: 9, dsCost: 7,
    enclosed: false, forCommercial: false,
    material: "copper_link_cup_chain_guide",
    bestUse: "garden_patio_decorative_rain_guide",
  },
  internal_roof_drain_leader: {
    capacity: 10, aesthetic: 6, durability: 10, noise: 8, dsCost: 9,
    enclosed: true, forCommercial: true,
    material: "cast_iron_pvc_internal_pipe",
    bestUse: "commercial_flat_roof_internal_drain",
  },
};

function get(t: DownspoutTypeType): DownspoutTypeData {
  return DATA[t];
}

export const capacity = (t: DownspoutTypeType) => get(t).capacity;
export const aesthetic = (t: DownspoutTypeType) => get(t).aesthetic;
export const durability = (t: DownspoutTypeType) => get(t).durability;
export const noise = (t: DownspoutTypeType) => get(t).noise;
export const dsCost = (t: DownspoutTypeType) => get(t).dsCost;
export const enclosed = (t: DownspoutTypeType) => get(t).enclosed;
export const forCommercial = (t: DownspoutTypeType) => get(t).forCommercial;
export const material = (t: DownspoutTypeType) => get(t).material;
export const bestUse = (t: DownspoutTypeType) => get(t).bestUse;
export const downspoutTypeTypes = (): DownspoutTypeType[] =>
  Object.keys(DATA) as DownspoutTypeType[];
