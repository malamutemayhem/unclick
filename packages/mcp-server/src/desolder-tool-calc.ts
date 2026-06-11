// desolder-tool-calc - desoldering tool types

export type DesolderTool =
  | "solder_sucker_manual"
  | "desoldering_braid_wick"
  | "vacuum_desolder_station"
  | "hot_air_rework_gun"
  | "spring_loaded_pump";

const DATA: Record<DesolderTool, {
  suctionPower: number; precision: number; speedWork: number; durability: number;
  cost: number; powered: boolean; forSmd: boolean; removalMethod: string; bestUse: string;
}> = {
  solder_sucker_manual:     { suctionPower: 6, precision: 5, speedWork: 7, durability: 7, cost: 1, powered: false, forSmd: false, removalMethod: "manual_plunger_vacuum", bestUse: "quick_through_hole" },
  desoldering_braid_wick:   { suctionPower: 4, precision: 9, speedWork: 5, durability: 3, cost: 2, powered: false, forSmd: true, removalMethod: "capillary_wick_absorb", bestUse: "precision_pad_clean" },
  vacuum_desolder_station:  { suctionPower: 10, precision: 8, speedWork: 9, durability: 9, cost: 9, powered: true, forSmd: false, removalMethod: "heated_vacuum_extract", bestUse: "production_desolder" },
  hot_air_rework_gun:       { suctionPower: 3, precision: 7, speedWork: 8, durability: 8, cost: 7, powered: true, forSmd: true, removalMethod: "hot_air_reflow_lift", bestUse: "smd_rework_reflow" },
  spring_loaded_pump:       { suctionPower: 7, precision: 6, speedWork: 8, durability: 6, cost: 3, powered: false, forSmd: false, removalMethod: "spring_piston_vacuum", bestUse: "general_hobby_desolder" },
};

const get = (t: DesolderTool) => DATA[t];
export const suctionPower = (t: DesolderTool) => get(t).suctionPower;
export const precision = (t: DesolderTool) => get(t).precision;
export const speedWork = (t: DesolderTool) => get(t).speedWork;
export const durability = (t: DesolderTool) => get(t).durability;
export const toolCost = (t: DesolderTool) => get(t).cost;
export const powered = (t: DesolderTool) => get(t).powered;
export const forSmd = (t: DesolderTool) => get(t).forSmd;
export const removalMethod = (t: DesolderTool) => get(t).removalMethod;
export const bestUse = (t: DesolderTool) => get(t).bestUse;
export const desolderTools = (): DesolderTool[] => Object.keys(DATA) as DesolderTool[];
