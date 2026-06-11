export type ShadeControlType =
  | "manual_chain_clutch"
  | "motorized_rf_remote"
  | "automated_solar_track"
  | "integrated_bms_facade"
  | "exterior_louver_wind";

interface ShadeControlData {
  precision: number;
  automation: number;
  energy: number;
  aesthetic: number;
  shCost: number;
  motorized: boolean;
  forFacade: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<ShadeControlType, ShadeControlData> = {
  manual_chain_clutch: {
    precision: 3, automation: 1, energy: 2, aesthetic: 6, shCost: 1,
    motorized: false, forFacade: false,
    drive: "manual_bead_chain_clutch",
    bestUse: "budget_office_window_shade",
  },
  motorized_rf_remote: {
    precision: 7, automation: 6, energy: 5, aesthetic: 8, shCost: 5,
    motorized: true, forFacade: false,
    drive: "tubular_motor_rf_433mhz",
    bestUse: "home_theater_conference_room",
  },
  automated_solar_track: {
    precision: 9, automation: 9, energy: 9, aesthetic: 8, shCost: 7,
    motorized: true, forFacade: false,
    drive: "solar_tracking_sensor_motor",
    bestUse: "daylight_harvesting_office",
  },
  integrated_bms_facade: {
    precision: 10, automation: 10, energy: 10, aesthetic: 9, shCost: 10,
    motorized: true, forFacade: true,
    drive: "bms_bacnet_facade_actuator",
    bestUse: "high_rise_curtain_wall_facade",
  },
  exterior_louver_wind: {
    precision: 7, automation: 8, energy: 8, aesthetic: 7, shCost: 8,
    motorized: true, forFacade: true,
    drive: "exterior_louver_wind_sensor",
    bestUse: "tropical_sun_control_exterior",
  },
};

function get(t: ShadeControlType): ShadeControlData {
  return DATA[t];
}

export const precision = (t: ShadeControlType) => get(t).precision;
export const automation = (t: ShadeControlType) => get(t).automation;
export const energy = (t: ShadeControlType) => get(t).energy;
export const aesthetic = (t: ShadeControlType) => get(t).aesthetic;
export const shCost = (t: ShadeControlType) => get(t).shCost;
export const motorized = (t: ShadeControlType) => get(t).motorized;
export const forFacade = (t: ShadeControlType) => get(t).forFacade;
export const drive = (t: ShadeControlType) => get(t).drive;
export const bestUse = (t: ShadeControlType) => get(t).bestUse;
export const shadeControlTypes = (): ShadeControlType[] =>
  Object.keys(DATA) as ShadeControlType[];
