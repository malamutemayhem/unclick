export type FastenerType =
  | "hex_bolt_grade_8"
  | "socket_cap_alloy"
  | "self_tapping_sheet"
  | "rivet_blind_pop"
  | "threaded_insert_helicoil";

const DATA: Record<FastenerType, {
  tensile: number; shear: number; vibrationResist: number;
  installSpeed: number; ftCost: number; removable: boolean;
  forThinSheet: boolean; drive: string; bestUse: string;
}> = {
  hex_bolt_grade_8: {
    tensile: 10, shear: 9, vibrationResist: 7,
    installSpeed: 5, ftCost: 2, removable: true,
    forThinSheet: false, drive: "hex_head_wrench_socket",
    bestUse: "structural_steel_frame_joint",
  },
  socket_cap_alloy: {
    tensile: 9, shear: 8, vibrationResist: 8,
    installSpeed: 6, ftCost: 3, removable: true,
    forThinSheet: false, drive: "hex_socket_allen_key",
    bestUse: "machine_tool_precision_clamp",
  },
  self_tapping_sheet: {
    tensile: 4, shear: 5, vibrationResist: 5,
    installSpeed: 10, ftCost: 1, removable: true,
    forThinSheet: true, drive: "phillips_cross_recess",
    bestUse: "sheet_metal_enclosure_assembly",
  },
  rivet_blind_pop: {
    tensile: 5, shear: 6, vibrationResist: 9,
    installSpeed: 9, ftCost: 1, removable: false,
    forThinSheet: true, drive: "mandrel_pull_squeeze",
    bestUse: "aircraft_skin_panel_permanent",
  },
  threaded_insert_helicoil: {
    tensile: 8, shear: 7, vibrationResist: 10,
    installSpeed: 3, ftCost: 4, removable: true,
    forThinSheet: false, drive: "tang_drive_coil_wind",
    bestUse: "aluminum_housing_thread_repair",
  },
};

const get = (t: FastenerType) => DATA[t];

export const tensile = (t: FastenerType) => get(t).tensile;
export const shear = (t: FastenerType) => get(t).shear;
export const vibrationResist = (t: FastenerType) => get(t).vibrationResist;
export const installSpeed = (t: FastenerType) => get(t).installSpeed;
export const ftCost = (t: FastenerType) => get(t).ftCost;
export const removable = (t: FastenerType) => get(t).removable;
export const forThinSheet = (t: FastenerType) => get(t).forThinSheet;
export const drive = (t: FastenerType) => get(t).drive;
export const bestUse = (t: FastenerType) => get(t).bestUse;
export const fastenerTypes = (): FastenerType[] => Object.keys(DATA) as FastenerType[];
