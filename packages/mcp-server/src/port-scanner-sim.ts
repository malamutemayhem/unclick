export type PortState = "open" | "closed" | "filtered";

export interface ScanResult {
  port: number;
  state: PortState;
  service?: string;
  banner?: string;
}

export interface HostScanResult {
  host: string;
  ports: ScanResult[];
  openCount: number;
  closedCount: number;
  filteredCount: number;
  scanTime: number;
}

const WELL_KNOWN_SERVICES: Record<number, string> = {
  21: "ftp",
  22: "ssh",
  23: "telnet",
  25: "smtp",
  53: "dns",
  80: "http",
  110: "pop3",
  143: "imap",
  443: "https",
  445: "smb",
  993: "imaps",
  995: "pop3s",
  3306: "mysql",
  3389: "rdp",
  5432: "postgresql",
  6379: "redis",
  8080: "http-proxy",
  8443: "https-alt",
  27017: "mongodb",
};

export class PortScannerSim {
  private hosts = new Map<string, Map<number, { state: PortState; banner?: string }>>();

  addHost(host: string): void {
    if (!this.hosts.has(host)) {
      this.hosts.set(host, new Map());
    }
  }

  setPort(host: string, port: number, state: PortState, banner?: string): void {
    if (!this.hosts.has(host)) this.addHost(host);
    this.hosts.get(host)!.set(port, { state, banner });
  }

  setOpenPorts(host: string, ports: number[]): void {
    for (const port of ports) {
      this.setPort(host, port, "open");
    }
  }

  scanPort(host: string, port: number): ScanResult {
    const hostPorts = this.hosts.get(host);
    if (!hostPorts) {
      return { port, state: "filtered" };
    }
    const portInfo = hostPorts.get(port);
    if (!portInfo) {
      return { port, state: "closed", service: WELL_KNOWN_SERVICES[port] };
    }
    return {
      port,
      state: portInfo.state,
      service: WELL_KNOWN_SERVICES[port],
      banner: portInfo.banner,
    };
  }

  scanRange(host: string, startPort: number, endPort: number): HostScanResult {
    const ports: ScanResult[] = [];
    const startTime = Date.now();

    for (let port = startPort; port <= endPort; port++) {
      ports.push(this.scanPort(host, port));
    }

    return {
      host,
      ports,
      openCount: ports.filter((p) => p.state === "open").length,
      closedCount: ports.filter((p) => p.state === "closed").length,
      filteredCount: ports.filter((p) => p.state === "filtered").length,
      scanTime: Date.now() - startTime,
    };
  }

  scanCommon(host: string): HostScanResult {
    const commonPorts = Object.keys(WELL_KNOWN_SERVICES).map(Number);
    const ports: ScanResult[] = commonPorts.map((p) => this.scanPort(host, p));
    return {
      host,
      ports,
      openCount: ports.filter((p) => p.state === "open").length,
      closedCount: ports.filter((p) => p.state === "closed").length,
      filteredCount: ports.filter((p) => p.state === "filtered").length,
      scanTime: 0,
    };
  }

  getOpenPorts(host: string): ScanResult[] {
    const hostPorts = this.hosts.get(host);
    if (!hostPorts) return [];
    const results: ScanResult[] = [];
    for (const [port, info] of hostPorts) {
      if (info.state === "open") {
        results.push({ port, state: "open", service: WELL_KNOWN_SERVICES[port], banner: info.banner });
      }
    }
    return results.sort((a, b) => a.port - b.port);
  }

  get hostCount(): number {
    return this.hosts.size;
  }

  listHosts(): string[] {
    return [...this.hosts.keys()];
  }

  getServiceName(port: number): string | undefined {
    return WELL_KNOWN_SERVICES[port];
  }

  format(result: HostScanResult): string {
    const lines = [`Scan results for ${result.host}:`];
    const openPorts = result.ports.filter((p) => p.state === "open");
    if (openPorts.length === 0) {
      lines.push("  No open ports found");
    } else {
      for (const p of openPorts) {
        const svc = p.service ? ` (${p.service})` : "";
        const banner = p.banner ? ` - ${p.banner}` : "";
        lines.push(`  ${p.port}/tcp  open  ${svc}${banner}`);
      }
    }
    lines.push(`  ${result.openCount} open, ${result.closedCount} closed, ${result.filteredCount} filtered`);
    return lines.join("\n");
  }
}
