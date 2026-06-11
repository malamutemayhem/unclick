export type BoostConverter =
  | "classic_async_boost"
  | "sync_boost_low_vin"
  | "sepic_buckboost"
  | "charge_pump_doubler"
  | "flyback_isolated_boost";

const DATA: Record<BoostConverter, {
  efficiency: number; outputPower: number; startupVoltage: number;
  regulation: number; boostCost: number; isolated: boolean;
  forBattery: boolean; topology: string; bestUse: string;
}> = {
  classic_async_boost: {
    efficiency: 7, outputPower: 7, startupVoltage: 5,
    regulation: 6, boostCost: 3, isolated: false,
    forBattery: false, topology: "inductor_diode_boost",
    bestUse: "led_backlight_driver",
  },
  sync_boost_low_vin: {
    efficiency: 9, outputPower: 5, startupVoltage: 10,
    regulation: 7, boostCost: 5, isolated: false,
    forBattery: true, topology: "sync_fet_boost",
    bestUse: "energy_harvest_solar",
  },
  sepic_buckboost: {
    efficiency: 6, outputPower: 6, startupVoltage: 6,
    regulation: 8, boostCost: 6, isolated: false,
    forBattery: true, topology: "coupled_inductor_sepic",
    bestUse: "li_ion_to_3v3_rail",
  },
  charge_pump_doubler: {
    efficiency: 8, outputPower: 3, startupVoltage: 7,
    regulation: 4, boostCost: 2, isolated: false,
    forBattery: true, topology: "switched_cap_2x",
    bestUse: "gate_drive_bootstrap",
  },
  flyback_isolated_boost: {
    efficiency: 7, outputPower: 9, startupVoltage: 4,
    regulation: 9, boostCost: 7, isolated: true,
    forBattery: false, topology: "transformer_flyback",
    bestUse: "poe_pd_isolated_output",
  },
};

const get = (t: BoostConverter) => DATA[t];

export const efficiency = (t: BoostConverter) => get(t).efficiency;
export const outputPower = (t: BoostConverter) => get(t).outputPower;
export const startupVoltage = (t: BoostConverter) => get(t).startupVoltage;
export const regulation = (t: BoostConverter) => get(t).regulation;
export const boostCost = (t: BoostConverter) => get(t).boostCost;
export const isolated = (t: BoostConverter) => get(t).isolated;
export const forBattery = (t: BoostConverter) => get(t).forBattery;
export const topology = (t: BoostConverter) => get(t).topology;
export const bestUse = (t: BoostConverter) => get(t).bestUse;
export const boostConverters = (): BoostConverter[] => Object.keys(DATA) as BoostConverter[];
