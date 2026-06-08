export type TcpState =
  | "CLOSED"
  | "LISTEN"
  | "SYN_SENT"
  | "SYN_RECEIVED"
  | "ESTABLISHED"
  | "FIN_WAIT_1"
  | "FIN_WAIT_2"
  | "CLOSE_WAIT"
  | "CLOSING"
  | "LAST_ACK"
  | "TIME_WAIT";

export type TcpEvent =
  | "PASSIVE_OPEN"
  | "ACTIVE_OPEN"
  | "SYN"
  | "SYN_ACK"
  | "ACK"
  | "FIN"
  | "CLOSE"
  | "TIMEOUT"
  | "RST";

interface Transition {
  from: TcpState;
  event: TcpEvent;
  to: TcpState;
}

const TRANSITIONS: Transition[] = [
  { from: "CLOSED", event: "PASSIVE_OPEN", to: "LISTEN" },
  { from: "CLOSED", event: "ACTIVE_OPEN", to: "SYN_SENT" },
  { from: "LISTEN", event: "SYN", to: "SYN_RECEIVED" },
  { from: "LISTEN", event: "CLOSE", to: "CLOSED" },
  { from: "SYN_SENT", event: "SYN_ACK", to: "ESTABLISHED" },
  { from: "SYN_SENT", event: "SYN", to: "SYN_RECEIVED" },
  { from: "SYN_SENT", event: "CLOSE", to: "CLOSED" },
  { from: "SYN_RECEIVED", event: "ACK", to: "ESTABLISHED" },
  { from: "SYN_RECEIVED", event: "CLOSE", to: "FIN_WAIT_1" },
  { from: "ESTABLISHED", event: "FIN", to: "CLOSE_WAIT" },
  { from: "ESTABLISHED", event: "CLOSE", to: "FIN_WAIT_1" },
  { from: "FIN_WAIT_1", event: "ACK", to: "FIN_WAIT_2" },
  { from: "FIN_WAIT_1", event: "FIN", to: "CLOSING" },
  { from: "FIN_WAIT_2", event: "FIN", to: "TIME_WAIT" },
  { from: "CLOSE_WAIT", event: "CLOSE", to: "LAST_ACK" },
  { from: "CLOSING", event: "ACK", to: "TIME_WAIT" },
  { from: "LAST_ACK", event: "ACK", to: "CLOSED" },
  { from: "TIME_WAIT", event: "TIMEOUT", to: "CLOSED" },
];

export class TcpStateMachine {
  private state: TcpState = "CLOSED";
  private history: Array<{ from: TcpState; event: TcpEvent; to: TcpState }> = [];

  getState(): TcpState {
    return this.state;
  }

  transition(event: TcpEvent): boolean {
    const t = TRANSITIONS.find((tr) => tr.from === this.state && tr.event === event);
    if (!t) return false;
    this.history.push({ from: this.state, event, to: t.to });
    this.state = t.to;
    return true;
  }

  reset(): void {
    if (this.state !== "CLOSED") {
      this.history.push({ from: this.state, event: "RST", to: "CLOSED" });
    }
    this.state = "CLOSED";
  }

  getHistory(): Array<{ from: TcpState; event: TcpEvent; to: TcpState }> {
    return [...this.history];
  }

  validEvents(): TcpEvent[] {
    return TRANSITIONS.filter((t) => t.from === this.state).map((t) => t.event);
  }

  isConnected(): boolean {
    return this.state === "ESTABLISHED";
  }

  isClosed(): boolean {
    return this.state === "CLOSED";
  }

  static simulateHandshake(): TcpStateMachine {
    const sm = new TcpStateMachine();
    sm.transition("ACTIVE_OPEN");
    sm.transition("SYN_ACK");
    return sm;
  }

  static simulateClose(sm: TcpStateMachine): void {
    sm.transition("CLOSE");
    sm.transition("ACK");
    sm.transition("FIN");
    sm.transition("TIMEOUT");
  }

  static allStates(): TcpState[] {
    return [
      "CLOSED", "LISTEN", "SYN_SENT", "SYN_RECEIVED", "ESTABLISHED",
      "FIN_WAIT_1", "FIN_WAIT_2", "CLOSE_WAIT", "CLOSING",
      "LAST_ACK", "TIME_WAIT",
    ];
  }
}
