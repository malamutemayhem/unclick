export type PaddleDryerType =
  | "hollow_wedge"
  | "disc_paddle"
  | "agitated_thin_film"
  | "conical_screw"
  | "ploughshare_mix";

interface PaddleDryerData {
  heatTransfer: number;
  throughput: number;
  mixingQuality: number;
  moistureControl: number;
  pdCost: number;
  indirect: boolean;
  forSludge: boolean;
  dryerConfig: string;
  bestUse: string;
}

const DATA: Record<PaddleDryerType, PaddleDryerData> = {
  hollow_wedge: {
    heatTransfer: 9, throughput: 8, mixingQuality: 8, moistureControl: 8, pdCost: 8,
    indirect: true, forSludge: true,
    dryerConfig: "hollow_wedge_paddle_dryer_heated_wedge_blade_self_clean_indirect",
    bestUse: "sludge_dry_hollow_wedge_paddle_dryer_self_clean_indirect_heat",
  },
  disc_paddle: {
    heatTransfer: 8, throughput: 9, mixingQuality: 7, moistureControl: 7, pdCost: 7,
    indirect: true, forSludge: true,
    dryerConfig: "disc_paddle_dryer_heated_disc_rotate_shear_thin_film_contact",
    bestUse: "chemical_cake_disc_paddle_dryer_high_area_contact_heat_dry",
  },
  agitated_thin_film: {
    heatTransfer: 10, throughput: 6, mixingQuality: 9, moistureControl: 9, pdCost: 9,
    indirect: true, forSludge: false,
    dryerConfig: "agitated_thin_film_paddle_dryer_wiper_blade_jacket_heat_evaporate",
    bestUse: "polymer_solution_agitated_thin_film_paddle_dryer_solvent_recover",
  },
  conical_screw: {
    heatTransfer: 7, throughput: 6, mixingQuality: 8, moistureControl: 8, pdCost: 7,
    indirect: true, forSludge: false,
    dryerConfig: "conical_screw_paddle_dryer_orbit_screw_vacuum_gentle_batch_mix",
    bestUse: "pharma_powder_conical_screw_paddle_dryer_vacuum_gentle_batch",
  },
  ploughshare_mix: {
    heatTransfer: 8, throughput: 8, mixingQuality: 9, moistureControl: 7, pdCost: 7,
    indirect: true, forSludge: false,
    dryerConfig: "ploughshare_mix_paddle_dryer_plough_blade_fluidize_jacket_heat",
    bestUse: "mineral_powder_ploughshare_mix_paddle_dryer_fluidize_blend_dry",
  },
};

function get(t: PaddleDryerType): PaddleDryerData {
  return DATA[t];
}

export const heatTransfer = (t: PaddleDryerType) => get(t).heatTransfer;
export const throughput = (t: PaddleDryerType) => get(t).throughput;
export const mixingQuality = (t: PaddleDryerType) => get(t).mixingQuality;
export const moistureControl = (t: PaddleDryerType) => get(t).moistureControl;
export const pdCost = (t: PaddleDryerType) => get(t).pdCost;
export const indirect = (t: PaddleDryerType) => get(t).indirect;
export const forSludge = (t: PaddleDryerType) => get(t).forSludge;
export const dryerConfig = (t: PaddleDryerType) => get(t).dryerConfig;
export const bestUse = (t: PaddleDryerType) => get(t).bestUse;
export const paddleDryerTypes = (): PaddleDryerType[] =>
  Object.keys(DATA) as PaddleDryerType[];
