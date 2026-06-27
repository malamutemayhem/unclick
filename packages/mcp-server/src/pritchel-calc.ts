// Pritchel calculator - farriery nail hole punching tools

export type PritchelType =
  | "round_punch_standard"
  | "square_punch_nail"
  | "tapered_drift_open"
  | "multi_size_set"
  | "carbide_tip_hard";

const PRITCHEL_DATA: Record<
  PritchelType,
  {
    holeClean: number;
    punchLife: number;
    alignEase: number;
    sizeRange: number;
    cost: number;
    carbide: boolean;
    forHotWork: boolean;
    tipShape: string;
    bestUse: string;
  }
> = {
  round_punch_standard: {
    holeClean: 7,
    punchLife: 7,
    alignEase: 8,
    sizeRange: 5,
    cost: 3,
    carbide: false,
    forHotWork: true,
    tipShape: "round_taper_point",
    bestUse: "standard_nail_hole",
  },
  square_punch_nail: {
    holeClean: 8,
    punchLife: 7,
    alignEase: 7,
    sizeRange: 5,
    cost: 3,
    carbide: false,
    forHotWork: true,
    tipShape: "square_taper_point",
    bestUse: "square_nail_seat",
  },
  tapered_drift_open: {
    holeClean: 8,
    punchLife: 8,
    alignEase: 9,
    sizeRange: 7,
    cost: 4,
    carbide: false,
    forHotWork: true,
    tipShape: "long_taper_drift",
    bestUse: "open_existing_hole",
  },
  multi_size_set: {
    holeClean: 7,
    punchLife: 7,
    alignEase: 7,
    sizeRange: 10,
    cost: 7,
    carbide: false,
    forHotWork: true,
    tipShape: "interchangeable_tip",
    bestUse: "all_nail_size_punch",
  },
  carbide_tip_hard: {
    holeClean: 9,
    punchLife: 10,
    alignEase: 8,
    sizeRange: 5,
    cost: 8,
    carbide: true,
    forHotWork: false,
    tipShape: "carbide_insert_tip",
    bestUse: "cold_punch_hard_shoe",
  },
};

export function holeClean(type: PritchelType): number {
  return PRITCHEL_DATA[type].holeClean;
}
export function punchLife(type: PritchelType): number {
  return PRITCHEL_DATA[type].punchLife;
}
export function alignEase(type: PritchelType): number {
  return PRITCHEL_DATA[type].alignEase;
}
export function sizeRange(type: PritchelType): number {
  return PRITCHEL_DATA[type].sizeRange;
}
export function pritchelCost(type: PritchelType): number {
  return PRITCHEL_DATA[type].cost;
}
export function carbide(type: PritchelType): boolean {
  return PRITCHEL_DATA[type].carbide;
}
export function forHotWork(type: PritchelType): boolean {
  return PRITCHEL_DATA[type].forHotWork;
}
export function tipShape(type: PritchelType): string {
  return PRITCHEL_DATA[type].tipShape;
}
export function bestUse(type: PritchelType): string {
  return PRITCHEL_DATA[type].bestUse;
}
export function pritchels(): PritchelType[] {
  return Object.keys(PRITCHEL_DATA) as PritchelType[];
}
