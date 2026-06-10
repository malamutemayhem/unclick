export type PunchingBagType = "heavy_hanging" | "speed_bag_swivel" | "free_standing_base" | "double_end_anchor" | "body_opponent_bob";

export function punchResistance(t: PunchingBagType): number {
  const m: Record<PunchingBagType, number> = {
    heavy_hanging: 10, speed_bag_swivel: 2, free_standing_base: 7, double_end_anchor: 4, body_opponent_bob: 8,
  };
  return m[t];
}

export function speedTraining(t: PunchingBagType): number {
  const m: Record<PunchingBagType, number> = {
    heavy_hanging: 4, speed_bag_swivel: 10, free_standing_base: 5, double_end_anchor: 9, body_opponent_bob: 6,
  };
  return m[t];
}

export function installEase(t: PunchingBagType): number {
  const m: Record<PunchingBagType, number> = {
    heavy_hanging: 3, speed_bag_swivel: 5, free_standing_base: 10, double_end_anchor: 4, body_opponent_bob: 9,
  };
  return m[t];
}

export function realism(t: PunchingBagType): number {
  const m: Record<PunchingBagType, number> = {
    heavy_hanging: 6, speed_bag_swivel: 3, free_standing_base: 5, double_end_anchor: 4, body_opponent_bob: 10,
  };
  return m[t];
}

export function bagCost(t: PunchingBagType): number {
  const m: Record<PunchingBagType, number> = {
    heavy_hanging: 5, speed_bag_swivel: 4, free_standing_base: 6, double_end_anchor: 3, body_opponent_bob: 9,
  };
  return m[t];
}

export function noMounting(t: PunchingBagType): boolean {
  const m: Record<PunchingBagType, boolean> = {
    heavy_hanging: false, speed_bag_swivel: false, free_standing_base: true, double_end_anchor: false, body_opponent_bob: true,
  };
  return m[t];
}

export function fullBody(t: PunchingBagType): boolean {
  const m: Record<PunchingBagType, boolean> = {
    heavy_hanging: true, speed_bag_swivel: false, free_standing_base: true, double_end_anchor: false, body_opponent_bob: true,
  };
  return m[t];
}

export function shellMaterial(t: PunchingBagType): string {
  const m: Record<PunchingBagType, string> = {
    heavy_hanging: "leather_canvas_filled",
    speed_bag_swivel: "leather_bladder_air",
    free_standing_base: "vinyl_foam_water_base",
    double_end_anchor: "leather_rubber_elastic",
    body_opponent_bob: "urethane_molded_torso",
  };
  return m[t];
}

export function bestTraining(t: PunchingBagType): string {
  const m: Record<PunchingBagType, string> = {
    heavy_hanging: "power_punch_muay_thai",
    speed_bag_swivel: "hand_speed_rhythm",
    free_standing_base: "home_gym_apartment",
    double_end_anchor: "accuracy_timing_reflex",
    body_opponent_bob: "self_defense_target",
  };
  return m[t];
}

export function punchingBags(): PunchingBagType[] {
  return ["heavy_hanging", "speed_bag_swivel", "free_standing_base", "double_end_anchor", "body_opponent_bob"];
}
