// Survey tape calculator - surveying measurement tape tools

export type SurveyTapeType =
  | "steel_open_reel"
  | "fiberglass_closed_reel"
  | "invar_precision_bar"
  | "cloth_chain_link"
  | "laser_digital_measure";

const TAPE_DATA: Record<
  SurveyTapeType,
  {
    measureAccuracy: number;
    reelSpeed: number;
    weatherResist: number;
    maxLength: number;
    cost: number;
    digital: boolean;
    stretchFree: boolean;
    tapeBody: string;
    bestUse: string;
  }
> = {
  steel_open_reel: {
    measureAccuracy: 8,
    reelSpeed: 5,
    weatherResist: 6,
    maxLength: 8,
    cost: 4,
    digital: false,
    stretchFree: true,
    tapeBody: "tempered_steel_strip",
    bestUse: "standard_chain_survey",
  },
  fiberglass_closed_reel: {
    measureAccuracy: 6,
    reelSpeed: 7,
    weatherResist: 9,
    maxLength: 7,
    cost: 3,
    digital: false,
    stretchFree: false,
    tapeBody: "woven_fiberglass_coat",
    bestUse: "wet_field_measure",
  },
  invar_precision_bar: {
    measureAccuracy: 10,
    reelSpeed: 2,
    weatherResist: 7,
    maxLength: 3,
    cost: 9,
    digital: false,
    stretchFree: true,
    tapeBody: "invar_alloy_bar",
    bestUse: "geodetic_baseline",
  },
  cloth_chain_link: {
    measureAccuracy: 4,
    reelSpeed: 4,
    weatherResist: 3,
    maxLength: 6,
    cost: 2,
    digital: false,
    stretchFree: false,
    tapeBody: "linen_chain_brass",
    bestUse: "rough_distance_est",
  },
  laser_digital_measure: {
    measureAccuracy: 9,
    reelSpeed: 10,
    weatherResist: 5,
    maxLength: 9,
    cost: 8,
    digital: true,
    stretchFree: true,
    tapeBody: "laser_beam_reflect",
    bestUse: "rapid_distance_read",
  },
};

export function measureAccuracy(type: SurveyTapeType): number {
  return TAPE_DATA[type].measureAccuracy;
}
export function reelSpeed(type: SurveyTapeType): number {
  return TAPE_DATA[type].reelSpeed;
}
export function weatherResist(type: SurveyTapeType): number {
  return TAPE_DATA[type].weatherResist;
}
export function maxLength(type: SurveyTapeType): number {
  return TAPE_DATA[type].maxLength;
}
export function tapeCost(type: SurveyTapeType): number {
  return TAPE_DATA[type].cost;
}
export function digital(type: SurveyTapeType): boolean {
  return TAPE_DATA[type].digital;
}
export function stretchFree(type: SurveyTapeType): boolean {
  return TAPE_DATA[type].stretchFree;
}
export function tapeBody(type: SurveyTapeType): string {
  return TAPE_DATA[type].tapeBody;
}
export function bestUse(type: SurveyTapeType): string {
  return TAPE_DATA[type].bestUse;
}
export function surveyTapes(): SurveyTapeType[] {
  return Object.keys(TAPE_DATA) as SurveyTapeType[];
}
