export type FlightControl = "aileron" | "elevator" | "rudder" | "flap" | "spoiler";

export function rollAuthority(c: FlightControl): number {
  const m: Record<FlightControl, number> = {
    aileron: 10, elevator: 0, rudder: 2, flap: 1, spoiler: 5,
  };
  return m[c];
}

export function pitchAuthority(c: FlightControl): number {
  const m: Record<FlightControl, number> = {
    aileron: 0, elevator: 10, rudder: 0, flap: 3, spoiler: 2,
  };
  return m[c];
}

export function yawAuthority(c: FlightControl): number {
  const m: Record<FlightControl, number> = {
    aileron: 1, elevator: 0, rudder: 10, flap: 0, spoiler: 3,
  };
  return m[c];
}

export function dragIncrease(c: FlightControl): number {
  const m: Record<FlightControl, number> = {
    aileron: 2, elevator: 2, rudder: 3, flap: 8, spoiler: 10,
  };
  return m[c];
}

export function deflectionRangeDegrees(c: FlightControl): number {
  const m: Record<FlightControl, number> = {
    aileron: 25, elevator: 30, rudder: 30, flap: 40, spoiler: 60,
  };
  return m[c];
}

export function primarySurface(c: FlightControl): boolean {
  const m: Record<FlightControl, boolean> = {
    aileron: true, elevator: true, rudder: true, flap: false, spoiler: false,
  };
  return m[c];
}

export function usedInLanding(c: FlightControl): boolean {
  const m: Record<FlightControl, boolean> = {
    aileron: true, elevator: true, rudder: true, flap: true, spoiler: true,
  };
  return m[c];
}

export function mountLocation(c: FlightControl): string {
  const m: Record<FlightControl, string> = {
    aileron: "wing_trailing_edge", elevator: "horizontal_stabilizer",
    rudder: "vertical_stabilizer", flap: "wing_inboard",
    spoiler: "wing_upper_surface",
  };
  return m[c];
}

export function responseTime(c: FlightControl): number {
  const m: Record<FlightControl, number> = {
    aileron: 9, elevator: 9, rudder: 8, flap: 4, spoiler: 7,
  };
  return m[c];
}

export function flightControls(): FlightControl[] {
  return ["aileron", "elevator", "rudder", "flap", "spoiler"];
}
