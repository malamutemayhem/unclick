export type PipeFlangeType =
  | "weld_neck_high_press"
  | "slip_on_general"
  | "blind_flange_closure"
  | "socket_weld_small"
  | "lap_joint_rotatable";

interface PipeFlangeData {
  pressureRating: number;
  strength: number;
  alignment: number;
  installEase: number;
  pfCost: number;
  fullPenetration: boolean;
  forHighPress: boolean;
  face: string;
  bestUse: string;
}

const DATA: Record<PipeFlangeType, PipeFlangeData> = {
  weld_neck_high_press: {
    pressureRating: 10, strength: 10, alignment: 9, installEase: 5, pfCost: 8,
    fullPenetration: true, forHighPress: true,
    face: "raised_face_ring_joint_hub_tapered_bore",
    bestUse: "high_pressure_critical_piping_refinery_steam",
  },
  slip_on_general: {
    pressureRating: 6, strength: 6, alignment: 7, installEase: 9, pfCost: 4,
    fullPenetration: false, forHighPress: false,
    face: "raised_face_fillet_weld_both_sides",
    bestUse: "general_purpose_low_pressure_utility_piping",
  },
  blind_flange_closure: {
    pressureRating: 10, strength: 9, alignment: 10, installEase: 10, pfCost: 5,
    fullPenetration: false, forHighPress: true,
    face: "raised_face_or_rtj_blanking_end_closure",
    bestUse: "line_termination_pressure_test_future_connect",
  },
  socket_weld_small: {
    pressureRating: 8, strength: 7, alignment: 8, installEase: 8, pfCost: 5,
    fullPenetration: false, forHighPress: true,
    face: "raised_face_socket_recess_fillet_weld",
    bestUse: "small_bore_high_pressure_instrument_piping",
  },
  lap_joint_rotatable: {
    pressureRating: 5, strength: 5, alignment: 10, installEase: 10, pfCost: 6,
    fullPenetration: false, forHighPress: false,
    face: "flat_face_stub_end_rotatable_ring_bolt_align",
    bestUse: "corrosive_service_lined_pipe_easy_disassembly",
  },
};

function get(t: PipeFlangeType): PipeFlangeData {
  return DATA[t];
}

export const pressureRating = (t: PipeFlangeType) => get(t).pressureRating;
export const strength = (t: PipeFlangeType) => get(t).strength;
export const alignment = (t: PipeFlangeType) => get(t).alignment;
export const installEase = (t: PipeFlangeType) => get(t).installEase;
export const pfCost = (t: PipeFlangeType) => get(t).pfCost;
export const fullPenetration = (t: PipeFlangeType) => get(t).fullPenetration;
export const forHighPress = (t: PipeFlangeType) => get(t).forHighPress;
export const face = (t: PipeFlangeType) => get(t).face;
export const bestUse = (t: PipeFlangeType) => get(t).bestUse;
export const pipeFlangeTypes = (): PipeFlangeType[] =>
  Object.keys(DATA) as PipeFlangeType[];
