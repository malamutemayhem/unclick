export type DyeingMachineType =
  | "jet_dyeing"
  | "jigger"
  | "beam_dyeing"
  | "pad_batch"
  | "package_dyeing";

interface DyeingMachineData {
  speed: number;
  liquorRatio: number;
  evenness: number;
  fabricGentle: number;
  dmCost_: number;
  continuous: boolean;
  forKnit: boolean;
  method: string;
  bestUse: string;
}

const DATA: Record<DyeingMachineType, DyeingMachineData> = {
  jet_dyeing: {
    speed: 8, liquorRatio: 9, evenness: 9, fabricGentle: 8, dmCost_: 8,
    continuous: false, forKnit: true,
    method: "fabric_rope_circulated_by_dye_liquor_jet_nozzle_overflow",
    bestUse: "polyester_nylon_knit_fabric_rope_form_high_temp_disperse",
  },
  jigger: {
    speed: 5, liquorRatio: 6, evenness: 7, fabricGentle: 5, dmCost_: 4,
    continuous: false, forKnit: false,
    method: "open_width_fabric_wound_roll_to_roll_through_dye_bath",
    bestUse: "woven_cotton_viscose_open_width_light_to_medium_weight",
  },
  beam_dyeing: {
    speed: 6, liquorRatio: 8, evenness: 8, fabricGentle: 9, dmCost_: 7,
    continuous: false, forKnit: false,
    method: "fabric_wound_on_perforated_beam_dye_pumped_through_radial",
    bestUse: "delicate_woven_technical_fabric_open_width_low_tension",
  },
  pad_batch: {
    speed: 10, liquorRatio: 10, evenness: 7, fabricGentle: 6, dmCost_: 6,
    continuous: true, forKnit: false,
    method: "continuous_pad_squeeze_batch_cold_dwell_reactive_fixation",
    bestUse: "cotton_cellulosic_reactive_dye_bulk_continuous_processing",
  },
  package_dyeing: {
    speed: 7, liquorRatio: 7, evenness: 9, fabricGentle: 10, dmCost_: 9,
    continuous: false, forKnit: false,
    method: "yarn_wound_on_perforated_package_dye_circulated_in_out",
    bestUse: "yarn_dyeing_cone_cheese_hank_pre_dyed_yarn_for_weaving",
  },
};

function get(t: DyeingMachineType): DyeingMachineData {
  return DATA[t];
}

export const speed = (t: DyeingMachineType) => get(t).speed;
export const liquorRatio = (t: DyeingMachineType) => get(t).liquorRatio;
export const evenness = (t: DyeingMachineType) => get(t).evenness;
export const fabricGentle = (t: DyeingMachineType) => get(t).fabricGentle;
export const dmCost_ = (t: DyeingMachineType) => get(t).dmCost_;
export const continuous = (t: DyeingMachineType) => get(t).continuous;
export const forKnit = (t: DyeingMachineType) => get(t).forKnit;
export const method = (t: DyeingMachineType) => get(t).method;
export const bestUse = (t: DyeingMachineType) => get(t).bestUse;
export const dyeingMachineTypes = (): DyeingMachineType[] =>
  Object.keys(DATA) as DyeingMachineType[];
