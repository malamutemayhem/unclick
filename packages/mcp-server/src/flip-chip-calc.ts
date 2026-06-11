export type FlipChip =
  | "solder_bump_c4"
  | "copper_pillar_micro"
  | "gold_stud_thermo"
  | "anisotropic_acf"
  | "direct_bond_hybrid";

const DATA: Record<FlipChip, {
  pitch: number; reliability: number; thermal: number;
  electrical: number; fcCost: number; underfill: boolean;
  forHpc: boolean; interconnect: string; bestUse: string;
}> = {
  solder_bump_c4: {
    pitch: 5, reliability: 8, thermal: 7,
    electrical: 7, fcCost: 3, underfill: true,
    forHpc: false, interconnect: "eutectic_solder_sphere",
    bestUse: "mainstream_processor_bga",
  },
  copper_pillar_micro: {
    pitch: 9, reliability: 9, thermal: 9,
    electrical: 9, fcCost: 6, underfill: true,
    forHpc: true, interconnect: "electroplated_cu_sn_cap",
    bestUse: "advanced_gpu_high_bump_count",
  },
  gold_stud_thermo: {
    pitch: 7, reliability: 6, thermal: 5,
    electrical: 6, fcCost: 5, underfill: false,
    forHpc: false, interconnect: "ball_bond_thermosonic",
    bestUse: "mems_sensor_die_attach",
  },
  anisotropic_acf: {
    pitch: 6, reliability: 5, thermal: 4,
    electrical: 4, fcCost: 2, underfill: false,
    forHpc: false, interconnect: "conductive_particle_film",
    bestUse: "display_driver_cof_cog",
  },
  direct_bond_hybrid: {
    pitch: 10, reliability: 10, thermal: 10,
    electrical: 10, fcCost: 10, underfill: false,
    forHpc: true, interconnect: "cu_cu_oxide_fusion",
    bestUse: "3d_stacked_hbm_memory",
  },
};

const get = (t: FlipChip) => DATA[t];

export const pitch = (t: FlipChip) => get(t).pitch;
export const reliability = (t: FlipChip) => get(t).reliability;
export const thermal = (t: FlipChip) => get(t).thermal;
export const electrical = (t: FlipChip) => get(t).electrical;
export const fcCost = (t: FlipChip) => get(t).fcCost;
export const underfill = (t: FlipChip) => get(t).underfill;
export const forHpc = (t: FlipChip) => get(t).forHpc;
export const interconnect = (t: FlipChip) => get(t).interconnect;
export const bestUse = (t: FlipChip) => get(t).bestUse;
export const flipChips = (): FlipChip[] => Object.keys(DATA) as FlipChip[];
