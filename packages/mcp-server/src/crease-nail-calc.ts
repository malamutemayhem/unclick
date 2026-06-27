// Crease nail calculator - farriery horseshoe nail selection tools

export type CreaseNailType =
  | "city_head_slim"
  | "regular_head_standard"
  | "race_head_thin"
  | "draft_head_heavy"
  | "aluminum_light_sport";

const NAIL_DATA: Record<
  CreaseNailType,
  {
    holdStrength: number;
    hoofSafe: number;
    driveEase: number;
    clinchForm: number;
    cost: number;
    lightweight: boolean;
    forDraft: boolean;
    headProfile: string;
    bestUse: string;
  }
> = {
  city_head_slim: {
    holdStrength: 7,
    hoofSafe: 9,
    driveEase: 8,
    clinchForm: 8,
    cost: 4,
    lightweight: false,
    forDraft: false,
    headProfile: "slim_city_head",
    bestUse: "light_riding_shoe",
  },
  regular_head_standard: {
    holdStrength: 8,
    hoofSafe: 8,
    driveEase: 8,
    clinchForm: 8,
    cost: 3,
    lightweight: false,
    forDraft: false,
    headProfile: "standard_countersink",
    bestUse: "general_purpose_shoe",
  },
  race_head_thin: {
    holdStrength: 6,
    hoofSafe: 9,
    driveEase: 9,
    clinchForm: 7,
    cost: 5,
    lightweight: true,
    forDraft: false,
    headProfile: "thin_race_flush",
    bestUse: "racing_plate_nail",
  },
  draft_head_heavy: {
    holdStrength: 10,
    hoofSafe: 7,
    driveEase: 6,
    clinchForm: 9,
    cost: 4,
    lightweight: false,
    forDraft: true,
    headProfile: "heavy_draft_head",
    bestUse: "heavy_draft_shoe",
  },
  aluminum_light_sport: {
    holdStrength: 5,
    hoofSafe: 10,
    driveEase: 10,
    clinchForm: 6,
    cost: 6,
    lightweight: true,
    forDraft: false,
    headProfile: "aluminum_sport_cap",
    bestUse: "sport_competition_shoe",
  },
};

export function holdStrength(type: CreaseNailType): number {
  return NAIL_DATA[type].holdStrength;
}
export function hoofSafe(type: CreaseNailType): number {
  return NAIL_DATA[type].hoofSafe;
}
export function driveEase(type: CreaseNailType): number {
  return NAIL_DATA[type].driveEase;
}
export function clinchForm(type: CreaseNailType): number {
  return NAIL_DATA[type].clinchForm;
}
export function nailCost(type: CreaseNailType): number {
  return NAIL_DATA[type].cost;
}
export function lightweight(type: CreaseNailType): boolean {
  return NAIL_DATA[type].lightweight;
}
export function forDraft(type: CreaseNailType): boolean {
  return NAIL_DATA[type].forDraft;
}
export function headProfile(type: CreaseNailType): string {
  return NAIL_DATA[type].headProfile;
}
export function bestUse(type: CreaseNailType): string {
  return NAIL_DATA[type].bestUse;
}
export function creaseNails(): CreaseNailType[] {
  return Object.keys(NAIL_DATA) as CreaseNailType[];
}
