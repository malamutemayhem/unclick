// Drum carder calculator - fiber carding drum tools

export type DrumCardType =
  | "standard_hand_crank"
  | "fine_cloth_delicate"
  | "coarse_cloth_rug"
  | "electric_motor_drive"
  | "blending_board_flat";

const DRUM_DATA: Record<
  DrumCardType,
  {
    cardEven: number;
    fiberBlend: number;
    speedCard: number;
    battWeight: number;
    cost: number;
    powered: boolean;
    forFine: boolean;
    clothType: string;
    bestUse: string;
  }
> = {
  standard_hand_crank: {
    cardEven: 8,
    fiberBlend: 7,
    speedCard: 7,
    battWeight: 7,
    cost: 5,
    powered: false,
    forFine: false,
    clothType: "standard_72_tpi",
    bestUse: "general_wool_card",
  },
  fine_cloth_delicate: {
    cardEven: 9,
    fiberBlend: 9,
    speedCard: 6,
    battWeight: 5,
    cost: 7,
    powered: false,
    forFine: true,
    clothType: "fine_120_tpi",
    bestUse: "fine_fiber_batt",
  },
  coarse_cloth_rug: {
    cardEven: 7,
    fiberBlend: 6,
    speedCard: 8,
    battWeight: 10,
    cost: 5,
    powered: false,
    forFine: false,
    clothType: "coarse_46_tpi",
    bestUse: "coarse_rug_batt",
  },
  electric_motor_drive: {
    cardEven: 8,
    fiberBlend: 8,
    speedCard: 10,
    battWeight: 8,
    cost: 9,
    powered: true,
    forFine: false,
    clothType: "standard_72_tpi",
    bestUse: "production_card_batch",
  },
  blending_board_flat: {
    cardEven: 7,
    fiberBlend: 10,
    speedCard: 5,
    battWeight: 4,
    cost: 4,
    powered: false,
    forFine: false,
    clothType: "flat_board_cloth",
    bestUse: "art_batt_blend",
  },
};

export function cardEven(type: DrumCardType): number {
  return DRUM_DATA[type].cardEven;
}
export function fiberBlend(type: DrumCardType): number {
  return DRUM_DATA[type].fiberBlend;
}
export function speedCard(type: DrumCardType): number {
  return DRUM_DATA[type].speedCard;
}
export function battWeight(type: DrumCardType): number {
  return DRUM_DATA[type].battWeight;
}
export function drumCost(type: DrumCardType): number {
  return DRUM_DATA[type].cost;
}
export function powered(type: DrumCardType): boolean {
  return DRUM_DATA[type].powered;
}
export function forFine(type: DrumCardType): boolean {
  return DRUM_DATA[type].forFine;
}
export function clothType(type: DrumCardType): string {
  return DRUM_DATA[type].clothType;
}
export function bestUse(type: DrumCardType): string {
  return DRUM_DATA[type].bestUse;
}
export function drumCards(): DrumCardType[] {
  return Object.keys(DRUM_DATA) as DrumCardType[];
}
