export type TrafficSignal = "fixed_time" | "actuated" | "adaptive" | "roundabout_metering" | "ramp_metering";

export function throughputCapacity(s: TrafficSignal): number {
  const m: Record<TrafficSignal, number> = {
    fixed_time: 5, actuated: 7, adaptive: 10, roundabout_metering: 6, ramp_metering: 8,
  };
  return m[s];
}

export function installCost(s: TrafficSignal): number {
  const m: Record<TrafficSignal, number> = {
    fixed_time: 3, actuated: 6, adaptive: 10, roundabout_metering: 7, ramp_metering: 5,
  };
  return m[s];
}

export function maintenanceComplexity(s: TrafficSignal): number {
  const m: Record<TrafficSignal, number> = {
    fixed_time: 2, actuated: 5, adaptive: 9, roundabout_metering: 4, ramp_metering: 6,
  };
  return m[s];
}

export function congestionReduction(s: TrafficSignal): number {
  const m: Record<TrafficSignal, number> = {
    fixed_time: 3, actuated: 6, adaptive: 10, roundabout_metering: 7, ramp_metering: 8,
  };
  return m[s];
}

export function pedestrianSafety(s: TrafficSignal): number {
  const m: Record<TrafficSignal, number> = {
    fixed_time: 7, actuated: 8, adaptive: 9, roundabout_metering: 5, ramp_metering: 3,
  };
  return m[s];
}

export function requiresSensors(s: TrafficSignal): boolean {
  const m: Record<TrafficSignal, boolean> = {
    fixed_time: false, actuated: true, adaptive: true, roundabout_metering: true, ramp_metering: true,
  };
  return m[s];
}

export function networkConnected(s: TrafficSignal): boolean {
  const m: Record<TrafficSignal, boolean> = {
    fixed_time: false, actuated: false, adaptive: true, roundabout_metering: false, ramp_metering: true,
  };
  return m[s];
}

export function controlAlgorithm(s: TrafficSignal): string {
  const m: Record<TrafficSignal, string> = {
    fixed_time: "preset_cycle_plan", actuated: "loop_detector_response",
    adaptive: "real_time_optimization", roundabout_metering: "gap_acceptance",
    ramp_metering: "queue_flush_rate_limit",
  };
  return m[s];
}

export function bestApplication(s: TrafficSignal): string {
  const m: Record<TrafficSignal, string> = {
    fixed_time: "low_volume_predictable", actuated: "moderate_variable_volume",
    adaptive: "high_volume_corridor", roundabout_metering: "multilane_roundabout",
    ramp_metering: "freeway_on_ramp",
  };
  return m[s];
}

export function trafficSignals(): TrafficSignal[] {
  return ["fixed_time", "actuated", "adaptive", "roundabout_metering", "ramp_metering"];
}
