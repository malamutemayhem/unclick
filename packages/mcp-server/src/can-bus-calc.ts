export type CanBusType =
  | "classic_can_2a"
  | "can_fd_flexible"
  | "can_xl_extended"
  | "lin_bus_sub"
  | "j1939_heavy_vehicle";

const DATA: Record<CanBusType, {
  dataRate: number; payloadSize: number; nodeCount: number;
  faultTolerance: number; busCost: number; fdCapable: boolean;
  forAutomotive: boolean; frameType: string; bestUse: string;
}> = {
  classic_can_2a: { dataRate: 4, payloadSize: 3, nodeCount: 8, faultTolerance: 8, busCost: 2, fdCapable: false, forAutomotive: true, frameType: "standard_11bit_8byte", bestUse: "body_control_module" },
  can_fd_flexible: { dataRate: 8, payloadSize: 8, nodeCount: 8, faultTolerance: 8, busCost: 3, fdCapable: true, forAutomotive: true, frameType: "flexible_64byte_fast", bestUse: "adas_firmware_update" },
  can_xl_extended: { dataRate: 10, payloadSize: 10, nodeCount: 7, faultTolerance: 8, busCost: 5, fdCapable: true, forAutomotive: true, frameType: "extended_2048byte_xl", bestUse: "next_gen_vehicle_ethernet" },
  lin_bus_sub: { dataRate: 1, payloadSize: 2, nodeCount: 5, faultTolerance: 4, busCost: 1, fdCapable: false, forAutomotive: true, frameType: "single_wire_master", bestUse: "window_seat_mirror_ctrl" },
  j1939_heavy_vehicle: { dataRate: 4, payloadSize: 4, nodeCount: 9, faultTolerance: 9, busCost: 4, fdCapable: false, forAutomotive: true, frameType: "extended_29bit_pgn", bestUse: "truck_tractor_fleet" },
};

const get = (t: CanBusType) => DATA[t];

export const dataRate = (t: CanBusType) => get(t).dataRate;
export const payloadSize = (t: CanBusType) => get(t).payloadSize;
export const nodeCount = (t: CanBusType) => get(t).nodeCount;
export const faultTolerance = (t: CanBusType) => get(t).faultTolerance;
export const busCost = (t: CanBusType) => get(t).busCost;
export const fdCapable = (t: CanBusType) => get(t).fdCapable;
export const forAutomotive = (t: CanBusType) => get(t).forAutomotive;
export const frameType = (t: CanBusType) => get(t).frameType;
export const bestUse = (t: CanBusType) => get(t).bestUse;
export const canBuses = (): CanBusType[] => Object.keys(DATA) as CanBusType[];
