export type ValveType = "ball" | "gate" | "check" | "butterfly" | "globe";

export function flowControl(v: ValveType): number {
  const m: Record<ValveType, number> = {
    ball: 5, gate: 4, check: 3, butterfly: 8, globe: 10,
  };
  return m[v];
}

export function shutoffSpeed(v: ValveType): number {
  const m: Record<ValveType, number> = {
    ball: 10, gate: 3, check: 8, butterfly: 9, globe: 5,
  };
  return m[v];
}

export function pressureDrop(v: ValveType): number {
  const m: Record<ValveType, number> = {
    ball: 2, gate: 1, check: 5, butterfly: 3, globe: 8,
  };
  return m[v];
}

export function durability(v: ValveType): number {
  const m: Record<ValveType, number> = {
    ball: 9, gate: 7, check: 6, butterfly: 7, globe: 8,
  };
  return m[v];
}

export function costScore(v: ValveType): number {
  const m: Record<ValveType, number> = {
    ball: 5, gate: 4, check: 3, butterfly: 6, globe: 7,
  };
  return m[v];
}

export function quarterTurn(v: ValveType): boolean {
  const m: Record<ValveType, boolean> = {
    ball: true, gate: false, check: false, butterfly: true, globe: false,
  };
  return m[v];
}

export function preventsBackflow(v: ValveType): boolean {
  const m: Record<ValveType, boolean> = {
    ball: false, gate: false, check: true, butterfly: false, globe: false,
  };
  return m[v];
}

export function bestUse(v: ValveType): string {
  const m: Record<ValveType, string> = {
    ball: "on_off_isolation", gate: "full_flow_isolation",
    check: "backflow_prevention", butterfly: "large_pipe_throttling",
    globe: "precise_flow_regulation",
  };
  return m[v];
}

export function operatorType(v: ValveType): string {
  const m: Record<ValveType, string> = {
    ball: "lever_handle", gate: "handwheel_rising_stem",
    check: "automatic_gravity", butterfly: "lever_or_gear",
    globe: "handwheel",
  };
  return m[v];
}

export function valveTypes(): ValveType[] {
  return ["ball", "gate", "check", "butterfly", "globe"];
}
