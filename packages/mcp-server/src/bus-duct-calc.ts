export type BusDuctType =
  | "feeder_nonsegregated"
  | "plug_in_tap_off"
  | "segregated_phase_barrier"
  | "isolated_phase_ipb"
  | "lighting_track_trolley";

interface BusDuctData {
  capacity: number;
  flexibility: number;
  safety: number;
  installEase: number;
  bdCost: number;
  tapOff: boolean;
  forHighVoltage: boolean;
  conductor: string;
  bestUse: string;
}

const DATA: Record<BusDuctType, BusDuctData> = {
  feeder_nonsegregated: {
    capacity: 8, flexibility: 4, safety: 7, installEase: 7, bdCost: 5,
    tapOff: false, forHighVoltage: false,
    conductor: "copper_aluminum_bar_enclosed",
    bestUse: "main_feeder_run_switchgear",
  },
  plug_in_tap_off: {
    capacity: 7, flexibility: 10, safety: 7, installEase: 8, bdCost: 6,
    tapOff: true, forHighVoltage: false,
    conductor: "copper_bar_plug_in_opening",
    bestUse: "manufacturing_floor_flexible",
  },
  segregated_phase_barrier: {
    capacity: 9, flexibility: 3, safety: 9, installEase: 5, bdCost: 8,
    tapOff: false, forHighVoltage: true,
    conductor: "copper_bar_phase_barriers",
    bestUse: "industrial_medium_voltage",
  },
  isolated_phase_ipb: {
    capacity: 10, flexibility: 2, safety: 10, installEase: 3, bdCost: 10,
    tapOff: false, forHighVoltage: true,
    conductor: "aluminum_tube_isolated_phase",
    bestUse: "power_plant_generator_connect",
  },
  lighting_track_trolley: {
    capacity: 3, flexibility: 9, safety: 6, installEase: 9, bdCost: 3,
    tapOff: true, forHighVoltage: false,
    conductor: "copper_strip_track_channel",
    bestUse: "retail_display_lighting_track",
  },
};

function get(t: BusDuctType): BusDuctData {
  return DATA[t];
}

export const capacity = (t: BusDuctType) => get(t).capacity;
export const flexibility = (t: BusDuctType) => get(t).flexibility;
export const safety = (t: BusDuctType) => get(t).safety;
export const installEase = (t: BusDuctType) => get(t).installEase;
export const bdCost = (t: BusDuctType) => get(t).bdCost;
export const tapOff = (t: BusDuctType) => get(t).tapOff;
export const forHighVoltage = (t: BusDuctType) => get(t).forHighVoltage;
export const conductor = (t: BusDuctType) => get(t).conductor;
export const bestUse = (t: BusDuctType) => get(t).bestUse;
export const busDuctTypes = (): BusDuctType[] =>
  Object.keys(DATA) as BusDuctType[];
