export type VaporChamber =
  | "stamped_copper_thin"
  | "etched_titanium"
  | "3d_printed_additive"
  | "ultra_thin_sub_mm"
  | "two_phase_immersion_vc";

const DATA: Record<VaporChamber, {
  spreading: number; thickness: number; maxHeatFlux: number;
  reliability: number; vcCost: number; bendable: boolean;
  forGpu: boolean; process: string; bestUse: string;
}> = {
  stamped_copper_thin: {
    spreading: 8, thickness: 7, maxHeatFlux: 7,
    reliability: 9, vcCost: 5, bendable: false,
    forGpu: true, process: "stamped_sintered_wick_sealed",
    bestUse: "gpu_heatspreader_base",
  },
  etched_titanium: {
    spreading: 7, thickness: 8, maxHeatFlux: 6,
    reliability: 8, vcCost: 7, bendable: false,
    forGpu: false, process: "chemical_etch_diffusion_bond",
    bestUse: "aerospace_lightweight_spreader",
  },
  "3d_printed_additive": {
    spreading: 9, thickness: 5, maxHeatFlux: 9,
    reliability: 6, vcCost: 9, bendable: false,
    forGpu: true, process: "slm_internal_wick_lattice",
    bestUse: "custom_high_power_server",
  },
  ultra_thin_sub_mm: {
    spreading: 5, thickness: 10, maxHeatFlux: 4,
    reliability: 7, vcCost: 6, bendable: true,
    forGpu: false, process: "electroplated_copper_foil",
    bestUse: "foldable_phone_soc_cool",
  },
  two_phase_immersion_vc: {
    spreading: 10, thickness: 3, maxHeatFlux: 10,
    reliability: 7, vcCost: 8, bendable: false,
    forGpu: true, process: "sealed_dielectric_fluid_boil",
    bestUse: "ai_chip_extreme_tdp",
  },
};

const get = (t: VaporChamber) => DATA[t];

export const spreading = (t: VaporChamber) => get(t).spreading;
export const thickness = (t: VaporChamber) => get(t).thickness;
export const maxHeatFlux = (t: VaporChamber) => get(t).maxHeatFlux;
export const reliability = (t: VaporChamber) => get(t).reliability;
export const vcCost = (t: VaporChamber) => get(t).vcCost;
export const bendable = (t: VaporChamber) => get(t).bendable;
export const forGpu = (t: VaporChamber) => get(t).forGpu;
export const process = (t: VaporChamber) => get(t).process;
export const bestUse = (t: VaporChamber) => get(t).bestUse;
export const vaporChambers = (): VaporChamber[] => Object.keys(DATA) as VaporChamber[];
