export type EthernetPhy =
  | "base_t_copper"
  | "base_sr_multimode"
  | "base_lr_singlemode"
  | "base_cr_dac"
  | "base_t1_automotive";

const DATA: Record<EthernetPhy, {
  dataRate: number; reach: number; latency: number;
  powerEff: number; phyCost: number; magsafe: boolean;
  forIndustrial: boolean; medium: string; bestUse: string;
}> = {
  base_t_copper: {
    dataRate: 6, reach: 7, latency: 7,
    powerEff: 6, phyCost: 3, magsafe: true,
    forIndustrial: true, medium: "cat6a_twisted_pair",
    bestUse: "enterprise_desktop_lan",
  },
  base_sr_multimode: {
    dataRate: 9, reach: 4, latency: 9,
    powerEff: 7, phyCost: 6, magsafe: false,
    forIndustrial: false, medium: "om4_850nm_vcsel",
    bestUse: "datacenter_tor_switch",
  },
  base_lr_singlemode: {
    dataRate: 9, reach: 10, latency: 9,
    powerEff: 6, phyCost: 8, magsafe: false,
    forIndustrial: false, medium: "smf_1310nm_dfb",
    bestUse: "campus_backbone_link",
  },
  base_cr_dac: {
    dataRate: 10, reach: 2, latency: 10,
    powerEff: 10, phyCost: 4, magsafe: false,
    forIndustrial: false, medium: "twinax_copper_passive",
    bestUse: "rack_internal_interconnect",
  },
  base_t1_automotive: {
    dataRate: 4, reach: 5, latency: 6,
    powerEff: 8, phyCost: 5, magsafe: false,
    forIndustrial: true, medium: "single_pair_utp",
    bestUse: "vehicle_sensor_backbone",
  },
};

const get = (t: EthernetPhy) => DATA[t];

export const dataRate = (t: EthernetPhy) => get(t).dataRate;
export const reach = (t: EthernetPhy) => get(t).reach;
export const latency = (t: EthernetPhy) => get(t).latency;
export const powerEff = (t: EthernetPhy) => get(t).powerEff;
export const phyCost = (t: EthernetPhy) => get(t).phyCost;
export const magsafe = (t: EthernetPhy) => get(t).magsafe;
export const forIndustrial = (t: EthernetPhy) => get(t).forIndustrial;
export const medium = (t: EthernetPhy) => get(t).medium;
export const bestUse = (t: EthernetPhy) => get(t).bestUse;
export const ethernetPhys = (): EthernetPhy[] => Object.keys(DATA) as EthernetPhy[];
