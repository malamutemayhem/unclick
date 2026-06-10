export type WifiExtenderType = "plug_in_repeater" | "mesh_node_system" | "powerline_adapter" | "outdoor_bridge" | "desktop_extender";

export function coverageRange(t: WifiExtenderType): number {
  const m: Record<WifiExtenderType, number> = {
    plug_in_repeater: 5, mesh_node_system: 10, powerline_adapter: 7, outdoor_bridge: 9, desktop_extender: 6,
  };
  return m[t];
}

export function throughput(t: WifiExtenderType): number {
  const m: Record<WifiExtenderType, number> = {
    plug_in_repeater: 4, mesh_node_system: 9, powerline_adapter: 6, outdoor_bridge: 7, desktop_extender: 8,
  };
  return m[t];
}

export function setupEase(t: WifiExtenderType): number {
  const m: Record<WifiExtenderType, number> = {
    plug_in_repeater: 9, mesh_node_system: 8, powerline_adapter: 6, outdoor_bridge: 3, desktop_extender: 7,
  };
  return m[t];
}

export function seamlessRoaming(t: WifiExtenderType): number {
  const m: Record<WifiExtenderType, number> = {
    plug_in_repeater: 3, mesh_node_system: 10, powerline_adapter: 4, outdoor_bridge: 2, desktop_extender: 5,
  };
  return m[t];
}

export function extenderCost(t: WifiExtenderType): number {
  const m: Record<WifiExtenderType, number> = {
    plug_in_repeater: 2, mesh_node_system: 9, powerline_adapter: 5, outdoor_bridge: 7, desktop_extender: 4,
  };
  return m[t];
}

export function dualBand(t: WifiExtenderType): boolean {
  const m: Record<WifiExtenderType, boolean> = {
    plug_in_repeater: true, mesh_node_system: true, powerline_adapter: false, outdoor_bridge: false, desktop_extender: true,
  };
  return m[t];
}

export function ethernetBackhaul(t: WifiExtenderType): boolean {
  const m: Record<WifiExtenderType, boolean> = {
    plug_in_repeater: false, mesh_node_system: true, powerline_adapter: true, outdoor_bridge: true, desktop_extender: true,
  };
  return m[t];
}

export function connectionMethod(t: WifiExtenderType): string {
  const m: Record<WifiExtenderType, string> = {
    plug_in_repeater: "wireless_relay_rebroadcast",
    mesh_node_system: "dedicated_backhaul_channel",
    powerline_adapter: "electrical_wiring_bridge",
    outdoor_bridge: "directional_antenna_p2p",
    desktop_extender: "external_antenna_amplify",
  };
  return m[t];
}

export function bestScenario(t: WifiExtenderType): string {
  const m: Record<WifiExtenderType, string> = {
    plug_in_repeater: "single_dead_spot_fix",
    mesh_node_system: "whole_home_coverage",
    powerline_adapter: "thick_wall_floor_bypass",
    outdoor_bridge: "barn_garage_outbuilding",
    desktop_extender: "office_desk_boost",
  };
  return m[t];
}

export function wifiExtenders(): WifiExtenderType[] {
  return ["plug_in_repeater", "mesh_node_system", "powerline_adapter", "outdoor_bridge", "desktop_extender"];
}
