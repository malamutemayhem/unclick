export type ThermalVia =
  | "standard_pth"
  | "filled_capped"
  | "via_in_pad"
  | "copper_coin"
  | "thermal_array";

const DATA: Record<ThermalVia, {
  thermalRes: number; currentCapacity: number; reliability: number;
  density: number; viaCost: number; filled: boolean;
  forBga: boolean; construction: string; bestUse: string;
}> = {
  standard_pth: {
    thermalRes: 3, currentCapacity: 4, reliability: 7,
    density: 3, viaCost: 1, filled: false,
    forBga: false, construction: "drilled_plated_open",
    bestUse: "general_heat_sinking",
  },
  filled_capped: {
    thermalRes: 6, currentCapacity: 6, reliability: 8,
    density: 6, viaCost: 4, filled: true,
    forBga: true, construction: "epoxy_fill_copper_cap",
    bestUse: "qfn_thermal_pad",
  },
  via_in_pad: {
    thermalRes: 8, currentCapacity: 7, reliability: 7,
    density: 9, viaCost: 6, filled: true,
    forBga: true, construction: "planarized_copper_fill",
    bestUse: "bga_fanout_escape",
  },
  copper_coin: {
    thermalRes: 10, currentCapacity: 10, reliability: 9,
    density: 4, viaCost: 9, filled: true,
    forBga: false, construction: "pressed_copper_slug",
    bestUse: "high_power_led_substrate",
  },
  thermal_array: {
    thermalRes: 7, currentCapacity: 8, reliability: 8,
    density: 7, viaCost: 3, filled: false,
    forBga: false, construction: "grid_pattern_pth",
    bestUse: "power_mosfet_spreader",
  },
};

const get = (t: ThermalVia) => DATA[t];

export const thermalRes = (t: ThermalVia) => get(t).thermalRes;
export const currentCapacity = (t: ThermalVia) => get(t).currentCapacity;
export const reliability = (t: ThermalVia) => get(t).reliability;
export const density = (t: ThermalVia) => get(t).density;
export const viaCost = (t: ThermalVia) => get(t).viaCost;
export const filled = (t: ThermalVia) => get(t).filled;
export const forBga = (t: ThermalVia) => get(t).forBga;
export const construction = (t: ThermalVia) => get(t).construction;
export const bestUse = (t: ThermalVia) => get(t).bestUse;
export const thermalVias = (): ThermalVia[] => Object.keys(DATA) as ThermalVia[];
