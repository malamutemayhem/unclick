// french-link-calc - French link stitch binding types

export type FrenchLink =
  | "basic_link_standard"
  | "raised_band_classic"
  | "recessed_cord_flush"
  | "tape_link_flat"
  | "double_link_strong";

const DATA: Record<FrenchLink, {
  holdStrength: number; flexOpen: number; decorativeValue: number; bindSpeed: number;
  cost: number; raisedSpine: boolean; forLarge: boolean; supportType: string; bestUse: string;
}> = {
  basic_link_standard:   { holdStrength: 7, flexOpen: 8, decorativeValue: 6, bindSpeed: 7, cost: 4, raisedSpine: false, forLarge: false, supportType: "linked_chain_stitch", bestUse: "general_journal_bind" },
  raised_band_classic:   { holdStrength: 9, flexOpen: 6, decorativeValue: 10, bindSpeed: 4, cost: 8, raisedSpine: true, forLarge: true, supportType: "raised_cord_band", bestUse: "classic_fine_binding" },
  recessed_cord_flush:   { holdStrength: 9, flexOpen: 7, decorativeValue: 5, bindSpeed: 5, cost: 6, raisedSpine: false, forLarge: true, supportType: "recessed_linen_cord", bestUse: "flush_spine_hardcover" },
  tape_link_flat:        { holdStrength: 8, flexOpen: 9, decorativeValue: 4, bindSpeed: 8, cost: 3, raisedSpine: false, forLarge: false, supportType: "flat_linen_tape", bestUse: "flat_open_lay_book" },
  double_link_strong:    { holdStrength: 10, flexOpen: 5, decorativeValue: 7, bindSpeed: 3, cost: 7, raisedSpine: true, forLarge: true, supportType: "double_chain_link", bestUse: "heavy_duty_tome" },
};

const get = (l: FrenchLink) => DATA[l];
export const holdStrength = (l: FrenchLink) => get(l).holdStrength;
export const flexOpen = (l: FrenchLink) => get(l).flexOpen;
export const decorativeValue = (l: FrenchLink) => get(l).decorativeValue;
export const bindSpeed = (l: FrenchLink) => get(l).bindSpeed;
export const linkCost = (l: FrenchLink) => get(l).cost;
export const raisedSpine = (l: FrenchLink) => get(l).raisedSpine;
export const forLarge = (l: FrenchLink) => get(l).forLarge;
export const supportType = (l: FrenchLink) => get(l).supportType;
export const bestUse = (l: FrenchLink) => get(l).bestUse;
export const frenchLinks = (): FrenchLink[] => Object.keys(DATA) as FrenchLink[];
