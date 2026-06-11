export type PcbMaskType =
  | "liquid_photo_imageable"
  | "dry_film_laminate"
  | "screen_print_thermal"
  | "inkjet_digital_print"
  | "peelable_temp_mask";

const DATA: Record<PcbMaskType, {
  resolution: number; adhesion: number; chemResist: number;
  thickness: number; maskCost: number; photoSensitive: boolean;
  forHdi: boolean; applyMethod: string; bestUse: string;
}> = {
  liquid_photo_imageable: { resolution: 9, adhesion: 8, chemResist: 8, thickness: 7, maskCost: 5, photoSensitive: true, forHdi: true, applyMethod: "curtain_coat_expose", bestUse: "standard_multilayer_pcb" },
  dry_film_laminate: { resolution: 7, adhesion: 9, chemResist: 9, thickness: 5, maskCost: 6, photoSensitive: true, forHdi: false, applyMethod: "vacuum_laminate_expose", bestUse: "thick_board_even_coat" },
  screen_print_thermal: { resolution: 4, adhesion: 6, chemResist: 6, thickness: 3, maskCost: 2, photoSensitive: false, forHdi: false, applyMethod: "screen_print_cure", bestUse: "single_side_simple_board" },
  inkjet_digital_print: { resolution: 10, adhesion: 7, chemResist: 7, thickness: 8, maskCost: 7, photoSensitive: false, forHdi: true, applyMethod: "digital_inkjet_uv_cure", bestUse: "prototype_quick_turn" },
  peelable_temp_mask: { resolution: 3, adhesion: 5, chemResist: 4, thickness: 2, maskCost: 3, photoSensitive: false, forHdi: false, applyMethod: "dispense_peel_strip", bestUse: "selective_solder_mask_area" },
};

const get = (t: PcbMaskType) => DATA[t];

export const resolution = (t: PcbMaskType) => get(t).resolution;
export const adhesion = (t: PcbMaskType) => get(t).adhesion;
export const chemResist = (t: PcbMaskType) => get(t).chemResist;
export const thickness = (t: PcbMaskType) => get(t).thickness;
export const maskCost = (t: PcbMaskType) => get(t).maskCost;
export const photoSensitive = (t: PcbMaskType) => get(t).photoSensitive;
export const forHdi = (t: PcbMaskType) => get(t).forHdi;
export const applyMethod = (t: PcbMaskType) => get(t).applyMethod;
export const bestUse = (t: PcbMaskType) => get(t).bestUse;
export const pcbMasks = (): PcbMaskType[] => Object.keys(DATA) as PcbMaskType[];
