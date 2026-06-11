export type OrbitalWelderType =
  | "tube_to_tube"
  | "tube_to_sheet"
  | "pipe_orbital"
  | "micro_orbital"
  | "multi_pass";

interface OrbitalWelderData {
  weldQuality: number;
  throughput: number;
  repeatability: number;
  gapTolerance: number;
  owCost: number;
  automated: boolean;
  forPharma: boolean;
  welderConfig: string;
  bestUse: string;
}

const DATA: Record<OrbitalWelderType, OrbitalWelderData> = {
  tube_to_tube: {
    weldQuality: 9, throughput: 8, repeatability: 10, gapTolerance: 8, owCost: 7,
    automated: true, forPharma: true,
    welderConfig: "tube_to_tube_orbital_welder_enclosed_head_tig_purge_sanitary",
    bestUse: "pharma_pipe_tube_to_tube_orbital_welder_enclosed_head_sanitary",
  },
  tube_to_sheet: {
    weldQuality: 8, throughput: 7, repeatability: 9, gapTolerance: 7, owCost: 7,
    automated: true, forPharma: false,
    welderConfig: "tube_to_sheet_orbital_welder_open_head_flange_seal_exchanger",
    bestUse: "heat_exchanger_tube_to_sheet_orbital_welder_flange_seal_weld",
  },
  pipe_orbital: {
    weldQuality: 8, throughput: 5, repeatability: 9, gapTolerance: 8, owCost: 8,
    automated: true, forPharma: false,
    welderConfig: "pipe_orbital_welder_clamp_on_head_field_weld_large_bore_pipe",
    bestUse: "oil_gas_pipe_orbital_welder_clamp_on_field_weld_large_bore",
  },
  micro_orbital: {
    weldQuality: 10, throughput: 4, repeatability: 10, gapTolerance: 9, owCost: 9,
    automated: true, forPharma: true,
    welderConfig: "micro_orbital_welder_tiny_tube_sensor_assembly_medical_device",
    bestUse: "medical_sensor_micro_orbital_welder_tiny_tube_precise_assembly",
  },
  multi_pass: {
    weldQuality: 9, throughput: 3, repeatability: 9, gapTolerance: 9, owCost: 9,
    automated: true, forPharma: false,
    welderConfig: "multi_pass_orbital_welder_thick_wall_root_fill_cap_heavy_pipe",
    bestUse: "nuclear_pipe_multi_pass_orbital_welder_thick_wall_root_fill",
  },
};

function get(t: OrbitalWelderType): OrbitalWelderData {
  return DATA[t];
}

export const weldQuality = (t: OrbitalWelderType) => get(t).weldQuality;
export const throughput = (t: OrbitalWelderType) => get(t).throughput;
export const repeatability = (t: OrbitalWelderType) => get(t).repeatability;
export const gapTolerance = (t: OrbitalWelderType) => get(t).gapTolerance;
export const owCost = (t: OrbitalWelderType) => get(t).owCost;
export const automated = (t: OrbitalWelderType) => get(t).automated;
export const forPharma = (t: OrbitalWelderType) => get(t).forPharma;
export const welderConfig = (t: OrbitalWelderType) => get(t).welderConfig;
export const bestUse = (t: OrbitalWelderType) => get(t).bestUse;
export const orbitalWelderTypes = (): OrbitalWelderType[] =>
  Object.keys(DATA) as OrbitalWelderType[];
