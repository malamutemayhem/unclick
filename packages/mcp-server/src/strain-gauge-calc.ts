export type StrainGauge =
  | "foil_metallic"
  | "semiconductor_piezo"
  | "thin_film_sputter"
  | "fiber_bragg_grating"
  | "vibrating_wire";

const DATA: Record<StrainGauge, {
  gaugeFactor: number; accuracy: number; fatigue: number;
  tempComp: number; sgCost: number; wireless: boolean;
  forStructural: boolean; material: string; bestUse: string;
}> = {
  foil_metallic: {
    gaugeFactor: 4, accuracy: 8, fatigue: 9,
    tempComp: 8, sgCost: 1, wireless: false,
    forStructural: true, material: "constantan_karma_alloy",
    bestUse: "stress_analysis_lab",
  },
  semiconductor_piezo: {
    gaugeFactor: 10, accuracy: 7, fatigue: 5,
    tempComp: 4, sgCost: 4, wireless: false,
    forStructural: false, material: "doped_silicon_crystal",
    bestUse: "mems_pressure_element",
  },
  thin_film_sputter: {
    gaugeFactor: 5, accuracy: 9, fatigue: 10,
    tempComp: 9, sgCost: 6, wireless: false,
    forStructural: false, material: "nicr_sputtered_layer",
    bestUse: "transducer_oem_permanent",
  },
  fiber_bragg_grating: {
    gaugeFactor: 6, accuracy: 9, fatigue: 10,
    tempComp: 7, sgCost: 8, wireless: false,
    forStructural: true, material: "silica_fiber_inscribed",
    bestUse: "bridge_dam_shm_monitor",
  },
  vibrating_wire: {
    gaugeFactor: 3, accuracy: 8, fatigue: 10,
    tempComp: 9, sgCost: 5, wireless: true,
    forStructural: true, material: "tensioned_steel_wire",
    bestUse: "geotechnical_embedment",
  },
};

const get = (t: StrainGauge) => DATA[t];

export const gaugeFactor = (t: StrainGauge) => get(t).gaugeFactor;
export const accuracy = (t: StrainGauge) => get(t).accuracy;
export const fatigue = (t: StrainGauge) => get(t).fatigue;
export const tempComp = (t: StrainGauge) => get(t).tempComp;
export const sgCost = (t: StrainGauge) => get(t).sgCost;
export const wireless = (t: StrainGauge) => get(t).wireless;
export const forStructural = (t: StrainGauge) => get(t).forStructural;
export const material = (t: StrainGauge) => get(t).material;
export const bestUse = (t: StrainGauge) => get(t).bestUse;
export const strainGauges = (): StrainGauge[] => Object.keys(DATA) as StrainGauge[];
