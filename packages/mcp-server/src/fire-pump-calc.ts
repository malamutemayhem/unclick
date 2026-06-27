export type FirePumpType =
  | "horizontal_split_case"
  | "vertical_turbine_inline"
  | "end_suction_centrifugal"
  | "diesel_engine_driven"
  | "electric_motor_direct";

interface FirePumpData {
  flow: number;
  pressure: number;
  reliability: number;
  maintenance: number;
  fpCost: number;
  selfPowered: boolean;
  forHighRise: boolean;
  driver: string;
  bestUse: string;
}

const DATA: Record<FirePumpType, FirePumpData> = {
  horizontal_split_case: {
    flow: 10, pressure: 8, reliability: 8, maintenance: 7, fpCost: 8,
    selfPowered: false, forHighRise: true,
    driver: "electric_motor_horizontal_shaft",
    bestUse: "large_commercial_high_flow",
  },
  vertical_turbine_inline: {
    flow: 8, pressure: 10, reliability: 8, maintenance: 6, fpCost: 7,
    selfPowered: false, forHighRise: true,
    driver: "electric_motor_vertical_shaft",
    bestUse: "high_rise_limited_space",
  },
  end_suction_centrifugal: {
    flow: 6, pressure: 6, reliability: 7, maintenance: 8, fpCost: 4,
    selfPowered: false, forHighRise: false,
    driver: "electric_motor_close_coupled",
    bestUse: "small_building_light_hazard",
  },
  diesel_engine_driven: {
    flow: 9, pressure: 8, reliability: 10, maintenance: 4, fpCost: 9,
    selfPowered: true, forHighRise: true,
    driver: "diesel_engine_battery_start",
    bestUse: "backup_power_loss_critical",
  },
  electric_motor_direct: {
    flow: 7, pressure: 7, reliability: 7, maintenance: 9, fpCost: 5,
    selfPowered: false, forHighRise: false,
    driver: "electric_motor_direct_drive",
    bestUse: "standard_commercial_primary",
  },
};

function get(t: FirePumpType): FirePumpData {
  return DATA[t];
}

export const flow = (t: FirePumpType) => get(t).flow;
export const pressure = (t: FirePumpType) => get(t).pressure;
export const reliability = (t: FirePumpType) => get(t).reliability;
export const maintenance = (t: FirePumpType) => get(t).maintenance;
export const fpCost = (t: FirePumpType) => get(t).fpCost;
export const selfPowered = (t: FirePumpType) => get(t).selfPowered;
export const forHighRise = (t: FirePumpType) => get(t).forHighRise;
export const driver = (t: FirePumpType) => get(t).driver;
export const bestUse = (t: FirePumpType) => get(t).bestUse;
export const firePumpTypes = (): FirePumpType[] =>
  Object.keys(DATA) as FirePumpType[];
