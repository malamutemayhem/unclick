// Round graver calculator - engraving round-section graver tools

export type RoundGraverType =
  | "standard_round_point"
  | "bead_raise_cup"
  | "ring_size_inside"
  | "wire_line_narrow"
  | "oval_section_wide";

const ROUND_DATA: Record<
  RoundGraverType,
  {
    curveFollow: number;
    chipClear: number;
    edgeLife: number;
    sharpenEase: number;
    cost: number;
    forBeading: boolean;
    insideCut: boolean;
    grindFace: string;
    bestUse: string;
  }
> = {
  standard_round_point: {
    curveFollow: 8,
    chipClear: 8,
    edgeLife: 7,
    sharpenEase: 8,
    cost: 3,
    forBeading: false,
    insideCut: false,
    grindFace: "round_ground_point",
    bestUse: "general_curve_line",
  },
  bead_raise_cup: {
    curveFollow: 6,
    chipClear: 5,
    edgeLife: 6,
    sharpenEase: 5,
    cost: 6,
    forBeading: true,
    insideCut: false,
    grindFace: "concave_cup_face",
    bestUse: "bead_raise_border",
  },
  ring_size_inside: {
    curveFollow: 9,
    chipClear: 7,
    edgeLife: 7,
    sharpenEase: 6,
    cost: 5,
    forBeading: false,
    insideCut: true,
    grindFace: "curved_inside_reach",
    bestUse: "ring_inside_engrave",
  },
  wire_line_narrow: {
    curveFollow: 7,
    chipClear: 9,
    edgeLife: 5,
    sharpenEase: 7,
    cost: 4,
    forBeading: false,
    insideCut: false,
    grindFace: "narrow_wire_point",
    bestUse: "thin_wire_line_cut",
  },
  oval_section_wide: {
    curveFollow: 7,
    chipClear: 7,
    edgeLife: 8,
    sharpenEase: 6,
    cost: 5,
    forBeading: false,
    insideCut: false,
    grindFace: "oval_broad_face",
    bestUse: "wide_sweep_shade",
  },
};

export function curveFollow(type: RoundGraverType): number {
  return ROUND_DATA[type].curveFollow;
}
export function chipClear(type: RoundGraverType): number {
  return ROUND_DATA[type].chipClear;
}
export function edgeLife(type: RoundGraverType): number {
  return ROUND_DATA[type].edgeLife;
}
export function sharpenEase(type: RoundGraverType): number {
  return ROUND_DATA[type].sharpenEase;
}
export function graverCost(type: RoundGraverType): number {
  return ROUND_DATA[type].cost;
}
export function forBeading(type: RoundGraverType): boolean {
  return ROUND_DATA[type].forBeading;
}
export function insideCut(type: RoundGraverType): boolean {
  return ROUND_DATA[type].insideCut;
}
export function grindFace(type: RoundGraverType): string {
  return ROUND_DATA[type].grindFace;
}
export function bestUse(type: RoundGraverType): string {
  return ROUND_DATA[type].bestUse;
}
export function roundGravers(): RoundGraverType[] {
  return Object.keys(ROUND_DATA) as RoundGraverType[];
}
