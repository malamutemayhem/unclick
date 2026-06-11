export type WaveSolderType =
  | "single_wave_basic"
  | "dual_wave_smd"
  | "selective_mini_wave"
  | "nitrogen_inert_wave"
  | "leadfree_high_temp";

const DATA: Record<WaveSolderType, {
  throughput: number; jointQuality: number; defectRate: number;
  flexibility: number; machineCost: number; leadFree: boolean;
  selective: boolean; waveType: string; bestUse: string;
}> = {
  single_wave_basic: { throughput: 8, jointQuality: 6, defectRate: 5, flexibility: 4, machineCost: 4, leadFree: false, selective: false, waveType: "laminar_single_wave", bestUse: "through_hole_mass_solder" },
  dual_wave_smd: { throughput: 9, jointQuality: 8, defectRate: 7, flexibility: 5, machineCost: 7, leadFree: false, selective: false, waveType: "turbulent_plus_laminar", bestUse: "mixed_tech_board_solder" },
  selective_mini_wave: { throughput: 5, jointQuality: 9, defectRate: 9, flexibility: 10, machineCost: 8, leadFree: true, selective: true, waveType: "programmable_mini_nozzle", bestUse: "selective_through_hole" },
  nitrogen_inert_wave: { throughput: 8, jointQuality: 9, defectRate: 8, flexibility: 5, machineCost: 8, leadFree: true, selective: false, waveType: "n2_blanketed_wave", bestUse: "oxide_free_leadfree_wave" },
  leadfree_high_temp: { throughput: 7, jointQuality: 7, defectRate: 6, flexibility: 4, machineCost: 6, leadFree: true, selective: false, waveType: "high_temp_sac_wave", bestUse: "rohs_compliance_wave" },
};

const get = (t: WaveSolderType) => DATA[t];

export const throughput = (t: WaveSolderType) => get(t).throughput;
export const jointQuality = (t: WaveSolderType) => get(t).jointQuality;
export const defectRate = (t: WaveSolderType) => get(t).defectRate;
export const flexibility = (t: WaveSolderType) => get(t).flexibility;
export const machineCost = (t: WaveSolderType) => get(t).machineCost;
export const leadFree = (t: WaveSolderType) => get(t).leadFree;
export const selective = (t: WaveSolderType) => get(t).selective;
export const waveType = (t: WaveSolderType) => get(t).waveType;
export const bestUse = (t: WaveSolderType) => get(t).bestUse;
export const waveSolders = (): WaveSolderType[] => Object.keys(DATA) as WaveSolderType[];
