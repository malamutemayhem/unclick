export type IceCoreMethod = "mechanical_drill" | "thermal_drill" | "hot_water" | "electromechanical" | "rapid_access";

export function depthCapability(m_param: IceCoreMethod): number {
  const m: Record<IceCoreMethod, number> = {
    mechanical_drill: 7, thermal_drill: 5, hot_water: 4, electromechanical: 10, rapid_access: 6,
  };
  return m[m_param];
}

export function coreQuality(m_param: IceCoreMethod): number {
  const m: Record<IceCoreMethod, number> = {
    mechanical_drill: 8, thermal_drill: 6, hot_water: 3, electromechanical: 10, rapid_access: 5,
  };
  return m[m_param];
}

export function drillingSpeed(m_param: IceCoreMethod): number {
  const m: Record<IceCoreMethod, number> = {
    mechanical_drill: 5, thermal_drill: 7, hot_water: 9, electromechanical: 4, rapid_access: 10,
  };
  return m[m_param];
}

export function equipmentWeight(m_param: IceCoreMethod): number {
  const m: Record<IceCoreMethod, number> = {
    mechanical_drill: 7, thermal_drill: 5, hot_water: 8, electromechanical: 10, rapid_access: 4,
  };
  return m[m_param];
}

export function operatingCost(m_param: IceCoreMethod): number {
  const m: Record<IceCoreMethod, number> = {
    mechanical_drill: 6, thermal_drill: 5, hot_water: 7, electromechanical: 10, rapid_access: 4,
  };
  return m[m_param];
}

export function preservesBubbles(m_param: IceCoreMethod): boolean {
  const m: Record<IceCoreMethod, boolean> = {
    mechanical_drill: true, thermal_drill: false, hot_water: false, electromechanical: true, rapid_access: true,
  };
  return m[m_param];
}

export function fieldDeployable(m_param: IceCoreMethod): boolean {
  const m: Record<IceCoreMethod, boolean> = {
    mechanical_drill: true, thermal_drill: true, hot_water: false, electromechanical: false, rapid_access: true,
  };
  return m[m_param];
}

export function cuttingMechanism(m_param: IceCoreMethod): string {
  const m: Record<IceCoreMethod, string> = {
    mechanical_drill: "rotating_cutter_head", thermal_drill: "heated_ring_melt",
    hot_water: "pressurized_water_jet", electromechanical: "powered_drill_fluid",
    rapid_access: "lightweight_auger",
  };
  return m[m_param];
}

export function bestApplication(m_param: IceCoreMethod): string {
  const m: Record<IceCoreMethod, string> = {
    mechanical_drill: "shallow_firn_survey", thermal_drill: "temperate_glacier",
    hot_water: "borehole_access_subglacial", electromechanical: "deep_ice_sheet_record",
    rapid_access: "reconnaissance_sampling",
  };
  return m[m_param];
}

export function iceCoreMethods(): IceCoreMethod[] {
  return ["mechanical_drill", "thermal_drill", "hot_water", "electromechanical", "rapid_access"];
}
