export type LevelShifterType =
  | "mosfet_bidirectional"
  | "voltage_divider_passive"
  | "buffer_ic_unidirect"
  | "auto_direction_txb"
  | "diode_clamp_simple";

const DATA: Record<LevelShifterType, {
  speedMax: number; channelCount: number; accuracy: number;
  sizeCompact: number; shifterCost: number; bidirectional: boolean;
  autoDirection: boolean; shiftMethod: string; bestUse: string;
}> = {
  mosfet_bidirectional: { speedMax: 6, channelCount: 5, accuracy: 8, sizeCompact: 6, shifterCost: 2, bidirectional: true, autoDirection: false, shiftMethod: "n_mosfet_pull_up", bestUse: "i2c_level_convert" },
  voltage_divider_passive: { speedMax: 4, channelCount: 4, accuracy: 5, sizeCompact: 7, shifterCost: 1, bidirectional: false, autoDirection: false, shiftMethod: "resistor_divider_drop", bestUse: "quick_5v_to_3v3" },
  buffer_ic_unidirect: { speedMax: 8, channelCount: 8, accuracy: 9, sizeCompact: 7, shifterCost: 3, bidirectional: false, autoDirection: false, shiftMethod: "cmos_buffer_translate", bestUse: "spi_bus_level_shift" },
  auto_direction_txb: { speedMax: 9, channelCount: 8, accuracy: 9, sizeCompact: 8, shifterCost: 4, bidirectional: true, autoDirection: true, shiftMethod: "auto_detect_pass_gate", bestUse: "multi_bus_hub_shift" },
  diode_clamp_simple: { speedMax: 3, channelCount: 3, accuracy: 4, sizeCompact: 9, shifterCost: 1, bidirectional: false, autoDirection: false, shiftMethod: "schottky_clamp_limit", bestUse: "one_off_signal_protect" },
};

const get = (t: LevelShifterType) => DATA[t];

export const speedMax = (t: LevelShifterType) => get(t).speedMax;
export const channelCount = (t: LevelShifterType) => get(t).channelCount;
export const accuracy = (t: LevelShifterType) => get(t).accuracy;
export const sizeCompact = (t: LevelShifterType) => get(t).sizeCompact;
export const shifterCost = (t: LevelShifterType) => get(t).shifterCost;
export const bidirectional = (t: LevelShifterType) => get(t).bidirectional;
export const autoDirection = (t: LevelShifterType) => get(t).autoDirection;
export const shiftMethod = (t: LevelShifterType) => get(t).shiftMethod;
export const bestUse = (t: LevelShifterType) => get(t).bestUse;
export const levelShifters = (): LevelShifterType[] => Object.keys(DATA) as LevelShifterType[];
