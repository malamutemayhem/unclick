export type FlightPhase = "takeoff" | "climb" | "cruise" | "descent" | "landing";

export function fuelBurnRate(f: FlightPhase): number {
  const m: Record<FlightPhase, number> = {
    takeoff: 10, climb: 8, cruise: 4, descent: 2, landing: 6,
  };
  return m[f];
}

export function pilotWorkload(f: FlightPhase): number {
  const m: Record<FlightPhase, number> = {
    takeoff: 9, climb: 6, cruise: 3, descent: 5, landing: 10,
  };
  return m[f];
}

export function accidentRisk(f: FlightPhase): number {
  const m: Record<FlightPhase, number> = {
    takeoff: 7, climb: 4, cruise: 1, descent: 3, landing: 10,
  };
  return m[f];
}

export function durationPercent(f: FlightPhase): number {
  const m: Record<FlightPhase, number> = {
    takeoff: 2, climb: 12, cruise: 70, descent: 12, landing: 4,
  };
  return m[f];
}

export function altitudeChangeRate(f: FlightPhase): number {
  const m: Record<FlightPhase, number> = {
    takeoff: 9, climb: 8, cruise: 1, descent: 7, landing: 10,
  };
  return m[f];
}

export function autopilotAvailable(f: FlightPhase): boolean {
  const m: Record<FlightPhase, boolean> = {
    takeoff: false, climb: true, cruise: true, descent: true, landing: true,
  };
  return m[f];
}

export function communicationCritical(f: FlightPhase): boolean {
  const m: Record<FlightPhase, boolean> = {
    takeoff: true, climb: false, cruise: false, descent: false, landing: true,
  };
  return m[f];
}

export function primaryConcern(f: FlightPhase): string {
  const m: Record<FlightPhase, string> = {
    takeoff: "engine_failure", climb: "obstacle_clearance",
    cruise: "fuel_efficiency", descent: "traffic_separation",
    landing: "runway_alignment",
  };
  return m[f];
}

export function typicalSpeedKnots(f: FlightPhase): string {
  const m: Record<FlightPhase, string> = {
    takeoff: "130_160", climb: "250_300",
    cruise: "450_500", descent: "250_300",
    landing: "130_150",
  };
  return m[f];
}

export function flightPhases(): FlightPhase[] {
  return ["takeoff", "climb", "cruise", "descent", "landing"];
}
