// Punty rod calculator - glassblowing pontil/punty transfer tools

export type PuntyRodType =
  | "solid_steel_basic"
  | "hollow_blow_through"
  | "cup_punty_attach"
  | "spring_punty_snap"
  | "graphite_tip_release";

const PUNTY_DATA: Record<
  PuntyRodType,
  {
    attachStrength: number;
    releaseClean: number;
    heatRetain: number;
    controlSpin: number;
    cost: number;
    cleanBreak: boolean;
    forHollow: boolean;
    tipMaterial: string;
    bestUse: string;
  }
> = {
  solid_steel_basic: {
    attachStrength: 8,
    releaseClean: 5,
    heatRetain: 7,
    controlSpin: 7,
    cost: 3,
    cleanBreak: false,
    forHollow: false,
    tipMaterial: "mild_steel_rod",
    bestUse: "general_transfer_hold",
  },
  hollow_blow_through: {
    attachStrength: 7,
    releaseClean: 5,
    heatRetain: 6,
    controlSpin: 8,
    cost: 5,
    cleanBreak: false,
    forHollow: true,
    tipMaterial: "steel_tube_bore",
    bestUse: "continued_blow_shape",
  },
  cup_punty_attach: {
    attachStrength: 9,
    releaseClean: 7,
    heatRetain: 7,
    controlSpin: 6,
    cost: 6,
    cleanBreak: true,
    forHollow: false,
    tipMaterial: "formed_cup_end",
    bestUse: "large_piece_hold",
  },
  spring_punty_snap: {
    attachStrength: 6,
    releaseClean: 10,
    heatRetain: 5,
    controlSpin: 7,
    cost: 8,
    cleanBreak: true,
    forHollow: false,
    tipMaterial: "spring_loaded_tip",
    bestUse: "clean_snap_release",
  },
  graphite_tip_release: {
    attachStrength: 7,
    releaseClean: 9,
    heatRetain: 8,
    controlSpin: 8,
    cost: 7,
    cleanBreak: true,
    forHollow: false,
    tipMaterial: "graphite_carbon_pad",
    bestUse: "minimal_mark_transfer",
  },
};

export function attachStrength(type: PuntyRodType): number {
  return PUNTY_DATA[type].attachStrength;
}
export function releaseClean(type: PuntyRodType): number {
  return PUNTY_DATA[type].releaseClean;
}
export function heatRetain(type: PuntyRodType): number {
  return PUNTY_DATA[type].heatRetain;
}
export function controlSpin(type: PuntyRodType): number {
  return PUNTY_DATA[type].controlSpin;
}
export function puntyCost(type: PuntyRodType): number {
  return PUNTY_DATA[type].cost;
}
export function cleanBreak(type: PuntyRodType): boolean {
  return PUNTY_DATA[type].cleanBreak;
}
export function forHollow(type: PuntyRodType): boolean {
  return PUNTY_DATA[type].forHollow;
}
export function tipMaterial(type: PuntyRodType): string {
  return PUNTY_DATA[type].tipMaterial;
}
export function bestUse(type: PuntyRodType): string {
  return PUNTY_DATA[type].bestUse;
}
export function puntyRods(): PuntyRodType[] {
  return Object.keys(PUNTY_DATA) as PuntyRodType[];
}
