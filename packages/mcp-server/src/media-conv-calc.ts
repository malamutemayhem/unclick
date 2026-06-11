export type MediaConvType =
  | "fiber_to_copper_1g"
  | "fiber_to_fiber_mode"
  | "poe_media_converter"
  | "managed_snmp_conv"
  | "industrial_din_conv";

const DATA: Record<MediaConvType, {
  throughput: number; portCount: number; reliability: number;
  manageability: number; convCost: number; managed: boolean;
  forIndustrial: boolean; conversionType: string; bestUse: string;
}> = {
  fiber_to_copper_1g: { throughput: 7, portCount: 4, reliability: 7, manageability: 2, convCost: 3, managed: false, forIndustrial: false, conversionType: "fiber_rj45_bridge", bestUse: "extend_copper_via_fiber" },
  fiber_to_fiber_mode: { throughput: 8, portCount: 3, reliability: 8, manageability: 3, convCost: 5, managed: false, forIndustrial: false, conversionType: "sm_mm_wavelength", bestUse: "multimode_singlemode_join" },
  poe_media_converter: { throughput: 7, portCount: 4, reliability: 7, manageability: 2, convCost: 5, managed: false, forIndustrial: false, conversionType: "fiber_poe_inject", bestUse: "remote_camera_poe_feed" },
  managed_snmp_conv: { throughput: 8, portCount: 6, reliability: 9, manageability: 10, convCost: 8, managed: true, forIndustrial: false, conversionType: "chassis_managed_slot", bestUse: "enterprise_managed_fleet" },
  industrial_din_conv: { throughput: 7, portCount: 4, reliability: 10, manageability: 5, convCost: 9, managed: false, forIndustrial: true, conversionType: "hardened_din_fiber", bestUse: "factory_harsh_env_link" },
};

const get = (t: MediaConvType) => DATA[t];

export const throughput = (t: MediaConvType) => get(t).throughput;
export const portCount = (t: MediaConvType) => get(t).portCount;
export const reliability = (t: MediaConvType) => get(t).reliability;
export const manageability = (t: MediaConvType) => get(t).manageability;
export const convCost = (t: MediaConvType) => get(t).convCost;
export const managed = (t: MediaConvType) => get(t).managed;
export const forIndustrial = (t: MediaConvType) => get(t).forIndustrial;
export const conversionType = (t: MediaConvType) => get(t).conversionType;
export const bestUse = (t: MediaConvType) => get(t).bestUse;
export const mediaConverters = (): MediaConvType[] => Object.keys(DATA) as MediaConvType[];
