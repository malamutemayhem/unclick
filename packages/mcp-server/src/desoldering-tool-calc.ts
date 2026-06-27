export type DesolderingToolType =
  | "solder_sucker_pump"
  | "desoldering_braid"
  | "hot_air_rework"
  | "vacuum_desoldering"
  | "desoldering_iron_tip";

const DATA: Record<DesolderingToolType, {
  removalSpeed: number; precision: number; boardSafety: number;
  easeOfUse: number; toolCost: number; powered: boolean;
  forSmd: boolean; heatMethod: string; bestUse: string;
}> = {
  solder_sucker_pump: { removalSpeed: 6, precision: 4, boardSafety: 7, easeOfUse: 9, toolCost: 1, powered: false, forSmd: false, heatMethod: "manual_vacuum_pump", bestUse: "through_hole_quick_pull" },
  desoldering_braid: { removalSpeed: 5, precision: 8, boardSafety: 9, easeOfUse: 7, toolCost: 1, powered: false, forSmd: true, heatMethod: "capillary_wick_absorb", bestUse: "smd_pad_cleanup" },
  hot_air_rework: { removalSpeed: 8, precision: 7, boardSafety: 5, easeOfUse: 5, toolCost: 7, powered: true, forSmd: true, heatMethod: "convective_hot_air", bestUse: "bga_qfp_chip_rework" },
  vacuum_desoldering: { removalSpeed: 9, precision: 6, boardSafety: 8, easeOfUse: 7, toolCost: 8, powered: true, forSmd: false, heatMethod: "heated_tip_vacuum", bestUse: "mass_through_hole_strip" },
  desoldering_iron_tip: { removalSpeed: 7, precision: 5, boardSafety: 6, easeOfUse: 8, toolCost: 3, powered: true, forSmd: false, heatMethod: "hollow_tip_suction", bestUse: "single_pin_extraction" },
};

const get = (t: DesolderingToolType) => DATA[t];

export const removalSpeed = (t: DesolderingToolType) => get(t).removalSpeed;
export const precision = (t: DesolderingToolType) => get(t).precision;
export const boardSafety = (t: DesolderingToolType) => get(t).boardSafety;
export const easeOfUse = (t: DesolderingToolType) => get(t).easeOfUse;
export const toolCost = (t: DesolderingToolType) => get(t).toolCost;
export const powered = (t: DesolderingToolType) => get(t).powered;
export const forSmd = (t: DesolderingToolType) => get(t).forSmd;
export const heatMethod = (t: DesolderingToolType) => get(t).heatMethod;
export const bestUse = (t: DesolderingToolType) => get(t).bestUse;
export const desolderingTools = (): DesolderingToolType[] => Object.keys(DATA) as DesolderingToolType[];
