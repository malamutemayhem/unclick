export type OpticalFiber = "single_mode" | "multimode" | "plastic" | "photonic_crystal" | "hollow_core";

export function bandwidth(f: OpticalFiber): number {
  const m: Record<OpticalFiber, number> = {
    single_mode: 10, multimode: 6, plastic: 3, photonic_crystal: 9, hollow_core: 8,
  };
  return m[f];
}

export function maxDistance(f: OpticalFiber): number {
  const m: Record<OpticalFiber, number> = {
    single_mode: 10, multimode: 5, plastic: 2, photonic_crystal: 7, hollow_core: 6,
  };
  return m[f];
}

export function signalLoss(f: OpticalFiber): number {
  const m: Record<OpticalFiber, number> = {
    single_mode: 2, multimode: 5, plastic: 9, photonic_crystal: 3, hollow_core: 4,
  };
  return m[f];
}

export function installEase(f: OpticalFiber): number {
  const m: Record<OpticalFiber, number> = {
    single_mode: 4, multimode: 7, plastic: 10, photonic_crystal: 3, hollow_core: 3,
  };
  return m[f];
}

export function costPerMeter(f: OpticalFiber): number {
  const m: Record<OpticalFiber, number> = {
    single_mode: 5, multimode: 4, plastic: 2, photonic_crystal: 10, hollow_core: 9,
  };
  return m[f];
}

export function bendResistant(f: OpticalFiber): boolean {
  const m: Record<OpticalFiber, boolean> = {
    single_mode: false, multimode: true, plastic: true, photonic_crystal: false, hollow_core: false,
  };
  return m[f];
}

export function telecomGrade(f: OpticalFiber): boolean {
  const m: Record<OpticalFiber, boolean> = {
    single_mode: true, multimode: true, plastic: false, photonic_crystal: false, hollow_core: false,
  };
  return m[f];
}

export function primaryUse(f: OpticalFiber): string {
  const m: Record<OpticalFiber, string> = {
    single_mode: "long_haul_telecom", multimode: "data_center_lan",
    plastic: "consumer_automotive", photonic_crystal: "sensing_research",
    hollow_core: "ultrafast_laser_delivery",
  };
  return m[f];
}

export function coreDiameter(f: OpticalFiber): string {
  const m: Record<OpticalFiber, string> = {
    single_mode: "8_to_10_microns", multimode: "50_to_62_microns",
    plastic: "1mm", photonic_crystal: "varies_by_design",
    hollow_core: "10_to_30_microns",
  };
  return m[f];
}

export function opticalFibers(): OpticalFiber[] {
  return ["single_mode", "multimode", "plastic", "photonic_crystal", "hollow_core"];
}
