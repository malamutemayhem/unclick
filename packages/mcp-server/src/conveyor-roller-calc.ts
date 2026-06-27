export type ConveyorRollerType =
  | "gravity_roller_line"
  | "belt_driven_roller"
  | "chain_driven_pallet"
  | "lineshaft_poly_v"
  | "motorized_roller_mdr";

interface ConveyorRollerData {
  throughput: number;
  loadCapacity: number;
  accumulation: number;
  noiseLevel: number;
  crCost_: number;
  powered: boolean;
  forHeavyLoad: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<ConveyorRollerType, ConveyorRollerData> = {
  gravity_roller_line: {
    throughput: 5, loadCapacity: 6, accumulation: 8, noiseLevel: 3, crCost_: 2,
    powered: false, forHeavyLoad: false,
    drive: "gravity_slope_manual_push_no_motor_needed",
    bestUse: "shipping_dock_packing_line_carton_flow_rack",
  },
  belt_driven_roller: {
    throughput: 8, loadCapacity: 7, accumulation: 7, noiseLevel: 4, crCost_: 6,
    powered: true, forHeavyLoad: false,
    drive: "belt_under_roller_contact_friction_single_motor",
    bestUse: "distribution_center_sortation_line_parcel_merge",
  },
  chain_driven_pallet: {
    throughput: 7, loadCapacity: 10, accumulation: 5, noiseLevel: 7, crCost_: 8,
    powered: true, forHeavyLoad: true,
    drive: "roller_chain_sprocket_positive_drive_heavy_duty",
    bestUse: "pallet_handling_heavy_manufacturing_paint_line",
  },
  lineshaft_poly_v: {
    throughput: 7, loadCapacity: 6, accumulation: 9, noiseLevel: 4, crCost_: 5,
    powered: true, forHeavyLoad: false,
    drive: "common_shaft_poly_v_belt_spool_each_roller",
    bestUse: "warehouse_order_picking_zone_accumulation_line",
  },
  motorized_roller_mdr: {
    throughput: 9, loadCapacity: 7, accumulation: 10, noiseLevel: 2, crCost_: 7,
    powered: true, forHeavyLoad: false,
    drive: "brushless_dc_motor_inside_roller_24v_zone_card",
    bestUse: "ecommerce_fulfillment_zero_pressure_accumulation",
  },
};

function get(t: ConveyorRollerType): ConveyorRollerData {
  return DATA[t];
}

export const throughput = (t: ConveyorRollerType) => get(t).throughput;
export const loadCapacity = (t: ConveyorRollerType) => get(t).loadCapacity;
export const accumulation = (t: ConveyorRollerType) => get(t).accumulation;
export const noiseLevel = (t: ConveyorRollerType) => get(t).noiseLevel;
export const crCost_ = (t: ConveyorRollerType) => get(t).crCost_;
export const powered = (t: ConveyorRollerType) => get(t).powered;
export const forHeavyLoad = (t: ConveyorRollerType) => get(t).forHeavyLoad;
export const drive = (t: ConveyorRollerType) => get(t).drive;
export const bestUse = (t: ConveyorRollerType) => get(t).bestUse;
export const conveyorRollerTypes = (): ConveyorRollerType[] =>
  Object.keys(DATA) as ConveyorRollerType[];
