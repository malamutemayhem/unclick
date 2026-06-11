export type StrainGaugePressType =
  | "bonded_foil_standard"
  | "diffused_semi_mems"
  | "thick_film_printed"
  | "wire_wound_legacy"
  | "optical_fiber_bragg";

interface StrainGaugePressData {
  accuracy: number;
  fatigue: number;
  miniaturize: number;
  tempComp: number;
  sgpCost: number;
  fullBridge: boolean;
  forFatigue: boolean;
  gauge: string;
  bestUse: string;
}

const DATA: Record<StrainGaugePressType, StrainGaugePressData> = {
  bonded_foil_standard: {
    accuracy: 8, fatigue: 8, miniaturize: 6, tempComp: 7, sgpCost: 3,
    fullBridge: true, forFatigue: true,
    gauge: "metal_foil_photo_etched_polyimide_bond",
    bestUse: "load_cell_weigh_bridge_force_measure",
  },
  diffused_semi_mems: {
    accuracy: 9, fatigue: 6, miniaturize: 10, tempComp: 5, sgpCost: 4,
    fullBridge: true, forFatigue: false,
    gauge: "silicon_piezoresistor_mems_diffused",
    bestUse: "miniature_pressure_sensor_oem_high_vol",
  },
  thick_film_printed: {
    accuracy: 6, fatigue: 7, miniaturize: 7, tempComp: 6, sgpCost: 2,
    fullBridge: false, forFatigue: false,
    gauge: "cermet_paste_screen_print_alumina_sub",
    bestUse: "automotive_hvac_consumer_cost_sensitive",
  },
  wire_wound_legacy: {
    accuracy: 7, fatigue: 9, miniaturize: 3, tempComp: 8, sgpCost: 4,
    fullBridge: true, forFatigue: true,
    gauge: "fine_wire_wound_grid_fiberglass_carrier",
    bestUse: "high_temp_creep_test_structural_monitor",
  },
  optical_fiber_bragg: {
    accuracy: 10, fatigue: 10, miniaturize: 8, tempComp: 9, sgpCost: 9,
    fullBridge: false, forFatigue: true,
    gauge: "fiber_bragg_grating_wavelength_shift",
    bestUse: "structural_health_monitor_bridge_dam_emf",
  },
};

function get(t: StrainGaugePressType): StrainGaugePressData {
  return DATA[t];
}

export const accuracy = (t: StrainGaugePressType) => get(t).accuracy;
export const fatigue = (t: StrainGaugePressType) => get(t).fatigue;
export const miniaturize = (t: StrainGaugePressType) => get(t).miniaturize;
export const tempComp = (t: StrainGaugePressType) => get(t).tempComp;
export const sgpCost = (t: StrainGaugePressType) => get(t).sgpCost;
export const fullBridge = (t: StrainGaugePressType) => get(t).fullBridge;
export const forFatigue = (t: StrainGaugePressType) => get(t).forFatigue;
export const gauge = (t: StrainGaugePressType) => get(t).gauge;
export const bestUse = (t: StrainGaugePressType) => get(t).bestUse;
export const strainGaugePressTypes = (): StrainGaugePressType[] =>
  Object.keys(DATA) as StrainGaugePressType[];
