export type CaissonTypeType =
  | "drilled_shaft_bored"
  | "open_caisson_well"
  | "pneumatic_air_pressure"
  | "box_caisson_precast"
  | "slurry_wall_diaphragm";

interface CaissonTypeData {
  depth: number;
  loadCapacity: number;
  soilRange: number;
  vibration: number;
  caCost: number;
  dewatered: boolean;
  forDeep: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<CaissonTypeType, CaissonTypeData> = {
  drilled_shaft_bored: {
    depth: 8, loadCapacity: 9, soilRange: 8, vibration: 9, caCost: 7,
    dewatered: false, forDeep: true,
    method: "rotary_drill_auger_casing",
    bestUse: "bridge_pier_high_rise_deep",
  },
  open_caisson_well: {
    depth: 7, loadCapacity: 8, soilRange: 6, vibration: 7, caCost: 6,
    dewatered: false, forDeep: true,
    method: "self_sinking_excavate_inside",
    bestUse: "bridge_abutment_water_crossing",
  },
  pneumatic_air_pressure: {
    depth: 10, loadCapacity: 9, soilRange: 7, vibration: 8, caCost: 10,
    dewatered: true, forDeep: true,
    method: "compressed_air_chamber_work",
    bestUse: "underwater_deep_rock_anchor",
  },
  box_caisson_precast: {
    depth: 5, loadCapacity: 7, soilRange: 4, vibration: 8, caCost: 5,
    dewatered: false, forDeep: false,
    method: "precast_float_sink_fill",
    bestUse: "marine_wharf_shallow_water",
  },
  slurry_wall_diaphragm: {
    depth: 9, loadCapacity: 8, soilRange: 9, vibration: 10, caCost: 9,
    dewatered: false, forDeep: true,
    method: "bentonite_slurry_panel_excavate",
    bestUse: "basement_excavation_urban_site",
  },
};

function get(t: CaissonTypeType): CaissonTypeData {
  return DATA[t];
}

export const depth = (t: CaissonTypeType) => get(t).depth;
export const loadCapacity = (t: CaissonTypeType) => get(t).loadCapacity;
export const soilRange = (t: CaissonTypeType) => get(t).soilRange;
export const vibration = (t: CaissonTypeType) => get(t).vibration;
export const caCost = (t: CaissonTypeType) => get(t).caCost;
export const dewatered = (t: CaissonTypeType) => get(t).dewatered;
export const forDeep = (t: CaissonTypeType) => get(t).forDeep;
export const method = (t: CaissonTypeType) => get(t).method;
export const bestUse = (t: CaissonTypeType) => get(t).bestUse;
export const caissonTypeTypes = (): CaissonTypeType[] =>
  Object.keys(DATA) as CaissonTypeType[];
