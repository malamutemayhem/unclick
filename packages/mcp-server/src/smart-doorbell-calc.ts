export type SmartDoorbell = "video_wired" | "video_battery" | "video_solar" | "peephole_cam" | "intercom_panel";

export function videoResolution(s: SmartDoorbell): number {
  const m: Record<SmartDoorbell, number> = {
    video_wired: 10, video_battery: 7, video_solar: 8, peephole_cam: 6, intercom_panel: 9,
  };
  return m[s];
}

export function fieldOfView(s: SmartDoorbell): number {
  const m: Record<SmartDoorbell, number> = {
    video_wired: 9, video_battery: 8, video_solar: 8, peephole_cam: 5, intercom_panel: 7,
  };
  return m[s];
}

export function nightVision(s: SmartDoorbell): number {
  const m: Record<SmartDoorbell, number> = {
    video_wired: 9, video_battery: 7, video_solar: 7, peephole_cam: 6, intercom_panel: 8,
  };
  return m[s];
}

export function installEase(s: SmartDoorbell): number {
  const m: Record<SmartDoorbell, number> = {
    video_wired: 3, video_battery: 9, video_solar: 7, peephole_cam: 10, intercom_panel: 2,
  };
  return m[s];
}

export function deviceCost(s: SmartDoorbell): number {
  const m: Record<SmartDoorbell, number> = {
    video_wired: 7, video_battery: 5, video_solar: 6, peephole_cam: 4, intercom_panel: 9,
  };
  return m[s];
}

export function requiresWiring(s: SmartDoorbell): boolean {
  const m: Record<SmartDoorbell, boolean> = {
    video_wired: true, video_battery: false, video_solar: false, peephole_cam: false, intercom_panel: true,
  };
  return m[s];
}

export function hasLocalStorage(s: SmartDoorbell): boolean {
  const m: Record<SmartDoorbell, boolean> = {
    video_wired: true, video_battery: false, video_solar: false, peephole_cam: true, intercom_panel: true,
  };
  return m[s];
}

export function powerSource(s: SmartDoorbell): string {
  const m: Record<SmartDoorbell, string> = {
    video_wired: "hardwired_transformer_16v", video_battery: "rechargeable_lithium_pack",
    video_solar: "solar_panel_battery_hybrid", peephole_cam: "internal_rechargeable_cell",
    intercom_panel: "poe_building_power_supply",
  };
  return m[s];
}

export function bestUseCase(s: SmartDoorbell): string {
  const m: Record<SmartDoorbell, string> = {
    video_wired: "permanent_home_installation", video_battery: "rental_easy_setup",
    video_solar: "remote_off_grid_property", peephole_cam: "apartment_condo_door",
    intercom_panel: "multi_unit_building_access",
  };
  return m[s];
}

export function smartDoorbells(): SmartDoorbell[] {
  return ["video_wired", "video_battery", "video_solar", "peephole_cam", "intercom_panel"];
}
