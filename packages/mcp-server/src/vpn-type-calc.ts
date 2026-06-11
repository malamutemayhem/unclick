export type VpnType =
  | "ipsec_site_to_site"
  | "wireguard_kernel"
  | "openvpn_tls_udp"
  | "mpls_l3vpn_provider"
  | "sd_wan_overlay";

const DATA: Record<VpnType, {
  throughput: number; security: number; simplicity: number;
  mobility: number; vpCost: number; splitTunnel: boolean;
  forRemote: boolean; encryption: string; bestUse: string;
}> = {
  ipsec_site_to_site: {
    throughput: 8, security: 9, simplicity: 4,
    mobility: 3, vpCost: 5, splitTunnel: false,
    forRemote: false, encryption: "aes256_gcm_ike_v2",
    bestUse: "branch_office_permanent_tunnel",
  },
  wireguard_kernel: {
    throughput: 10, security: 8, simplicity: 9,
    mobility: 9, vpCost: 1, splitTunnel: true,
    forRemote: true, encryption: "chacha20_poly1305_curve25519",
    bestUse: "mobile_roaming_fast_handoff",
  },
  openvpn_tls_udp: {
    throughput: 6, security: 8, simplicity: 6,
    mobility: 7, vpCost: 2, splitTunnel: true,
    forRemote: true, encryption: "tls_1_3_aes256_cbc_hmac",
    bestUse: "cross_platform_remote_access",
  },
  mpls_l3vpn_provider: {
    throughput: 9, security: 6, simplicity: 3,
    mobility: 2, vpCost: 8, splitTunnel: false,
    forRemote: false, encryption: "label_switching_no_crypto",
    bestUse: "carrier_managed_multi_site_wan",
  },
  sd_wan_overlay: {
    throughput: 8, security: 7, simplicity: 8,
    mobility: 6, vpCost: 6, splitTunnel: true,
    forRemote: false, encryption: "ipsec_per_tunnel_auto_key",
    bestUse: "hybrid_wan_internet_mpls_failover",
  },
};

const get = (t: VpnType) => DATA[t];

export const throughput = (t: VpnType) => get(t).throughput;
export const security = (t: VpnType) => get(t).security;
export const simplicity = (t: VpnType) => get(t).simplicity;
export const mobility = (t: VpnType) => get(t).mobility;
export const vpCost = (t: VpnType) => get(t).vpCost;
export const splitTunnel = (t: VpnType) => get(t).splitTunnel;
export const forRemote = (t: VpnType) => get(t).forRemote;
export const encryption = (t: VpnType) => get(t).encryption;
export const bestUse = (t: VpnType) => get(t).bestUse;
export const vpnTypes = (): VpnType[] => Object.keys(DATA) as VpnType[];
