export class SubnetCalc {
  static ipToLong(ip: string): number {
    const parts = ip.split(".").map(Number);
    return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
  }

  static longToIp(long: number): string {
    return [
      (long >>> 24) & 255,
      (long >>> 16) & 255,
      (long >>> 8) & 255,
      long & 255,
    ].join(".");
  }

  static cidrToMask(prefix: number): string {
    if (prefix < 0 || prefix > 32) throw new Error("Invalid prefix length");
    const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    return SubnetCalc.longToIp(mask);
  }

  static maskToPrefix(mask: string): number {
    const long = SubnetCalc.ipToLong(mask);
    let count = 0;
    let n = long;
    while (n & 0x80000000) {
      count++;
      n = (n << 1) >>> 0;
    }
    return count;
  }

  static networkAddress(ip: string, prefix: number): string {
    const ipLong = SubnetCalc.ipToLong(ip);
    const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
    return SubnetCalc.longToIp((ipLong & mask) >>> 0);
  }

  static broadcastAddress(ip: string, prefix: number): string {
    const network = SubnetCalc.ipToLong(SubnetCalc.networkAddress(ip, prefix));
    const hostBits = 32 - prefix;
    const broadcast = (network | ((1 << hostBits) - 1)) >>> 0;
    return SubnetCalc.longToIp(broadcast);
  }

  static hostCount(prefix: number): number {
    if (prefix >= 31) return prefix === 31 ? 2 : 1;
    return Math.pow(2, 32 - prefix) - 2;
  }

  static contains(cidr: string, ip: string): boolean {
    const [network, prefixStr] = cidr.split("/");
    const prefix = parseInt(prefixStr);
    const netAddr = SubnetCalc.networkAddress(network, prefix);
    const testAddr = SubnetCalc.networkAddress(ip, prefix);
    return netAddr === testAddr;
  }

  static isPrivate(ip: string): boolean {
    return (
      SubnetCalc.contains("10.0.0.0/8", ip) ||
      SubnetCalc.contains("172.16.0.0/12", ip) ||
      SubnetCalc.contains("192.168.0.0/16", ip)
    );
  }

  static isValidIp(ip: string): boolean {
    const parts = ip.split(".");
    if (parts.length !== 4) return false;
    return parts.every((p) => {
      const n = parseInt(p);
      return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p;
    });
  }

  static firstHost(ip: string, prefix: number): string {
    const network = SubnetCalc.ipToLong(SubnetCalc.networkAddress(ip, prefix));
    return SubnetCalc.longToIp(network + 1);
  }

  static lastHost(ip: string, prefix: number): string {
    const broadcast = SubnetCalc.ipToLong(SubnetCalc.broadcastAddress(ip, prefix));
    return SubnetCalc.longToIp(broadcast - 1);
  }

  static info(cidr: string): Record<string, string | number> {
    const [ip, prefixStr] = cidr.split("/");
    const prefix = parseInt(prefixStr);
    return {
      network: SubnetCalc.networkAddress(ip, prefix),
      broadcast: SubnetCalc.broadcastAddress(ip, prefix),
      mask: SubnetCalc.cidrToMask(prefix),
      prefix,
      hosts: SubnetCalc.hostCount(prefix),
      firstHost: SubnetCalc.firstHost(ip, prefix),
      lastHost: SubnetCalc.lastHost(ip, prefix),
    };
  }
}
