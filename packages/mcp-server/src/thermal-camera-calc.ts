export type ThermalCameraType =
  | "smartphone_attachment"
  | "handheld_inspecting"
  | "fixed_mount_process"
  | "high_res_research"
  | "drone_aerial_survey";

const DATA: Record<ThermalCameraType, {
  resolution: number; tempRange: number; accuracy: number;
  portability: number; cameraCost: number; radiometric: boolean;
  forAutomation: boolean; detectorType: string; bestUse: string;
}> = {
  smartphone_attachment: { resolution: 3, tempRange: 4, accuracy: 4, portability: 10, cameraCost: 2, radiometric: false, forAutomation: false, detectorType: "microbolometer_80x60", bestUse: "quick_thermal_scan" },
  handheld_inspecting: { resolution: 6, tempRange: 7, accuracy: 7, portability: 8, cameraCost: 5, radiometric: true, forAutomation: false, detectorType: "vox_320x240", bestUse: "electrical_panel_inspect" },
  fixed_mount_process: { resolution: 6, tempRange: 9, accuracy: 9, portability: 2, cameraCost: 7, radiometric: true, forAutomation: true, detectorType: "cooled_insb_focal", bestUse: "production_line_monitor" },
  high_res_research: { resolution: 10, tempRange: 10, accuracy: 10, portability: 3, cameraCost: 10, radiometric: true, forAutomation: false, detectorType: "cooled_mczt_1024", bestUse: "rd_thermal_analysis" },
  drone_aerial_survey: { resolution: 7, tempRange: 6, accuracy: 6, portability: 6, cameraCost: 8, radiometric: true, forAutomation: false, detectorType: "uncooled_640x512", bestUse: "rooftop_solar_survey" },
};

const get = (t: ThermalCameraType) => DATA[t];

export const resolution = (t: ThermalCameraType) => get(t).resolution;
export const tempRange = (t: ThermalCameraType) => get(t).tempRange;
export const accuracy = (t: ThermalCameraType) => get(t).accuracy;
export const portability = (t: ThermalCameraType) => get(t).portability;
export const cameraCost = (t: ThermalCameraType) => get(t).cameraCost;
export const radiometric = (t: ThermalCameraType) => get(t).radiometric;
export const forAutomation = (t: ThermalCameraType) => get(t).forAutomation;
export const detectorType = (t: ThermalCameraType) => get(t).detectorType;
export const bestUse = (t: ThermalCameraType) => get(t).bestUse;
export const thermalCameras = (): ThermalCameraType[] => Object.keys(DATA) as ThermalCameraType[];
