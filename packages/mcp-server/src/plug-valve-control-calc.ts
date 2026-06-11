export type PlugValveControlType =
  | "lubricated_plug_std"
  | "non_lubricated_ptfe"
  | "eccentric_plug_rotary"
  | "multiport_plug_divert"
  | "lined_plug_corrosive";

interface PlugValveControlData {
  flowCapacity: number;
  tightShutoff: number;
  abrasionResist: number;
  operatingTorque: number;
  pvCost: number;
  multiport: boolean;
  forDiverting: boolean;
  plug: string;
  bestUse: string;
}

const DATA: Record<PlugValveControlType, PlugValveControlData> = {
  lubricated_plug_std: {
    flowCapacity: 9, tightShutoff: 8, abrasionResist: 8, operatingTorque: 6, pvCost: 5,
    multiport: false, forDiverting: false,
    plug: "tapered_plug_lubricated_grease_injection_seal",
    bestUse: "oil_gas_pipeline_dirty_service_on_off_isolation",
  },
  non_lubricated_ptfe: {
    flowCapacity: 8, tightShutoff: 9, abrasionResist: 6, operatingTorque: 8, pvCost: 6,
    multiport: false, forDiverting: false,
    plug: "ptfe_sleeved_plug_non_lubricated_chemical",
    bestUse: "chemical_plant_corrosive_service_maintenance_free",
  },
  eccentric_plug_rotary: {
    flowCapacity: 8, tightShutoff: 9, abrasionResist: 7, operatingTorque: 9, pvCost: 7,
    multiport: false, forDiverting: false,
    plug: "eccentric_rotation_plug_cam_action_seat_lift",
    bestUse: "process_control_modulating_throttling_service",
  },
  multiport_plug_divert: {
    flowCapacity: 7, tightShutoff: 7, abrasionResist: 7, operatingTorque: 5, pvCost: 8,
    multiport: true, forDiverting: true,
    plug: "multi_port_plug_three_way_four_way_diverter",
    bestUse: "sampling_diverting_blending_multi_destination",
  },
  lined_plug_corrosive: {
    flowCapacity: 7, tightShutoff: 8, abrasionResist: 5, operatingTorque: 7, pvCost: 7,
    multiport: false, forDiverting: false,
    plug: "pfa_or_pp_lined_plug_body_corrosion_barrier",
    bestUse: "acid_caustic_chlorine_highly_corrosive_service",
  },
};

function get(t: PlugValveControlType): PlugValveControlData {
  return DATA[t];
}

export const flowCapacity = (t: PlugValveControlType) => get(t).flowCapacity;
export const tightShutoff = (t: PlugValveControlType) => get(t).tightShutoff;
export const abrasionResist = (t: PlugValveControlType) => get(t).abrasionResist;
export const operatingTorque = (t: PlugValveControlType) => get(t).operatingTorque;
export const pvCost = (t: PlugValveControlType) => get(t).pvCost;
export const multiport = (t: PlugValveControlType) => get(t).multiport;
export const forDiverting = (t: PlugValveControlType) => get(t).forDiverting;
export const plug = (t: PlugValveControlType) => get(t).plug;
export const bestUse = (t: PlugValveControlType) => get(t).bestUse;
export const plugValveControlTypes = (): PlugValveControlType[] =>
  Object.keys(DATA) as PlugValveControlType[];
