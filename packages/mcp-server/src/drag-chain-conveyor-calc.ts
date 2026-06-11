export type DragChainConveyorType =
  | "en_masse"
  | "tubular_drag"
  | "paddle_flight"
  | "scraper_reclaim"
  | "submerged_redler";

interface DragChainConveyorData {
  capacity: number;
  chainSpeed: number;
  wearResistance: number;
  sealIntegrity: number;
  dccCost: number;
  enclosed: boolean;
  forBulkSolid: boolean;
  flightType: string;
  bestUse: string;
}

const DATA: Record<DragChainConveyorType, DragChainConveyorData> = {
  en_masse: {
    capacity: 9, chainSpeed: 7, wearResistance: 8, sealIntegrity: 9, dccCost: 7,
    enclosed: true, forBulkSolid: true,
    flightType: "skeleton_flight_material_self_level_full_cross_section_flow",
    bestUse: "grain_elevator_cement_silo_enclosed_dust_free_bulk_transfer",
  },
  tubular_drag: {
    capacity: 6, chainSpeed: 6, wearResistance: 7, sealIntegrity: 10, dccCost: 8,
    enclosed: true, forBulkSolid: true,
    flightType: "disc_puck_on_chain_inside_tube_gentle_3d_routing_flexible",
    bestUse: "food_processing_chemical_powder_gentle_handling_multi_inlet",
  },
  paddle_flight: {
    capacity: 8, chainSpeed: 8, wearResistance: 6, sealIntegrity: 7, dccCost: 5,
    enclosed: true, forBulkSolid: true,
    flightType: "flat_paddle_push_material_along_trough_bottom_simple_design",
    bestUse: "ash_handling_wood_chip_sawdust_boiler_bottom_feed_collect",
  },
  scraper_reclaim: {
    capacity: 10, chainSpeed: 7, wearResistance: 9, sealIntegrity: 5, dccCost: 6,
    enclosed: false, forBulkSolid: true,
    flightType: "heavy_scraper_blade_drag_stockpile_reclaim_hopper_feed",
    bestUse: "coal_yard_stockpile_reclaim_port_terminal_bulk_aggregate",
  },
  submerged_redler: {
    capacity: 7, chainSpeed: 5, wearResistance: 8, sealIntegrity: 9, dccCost: 7,
    enclosed: true, forBulkSolid: true,
    flightType: "submerged_chain_flight_in_casing_vertical_horizontal_combo",
    bestUse: "fly_ash_bottom_ash_hot_clinker_submerged_water_cooled_convey",
  },
};

function get(t: DragChainConveyorType): DragChainConveyorData {
  return DATA[t];
}

export const capacity = (t: DragChainConveyorType) => get(t).capacity;
export const chainSpeed = (t: DragChainConveyorType) => get(t).chainSpeed;
export const wearResistance = (t: DragChainConveyorType) => get(t).wearResistance;
export const sealIntegrity = (t: DragChainConveyorType) => get(t).sealIntegrity;
export const dccCost = (t: DragChainConveyorType) => get(t).dccCost;
export const enclosed = (t: DragChainConveyorType) => get(t).enclosed;
export const forBulkSolid = (t: DragChainConveyorType) => get(t).forBulkSolid;
export const flightType = (t: DragChainConveyorType) => get(t).flightType;
export const bestUse = (t: DragChainConveyorType) => get(t).bestUse;
export const dragChainConveyorTypes = (): DragChainConveyorType[] =>
  Object.keys(DATA) as DragChainConveyorType[];
