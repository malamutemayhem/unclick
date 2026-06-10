export type SnowboardBindingType = "strap_in_standard" | "rear_entry_speed" | "step_on_click" | "burton_est" | "splitboard_tour";

export function responseFlex(t: SnowboardBindingType): number {
  const m: Record<SnowboardBindingType, number> = {
    strap_in_standard: 8, rear_entry_speed: 6, step_on_click: 7, burton_est: 9, splitboard_tour: 7,
  };
  return m[t];
}

export function entrySpeed(t: SnowboardBindingType): number {
  const m: Record<SnowboardBindingType, number> = {
    strap_in_standard: 4, rear_entry_speed: 9, step_on_click: 10, burton_est: 5, splitboard_tour: 3,
  };
  return m[t];
}

export function customFit(t: SnowboardBindingType): number {
  const m: Record<SnowboardBindingType, number> = {
    strap_in_standard: 9, rear_entry_speed: 5, step_on_click: 4, burton_est: 10, splitboard_tour: 7,
  };
  return m[t];
}

export function boardCompatibility(t: SnowboardBindingType): number {
  const m: Record<SnowboardBindingType, number> = {
    strap_in_standard: 10, rear_entry_speed: 8, step_on_click: 5, burton_est: 3, splitboard_tour: 4,
  };
  return m[t];
}

export function bindingCost(t: SnowboardBindingType): number {
  const m: Record<SnowboardBindingType, number> = {
    strap_in_standard: 5, rear_entry_speed: 6, step_on_click: 8, burton_est: 9, splitboard_tour: 10,
  };
  return m[t];
}

export function toolFreeAdjust(t: SnowboardBindingType): boolean {
  const m: Record<SnowboardBindingType, boolean> = {
    strap_in_standard: true, rear_entry_speed: true, step_on_click: true, burton_est: true, splitboard_tour: false,
  };
  return m[t];
}

export function hikeModeSwitch(t: SnowboardBindingType): boolean {
  const m: Record<SnowboardBindingType, boolean> = {
    strap_in_standard: false, rear_entry_speed: false, step_on_click: false, burton_est: false, splitboard_tour: true,
  };
  return m[t];
}

export function strapSystem(t: SnowboardBindingType): string {
  const m: Record<SnowboardBindingType, string> = {
    strap_in_standard: "dual_ratchet_ankle_toe",
    rear_entry_speed: "highback_fold_down",
    step_on_click: "cleat_lock_no_strap",
    burton_est: "channel_slide_infinite",
    splitboard_tour: "pin_lock_tour_mode",
  };
  return m[t];
}

export function bestRider(t: SnowboardBindingType): string {
  const m: Record<SnowboardBindingType, string> = {
    strap_in_standard: "all_mountain_versatile",
    rear_entry_speed: "beginner_convenience",
    step_on_click: "resort_quick_laps",
    burton_est: "burton_board_dedicated",
    splitboard_tour: "backcountry_skin_climb",
  };
  return m[t];
}

export function snowboardBindings(): SnowboardBindingType[] {
  return ["strap_in_standard", "rear_entry_speed", "step_on_click", "burton_est", "splitboard_tour"];
}
