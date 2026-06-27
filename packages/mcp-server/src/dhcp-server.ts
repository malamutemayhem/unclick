export interface Lease {
  ip: string;
  mac: string;
  hostname?: string;
  startTime: number;
  duration: number;
  expired: boolean;
}

export interface DHCPConfig {
  subnet: string;
  rangeStart: number;
  rangeEnd: number;
  leaseDuration: number;
  gateway?: string;
  dns?: string[];
}

export class DHCPServer {
  private config: DHCPConfig;
  private leases = new Map<string, Lease>();
  private macToIp = new Map<string, string>();
  private reservations = new Map<string, string>();
  private now: number;

  constructor(config: DHCPConfig) {
    this.config = config;
    this.now = Date.now();
  }

  discover(mac: string, hostname?: string): string | null {
    const existing = this.macToIp.get(mac);
    if (existing && !this.isExpired(existing)) return existing;

    const reserved = this.reservations.get(mac);
    if (reserved) return this.assignLease(reserved, mac, hostname);

    for (let i = this.config.rangeStart; i <= this.config.rangeEnd; i++) {
      const ip = `${this.config.subnet}.${i}`;
      const lease = this.leases.get(ip);
      if (!lease || this.isExpired(ip)) {
        return this.assignLease(ip, mac, hostname);
      }
    }
    return null;
  }

  private assignLease(ip: string, mac: string, hostname?: string): string {
    const lease: Lease = {
      ip,
      mac,
      hostname,
      startTime: this.now,
      duration: this.config.leaseDuration,
      expired: false,
    };
    this.leases.set(ip, lease);
    this.macToIp.set(mac, ip);
    return ip;
  }

  release(ip: string): boolean {
    const lease = this.leases.get(ip);
    if (!lease) return false;
    lease.expired = true;
    this.macToIp.delete(lease.mac);
    return true;
  }

  renew(ip: string): boolean {
    const lease = this.leases.get(ip);
    if (!lease || lease.expired) return false;
    lease.startTime = this.now;
    return true;
  }

  reserve(mac: string, ip: string): void {
    this.reservations.set(mac, ip);
  }

  removeReservation(mac: string): void {
    this.reservations.delete(mac);
  }

  private isExpired(ip: string): boolean {
    const lease = this.leases.get(ip);
    if (!lease) return true;
    if (lease.expired) return true;
    return (this.now - lease.startTime) / 1000 > lease.duration;
  }

  getLease(ip: string): Lease | null {
    const lease = this.leases.get(ip);
    return lease ? { ...lease } : null;
  }

  getLeaseByMac(mac: string): Lease | null {
    const ip = this.macToIp.get(mac);
    if (!ip) return null;
    return this.getLease(ip);
  }

  get activeLeases(): number {
    let count = 0;
    for (const [ip] of this.leases) {
      if (!this.isExpired(ip)) count++;
    }
    return count;
  }

  get totalLeases(): number {
    return this.leases.size;
  }

  get availableIPs(): number {
    let count = 0;
    for (let i = this.config.rangeStart; i <= this.config.rangeEnd; i++) {
      const ip = `${this.config.subnet}.${i}`;
      if (!this.leases.has(ip) || this.isExpired(ip)) count++;
    }
    return count;
  }

  listLeases(): Lease[] {
    return [...this.leases.values()].map((l) => ({ ...l }));
  }

  setTime(time: number): void {
    this.now = time;
  }
}
