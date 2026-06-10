export type SensorType = "lidar" | "ultrasonic" | "infrared" | "pressure" | "accelerometer";

export function rangeMeters(s: SensorType): number {
  const m: Record<SensorType, number> = {
    lidar: 200, ultrasonic: 5, infrared: 10, pressure: 0, accelerometer: 0,
  };
  return m[s];
}

export function accuracyScore(s: SensorType): number {
  const m: Record<SensorType, number> = {
    lidar: 10, ultrasonic: 5, infrared: 6, pressure: 8, accelerometer: 7,
  };
  return m[s];
}

export function costPerUnit(s: SensorType): number {
  const m: Record<SensorType, number> = {
    lidar: 10, ultrasonic: 1, infrared: 2, pressure: 3, accelerometer: 4,
  };
  return m[s];
}

export function powerConsumptionMw(s: SensorType): number {
  const m: Record<SensorType, number> = {
    lidar: 500, ultrasonic: 20, infrared: 50, pressure: 5, accelerometer: 10,
  };
  return m[s];
}

export function responseTimeMs(s: SensorType): number {
  const m: Record<SensorType, number> = {
    lidar: 10, ultrasonic: 30, infrared: 5, pressure: 2, accelerometer: 1,
  };
  return m[s];
}

export function contactRequired(s: SensorType): boolean {
  const m: Record<SensorType, boolean> = {
    lidar: false, ultrasonic: false, infrared: false, pressure: true, accelerometer: true,
  };
  return m[s];
}

export function weatherAffected(s: SensorType): boolean {
  const m: Record<SensorType, boolean> = {
    lidar: true, ultrasonic: true, infrared: true, pressure: false, accelerometer: false,
  };
  return m[s];
}

export function measuredQuantity(s: SensorType): string {
  const m: Record<SensorType, string> = {
    lidar: "distance_3d_map", ultrasonic: "distance",
    infrared: "proximity_temperature", pressure: "force_per_area",
    accelerometer: "acceleration",
  };
  return m[s];
}

export function commonUseCase(s: SensorType): string {
  const m: Record<SensorType, string> = {
    lidar: "autonomous_vehicles", ultrasonic: "parking_sensors",
    infrared: "motion_detection", pressure: "industrial_monitoring",
    accelerometer: "phone_orientation",
  };
  return m[s];
}

export function sensorTypes(): SensorType[] {
  return ["lidar", "ultrasonic", "infrared", "pressure", "accelerometer"];
}
