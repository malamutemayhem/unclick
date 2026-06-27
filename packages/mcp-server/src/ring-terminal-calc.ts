export type RingTerminalType =
  | "insulated_vinyl_ring"
  | "non_insulated_bare_ring"
  | "heat_shrink_ring_seal"
  | "flanged_ring_large"
  | "locking_fork_spade";

const DATA: Record<RingTerminalType, {
  conductivity: number; pulloutResist: number; vibrationSafe: number;
  installSpeed: number; termCost: number; insulated: boolean;
  forHighVibration: boolean; termStyle: string; bestUse: string;
}> = {
  insulated_vinyl_ring: { conductivity: 7, pulloutResist: 8, vibrationSafe: 8, installSpeed: 8, termCost: 1, insulated: true, forHighVibration: true, termStyle: "closed_ring_eye", bestUse: "grounding_lug_attach" },
  non_insulated_bare_ring: { conductivity: 9, pulloutResist: 8, vibrationSafe: 8, installSpeed: 7, termCost: 1, insulated: false, forHighVibration: true, termStyle: "bare_copper_ring", bestUse: "high_current_stud_term" },
  heat_shrink_ring_seal: { conductivity: 8, pulloutResist: 9, vibrationSafe: 9, installSpeed: 5, termCost: 4, insulated: true, forHighVibration: true, termStyle: "shrink_sealed_ring", bestUse: "marine_battery_connect" },
  flanged_ring_large: { conductivity: 8, pulloutResist: 9, vibrationSafe: 7, installSpeed: 6, termCost: 3, insulated: true, forHighVibration: false, termStyle: "funnel_entry_ring", bestUse: "thick_cable_bus_bar" },
  locking_fork_spade: { conductivity: 7, pulloutResist: 5, vibrationSafe: 5, installSpeed: 9, termCost: 1, insulated: true, forHighVibration: false, termStyle: "open_fork_snap", bestUse: "quick_disconnect_term" },
};

const get = (t: RingTerminalType) => DATA[t];

export const conductivity = (t: RingTerminalType) => get(t).conductivity;
export const pulloutResist = (t: RingTerminalType) => get(t).pulloutResist;
export const vibrationSafe = (t: RingTerminalType) => get(t).vibrationSafe;
export const installSpeed = (t: RingTerminalType) => get(t).installSpeed;
export const termCost = (t: RingTerminalType) => get(t).termCost;
export const insulated = (t: RingTerminalType) => get(t).insulated;
export const forHighVibration = (t: RingTerminalType) => get(t).forHighVibration;
export const termStyle = (t: RingTerminalType) => get(t).termStyle;
export const bestUse = (t: RingTerminalType) => get(t).bestUse;
export const ringTerminals = (): RingTerminalType[] => Object.keys(DATA) as RingTerminalType[];
