export type FirewallAction = "allow" | "deny" | "log";
export type Protocol = "tcp" | "udp" | "icmp" | "any";
export type Direction = "inbound" | "outbound" | "both";

export interface FirewallRule {
  id: string;
  name: string;
  priority: number;
  action: FirewallAction;
  protocol: Protocol;
  direction: Direction;
  sourceIp?: string;
  destIp?: string;
  sourcePort?: number;
  destPort?: number;
  enabled: boolean;
}

export interface PacketInfo {
  protocol: Protocol;
  direction: Direction;
  sourceIp: string;
  destIp: string;
  sourcePort?: number;
  destPort?: number;
}

export interface EvalResult {
  action: FirewallAction;
  matchedRule: FirewallRule | null;
}

export class Firewall {
  private rules: FirewallRule[] = [];
  private defaultAction: FirewallAction;
  private log: Array<{ packet: PacketInfo; result: EvalResult; timestamp: number }> = [];

  constructor(defaultAction: FirewallAction = "deny") {
    this.defaultAction = defaultAction;
  }

  addRule(rule: FirewallRule): void {
    this.rules.push(rule);
    this.rules.sort((a, b) => a.priority - b.priority);
  }

  removeRule(id: string): boolean {
    const idx = this.rules.findIndex((r) => r.id === id);
    if (idx < 0) return false;
    this.rules.splice(idx, 1);
    return true;
  }

  enableRule(id: string): boolean {
    const rule = this.rules.find((r) => r.id === id);
    if (!rule) return false;
    rule.enabled = true;
    return true;
  }

  disableRule(id: string): boolean {
    const rule = this.rules.find((r) => r.id === id);
    if (!rule) return false;
    rule.enabled = false;
    return true;
  }

  evaluate(packet: PacketInfo): EvalResult {
    for (const rule of this.rules) {
      if (!rule.enabled) continue;
      if (this.matches(rule, packet)) {
        const result: EvalResult = { action: rule.action, matchedRule: rule };
        this.log.push({ packet, result, timestamp: Date.now() });
        return result;
      }
    }
    const result: EvalResult = { action: this.defaultAction, matchedRule: null };
    this.log.push({ packet, result, timestamp: Date.now() });
    return result;
  }

  private matches(rule: FirewallRule, packet: PacketInfo): boolean {
    if (rule.protocol !== "any" && rule.protocol !== packet.protocol) return false;
    if (rule.direction !== "both" && rule.direction !== packet.direction) return false;
    if (rule.sourceIp && rule.sourceIp !== packet.sourceIp) return false;
    if (rule.destIp && rule.destIp !== packet.destIp) return false;
    if (rule.sourcePort !== undefined && rule.sourcePort !== packet.sourcePort) return false;
    if (rule.destPort !== undefined && rule.destPort !== packet.destPort) return false;
    return true;
  }

  ruleCount(): number {
    return this.rules.length;
  }

  getRules(): FirewallRule[] {
    return [...this.rules];
  }

  getLog(): Array<{ packet: PacketInfo; result: EvalResult; timestamp: number }> {
    return [...this.log];
  }

  clearLog(): void {
    this.log = [];
  }

  getDefaultAction(): FirewallAction {
    return this.defaultAction;
  }

  setDefaultAction(action: FirewallAction): void {
    this.defaultAction = action;
  }

  deniedCount(): number {
    return this.log.filter((e) => e.result.action === "deny").length;
  }

  allowedCount(): number {
    return this.log.filter((e) => e.result.action === "allow").length;
  }
}
