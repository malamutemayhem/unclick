export type MicroscopeType = "compound" | "stereo" | "electron" | "fluorescence" | "confocal";

export function magnificationMax(m_: MicroscopeType): number {
  const m: Record<MicroscopeType, number> = {
    compound: 6, stereo: 3, electron: 10, fluorescence: 7, confocal: 8,
  };
  return m[m_];
}

export function resolutionPower(m_: MicroscopeType): number {
  const m: Record<MicroscopeType, number> = {
    compound: 6, stereo: 3, electron: 10, fluorescence: 7, confocal: 9,
  };
  return m[m_];
}

export function samplePrepComplexity(m_: MicroscopeType): number {
  const m: Record<MicroscopeType, number> = {
    compound: 5, stereo: 2, electron: 10, fluorescence: 7, confocal: 8,
  };
  return m[m_];
}

export function costLevel(m_: MicroscopeType): number {
  const m: Record<MicroscopeType, number> = {
    compound: 3, stereo: 4, electron: 10, fluorescence: 7, confocal: 9,
  };
  return m[m_];
}

export function easeOfUse(m_: MicroscopeType): number {
  const m: Record<MicroscopeType, number> = {
    compound: 8, stereo: 10, electron: 3, fluorescence: 5, confocal: 4,
  };
  return m[m_];
}

export function liveSampleViewing(m_: MicroscopeType): boolean {
  const m: Record<MicroscopeType, boolean> = {
    compound: true, stereo: true, electron: false, fluorescence: true, confocal: true,
  };
  return m[m_];
}

export function requires3dImaging(m_: MicroscopeType): boolean {
  const m: Record<MicroscopeType, boolean> = {
    compound: false, stereo: true, electron: false, fluorescence: false, confocal: true,
  };
  return m[m_];
}

export function primaryApplication(m_: MicroscopeType): string {
  const m: Record<MicroscopeType, string> = {
    compound: "biology_histology", stereo: "dissection_inspection",
    electron: "nanotechnology_materials", fluorescence: "cell_biology_immunology",
    confocal: "3d_tissue_imaging",
  };
  return m[m_];
}

export function illuminationSource(m_: MicroscopeType): string {
  const m: Record<MicroscopeType, string> = {
    compound: "visible_light", stereo: "reflected_transmitted_light",
    electron: "electron_beam", fluorescence: "uv_laser_excitation",
    confocal: "laser_point_scanning",
  };
  return m[m_];
}

export function microscopeTypes(): MicroscopeType[] {
  return ["compound", "stereo", "electron", "fluorescence", "confocal"];
}
