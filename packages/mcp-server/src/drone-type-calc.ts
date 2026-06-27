export type DroneType =
  | "multirotor_quad_electric"
  | "fixed_wing_vtol_hybrid"
  | "single_rotor_heli"
  | "fixed_wing_catapult"
  | "tethered_persistent_obs";

const DATA: Record<DroneType, {
  endurance: number; payload: number; speed: number;
  hover: number; drCost: number; vtol: boolean;
  forMapping: boolean; propulsion: string; bestUse: string;
}> = {
  multirotor_quad_electric: {
    endurance: 4, payload: 5, speed: 5,
    hover: 10, drCost: 2, vtol: true,
    forMapping: true, propulsion: "brushless_dc_prop",
    bestUse: "aerial_photography_inspection",
  },
  fixed_wing_vtol_hybrid: {
    endurance: 8, payload: 6, speed: 8,
    hover: 7, drCost: 4, vtol: true,
    forMapping: true, propulsion: "tilt_rotor_transition",
    bestUse: "long_range_corridor_survey",
  },
  single_rotor_heli: {
    endurance: 6, payload: 9, speed: 7,
    hover: 9, drCost: 5, vtol: true,
    forMapping: false, propulsion: "collective_pitch_rotor",
    bestUse: "heavy_lift_cargo_delivery",
  },
  fixed_wing_catapult: {
    endurance: 10, payload: 4, speed: 9,
    hover: 1, drCost: 3, vtol: false,
    forMapping: true, propulsion: "pusher_prop_electric",
    bestUse: "large_area_agricultural_survey",
  },
  tethered_persistent_obs: {
    endurance: 10, payload: 3, speed: 1,
    hover: 10, drCost: 3, vtol: true,
    forMapping: false, propulsion: "tethered_power_line",
    bestUse: "persistent_security_overwatch",
  },
};

const get = (t: DroneType) => DATA[t];

export const endurance = (t: DroneType) => get(t).endurance;
export const payload = (t: DroneType) => get(t).payload;
export const speed = (t: DroneType) => get(t).speed;
export const hover = (t: DroneType) => get(t).hover;
export const drCost = (t: DroneType) => get(t).drCost;
export const vtol = (t: DroneType) => get(t).vtol;
export const forMapping = (t: DroneType) => get(t).forMapping;
export const propulsion = (t: DroneType) => get(t).propulsion;
export const bestUse = (t: DroneType) => get(t).bestUse;
export const droneTypes = (): DroneType[] => Object.keys(DATA) as DroneType[];
