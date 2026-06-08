export type DataUnit = "bits" | "bytes" | "KB" | "MB" | "GB" | "TB";
export type TimeUnit = "seconds" | "minutes" | "hours" | "days";

const DATA_MULTIPLIERS: Record<DataUnit, number> = {
  bits: 1,
  bytes: 8,
  KB: 8 * 1024,
  MB: 8 * 1024 * 1024,
  GB: 8 * 1024 * 1024 * 1024,
  TB: 8 * 1024 * 1024 * 1024 * 1024,
};

const TIME_MULTIPLIERS: Record<TimeUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
};

export class BandwidthCalculator {
  static convertData(value: number, from: DataUnit, to: DataUnit): number {
    const bits = value * DATA_MULTIPLIERS[from];
    return bits / DATA_MULTIPLIERS[to];
  }

  static transferTime(
    dataSize: number,
    dataUnit: DataUnit,
    bandwidth: number,
    bandwidthUnit: DataUnit,
    timeUnit: TimeUnit = "seconds",
  ): number {
    const dataBits = dataSize * DATA_MULTIPLIERS[dataUnit];
    const bitsPerSecond = bandwidth * DATA_MULTIPLIERS[bandwidthUnit];
    const seconds = dataBits / bitsPerSecond;
    return seconds / TIME_MULTIPLIERS[timeUnit];
  }

  static requiredBandwidth(
    dataSize: number,
    dataUnit: DataUnit,
    time: number,
    timeUnit: TimeUnit,
    resultUnit: DataUnit = "MB",
  ): number {
    const dataBits = dataSize * DATA_MULTIPLIERS[dataUnit];
    const seconds = time * TIME_MULTIPLIERS[timeUnit];
    const bitsPerSecond = dataBits / seconds;
    return bitsPerSecond / DATA_MULTIPLIERS[resultUnit];
  }

  static throughput(
    dataSize: number,
    dataUnit: DataUnit,
    time: number,
    timeUnit: TimeUnit,
    resultUnit: DataUnit = "MB",
  ): number {
    return BandwidthCalculator.requiredBandwidth(dataSize, dataUnit, time, timeUnit, resultUnit);
  }

  static monthlyUsage(
    bandwidthPerSecond: number,
    unit: DataUnit,
    hoursPerDay: number,
    resultUnit: DataUnit = "GB",
  ): number {
    const bitsPerSecond = bandwidthPerSecond * DATA_MULTIPLIERS[unit];
    const secondsPerMonth = hoursPerDay * 3600 * 30;
    const totalBits = bitsPerSecond * secondsPerMonth;
    return totalBits / DATA_MULTIPLIERS[resultUnit];
  }

  static formatSize(bytes: number): string {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    return `${value.toFixed(2)} ${units[unitIndex]}`;
  }

  static formatBitRate(bitsPerSecond: number): string {
    const units = ["bps", "Kbps", "Mbps", "Gbps", "Tbps"];
    let value = bitsPerSecond;
    let unitIndex = 0;
    while (value >= 1000 && unitIndex < units.length - 1) {
      value /= 1000;
      unitIndex++;
    }
    return `${value.toFixed(2)} ${units[unitIndex]}`;
  }

  static latencyImpact(
    bandwidth: number,
    bandwidthUnit: DataUnit,
    latency: number,
    packetSize: number = 1500,
  ): { effectiveThroughput: number; overhead: number } {
    const bps = bandwidth * DATA_MULTIPLIERS[bandwidthUnit];
    const rtt = latency / 1000;
    const windowBits = packetSize * 8;
    const maxThroughput = windowBits / rtt;
    const effective = Math.min(bps, maxThroughput);
    return {
      effectiveThroughput: effective,
      overhead: 1 - effective / bps,
    };
  }
}
