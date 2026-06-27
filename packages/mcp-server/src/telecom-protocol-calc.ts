export type TelecomProtocol = "sonet" | "dwdm" | "mpls" | "ethernet_carrier" | "otdn";

export function bandwidth(p: TelecomProtocol): number {
  const m: Record<TelecomProtocol, number> = {
    sonet: 6, dwdm: 10, mpls: 7, ethernet_carrier: 8, otdn: 9,
  };
  return m[p];
}

export function latency(p: TelecomProtocol): number {
  const m: Record<TelecomProtocol, number> = {
    sonet: 3, dwdm: 2, mpls: 5, ethernet_carrier: 4, otdn: 3,
  };
  return m[p];
}

export function managementComplexity(p: TelecomProtocol): number {
  const m: Record<TelecomProtocol, number> = {
    sonet: 7, dwdm: 9, mpls: 8, ethernet_carrier: 5, otdn: 8,
  };
  return m[p];
}

export function deploymentCost(p: TelecomProtocol): number {
  const m: Record<TelecomProtocol, number> = {
    sonet: 8, dwdm: 10, mpls: 6, ethernet_carrier: 4, otdn: 9,
  };
  return m[p];
}

export function scalability(p: TelecomProtocol): number {
  const m: Record<TelecomProtocol, number> = {
    sonet: 5, dwdm: 10, mpls: 8, ethernet_carrier: 9, otdn: 9,
  };
  return m[p];
}

export function trafficEngineering(p: TelecomProtocol): boolean {
  const m: Record<TelecomProtocol, boolean> = {
    sonet: false, dwdm: false, mpls: true, ethernet_carrier: false, otdn: true,
  };
  return m[p];
}

export function legacyTechnology(p: TelecomProtocol): boolean {
  const m: Record<TelecomProtocol, boolean> = {
    sonet: true, dwdm: false, mpls: false, ethernet_carrier: false, otdn: false,
  };
  return m[p];
}

export function transportLayer(p: TelecomProtocol): string {
  const m: Record<TelecomProtocol, string> = {
    sonet: "tdm_ring_protection", dwdm: "wavelength_division_optical",
    mpls: "label_switched_path", ethernet_carrier: "packet_switched_metro",
    otdn: "optical_transport_network",
  };
  return m[p];
}

export function typicalDeployment(p: TelecomProtocol): string {
  const m: Record<TelecomProtocol, string> = {
    sonet: "legacy_carrier_backbone", dwdm: "long_haul_submarine",
    mpls: "service_provider_vpn", ethernet_carrier: "metro_enterprise",
    otdn: "modern_carrier_backbone",
  };
  return m[p];
}

export function telecomProtocols(): TelecomProtocol[] {
  return ["sonet", "dwdm", "mpls", "ethernet_carrier", "otdn"];
}
