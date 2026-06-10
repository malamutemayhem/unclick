export type FirewallType = "packet_filter" | "stateful" | "waf" | "ngfw" | "cloud_native";

export function throughputGbps(f: FirewallType): number {
  const m: Record<FirewallType, number> = {
    packet_filter: 100, stateful: 40, waf: 10, ngfw: 20, cloud_native: 50,
  };
  return m[f];
}

export function inspectionDepth(f: FirewallType): number {
  const m: Record<FirewallType, number> = {
    packet_filter: 2, stateful: 5, waf: 9, ngfw: 10, cloud_native: 7,
  };
  return m[f];
}

export function latencyMs(f: FirewallType): number {
  const m: Record<FirewallType, number> = {
    packet_filter: 1, stateful: 3, waf: 10, ngfw: 8, cloud_native: 5,
  };
  return m[f];
}

export function configComplexity(f: FirewallType): number {
  const m: Record<FirewallType, number> = {
    packet_filter: 3, stateful: 5, waf: 8, ngfw: 9, cloud_native: 6,
  };
  return m[f];
}

export function costScore(f: FirewallType): number {
  const m: Record<FirewallType, number> = {
    packet_filter: 1, stateful: 4, waf: 7, ngfw: 9, cloud_native: 6,
  };
  return m[f];
}

export function applicationAware(f: FirewallType): boolean {
  const m: Record<FirewallType, boolean> = {
    packet_filter: false, stateful: false, waf: true, ngfw: true, cloud_native: true,
  };
  return m[f];
}

export function requiresHardware(f: FirewallType): boolean {
  const m: Record<FirewallType, boolean> = {
    packet_filter: true, stateful: true, waf: false, ngfw: true, cloud_native: false,
  };
  return m[f];
}

export function bestProtection(f: FirewallType): string {
  const m: Record<FirewallType, string> = {
    packet_filter: "basic_filtering", stateful: "connection_tracking",
    waf: "web_application", ngfw: "advanced_threats",
    cloud_native: "elastic_scaling",
  };
  return m[f];
}

export function deploymentModel(f: FirewallType): string {
  const m: Record<FirewallType, string> = {
    packet_filter: "network_edge", stateful: "perimeter",
    waf: "reverse_proxy", ngfw: "inline",
    cloud_native: "saas",
  };
  return m[f];
}

export function firewallTypes(): FirewallType[] {
  return ["packet_filter", "stateful", "waf", "ngfw", "cloud_native"];
}
