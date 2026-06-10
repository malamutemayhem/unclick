export type GameTimerType = "sand_hourglass_classic" | "digital_countdown_button" | "chess_clock_dual" | "app_phone_timer" | "cube_flip_preset";

export function accuracy(t: GameTimerType): number {
  const m: Record<GameTimerType, number> = {
    sand_hourglass_classic: 3, digital_countdown_button: 9, chess_clock_dual: 10, app_phone_timer: 9, cube_flip_preset: 7,
  };
  return m[t];
}

export function easeOfUse(t: GameTimerType): number {
  const m: Record<GameTimerType, number> = {
    sand_hourglass_classic: 10, digital_countdown_button: 7, chess_clock_dual: 6, app_phone_timer: 5, cube_flip_preset: 9,
  };
  return m[t];
}

export function ambiance(t: GameTimerType): number {
  const m: Record<GameTimerType, number> = {
    sand_hourglass_classic: 10, digital_countdown_button: 4, chess_clock_dual: 7, app_phone_timer: 3, cube_flip_preset: 6,
  };
  return m[t];
}

export function customization(t: GameTimerType): number {
  const m: Record<GameTimerType, number> = {
    sand_hourglass_classic: 1, digital_countdown_button: 8, chess_clock_dual: 9, app_phone_timer: 10, cube_flip_preset: 4,
  };
  return m[t];
}

export function timerCost(t: GameTimerType): number {
  const m: Record<GameTimerType, number> = {
    sand_hourglass_classic: 1, digital_countdown_button: 3, chess_clock_dual: 5, app_phone_timer: 0, cube_flip_preset: 3,
  };
  return m[t];
}

export function needsPower(t: GameTimerType): boolean {
  const m: Record<GameTimerType, boolean> = {
    sand_hourglass_classic: false, digital_countdown_button: true, chess_clock_dual: true, app_phone_timer: true, cube_flip_preset: true,
  };
  return m[t];
}

export function multiPlayer(t: GameTimerType): boolean {
  const m: Record<GameTimerType, boolean> = {
    sand_hourglass_classic: false, digital_countdown_button: false, chess_clock_dual: true, app_phone_timer: true, cube_flip_preset: false,
  };
  return m[t];
}

export function timerMechanism(t: GameTimerType): string {
  const m: Record<GameTimerType, string> = {
    sand_hourglass_classic: "gravity_sand_flow",
    digital_countdown_button: "lcd_quartz_crystal",
    chess_clock_dual: "dual_clock_toggle",
    app_phone_timer: "software_phone_screen",
    cube_flip_preset: "tilt_sensor_preset",
  };
  return m[t];
}

export function bestGame(t: GameTimerType): string {
  const m: Record<GameTimerType, string> = {
    sand_hourglass_classic: "party_word_game",
    digital_countdown_button: "solo_puzzle_speed",
    chess_clock_dual: "chess_go_two_player",
    app_phone_timer: "complex_board_game",
    cube_flip_preset: "kitchen_quick_game",
  };
  return m[t];
}

export function gameTimers(): GameTimerType[] {
  return ["sand_hourglass_classic", "digital_countdown_button", "chess_clock_dual", "app_phone_timer", "cube_flip_preset"];
}
