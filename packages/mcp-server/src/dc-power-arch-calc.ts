export type DcPowerArch =
  | "ac_48v_dc"
  | "hvdc_380v"
  | "ac_ups_pdu"
  | "dc_bus_48v_direct"
  | "fuel_cell_dc";

const DATA: Record<DcPowerArch, {
  efficiency: number; reliability: number; density: number;
  flexibility: number; archCost: number; dcDistribution: boolean;
  forEdge: boolean; conversion: string; bestUse: string;
}> = {
  ac_48v_dc: {
    efficiency: 6, reliability: 8, density: 6,
    flexibility: 8, archCost: 5, dcDistribution: true,
    forEdge: false, conversion: "ac_rectifier_48v_bus",
    bestUse: "telecom_central_office",
  },
  hvdc_380v: {
    efficiency: 9, reliability: 8, density: 8,
    flexibility: 6, archCost: 7, dcDistribution: true,
    forEdge: false, conversion: "380v_dc_bus_point_load",
    bestUse: "hyperscale_efficiency",
  },
  ac_ups_pdu: {
    efficiency: 5, reliability: 9, density: 5,
    flexibility: 9, archCost: 6, dcDistribution: false,
    forEdge: false, conversion: "ac_ups_xfmr_pdu",
    bestUse: "traditional_enterprise",
  },
  dc_bus_48v_direct: {
    efficiency: 8, reliability: 7, density: 9,
    flexibility: 5, archCost: 4, dcDistribution: true,
    forEdge: true, conversion: "48v_direct_to_cpu",
    bestUse: "google_48v_rack",
  },
  fuel_cell_dc: {
    efficiency: 7, reliability: 6, density: 4,
    flexibility: 4, archCost: 9, dcDistribution: true,
    forEdge: true, conversion: "hydrogen_pem_dc_direct",
    bestUse: "zero_carbon_edge_site",
  },
};

const get = (t: DcPowerArch) => DATA[t];

export const efficiency = (t: DcPowerArch) => get(t).efficiency;
export const reliability = (t: DcPowerArch) => get(t).reliability;
export const density = (t: DcPowerArch) => get(t).density;
export const flexibility = (t: DcPowerArch) => get(t).flexibility;
export const archCost = (t: DcPowerArch) => get(t).archCost;
export const dcDistribution = (t: DcPowerArch) => get(t).dcDistribution;
export const forEdge = (t: DcPowerArch) => get(t).forEdge;
export const conversion = (t: DcPowerArch) => get(t).conversion;
export const bestUse = (t: DcPowerArch) => get(t).bestUse;
export const dcPowerArchs = (): DcPowerArch[] => Object.keys(DATA) as DcPowerArch[];
