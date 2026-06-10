export type FaucetType = "single_handle_ball" | "two_handle_cartridge" | "touchless_sensor" | "pull_down_spray" | "wall_mount_pot";

export function flowRate(t: FaucetType): number {
  const m: Record<FaucetType, number> = {
    single_handle_ball: 7, two_handle_cartridge: 7, touchless_sensor: 5, pull_down_spray: 8, wall_mount_pot: 9,
  };
  return m[t];
}

export function tempControl(t: FaucetType): number {
  const m: Record<FaucetType, number> = {
    single_handle_ball: 7, two_handle_cartridge: 10, touchless_sensor: 6, pull_down_spray: 7, wall_mount_pot: 9,
  };
  return m[t];
}

export function hygieneScore(t: FaucetType): number {
  const m: Record<FaucetType, number> = {
    single_handle_ball: 5, two_handle_cartridge: 3, touchless_sensor: 10, pull_down_spray: 6, wall_mount_pot: 4,
  };
  return m[t];
}

export function durability(t: FaucetType): number {
  const m: Record<FaucetType, number> = {
    single_handle_ball: 7, two_handle_cartridge: 9, touchless_sensor: 6, pull_down_spray: 7, wall_mount_pot: 8,
  };
  return m[t];
}

export function faucetCost(t: FaucetType): number {
  const m: Record<FaucetType, number> = {
    single_handle_ball: 3, two_handle_cartridge: 5, touchless_sensor: 8, pull_down_spray: 6, wall_mount_pot: 7,
  };
  return m[t];
}

export function touchFree(t: FaucetType): boolean {
  const m: Record<FaucetType, boolean> = {
    single_handle_ball: false, two_handle_cartridge: false, touchless_sensor: true, pull_down_spray: false, wall_mount_pot: false,
  };
  return m[t];
}

export function sprayMode(t: FaucetType): boolean {
  const m: Record<FaucetType, boolean> = {
    single_handle_ball: false, two_handle_cartridge: false, touchless_sensor: false, pull_down_spray: true, wall_mount_pot: false,
  };
  return m[t];
}

export function valveType(t: FaucetType): string {
  const m: Record<FaucetType, string> = {
    single_handle_ball: "rotating_ball_valve", two_handle_cartridge: "ceramic_disc_cartridge",
    touchless_sensor: "solenoid_infrared_valve", pull_down_spray: "ceramic_with_diverter",
    wall_mount_pot: "quarter_turn_ceramic",
  };
  return m[t];
}

export function bestSink(t: FaucetType): string {
  const m: Record<FaucetType, string> = {
    single_handle_ball: "standard_bathroom_vanity", two_handle_cartridge: "traditional_widespread",
    touchless_sensor: "kitchen_messy_hands", pull_down_spray: "kitchen_deep_sink_rinse",
    wall_mount_pot: "stove_top_pot_filler",
  };
  return m[t];
}

export function faucets(): FaucetType[] {
  return ["single_handle_ball", "two_handle_cartridge", "touchless_sensor", "pull_down_spray", "wall_mount_pot"];
}
