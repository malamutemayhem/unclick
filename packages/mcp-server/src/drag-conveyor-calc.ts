export type DragConveyorType =
  | "paddle_drag_standard"
  | "chain_drag_submerged"
  | "cable_drag_tubular"
  | "reclaim_drag_silo"
  | "dewatering_drag_screen";

interface DragConveyorData {
  capacity: number;
  gentleness: number;
  sealability: number;
  multiInlet: number;
  dgCost: number;
  submerged: boolean;
  forBulkReclaim: boolean;
  flight: string;
  bestUse: string;
}

const DATA: Record<DragConveyorType, DragConveyorData> = {
  paddle_drag_standard: {
    capacity: 8, gentleness: 6, sealability: 7, multiInlet: 8, dgCost: 4,
    submerged: false, forBulkReclaim: false,
    flight: "paddle_flight_welded_chain_open_trough",
    bestUse: "wood_chip_grain_biomass_horizontal_drag",
  },
  chain_drag_submerged: {
    capacity: 7, gentleness: 5, sealability: 9, multiInlet: 7, dgCost: 6,
    submerged: true, forBulkReclaim: false,
    flight: "chain_flight_submerged_liquid_surface_skim",
    bestUse: "wastewater_surface_skim_sludge_collector",
  },
  cable_drag_tubular: {
    capacity: 5, gentleness: 10, sealability: 10, multiInlet: 9, dgCost: 7,
    submerged: false, forBulkReclaim: false,
    flight: "cable_disc_puck_enclosed_tube_gentle_transport",
    bestUse: "fragile_snack_pet_food_coffee_bean_gentle",
  },
  reclaim_drag_silo: {
    capacity: 9, gentleness: 4, sealability: 6, multiInlet: 6, dgCost: 5,
    submerged: false, forBulkReclaim: true,
    flight: "heavy_chain_flight_silo_bottom_live_reclaim",
    bestUse: "silo_bin_reclaim_coal_limestone_stockpile",
  },
  dewatering_drag_screen: {
    capacity: 7, gentleness: 5, sealability: 5, multiInlet: 5, dgCost: 6,
    submerged: true, forBulkReclaim: false,
    flight: "perforated_flight_screen_bottom_liquid_drain",
    bestUse: "chip_swarf_coolant_separation_metal_reclaim",
  },
};

function get(t: DragConveyorType): DragConveyorData {
  return DATA[t];
}

export const capacity = (t: DragConveyorType) => get(t).capacity;
export const gentleness = (t: DragConveyorType) => get(t).gentleness;
export const sealability = (t: DragConveyorType) => get(t).sealability;
export const multiInlet = (t: DragConveyorType) => get(t).multiInlet;
export const dgCost = (t: DragConveyorType) => get(t).dgCost;
export const submerged = (t: DragConveyorType) => get(t).submerged;
export const forBulkReclaim = (t: DragConveyorType) => get(t).forBulkReclaim;
export const flight = (t: DragConveyorType) => get(t).flight;
export const bestUse = (t: DragConveyorType) => get(t).bestUse;
export const dragConveyorTypes = (): DragConveyorType[] =>
  Object.keys(DATA) as DragConveyorType[];
