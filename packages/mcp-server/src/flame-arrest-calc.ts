export type FlameArrestType =
  | "deflagration_inline"
  | "detonation_inline"
  | "end_of_line_vent"
  | "hydraulic_liquid_seal"
  | "packed_bed_gravel";

interface FlameArrestData {
  flowCapacity: number;
  pressureDrop: number;
  protection: number;
  maintenance: number;
  faCost: number;
  bidirectional: boolean;
  forTank: boolean;
  element: string;
  bestUse: string;
}

const DATA: Record<FlameArrestType, FlameArrestData> = {
  deflagration_inline: {
    flowCapacity: 8, pressureDrop: 6, protection: 7, maintenance: 7, faCost: 5,
    bidirectional: true, forTank: false,
    element: "crimped_ribbon_metal_matrix_quench",
    bestUse: "pipe_vent_header_low_speed_flame",
  },
  detonation_inline: {
    flowCapacity: 7, pressureDrop: 5, protection: 10, maintenance: 6, faCost: 8,
    bidirectional: true, forTank: false,
    element: "sintered_metal_multi_channel_stop",
    bestUse: "long_pipe_run_detonation_risk_high",
  },
  end_of_line_vent: {
    flowCapacity: 9, pressureDrop: 8, protection: 7, maintenance: 8, faCost: 4,
    bidirectional: false, forTank: true,
    element: "crimped_ribbon_weather_hood_screen",
    bestUse: "tank_vent_open_atmosphere_protect",
  },
  hydraulic_liquid_seal: {
    flowCapacity: 6, pressureDrop: 4, protection: 8, maintenance: 5, faCost: 6,
    bidirectional: true, forTank: false,
    element: "liquid_glycol_water_seal_column",
    bestUse: "flare_header_waste_gas_continuous",
  },
  packed_bed_gravel: {
    flowCapacity: 10, pressureDrop: 3, protection: 6, maintenance: 4, faCost: 3,
    bidirectional: true, forTank: false,
    element: "gravel_ceramic_ball_bed_quench",
    bestUse: "large_bore_low_pressure_mine_vent",
  },
};

function get(t: FlameArrestType): FlameArrestData {
  return DATA[t];
}

export const flowCapacity = (t: FlameArrestType) => get(t).flowCapacity;
export const pressureDrop = (t: FlameArrestType) => get(t).pressureDrop;
export const protection = (t: FlameArrestType) => get(t).protection;
export const maintenance = (t: FlameArrestType) => get(t).maintenance;
export const faCost = (t: FlameArrestType) => get(t).faCost;
export const bidirectional = (t: FlameArrestType) => get(t).bidirectional;
export const forTank = (t: FlameArrestType) => get(t).forTank;
export const element = (t: FlameArrestType) => get(t).element;
export const bestUse = (t: FlameArrestType) => get(t).bestUse;
export const flameArrestTypes = (): FlameArrestType[] =>
  Object.keys(DATA) as FlameArrestType[];
