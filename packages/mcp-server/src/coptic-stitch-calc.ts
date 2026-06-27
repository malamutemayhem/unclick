// Coptic stitch calculator - bookbinding stitch pattern tools

export type CopticStitchType =
  | "basic_chain_link"
  | "caterpillar_raised"
  | "french_link_cross"
  | "ethiopian_wrap_bind"
  | "long_stitch_exposed";

const STITCH_DATA: Record<
  CopticStitchType,
  {
    holdStrength: number;
    layFlat: number;
    stitchSpeed: number;
    decorativeValue: number;
    cost: number;
    exposed: boolean;
    forThick: boolean;
    linkPattern: string;
    bestUse: string;
  }
> = {
  basic_chain_link: {
    holdStrength: 8,
    layFlat: 9,
    stitchSpeed: 8,
    decorativeValue: 7,
    cost: 2,
    exposed: true,
    forThick: false,
    linkPattern: "simple_chain",
    bestUse: "beginner_open_spine",
  },
  caterpillar_raised: {
    holdStrength: 7,
    layFlat: 7,
    stitchSpeed: 5,
    decorativeValue: 10,
    cost: 3,
    exposed: true,
    forThick: false,
    linkPattern: "raised_caterpillar",
    bestUse: "decorative_spine_show",
  },
  french_link_cross: {
    holdStrength: 9,
    layFlat: 8,
    stitchSpeed: 6,
    decorativeValue: 8,
    cost: 3,
    exposed: true,
    forThick: true,
    linkPattern: "cross_link_chain",
    bestUse: "strong_art_journal",
  },
  ethiopian_wrap_bind: {
    holdStrength: 10,
    layFlat: 7,
    stitchSpeed: 4,
    decorativeValue: 9,
    cost: 4,
    exposed: true,
    forThick: true,
    linkPattern: "wrapped_figure_eight",
    bestUse: "heavy_board_bind",
  },
  long_stitch_exposed: {
    holdStrength: 6,
    layFlat: 8,
    stitchSpeed: 9,
    decorativeValue: 8,
    cost: 2,
    exposed: true,
    forThick: false,
    linkPattern: "long_span_stitch",
    bestUse: "cover_pattern_show",
  },
};

export function holdStrength(type: CopticStitchType): number {
  return STITCH_DATA[type].holdStrength;
}
export function layFlat(type: CopticStitchType): number {
  return STITCH_DATA[type].layFlat;
}
export function stitchSpeed(type: CopticStitchType): number {
  return STITCH_DATA[type].stitchSpeed;
}
export function decorativeValue(type: CopticStitchType): number {
  return STITCH_DATA[type].decorativeValue;
}
export function stitchCost(type: CopticStitchType): number {
  return STITCH_DATA[type].cost;
}
export function exposed(type: CopticStitchType): boolean {
  return STITCH_DATA[type].exposed;
}
export function forThick(type: CopticStitchType): boolean {
  return STITCH_DATA[type].forThick;
}
export function linkPattern(type: CopticStitchType): string {
  return STITCH_DATA[type].linkPattern;
}
export function bestUse(type: CopticStitchType): string {
  return STITCH_DATA[type].bestUse;
}
export function copticStitches(): CopticStitchType[] {
  return Object.keys(STITCH_DATA) as CopticStitchType[];
}
