export type ShipCraneType =
  | "knuckle_boom"
  | "stiff_boom"
  | "gantry_container"
  | "offshore_pedestal"
  | "bulk_grab";

interface ShipCraneData {
  liftCapacity: number;
  reach: number;
  speed: number;
  stability: number;
  scCost: number;
  heaveCompensated: boolean;
  forContainer: boolean;
  boom: string;
  bestUse: string;
}

const DATA: Record<ShipCraneType, ShipCraneData> = {
  knuckle_boom: {
    liftCapacity: 6, reach: 8, speed: 7, stability: 7, scCost: 6,
    heaveCompensated: false, forContainer: false,
    boom: "articulated_knuckle_folding_boom_compact_stow_hydraulic",
    bestUse: "general_cargo_vessel_deck_stores_provision_multipurpose",
  },
  stiff_boom: {
    liftCapacity: 8, reach: 9, speed: 6, stability: 8, scCost: 7,
    heaveCompensated: false, forContainer: true,
    boom: "rigid_telescopic_boom_wire_luffing_heavy_lift_capacity",
    bestUse: "heavy_lift_vessel_project_cargo_breakbulk_self_unloading",
  },
  gantry_container: {
    liftCapacity: 9, reach: 10, speed: 10, stability: 9, scCost: 10,
    heaveCompensated: false, forContainer: true,
    boom: "rail_mounted_gantry_trolley_spreader_container_stack",
    bestUse: "container_terminal_ship_to_shore_quay_crane_port_handling",
  },
  offshore_pedestal: {
    liftCapacity: 10, reach: 7, speed: 5, stability: 10, scCost: 10,
    heaveCompensated: true, forContainer: false,
    boom: "pedestal_mounted_heave_compensated_active_motion_control",
    bestUse: "offshore_platform_supply_vessel_subsea_lift_rig_supply",
  },
  bulk_grab: {
    liftCapacity: 7, reach: 8, speed: 8, stability: 7, scCost: 5,
    heaveCompensated: false, forContainer: false,
    boom: "clamshell_grab_bucket_wire_rope_bulk_discharge_loading",
    bestUse: "bulk_carrier_self_unloading_coal_grain_aggregate_grab",
  },
};

function get(t: ShipCraneType): ShipCraneData {
  return DATA[t];
}

export const liftCapacity = (t: ShipCraneType) => get(t).liftCapacity;
export const reach = (t: ShipCraneType) => get(t).reach;
export const speed = (t: ShipCraneType) => get(t).speed;
export const stability = (t: ShipCraneType) => get(t).stability;
export const scCost = (t: ShipCraneType) => get(t).scCost;
export const heaveCompensated = (t: ShipCraneType) => get(t).heaveCompensated;
export const forContainer = (t: ShipCraneType) => get(t).forContainer;
export const boom = (t: ShipCraneType) => get(t).boom;
export const bestUse = (t: ShipCraneType) => get(t).bestUse;
export const shipCraneTypes = (): ShipCraneType[] =>
  Object.keys(DATA) as ShipCraneType[];
