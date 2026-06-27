export type CmmTypeCalc =
  | "bridge_gantry_large"
  | "cantilever_small_part"
  | "horizontal_arm_auto"
  | "portable_arm_faro"
  | "optical_cmm_structured_light";

interface CmmData {
  accuracy: number;
  speed: number;
  volume: number;
  portability: number;
  cmCost: number;
  nonContact: boolean;
  forShopFloor: boolean;
  probe: string;
  bestUse: string;
}

const DATA: Record<CmmTypeCalc, CmmData> = {
  bridge_gantry_large: {
    accuracy: 10, speed: 7, volume: 9, portability: 2, cmCost: 9,
    nonContact: false, forShopFloor: false,
    probe: "touch_trigger_scanning_stylus",
    bestUse: "engine_block_gearbox_precision",
  },
  cantilever_small_part: {
    accuracy: 9, speed: 8, volume: 4, portability: 3, cmCost: 6,
    nonContact: false, forShopFloor: false,
    probe: "ruby_ball_tip_star_stylus",
    bestUse: "small_precision_part_gauge_block",
  },
  horizontal_arm_auto: {
    accuracy: 7, speed: 9, volume: 10, portability: 3, cmCost: 8,
    nonContact: false, forShopFloor: true,
    probe: "multi_tip_crash_guard_arm",
    bestUse: "auto_body_large_panel_inline",
  },
  portable_arm_faro: {
    accuracy: 6, speed: 6, volume: 7, portability: 10, cmCost: 5,
    nonContact: false, forShopFloor: true,
    probe: "portable_articulating_arm_probe",
    bestUse: "field_inspection_jig_fixture_check",
  },
  optical_cmm_structured_light: {
    accuracy: 8, speed: 10, volume: 6, portability: 7, cmCost: 8,
    nonContact: true, forShopFloor: true,
    probe: "structured_light_fringe_camera",
    bestUse: "freeform_surface_reverse_engineer",
  },
};

function get(t: CmmTypeCalc): CmmData {
  return DATA[t];
}

export const accuracy = (t: CmmTypeCalc) => get(t).accuracy;
export const speed = (t: CmmTypeCalc) => get(t).speed;
export const volume = (t: CmmTypeCalc) => get(t).volume;
export const portability = (t: CmmTypeCalc) => get(t).portability;
export const cmCost = (t: CmmTypeCalc) => get(t).cmCost;
export const nonContact = (t: CmmTypeCalc) => get(t).nonContact;
export const forShopFloor = (t: CmmTypeCalc) => get(t).forShopFloor;
export const probe = (t: CmmTypeCalc) => get(t).probe;
export const bestUse = (t: CmmTypeCalc) => get(t).bestUse;
export const cmmTypeCalcTypes = (): CmmTypeCalc[] =>
  Object.keys(DATA) as CmmTypeCalc[];
