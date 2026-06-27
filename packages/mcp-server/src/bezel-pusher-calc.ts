export type BezelPusherType = "flat_blade_standard" | "cup_pusher_round" | "rocking_roller_smooth" | "burnisher_curved_polish" | "prong_pusher_claw";

export function settingForce(t: BezelPusherType): number {
  const m: Record<BezelPusherType, number> = {
    flat_blade_standard: 8, cup_pusher_round: 7, rocking_roller_smooth: 9, burnisher_curved_polish: 6, prong_pusher_claw: 10,
  };
  return m[t];
}

export function stoneProtect(t: BezelPusherType): number {
  const m: Record<BezelPusherType, number> = {
    flat_blade_standard: 7, cup_pusher_round: 10, rocking_roller_smooth: 9, burnisher_curved_polish: 8, prong_pusher_claw: 6,
  };
  return m[t];
}

export function controlFeel(t: BezelPusherType): number {
  const m: Record<BezelPusherType, number> = {
    flat_blade_standard: 9, cup_pusher_round: 8, rocking_roller_smooth: 10, burnisher_curved_polish: 7, prong_pusher_claw: 8,
  };
  return m[t];
}

export function finishQuality(t: BezelPusherType): number {
  const m: Record<BezelPusherType, number> = {
    flat_blade_standard: 7, cup_pusher_round: 8, rocking_roller_smooth: 9, burnisher_curved_polish: 10, prong_pusher_claw: 6,
  };
  return m[t];
}

export function toolCost(t: BezelPusherType): number {
  const m: Record<BezelPusherType, number> = {
    flat_blade_standard: 1, cup_pusher_round: 1, rocking_roller_smooth: 2, burnisher_curved_polish: 2, prong_pusher_claw: 2,
  };
  return m[t];
}

export function polishes(t: BezelPusherType): boolean {
  const m: Record<BezelPusherType, boolean> = {
    flat_blade_standard: false, cup_pusher_round: false, rocking_roller_smooth: true, burnisher_curved_polish: true, prong_pusher_claw: false,
  };
  return m[t];
}

export function forProng(t: BezelPusherType): boolean {
  const m: Record<BezelPusherType, boolean> = {
    flat_blade_standard: false, cup_pusher_round: false, rocking_roller_smooth: false, burnisher_curved_polish: false, prong_pusher_claw: true,
  };
  return m[t];
}

export function tipShape(t: BezelPusherType): string {
  const m: Record<BezelPusherType, string> = {
    flat_blade_standard: "flat_tapered_blade",
    cup_pusher_round: "concave_cup_tip",
    rocking_roller_smooth: "rounded_roller_edge",
    burnisher_curved_polish: "curved_polished_steel",
    prong_pusher_claw: "notched_fork_tip",
  };
  return m[t];
}

export function bestSetting(t: BezelPusherType): string {
  const m: Record<BezelPusherType, string> = {
    flat_blade_standard: "tube_bezel_cabochon",
    cup_pusher_round: "round_stone_protect",
    rocking_roller_smooth: "fine_bezel_smooth",
    burnisher_curved_polish: "final_polish_seat",
    prong_pusher_claw: "prong_setting_close",
  };
  return m[t];
}

export function bezelPushers(): BezelPusherType[] {
  return ["flat_blade_standard", "cup_pusher_round", "rocking_roller_smooth", "burnisher_curved_polish", "prong_pusher_claw"];
}
