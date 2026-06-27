export type FlightControlSurfaceType =
  | "aileron_roll_outboard"
  | "elevator_pitch_tail"
  | "rudder_yaw_vertical"
  | "flap_trailing_edge"
  | "spoiler_speed_brake";

const DATA: Record<FlightControlSurfaceType, {
  authority: number; speed: number; drag: number;
  redundancy: number; fsCost: number; primary: boolean;
  forLift: boolean; actuation: string; bestUse: string;
}> = {
  aileron_roll_outboard: {
    authority: 8, speed: 9, drag: 3,
    redundancy: 7, fsCost: 2, primary: true,
    forLift: false, actuation: "hydraulic_servo_hinge",
    bestUse: "roll_control_bank_angle_turn",
  },
  elevator_pitch_tail: {
    authority: 9, speed: 9, drag: 3,
    redundancy: 8, fsCost: 2, primary: true,
    forLift: false, actuation: "hydraulic_servo_balanced",
    bestUse: "pitch_attitude_climb_descend",
  },
  rudder_yaw_vertical: {
    authority: 7, speed: 7, drag: 4,
    redundancy: 6, fsCost: 2, primary: true,
    forLift: false, actuation: "hydraulic_power_limiter",
    bestUse: "yaw_control_crosswind_engine_out",
  },
  flap_trailing_edge: {
    authority: 6, speed: 4, drag: 8,
    redundancy: 5, fsCost: 3, primary: false,
    forLift: true, actuation: "electric_screw_jack_track",
    bestUse: "takeoff_landing_high_lift_config",
  },
  spoiler_speed_brake: {
    authority: 5, speed: 8, drag: 10,
    redundancy: 7, fsCost: 2, primary: false,
    forLift: false, actuation: "hydraulic_panel_upper_wing",
    bestUse: "descent_speed_brake_ground_spoil",
  },
};

const get = (t: FlightControlSurfaceType) => DATA[t];

export const authority = (t: FlightControlSurfaceType) => get(t).authority;
export const speed = (t: FlightControlSurfaceType) => get(t).speed;
export const drag = (t: FlightControlSurfaceType) => get(t).drag;
export const redundancy = (t: FlightControlSurfaceType) => get(t).redundancy;
export const fsCost = (t: FlightControlSurfaceType) => get(t).fsCost;
export const primary = (t: FlightControlSurfaceType) => get(t).primary;
export const forLift = (t: FlightControlSurfaceType) => get(t).forLift;
export const actuation = (t: FlightControlSurfaceType) => get(t).actuation;
export const bestUse = (t: FlightControlSurfaceType) => get(t).bestUse;
export const flightControlSurfaceTypes = (): FlightControlSurfaceType[] => Object.keys(DATA) as FlightControlSurfaceType[];
