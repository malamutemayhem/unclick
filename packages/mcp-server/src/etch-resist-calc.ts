export type EtchResistType =
  | "dry_film_photo"
  | "liquid_photo_resist"
  | "screen_print_ink"
  | "laser_direct_image"
  | "electro_deposit_ed";

const DATA: Record<EtchResistType, {
  resolution: number; adhesion: number; etchTolerance: number;
  throughput: number; resistCost: number; photoProcess: boolean;
  forFineLine: boolean; applyMethod: string; bestUse: string;
}> = {
  dry_film_photo: { resolution: 8, adhesion: 8, etchTolerance: 8, throughput: 8, resistCost: 5, photoProcess: true, forFineLine: true, applyMethod: "laminate_expose_develop", bestUse: "standard_inner_outer_layer" },
  liquid_photo_resist: { resolution: 9, adhesion: 9, etchTolerance: 9, throughput: 6, resistCost: 6, photoProcess: true, forFineLine: true, applyMethod: "spin_coat_expose_develop", bestUse: "ultra_fine_line_hdi" },
  screen_print_ink: { resolution: 4, adhesion: 6, etchTolerance: 5, throughput: 9, resistCost: 2, photoProcess: false, forFineLine: false, applyMethod: "screen_print_cure", bestUse: "low_cost_single_side" },
  laser_direct_image: { resolution: 10, adhesion: 8, etchTolerance: 9, throughput: 7, resistCost: 7, photoProcess: true, forFineLine: true, applyMethod: "laser_write_direct", bestUse: "maskless_prototype_run" },
  electro_deposit_ed: { resolution: 7, adhesion: 10, etchTolerance: 7, throughput: 7, resistCost: 4, photoProcess: true, forFineLine: false, applyMethod: "electrocoat_expose_develop", bestUse: "high_aspect_through_hole" },
};

const get = (t: EtchResistType) => DATA[t];

export const resolution = (t: EtchResistType) => get(t).resolution;
export const adhesion = (t: EtchResistType) => get(t).adhesion;
export const etchTolerance = (t: EtchResistType) => get(t).etchTolerance;
export const throughput = (t: EtchResistType) => get(t).throughput;
export const resistCost = (t: EtchResistType) => get(t).resistCost;
export const photoProcess = (t: EtchResistType) => get(t).photoProcess;
export const forFineLine = (t: EtchResistType) => get(t).forFineLine;
export const applyMethod = (t: EtchResistType) => get(t).applyMethod;
export const bestUse = (t: EtchResistType) => get(t).bestUse;
export const etchResists = (): EtchResistType[] => Object.keys(DATA) as EtchResistType[];
