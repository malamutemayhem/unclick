export type PadPrintType =
  | "open_inkwell_single_color"
  | "sealed_cup_enclosed"
  | "rotary_multi_station"
  | "shuttle_dual_cliche"
  | "micro_pad_fine_detail";

interface PadPrintData {
  speed: number;
  detail: number;
  colorCount: number;
  registration: number;
  ppCost: number;
  sealed: boolean;
  forRound: boolean;
  transfer: string;
  bestUse: string;
}

const DATA: Record<PadPrintType, PadPrintData> = {
  open_inkwell_single_color: {
    speed: 6, detail: 6, colorCount: 2, registration: 5, ppCost: 3,
    sealed: false, forRound: true,
    transfer: "doctor_blade_silicone_pad_pick",
    bestUse: "single_color_logo_promotional",
  },
  sealed_cup_enclosed: {
    speed: 7, detail: 7, colorCount: 3, registration: 7, ppCost: 5,
    sealed: true, forRound: true,
    transfer: "sealed_ink_cup_ceramic_ring",
    bestUse: "solvent_ink_consistent_quality",
  },
  rotary_multi_station: {
    speed: 10, detail: 7, colorCount: 8, registration: 9, ppCost: 8,
    sealed: true, forRound: true,
    transfer: "carousel_index_multi_pad_station",
    bestUse: "multi_color_high_volume_part",
  },
  shuttle_dual_cliche: {
    speed: 8, detail: 8, colorCount: 5, registration: 8, ppCost: 6,
    sealed: true, forRound: true,
    transfer: "shuttle_table_alternating_cliche",
    bestUse: "two_color_precise_register_medical",
  },
  micro_pad_fine_detail: {
    speed: 5, detail: 10, colorCount: 2, registration: 9, ppCost: 7,
    sealed: true, forRound: true,
    transfer: "micro_silicone_tip_fine_etch",
    bestUse: "micro_text_dial_scale_instrument",
  },
};

function get(t: PadPrintType): PadPrintData {
  return DATA[t];
}

export const speed = (t: PadPrintType) => get(t).speed;
export const detail = (t: PadPrintType) => get(t).detail;
export const colorCount = (t: PadPrintType) => get(t).colorCount;
export const registration = (t: PadPrintType) => get(t).registration;
export const ppCost = (t: PadPrintType) => get(t).ppCost;
export const sealed = (t: PadPrintType) => get(t).sealed;
export const forRound = (t: PadPrintType) => get(t).forRound;
export const transfer = (t: PadPrintType) => get(t).transfer;
export const bestUse = (t: PadPrintType) => get(t).bestUse;
export const padPrintTypes = (): PadPrintType[] =>
  Object.keys(DATA) as PadPrintType[];
