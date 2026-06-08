const EPOCH = 1704067200000;

export class SnowflakeGenerator {
  private workerId: number;
  private sequence = 0;
  private lastTimestamp = -1;

  constructor(workerId: number = 0) {
    if (workerId < 0 || workerId > 1023) throw new Error("Worker ID must be 0-1023");
    this.workerId = workerId;
  }

  generate(now: number = Date.now()): string {
    let timestamp = now - EPOCH;
    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & 0xFFF;
      if (this.sequence === 0) timestamp++;
    } else {
      this.sequence = 0;
    }
    this.lastTimestamp = timestamp;
    const id = BigInt(timestamp) << 22n | BigInt(this.workerId) << 12n | BigInt(this.sequence);
    return id.toString();
  }

  static parse(id: string): { timestamp: number; workerId: number; sequence: number } {
    const n = BigInt(id);
    return {
      timestamp: Number(n >> 22n) + EPOCH,
      workerId: Number((n >> 12n) & 0x3FFn),
      sequence: Number(n & 0xFFFn),
    };
  }

  static timestamp(id: string): Date {
    const { timestamp } = SnowflakeGenerator.parse(id);
    return new Date(timestamp);
  }
}
