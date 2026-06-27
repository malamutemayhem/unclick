export type PickListType =
  | "sequential_ref_des"
  | "feeder_optimized"
  | "component_grouped"
  | "placement_ordered"
  | "reel_location_map";

const DATA: Record<PickListType, {
  setupSpeed: number; pickEfficiency: number; traceability: number;
  errorReduction: number; listCost: number; machineReady: boolean;
  forHighVol: boolean; sortMethod: string; bestUse: string;
}> = {
  sequential_ref_des: { setupSpeed: 5, pickEfficiency: 4, traceability: 8, errorReduction: 5, listCost: 1, machineReady: false, forHighVol: false, sortMethod: "ref_designator_alpha", bestUse: "manual_assembly_checklist" },
  feeder_optimized: { setupSpeed: 9, pickEfficiency: 10, traceability: 7, errorReduction: 8, listCost: 4, machineReady: true, forHighVol: true, sortMethod: "feeder_slot_order", bestUse: "pick_place_machine_setup" },
  component_grouped: { setupSpeed: 7, pickEfficiency: 7, traceability: 6, errorReduction: 7, listCost: 2, machineReady: false, forHighVol: false, sortMethod: "part_number_group", bestUse: "kit_preparation_staging" },
  placement_ordered: { setupSpeed: 6, pickEfficiency: 8, traceability: 5, errorReduction: 9, listCost: 3, machineReady: true, forHighVol: true, sortMethod: "board_xy_sequence", bestUse: "optimized_place_path" },
  reel_location_map: { setupSpeed: 10, pickEfficiency: 9, traceability: 9, errorReduction: 10, listCost: 5, machineReady: true, forHighVol: true, sortMethod: "warehouse_bin_location", bestUse: "smart_factory_inventory" },
};

const get = (t: PickListType) => DATA[t];

export const setupSpeed = (t: PickListType) => get(t).setupSpeed;
export const pickEfficiency = (t: PickListType) => get(t).pickEfficiency;
export const traceability = (t: PickListType) => get(t).traceability;
export const errorReduction = (t: PickListType) => get(t).errorReduction;
export const listCost = (t: PickListType) => get(t).listCost;
export const machineReady = (t: PickListType) => get(t).machineReady;
export const forHighVol = (t: PickListType) => get(t).forHighVol;
export const sortMethod = (t: PickListType) => get(t).sortMethod;
export const bestUse = (t: PickListType) => get(t).bestUse;
export const pickLists = (): PickListType[] => Object.keys(DATA) as PickListType[];
