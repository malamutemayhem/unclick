export class IPv4Address {
  private octets: [number, number, number, number];

  constructor(address: string) {
    const parts = address.split(".").map(Number);
    if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
      throw new Error(`Invalid IPv4 address: ${address}`);
    }
    this.octets = parts as [number, number, number, number];
  }

  toString(): string {
    return this.octets.join(".");
  }

  toInt(): number {
    return (
      (this.octets[0] << 24) |
      (this.octets[1] << 16) |
      (this.octets[2] << 8) |
      this.octets[3]
    ) >>> 0;
  }

  static fromInt(num: number): IPv4Address {
    const a = (num >>> 24) & 0xff;
    const b = (num >>> 16) & 0xff;
    const c = (num >>> 8) & 0xff;
    const d = num & 0xff;
    return new IPv4Address(`${a}.${b}.${c}.${d}`);
  }

  getOctets(): [number, number, number, number] {
    return [...this.octets] as [number, number, number, number];
  }

  isPrivate(): boolean {
    const [a, b] = this.octets;
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    return false;
  }

  isLoopback(): boolean {
    return this.octets[0] === 127;
  }

  equals(other: IPv4Address): boolean {
    return this.toInt() === other.toInt();
  }
}

export class SubnetCalculator {
  private network: number;
  private mask: number;
  private prefix: number;

  constructor(cidr: string) {
    const [addr, bits] = cidr.split("/");
    this.prefix = parseInt(bits, 10);
    if (this.prefix < 0 || this.prefix > 32) {
      throw new Error(`Invalid prefix length: ${this.prefix}`);
    }
    this.mask = this.prefix === 0 ? 0 : (0xffffffff << (32 - this.prefix)) >>> 0;
    const ip = new IPv4Address(addr);
    this.network = (ip.toInt() & this.mask) >>> 0;
  }

  networkAddress(): string {
    return IPv4Address.fromInt(this.network).toString();
  }

  broadcastAddress(): string {
    const broadcast = (this.network | (~this.mask >>> 0)) >>> 0;
    return IPv4Address.fromInt(broadcast).toString();
  }

  subnetMask(): string {
    return IPv4Address.fromInt(this.mask).toString();
  }

  hostCount(): number {
    if (this.prefix >= 31) return this.prefix === 32 ? 1 : 2;
    return Math.pow(2, 32 - this.prefix) - 2;
  }

  totalAddresses(): number {
    return Math.pow(2, 32 - this.prefix);
  }

  firstHost(): string {
    if (this.prefix >= 31) return this.networkAddress();
    return IPv4Address.fromInt(this.network + 1).toString();
  }

  lastHost(): string {
    if (this.prefix >= 31) return this.broadcastAddress();
    const broadcast = (this.network | (~this.mask >>> 0)) >>> 0;
    return IPv4Address.fromInt(broadcast - 1).toString();
  }

  contains(address: string): boolean {
    const ip = new IPv4Address(address);
    return ((ip.toInt() & this.mask) >>> 0) === this.network;
  }

  prefixLength(): number {
    return this.prefix;
  }

  toCIDR(): string {
    return `${this.networkAddress()}/${this.prefix}`;
  }

  static overlaps(a: string, b: string): boolean {
    const subA = new SubnetCalculator(a);
    const subB = new SubnetCalculator(b);
    const aNet = subA.network;
    const aBroad = (subA.network | (~subA.mask >>> 0)) >>> 0;
    const bNet = subB.network;
    const bBroad = (subB.network | (~subB.mask >>> 0)) >>> 0;
    return aNet <= bBroad && bNet <= aBroad;
  }
}
