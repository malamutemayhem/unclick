export type DeskChairType = "mesh_ergonomic" | "leather_executive" | "kneeling_posture" | "balance_ball" | "saddle_stool";

export function lumbarSupport(t: DeskChairType): number {
  const m: Record<DeskChairType, number> = {
    mesh_ergonomic: 10, leather_executive: 7, kneeling_posture: 4, balance_ball: 2, saddle_stool: 5,
  };
  return m[t];
}

export function breathability(t: DeskChairType): number {
  const m: Record<DeskChairType, number> = {
    mesh_ergonomic: 10, leather_executive: 3, kneeling_posture: 7, balance_ball: 8, saddle_stool: 7,
  };
  return m[t];
}

export function adjustability(t: DeskChairType): number {
  const m: Record<DeskChairType, number> = {
    mesh_ergonomic: 10, leather_executive: 7, kneeling_posture: 4, balance_ball: 2, saddle_stool: 5,
  };
  return m[t];
}

export function coreEngagement(t: DeskChairType): number {
  const m: Record<DeskChairType, number> = {
    mesh_ergonomic: 2, leather_executive: 1, kneeling_posture: 7, balance_ball: 10, saddle_stool: 8,
  };
  return m[t];
}

export function chairCost(t: DeskChairType): number {
  const m: Record<DeskChairType, number> = {
    mesh_ergonomic: 9, leather_executive: 8, kneeling_posture: 4, balance_ball: 2, saddle_stool: 5,
  };
  return m[t];
}

export function hasArmrests(t: DeskChairType): boolean {
  const m: Record<DeskChairType, boolean> = {
    mesh_ergonomic: true, leather_executive: true, kneeling_posture: false, balance_ball: false, saddle_stool: false,
  };
  return m[t];
}

export function reclinable(t: DeskChairType): boolean {
  const m: Record<DeskChairType, boolean> = {
    mesh_ergonomic: true, leather_executive: true, kneeling_posture: false, balance_ball: false, saddle_stool: false,
  };
  return m[t];
}

export function seatDesign(t: DeskChairType): string {
  const m: Record<DeskChairType, string> = {
    mesh_ergonomic: "suspension_mesh_contour", leather_executive: "padded_bonded_leather",
    kneeling_posture: "angled_shin_pad_seat", balance_ball: "anti_burst_pvc_sphere",
    saddle_stool: "split_seat_hip_angle",
  };
  return m[t];
}

export function bestUser(t: DeskChairType): string {
  const m: Record<DeskChairType, string> = {
    mesh_ergonomic: "long_hours_programmer", leather_executive: "office_prestige_comfort",
    kneeling_posture: "back_pain_active_sit", balance_ball: "short_session_core_train",
    saddle_stool: "standing_desk_hybrid",
  };
  return m[t];
}

export function deskChairs(): DeskChairType[] {
  return ["mesh_ergonomic", "leather_executive", "kneeling_posture", "balance_ball", "saddle_stool"];
}
