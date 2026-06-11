export type NoiseBarrierType =
  | "mass_loaded_vinyl"
  | "acoustic_foam_wedge"
  | "perforated_metal_absorb"
  | "green_wall_vegetated"
  | "active_noise_cancel";

interface NoiseBarrierData {
  insertion: number;
  bandwidth: number;
  durability: number;
  aesthetic: number;
  nbCost: number;
  active: boolean;
  forOutdoor: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<NoiseBarrierType, NoiseBarrierData> = {
  mass_loaded_vinyl: {
    insertion: 8, bandwidth: 7, durability: 8, aesthetic: 4, nbCost: 5,
    active: false, forOutdoor: false,
    material: "barium_loaded_vinyl_sheet_layer",
    bestUse: "wall_ceiling_pipe_wrap_barrier",
  },
  acoustic_foam_wedge: {
    insertion: 6, bandwidth: 9, durability: 5, aesthetic: 6, nbCost: 3,
    active: false, forOutdoor: false,
    material: "polyurethane_melamine_open_cell",
    bestUse: "studio_server_room_enclosure",
  },
  perforated_metal_absorb: {
    insertion: 9, bandwidth: 8, durability: 10, aesthetic: 7, nbCost: 7,
    active: false, forOutdoor: true,
    material: "perforated_aluminum_mineral_wool",
    bestUse: "highway_rail_industrial_fence",
  },
  green_wall_vegetated: {
    insertion: 5, bandwidth: 6, durability: 7, aesthetic: 10, nbCost: 8,
    active: false, forOutdoor: true,
    material: "soil_substrate_vegetation_frame",
    bestUse: "urban_roadside_aesthetic_screen",
  },
  active_noise_cancel: {
    insertion: 10, bandwidth: 10, durability: 6, aesthetic: 8, nbCost: 10,
    active: true, forOutdoor: false,
    material: "speaker_array_microphone_dsp",
    bestUse: "duct_exhaust_transformer_hum",
  },
};

function get(t: NoiseBarrierType): NoiseBarrierData {
  return DATA[t];
}

export const insertion = (t: NoiseBarrierType) => get(t).insertion;
export const bandwidth = (t: NoiseBarrierType) => get(t).bandwidth;
export const durability = (t: NoiseBarrierType) => get(t).durability;
export const aesthetic = (t: NoiseBarrierType) => get(t).aesthetic;
export const nbCost = (t: NoiseBarrierType) => get(t).nbCost;
export const active = (t: NoiseBarrierType) => get(t).active;
export const forOutdoor = (t: NoiseBarrierType) => get(t).forOutdoor;
export const material = (t: NoiseBarrierType) => get(t).material;
export const bestUse = (t: NoiseBarrierType) => get(t).bestUse;
export const noiseBarrierTypes = (): NoiseBarrierType[] =>
  Object.keys(DATA) as NoiseBarrierType[];
