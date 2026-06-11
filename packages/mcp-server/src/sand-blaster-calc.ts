export type SandBlasterType =
  | "suction_blast"
  | "pressure_blast"
  | "wet_blast"
  | "micro_blast"
  | "wheel_blast";

interface SandBlasterData {
  surfaceFinish: number;
  throughput: number;
  mediaControl: number;
  dustControl: number;
  sbCost: number;
  dustFree: boolean;
  forDelicate: boolean;
  blasterConfig: string;
  bestUse: string;
}

const DATA: Record<SandBlasterType, SandBlasterData> = {
  suction_blast: {
    surfaceFinish: 6, throughput: 6, mediaControl: 6, dustControl: 5, sbCost: 3,
    dustFree: false, forDelicate: false,
    blasterConfig: "suction_sand_blaster_venturi_nozzle_cabinet_recycle_media_clean",
    bestUse: "general_clean_suction_sand_blaster_cabinet_rust_paint_remove",
  },
  pressure_blast: {
    surfaceFinish: 7, throughput: 9, mediaControl: 7, dustControl: 5, sbCost: 5,
    dustFree: false, forDelicate: false,
    blasterConfig: "pressure_sand_blaster_pot_nozzle_high_flow_heavy_strip_descale",
    bestUse: "heavy_strip_pressure_sand_blaster_pot_nozzle_descale_hull_tank",
  },
  wet_blast: {
    surfaceFinish: 9, throughput: 6, mediaControl: 8, dustControl: 10, sbCost: 7,
    dustFree: true, forDelicate: true,
    blasterConfig: "wet_sand_blaster_slurry_pump_dust_free_satin_finish_no_embed",
    bestUse: "medical_implant_wet_sand_blaster_slurry_dust_free_satin_clean",
  },
  micro_blast: {
    surfaceFinish: 10, throughput: 3, mediaControl: 10, dustControl: 8, sbCost: 9,
    dustFree: false, forDelicate: true,
    blasterConfig: "micro_sand_blaster_pencil_nozzle_fine_alumina_precision_detail",
    bestUse: "dental_lab_micro_sand_blaster_pencil_nozzle_fine_alumina_prep",
  },
  wheel_blast: {
    surfaceFinish: 6, throughput: 10, mediaControl: 5, dustControl: 6, sbCost: 4,
    dustFree: false, forDelicate: false,
    blasterConfig: "wheel_blast_machine_centrifugal_throw_steel_shot_auto_convey",
    bestUse: "foundry_casting_wheel_blast_machine_centrifugal_steel_shot_auto",
  },
};

function get(t: SandBlasterType): SandBlasterData {
  return DATA[t];
}

export const surfaceFinish = (t: SandBlasterType) => get(t).surfaceFinish;
export const throughput = (t: SandBlasterType) => get(t).throughput;
export const mediaControl = (t: SandBlasterType) => get(t).mediaControl;
export const dustControl = (t: SandBlasterType) => get(t).dustControl;
export const sbCost = (t: SandBlasterType) => get(t).sbCost;
export const dustFree = (t: SandBlasterType) => get(t).dustFree;
export const forDelicate = (t: SandBlasterType) => get(t).forDelicate;
export const blasterConfig = (t: SandBlasterType) => get(t).blasterConfig;
export const bestUse = (t: SandBlasterType) => get(t).bestUse;
export const sandBlasterTypes = (): SandBlasterType[] =>
  Object.keys(DATA) as SandBlasterType[];
