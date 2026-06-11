export type CondensatePumpType =
  | "centrifugal_electric_return"
  | "pressure_powered_steam"
  | "mini_split_ac_lift"
  | "duplex_alternating"
  | "vacuum_deaerating";

interface CondensatePumpData {
  capacity: number;
  reliability: number;
  efficiency: number;
  maintenance: number;
  cpCost: number;
  redundant: boolean;
  forSteam: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<CondensatePumpType, CondensatePumpData> = {
  centrifugal_electric_return: {
    capacity: 7, reliability: 8, efficiency: 7, maintenance: 6, cpCost: 5,
    redundant: false, forSteam: true,
    drive: "electric_motor_centrifugal",
    bestUse: "steam_system_condensate_return",
  },
  pressure_powered_steam: {
    capacity: 8, reliability: 9, efficiency: 9, maintenance: 8, cpCost: 7,
    redundant: false, forSteam: true,
    drive: "steam_pressure_mechanical_trap",
    bestUse: "high_pressure_steam_plant",
  },
  mini_split_ac_lift: {
    capacity: 3, reliability: 7, efficiency: 6, maintenance: 5, cpCost: 2,
    redundant: false, forSteam: false,
    drive: "small_electric_float_switch",
    bestUse: "ac_condensate_removal_lift",
  },
  duplex_alternating: {
    capacity: 9, reliability: 10, efficiency: 7, maintenance: 7, cpCost: 8,
    redundant: true, forSteam: true,
    drive: "duplex_alternating_controller",
    bestUse: "critical_steam_loop_hospital",
  },
  vacuum_deaerating: {
    capacity: 10, reliability: 9, efficiency: 10, maintenance: 9, cpCost: 10,
    redundant: true, forSteam: true,
    drive: "vacuum_pump_deaerator_tank",
    bestUse: "boiler_feedwater_deaeration",
  },
};

function get(t: CondensatePumpType): CondensatePumpData {
  return DATA[t];
}

export const capacity = (t: CondensatePumpType) => get(t).capacity;
export const reliability = (t: CondensatePumpType) => get(t).reliability;
export const efficiency = (t: CondensatePumpType) => get(t).efficiency;
export const maintenance = (t: CondensatePumpType) => get(t).maintenance;
export const cpCost = (t: CondensatePumpType) => get(t).cpCost;
export const redundant = (t: CondensatePumpType) => get(t).redundant;
export const forSteam = (t: CondensatePumpType) => get(t).forSteam;
export const drive = (t: CondensatePumpType) => get(t).drive;
export const bestUse = (t: CondensatePumpType) => get(t).bestUse;
export const condensatePumpTypes = (): CondensatePumpType[] =>
  Object.keys(DATA) as CondensatePumpType[];
