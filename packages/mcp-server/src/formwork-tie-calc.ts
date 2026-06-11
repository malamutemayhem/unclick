export type FormworkTieType =
  | "snap_tie_break_back"
  | "she_bolt_removable"
  | "coil_tie_rod_loop"
  | "taper_tie_cone_slot"
  | "through_tie_dywidag_bar";

interface FormworkTieData {
  capacity: number;
  reusability: number;
  finish_: number;
  speed: number;
  ftCost: number;
  removable: boolean;
  forWall: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<FormworkTieType, FormworkTieData> = {
  snap_tie_break_back: {
    capacity: 5, reusability: 1, finish_: 7, speed: 9, ftCost: 2,
    removable: false, forWall: true,
    mechanism: "flat_wire_snap_break_point",
    bestUse: "light_wall_residential_foundation",
  },
  she_bolt_removable: {
    capacity: 8, reusability: 10, finish_: 9, speed: 6, ftCost: 7,
    removable: true, forWall: true,
    mechanism: "threaded_bolt_cone_removable",
    bestUse: "architectural_concrete_exposed_wall",
  },
  coil_tie_rod_loop: {
    capacity: 7, reusability: 3, finish_: 6, speed: 8, ftCost: 3,
    removable: false, forWall: true,
    mechanism: "coil_loop_rod_thread_wing_nut",
    bestUse: "general_wall_column_standard_form",
  },
  taper_tie_cone_slot: {
    capacity: 6, reusability: 5, finish_: 8, speed: 7, ftCost: 4,
    removable: true, forWall: true,
    mechanism: "taper_rod_plastic_cone_slot",
    bestUse: "clean_finish_commercial_wall",
  },
  through_tie_dywidag_bar: {
    capacity: 10, reusability: 8, finish_: 5, speed: 5, ftCost: 8,
    removable: true, forWall: true,
    mechanism: "high_strength_bar_plate_washer",
    bestUse: "heavy_retaining_wall_deep_pour",
  },
};

function get(t: FormworkTieType): FormworkTieData {
  return DATA[t];
}

export const capacity = (t: FormworkTieType) => get(t).capacity;
export const reusability = (t: FormworkTieType) => get(t).reusability;
export const finish_ = (t: FormworkTieType) => get(t).finish_;
export const speed = (t: FormworkTieType) => get(t).speed;
export const ftCost = (t: FormworkTieType) => get(t).ftCost;
export const removable = (t: FormworkTieType) => get(t).removable;
export const forWall = (t: FormworkTieType) => get(t).forWall;
export const mechanism = (t: FormworkTieType) => get(t).mechanism;
export const bestUse = (t: FormworkTieType) => get(t).bestUse;
export const formworkTieTypes = (): FormworkTieType[] =>
  Object.keys(DATA) as FormworkTieType[];
