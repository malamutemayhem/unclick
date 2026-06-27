export type IgbtModule =
  | "single_switch"
  | "half_bridge_leg"
  | "six_pack_3phase"
  | "chopper_brake"
  | "npc_3level";

const DATA: Record<IgbtModule, {
  voltageRating: number; currentRating: number; switchingSpeed: number;
  thermalRes: number; moduleCost: number; antiParallel: boolean;
  forInverter: boolean; packageType: string; bestUse: string;
}> = {
  single_switch: {
    voltageRating: 5, currentRating: 4, switchingSpeed: 8,
    thermalRes: 6, moduleCost: 2, antiParallel: false,
    forInverter: false, packageType: "to_247_discrete",
    bestUse: "welding_power_supply",
  },
  half_bridge_leg: {
    voltageRating: 7, currentRating: 7, switchingSpeed: 7,
    thermalRes: 5, moduleCost: 5, antiParallel: true,
    forInverter: true, packageType: "econopack_baseplate",
    bestUse: "servo_drive_axis",
  },
  six_pack_3phase: {
    voltageRating: 8, currentRating: 8, switchingSpeed: 6,
    thermalRes: 4, moduleCost: 7, antiParallel: true,
    forInverter: true, packageType: "62mm_industry_std",
    bestUse: "ac_motor_vfd",
  },
  chopper_brake: {
    voltageRating: 6, currentRating: 5, switchingSpeed: 9,
    thermalRes: 7, moduleCost: 3, antiParallel: false,
    forInverter: false, packageType: "semitop_pressure",
    bestUse: "regenerative_braking",
  },
  npc_3level: {
    voltageRating: 10, currentRating: 9, switchingSpeed: 5,
    thermalRes: 3, moduleCost: 9, antiParallel: true,
    forInverter: true, packageType: "primepack_press_fit",
    bestUse: "mw_wind_converter",
  },
};

const get = (t: IgbtModule) => DATA[t];

export const voltageRating = (t: IgbtModule) => get(t).voltageRating;
export const currentRating = (t: IgbtModule) => get(t).currentRating;
export const switchingSpeed = (t: IgbtModule) => get(t).switchingSpeed;
export const thermalRes = (t: IgbtModule) => get(t).thermalRes;
export const moduleCost = (t: IgbtModule) => get(t).moduleCost;
export const antiParallel = (t: IgbtModule) => get(t).antiParallel;
export const forInverter = (t: IgbtModule) => get(t).forInverter;
export const packageType = (t: IgbtModule) => get(t).packageType;
export const bestUse = (t: IgbtModule) => get(t).bestUse;
export const igbtModules = (): IgbtModule[] => Object.keys(DATA) as IgbtModule[];
