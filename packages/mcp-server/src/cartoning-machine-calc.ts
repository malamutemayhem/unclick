export type CartoningMachineType =
  | "horizontal_end_load"
  | "vertical_top_load"
  | "wrap_around"
  | "tray_former"
  | "blister_cartoner";

interface CartoningMachineData {
  speed: number;
  flexibility: number;
  footprint: number;
  automation: number;
  cmCost_: number;
  continuous: boolean;
  forPharma: boolean;
  loading: string;
  bestUse: string;
}

const DATA: Record<CartoningMachineType, CartoningMachineData> = {
  horizontal_end_load: {
    speed: 9, flexibility: 8, footprint: 6, automation: 9, cmCost_: 7,
    continuous: true, forPharma: true,
    loading: "end_load_horizontal_push_product_into_erected_carton",
    bestUse: "pharma_blister_tube_sachet_cosmetic_carton_packing",
  },
  vertical_top_load: {
    speed: 7, flexibility: 9, footprint: 8, automation: 8, cmCost_: 6,
    continuous: false, forPharma: false,
    loading: "top_load_drop_product_into_carton_from_above_robot",
    bestUse: "bottle_jar_pouch_multipacks_frozen_food_top_load",
  },
  wrap_around: {
    speed: 10, flexibility: 5, footprint: 5, automation: 8, cmCost_: 8,
    continuous: true, forPharma: false,
    loading: "flat_blank_wraps_around_grouped_product_glue_close",
    bestUse: "beverage_multipack_can_cluster_shrink_tray_wrap",
  },
  tray_former: {
    speed: 8, flexibility: 6, footprint: 7, automation: 7, cmCost_: 5,
    continuous: true, forPharma: false,
    loading: "corrugated_blank_fold_glue_erect_tray_no_lid",
    bestUse: "produce_tray_bakery_display_tray_shelf_ready_pack",
  },
  blister_cartoner: {
    speed: 8, flexibility: 5, footprint: 6, automation: 10, cmCost_: 9,
    continuous: true, forPharma: true,
    loading: "integrated_blister_form_fill_seal_then_carton_insert",
    bestUse: "pharma_tablet_capsule_blister_to_carton_serialized",
  },
};

function get(t: CartoningMachineType): CartoningMachineData {
  return DATA[t];
}

export const speed = (t: CartoningMachineType) => get(t).speed;
export const flexibility = (t: CartoningMachineType) => get(t).flexibility;
export const footprint = (t: CartoningMachineType) => get(t).footprint;
export const automation = (t: CartoningMachineType) => get(t).automation;
export const cmCost_ = (t: CartoningMachineType) => get(t).cmCost_;
export const continuous = (t: CartoningMachineType) => get(t).continuous;
export const forPharma = (t: CartoningMachineType) => get(t).forPharma;
export const loading = (t: CartoningMachineType) => get(t).loading;
export const bestUse = (t: CartoningMachineType) => get(t).bestUse;
export const cartoningMachineTypes = (): CartoningMachineType[] =>
  Object.keys(DATA) as CartoningMachineType[];
