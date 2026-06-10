export type AircraftWing = "straight" | "swept" | "delta" | "forward_swept" | "variable_sweep";

export function liftEfficiency(w: AircraftWing): number {
  const m: Record<AircraftWing, number> = {
    straight: 9, swept: 7, delta: 6, forward_swept: 8, variable_sweep: 7,
  };
  return m[w];
}

export function highSpeedPerformance(w: AircraftWing): number {
  const m: Record<AircraftWing, number> = {
    straight: 3, swept: 8, delta: 10, forward_swept: 7, variable_sweep: 9,
  };
  return m[w];
}

export function maneuverability(w: AircraftWing): number {
  const m: Record<AircraftWing, number> = {
    straight: 5, swept: 6, delta: 9, forward_swept: 10, variable_sweep: 7,
  };
  return m[w];
}

export function structuralWeight(w: AircraftWing): number {
  const m: Record<AircraftWing, number> = {
    straight: 3, swept: 5, delta: 6, forward_swept: 8, variable_sweep: 10,
  };
  return m[w];
}

export function fuelCapacity(w: AircraftWing): number {
  const m: Record<AircraftWing, number> = {
    straight: 5, swept: 7, delta: 10, forward_swept: 5, variable_sweep: 8,
  };
  return m[w];
}

export function supersonicCapable(w: AircraftWing): boolean {
  const m: Record<AircraftWing, boolean> = {
    straight: false, swept: false, delta: true, forward_swept: true, variable_sweep: true,
  };
  return m[w];
}

export function lowSpeedStable(w: AircraftWing): boolean {
  const m: Record<AircraftWing, boolean> = {
    straight: true, swept: false, delta: false, forward_swept: false, variable_sweep: true,
  };
  return m[w];
}

export function typicalAircraft(w: AircraftWing): string {
  const m: Record<AircraftWing, string> = {
    straight: "cessna_172", swept: "boeing_737", delta: "concorde",
    forward_swept: "su_47", variable_sweep: "f14_tomcat",
  };
  return m[w];
}

export function aspectRatio(w: AircraftWing): number {
  const m: Record<AircraftWing, number> = {
    straight: 8, swept: 6, delta: 2, forward_swept: 5, variable_sweep: 4,
  };
  return m[w];
}

export function aircraftWings(): AircraftWing[] {
  return ["straight", "swept", "delta", "forward_swept", "variable_sweep"];
}
