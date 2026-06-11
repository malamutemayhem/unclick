export type AutopilotType =
  | "single_axis_wing_leveler"
  | "two_axis_pitch_roll"
  | "three_axis_full_auto"
  | "flight_director_coupled"
  | "fly_by_wire_fbw";

const DATA: Record<AutopilotType, {
  authority: number; precision: number; redundancy: number;
  pilotWorkload: number; apCost: number; digital: boolean;
  forAirliner: boolean; control: string; bestUse: string;
}> = {
  single_axis_wing_leveler: {
    authority: 3, precision: 4, redundancy: 2,
    pilotWorkload: 4, apCost: 1, digital: false,
    forAirliner: false, control: "servo_aileron_only",
    bestUse: "light_aircraft_cruise_wing_level",
  },
  two_axis_pitch_roll: {
    authority: 5, precision: 6, redundancy: 3,
    pilotWorkload: 6, apCost: 2, digital: true,
    forAirliner: false, control: "servo_aileron_elevator",
    bestUse: "ga_cross_country_altitude_hold",
  },
  three_axis_full_auto: {
    authority: 8, precision: 8, redundancy: 5,
    pilotWorkload: 8, apCost: 3, digital: true,
    forAirliner: false, control: "servo_all_primary_surfaces",
    bestUse: "turboprop_ifr_approach_coupled",
  },
  flight_director_coupled: {
    authority: 9, precision: 9, redundancy: 8,
    pilotWorkload: 9, apCost: 4, digital: true,
    forAirliner: true, control: "fms_lnav_vnav_autoland",
    bestUse: "transport_cat_iii_autoland",
  },
  fly_by_wire_fbw: {
    authority: 10, precision: 10, redundancy: 10,
    pilotWorkload: 10, apCost: 5, digital: true,
    forAirliner: true, control: "full_electronic_envelope_prot",
    bestUse: "military_fighter_unstable_platform",
  },
};

const get = (t: AutopilotType) => DATA[t];

export const authority = (t: AutopilotType) => get(t).authority;
export const precision = (t: AutopilotType) => get(t).precision;
export const redundancy = (t: AutopilotType) => get(t).redundancy;
export const pilotWorkload = (t: AutopilotType) => get(t).pilotWorkload;
export const apCost = (t: AutopilotType) => get(t).apCost;
export const digital = (t: AutopilotType) => get(t).digital;
export const forAirliner = (t: AutopilotType) => get(t).forAirliner;
export const control = (t: AutopilotType) => get(t).control;
export const bestUse = (t: AutopilotType) => get(t).bestUse;
export const autopilotTypes = (): AutopilotType[] => Object.keys(DATA) as AutopilotType[];
