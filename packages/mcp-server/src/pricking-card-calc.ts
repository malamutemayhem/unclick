// Pricking card calculator - lace pattern card tools

export type PrickingCardType =
  | "manilla_card_standard"
  | "glazed_card_smooth"
  | "plastic_sheet_reuse"
  | "parchment_paper_fine"
  | "foam_board_thick";

const CARD_DATA: Record<
  PrickingCardType,
  {
    pinHold: number;
    patternClarity: number;
    durability: number;
    prickEase: number;
    cost: number;
    reusable: boolean;
    forFine: boolean;
    cardWeight: string;
    bestUse: string;
  }
> = {
  manilla_card_standard: {
    pinHold: 8,
    patternClarity: 7,
    durability: 7,
    prickEase: 8,
    cost: 2,
    reusable: true,
    forFine: false,
    cardWeight: "medium_300gsm",
    bestUse: "general_lace_pattern",
  },
  glazed_card_smooth: {
    pinHold: 9,
    patternClarity: 9,
    durability: 8,
    prickEase: 7,
    cost: 3,
    reusable: true,
    forFine: true,
    cardWeight: "heavy_400gsm",
    bestUse: "fine_detail_pattern",
  },
  plastic_sheet_reuse: {
    pinHold: 7,
    patternClarity: 8,
    durability: 10,
    prickEase: 5,
    cost: 4,
    reusable: true,
    forFine: false,
    cardWeight: "rigid_1mm_sheet",
    bestUse: "repeat_production_lace",
  },
  parchment_paper_fine: {
    pinHold: 6,
    patternClarity: 10,
    durability: 4,
    prickEase: 9,
    cost: 3,
    reusable: false,
    forFine: true,
    cardWeight: "light_150gsm",
    bestUse: "tracing_design_draft",
  },
  foam_board_thick: {
    pinHold: 9,
    patternClarity: 6,
    durability: 5,
    prickEase: 10,
    cost: 2,
    reusable: false,
    forFine: false,
    cardWeight: "thick_5mm_foam",
    bestUse: "beginner_practice_lace",
  },
};

export function pinHold(type: PrickingCardType): number {
  return CARD_DATA[type].pinHold;
}
export function patternClarity(type: PrickingCardType): number {
  return CARD_DATA[type].patternClarity;
}
export function durability(type: PrickingCardType): number {
  return CARD_DATA[type].durability;
}
export function prickEase(type: PrickingCardType): number {
  return CARD_DATA[type].prickEase;
}
export function cardCost(type: PrickingCardType): number {
  return CARD_DATA[type].cost;
}
export function reusable(type: PrickingCardType): boolean {
  return CARD_DATA[type].reusable;
}
export function forFine(type: PrickingCardType): boolean {
  return CARD_DATA[type].forFine;
}
export function cardWeight(type: PrickingCardType): string {
  return CARD_DATA[type].cardWeight;
}
export function bestUse(type: PrickingCardType): string {
  return CARD_DATA[type].bestUse;
}
export function prickingCards(): PrickingCardType[] {
  return Object.keys(CARD_DATA) as PrickingCardType[];
}
