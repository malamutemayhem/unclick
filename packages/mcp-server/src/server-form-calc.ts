export type ServerForm =
  | "rack_1u_dual"
  | "rack_2u_gpu"
  | "blade_chassis"
  | "edge_rugged"
  | "ocp_open_rack";

const DATA: Record<ServerForm, {
  density: number; airflow: number; expansion: number;
  serviceability: number; formCost: number; toolless: boolean;
  forAi: boolean; standard: string; bestUse: string;
}> = {
  rack_1u_dual: {
    density: 8, airflow: 5, expansion: 4,
    serviceability: 6, formCost: 5, toolless: true,
    forAi: false, standard: "eia_19in_1u_socket",
    bestUse: "web_tier_scale_out",
  },
  rack_2u_gpu: {
    density: 7, airflow: 7, expansion: 8,
    serviceability: 7, formCost: 7, toolless: true,
    forAi: true, standard: "eia_19in_2u_8gpu",
    bestUse: "ai_training_inference",
  },
  blade_chassis: {
    density: 9, airflow: 6, expansion: 5,
    serviceability: 8, formCost: 8, toolless: true,
    forAi: false, standard: "proprietary_blade_bus",
    bestUse: "vdi_hpc_consolidate",
  },
  edge_rugged: {
    density: 3, airflow: 4, expansion: 3,
    serviceability: 4, formCost: 6, toolless: false,
    forAi: false, standard: "ip65_fanless_short",
    bestUse: "factory_floor_telco",
  },
  ocp_open_rack: {
    density: 9, airflow: 8, expansion: 7,
    serviceability: 9, formCost: 4, toolless: true,
    forAi: true, standard: "ocp_21in_ou_power",
    bestUse: "hyperscale_custom",
  },
};

const get = (t: ServerForm) => DATA[t];

export const density = (t: ServerForm) => get(t).density;
export const airflow = (t: ServerForm) => get(t).airflow;
export const expansion = (t: ServerForm) => get(t).expansion;
export const serviceability = (t: ServerForm) => get(t).serviceability;
export const formCost = (t: ServerForm) => get(t).formCost;
export const toolless = (t: ServerForm) => get(t).toolless;
export const forAi = (t: ServerForm) => get(t).forAi;
export const standard = (t: ServerForm) => get(t).standard;
export const bestUse = (t: ServerForm) => get(t).bestUse;
export const serverForms = (): ServerForm[] => Object.keys(DATA) as ServerForm[];
