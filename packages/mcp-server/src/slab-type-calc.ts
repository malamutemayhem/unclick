export type SlabTypeType =
  | "flat_plate_no_beam"
  | "flat_slab_drop_panel"
  | "waffle_slab_two_way"
  | "one_way_ribbed_joist"
  | "post_tension_unbonded";

interface SlabTypeData {
  span: number;
  loadCapacity: number;
  depth: number;
  formwork: number;
  slCost: number;
  prestressed: boolean;
  forLongSpan: boolean;
  reinforcement: string;
  bestUse: string;
}

const DATA: Record<SlabTypeType, SlabTypeData> = {
  flat_plate_no_beam: {
    span: 5, loadCapacity: 5, depth: 8, formwork: 10, slCost: 4,
    prestressed: false, forLongSpan: false,
    reinforcement: "mild_steel_two_way_mat",
    bestUse: "residential_apartment_light_load",
  },
  flat_slab_drop_panel: {
    span: 6, loadCapacity: 7, depth: 7, formwork: 7, slCost: 5,
    prestressed: false, forLongSpan: false,
    reinforcement: "mild_steel_drop_capital",
    bestUse: "office_warehouse_moderate_load",
  },
  waffle_slab_two_way: {
    span: 9, loadCapacity: 8, depth: 5, formwork: 4, slCost: 8,
    prestressed: false, forLongSpan: true,
    reinforcement: "two_way_rib_dome_void",
    bestUse: "auditorium_long_span_exposed",
  },
  one_way_ribbed_joist: {
    span: 7, loadCapacity: 7, depth: 6, formwork: 6, slCost: 6,
    prestressed: false, forLongSpan: false,
    reinforcement: "one_way_rib_pan_form",
    bestUse: "commercial_floor_moderate_span",
  },
  post_tension_unbonded: {
    span: 10, loadCapacity: 9, depth: 9, formwork: 8, slCost: 7,
    prestressed: true, forLongSpan: true,
    reinforcement: "unbonded_tendon_strand_anchor",
    bestUse: "parking_garage_long_span_thin",
  },
};

function get(t: SlabTypeType): SlabTypeData {
  return DATA[t];
}

export const span = (t: SlabTypeType) => get(t).span;
export const loadCapacity = (t: SlabTypeType) => get(t).loadCapacity;
export const depth = (t: SlabTypeType) => get(t).depth;
export const formwork = (t: SlabTypeType) => get(t).formwork;
export const slCost = (t: SlabTypeType) => get(t).slCost;
export const prestressed = (t: SlabTypeType) => get(t).prestressed;
export const forLongSpan = (t: SlabTypeType) => get(t).forLongSpan;
export const reinforcement = (t: SlabTypeType) => get(t).reinforcement;
export const bestUse = (t: SlabTypeType) => get(t).bestUse;
export const slabTypeTypes = (): SlabTypeType[] =>
  Object.keys(DATA) as SlabTypeType[];
