// parting-tool-calc - wood lathe parting tool types

export type PartingTool =
  | "diamond_parting_narrow"
  | "fluted_parting_standard"
  | "thin_parting_kerf"
  | "bedan_parting_wide"
  | "super_thin_parting";

const DATA: Record<PartingTool, {
  cutClean: number; wasteMinimal: number; controlPlunge: number; durability: number;
  cost: number; forSizing: boolean; forBeginners: boolean; bladeProfile: string; bestUse: string;
}> = {
  diamond_parting_narrow:  { cutClean: 9, wasteMinimal: 8, controlPlunge: 8, durability: 8, cost: 6, forSizing: true, forBeginners: true, bladeProfile: "diamond_cross_section", bestUse: "general_parting_size" },
  fluted_parting_standard: { cutClean: 7, wasteMinimal: 7, controlPlunge: 9, durability: 9, cost: 5, forSizing: true, forBeginners: true, bladeProfile: "fluted_top_channel", bestUse: "standard_part_off" },
  thin_parting_kerf:       { cutClean: 8, wasteMinimal: 10, controlPlunge: 6, durability: 5, cost: 4, forSizing: false, forBeginners: false, bladeProfile: "thin_flat_blade", bestUse: "minimal_waste_cut" },
  bedan_parting_wide:      { cutClean: 6, wasteMinimal: 5, controlPlunge: 7, durability: 10, cost: 7, forSizing: true, forBeginners: false, bladeProfile: "wide_rectangular", bestUse: "heavy_duty_parting" },
  super_thin_parting:      { cutClean: 10, wasteMinimal: 10, controlPlunge: 5, durability: 4, cost: 8, forSizing: false, forBeginners: false, bladeProfile: "ultra_thin_blade", bestUse: "precious_wood_save" },
};

const get = (t: PartingTool) => DATA[t];
export const cutClean = (t: PartingTool) => get(t).cutClean;
export const wasteMinimal = (t: PartingTool) => get(t).wasteMinimal;
export const controlPlunge = (t: PartingTool) => get(t).controlPlunge;
export const durability = (t: PartingTool) => get(t).durability;
export const toolCost = (t: PartingTool) => get(t).cost;
export const forSizing = (t: PartingTool) => get(t).forSizing;
export const forBeginners = (t: PartingTool) => get(t).forBeginners;
export const bladeProfile = (t: PartingTool) => get(t).bladeProfile;
export const bestUse = (t: PartingTool) => get(t).bestUse;
export const partingTools = (): PartingTool[] => Object.keys(DATA) as PartingTool[];
