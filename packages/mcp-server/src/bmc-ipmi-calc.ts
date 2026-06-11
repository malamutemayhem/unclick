export type BmcIpmi =
  | "ipmi_2_0_legacy"
  | "redfish_rest"
  | "openbmc_linux"
  | "spdm_secure"
  | "pldm_mctp";

const DATA: Record<BmcIpmi, {
  capability: number; security: number; scalability: number;
  automation: number; bmcCost: number; openStandard: boolean;
  forCloud: boolean; protocol: string; bestUse: string;
}> = {
  ipmi_2_0_legacy: {
    capability: 4, security: 3, scalability: 4,
    automation: 3, bmcCost: 2, openStandard: true,
    forCloud: false, protocol: "udp_rmcp_kvm",
    bestUse: "legacy_server_mgmt",
  },
  redfish_rest: {
    capability: 8, security: 7, scalability: 9,
    automation: 9, bmcCost: 5, openStandard: true,
    forCloud: true, protocol: "https_json_odata",
    bestUse: "modern_fleet_orchestrate",
  },
  openbmc_linux: {
    capability: 9, security: 8, scalability: 8,
    automation: 8, bmcCost: 6, openStandard: true,
    forCloud: true, protocol: "dbus_rest_ssh",
    bestUse: "hyperscale_custom_fw",
  },
  spdm_secure: {
    capability: 7, security: 10, scalability: 7,
    automation: 6, bmcCost: 7, openStandard: true,
    forCloud: true, protocol: "authenticated_measurement",
    bestUse: "zero_trust_attestation",
  },
  pldm_mctp: {
    capability: 7, security: 7, scalability: 7,
    automation: 7, bmcCost: 4, openStandard: true,
    forCloud: false, protocol: "mctp_bus_discovery",
    bestUse: "device_firmware_update",
  },
};

const get = (t: BmcIpmi) => DATA[t];

export const capability = (t: BmcIpmi) => get(t).capability;
export const security = (t: BmcIpmi) => get(t).security;
export const scalability = (t: BmcIpmi) => get(t).scalability;
export const automation = (t: BmcIpmi) => get(t).automation;
export const bmcCost = (t: BmcIpmi) => get(t).bmcCost;
export const openStandard = (t: BmcIpmi) => get(t).openStandard;
export const forCloud = (t: BmcIpmi) => get(t).forCloud;
export const protocol = (t: BmcIpmi) => get(t).protocol;
export const bestUse = (t: BmcIpmi) => get(t).bestUse;
export const bmcIpmis = (): BmcIpmi[] => Object.keys(DATA) as BmcIpmi[];
