export type SumpPumpType =
  | "submersible_pedestal_basin"
  | "pedestal_column_above"
  | "battery_backup_dc_float"
  | "water_powered_venturi"
  | "sewage_ejector_grinder";

interface SumpPumpData {
  capacity: number;
  head: number;
  reliability: number;
  noise: number;
  spCost: number;
  submersible: boolean;
  forBasement: boolean;
  motor: string;
  bestUse: string;
}

const DATA: Record<SumpPumpType, SumpPumpData> = {
  submersible_pedestal_basin: {
    capacity: 8, head: 7, reliability: 8, noise: 9, spCost: 5,
    submersible: true, forBasement: true,
    motor: "sealed_submersible_electric",
    bestUse: "basement_sump_pit_ground_water",
  },
  pedestal_column_above: {
    capacity: 7, head: 6, reliability: 7, noise: 4, spCost: 3,
    submersible: false, forBasement: true,
    motor: "above_water_pedestal_column",
    bestUse: "shallow_sump_easy_service_access",
  },
  battery_backup_dc_float: {
    capacity: 5, head: 5, reliability: 9, noise: 7, spCost: 7,
    submersible: true, forBasement: true,
    motor: "dc_battery_charger_float_switch",
    bestUse: "backup_power_outage_storm_flood",
  },
  water_powered_venturi: {
    capacity: 4, head: 4, reliability: 10, noise: 6, spCost: 4,
    submersible: false, forBasement: true,
    motor: "no_motor_municipal_water_venturi",
    bestUse: "no_electric_backup_municipal_water",
  },
  sewage_ejector_grinder: {
    capacity: 9, head: 9, reliability: 7, noise: 5, spCost: 8,
    submersible: true, forBasement: true,
    motor: "grinder_impeller_sealed_motor",
    bestUse: "below_sewer_line_bathroom_laundry",
  },
};

function get(t: SumpPumpType): SumpPumpData {
  return DATA[t];
}

export const capacity = (t: SumpPumpType) => get(t).capacity;
export const head = (t: SumpPumpType) => get(t).head;
export const reliability = (t: SumpPumpType) => get(t).reliability;
export const noise = (t: SumpPumpType) => get(t).noise;
export const spCost = (t: SumpPumpType) => get(t).spCost;
export const submersible = (t: SumpPumpType) => get(t).submersible;
export const forBasement = (t: SumpPumpType) => get(t).forBasement;
export const motor = (t: SumpPumpType) => get(t).motor;
export const bestUse = (t: SumpPumpType) => get(t).bestUse;
export const sumpPumpTypes = (): SumpPumpType[] =>
  Object.keys(DATA) as SumpPumpType[];
