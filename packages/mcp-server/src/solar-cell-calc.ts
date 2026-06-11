export type SolarCell =
  | "mono_perc_silicon"
  | "poly_multi_crystal"
  | "thin_film_cdte"
  | "perovskite_hybrid"
  | "multi_junction_iii_v";

const DATA: Record<SolarCell, {
  efficiency: number; costPerWatt: number; degradation: number;
  tempCoeff: number; cellCost: number; flexible: boolean;
  forSpace: boolean; material: string; bestUse: string;
}> = {
  mono_perc_silicon: {
    efficiency: 8, costPerWatt: 7, degradation: 8,
    tempCoeff: 6, cellCost: 5, flexible: false,
    forSpace: false, material: "czochralski_wafer",
    bestUse: "residential_rooftop",
  },
  poly_multi_crystal: {
    efficiency: 6, costPerWatt: 9, degradation: 7,
    tempCoeff: 5, cellCost: 3, flexible: false,
    forSpace: false, material: "cast_multicrystal",
    bestUse: "utility_scale_farm",
  },
  thin_film_cdte: {
    efficiency: 5, costPerWatt: 8, degradation: 6,
    tempCoeff: 8, cellCost: 4, flexible: true,
    forSpace: false, material: "cadmium_telluride",
    bestUse: "desert_ground_mount",
  },
  perovskite_hybrid: {
    efficiency: 7, costPerWatt: 10, degradation: 3,
    tempCoeff: 4, cellCost: 2, flexible: true,
    forSpace: false, material: "organic_metal_halide",
    bestUse: "bipv_building_facade",
  },
  multi_junction_iii_v: {
    efficiency: 10, costPerWatt: 2, degradation: 9,
    tempCoeff: 9, cellCost: 10, flexible: false,
    forSpace: true, material: "gaas_gainp_ge_stack",
    bestUse: "satellite_solar_array",
  },
};

const get = (t: SolarCell) => DATA[t];

export const efficiency = (t: SolarCell) => get(t).efficiency;
export const costPerWatt = (t: SolarCell) => get(t).costPerWatt;
export const degradation = (t: SolarCell) => get(t).degradation;
export const tempCoeff = (t: SolarCell) => get(t).tempCoeff;
export const cellCost = (t: SolarCell) => get(t).cellCost;
export const flexible = (t: SolarCell) => get(t).flexible;
export const forSpace = (t: SolarCell) => get(t).forSpace;
export const material = (t: SolarCell) => get(t).material;
export const bestUse = (t: SolarCell) => get(t).bestUse;
export const solarCells = (): SolarCell[] => Object.keys(DATA) as SolarCell[];
