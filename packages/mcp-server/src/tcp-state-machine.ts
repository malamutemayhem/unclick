export type TCPState =
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

export type TCPEvent =
  | "PASSIVE_OPEN"
  | "ACTIVE_OPEN"
  | "SYN"
  | "SYN_ACK"
  | "ACK"
  | "FIN"
  | "FIN_ACK"
  | "CLOSE"
  | "TIMEOUT"
  | "RST";

export interface Transition {
  from: TCPState;
  event: TCPEvent;
  to: TCPState;
}

const transitions: Transition[] = [
  { from: "CLOSED", event: "PASSIVE_OPEN", to: "LISTEN" },
  { from: "CLOSED", event: "ACTIVE_OPEN", to: "SYN_SENT" },
  { from: "LISTEN", event: "SYN", to: "SYN_RECEIVED" },
  { from: "LISTEN", event: "CLOSE", to: "CLOSED" },
  { from: "SYN_SENT", event: "SYN_ACK", to: "ESTABLISHED" },
  { from: "SYN_SENT", event: "SYN", to: "SYN_RECEIVED" },
  { from: "SYN_SENT", event: "CLOSE", to: "CLOSED" },
  { from: "SYN_RECEIVED", event: "ACK", to: "ESTABLISHED" },
  { from: "SYN_RECEIVED", event: "CLOSE", to: "FIN_WAIT_1" },
  { from: "SYN_RECEIVED", event: "RST", to: "CLOSED" },
  { from: "ESTABLISHED", event: "CLOSE", to: "FIN_WAIT_1" },
  { from: "ESTABLISHED", event: "FIN", to: "CLOSE_WAIT" },
  { from: "FIN_WAIT_1", event: "ACK", to: "FIN_WAIT_2" },
  { from: "FIN_WAIT_1", event: "FIN", to: "CLOSING" },
  { from: "FIN_WAIT_1", event: "FIN_ACK", to: "TIME_WAIT" },
  { from: "FIN_WAIT_2", event: "FIN", to: "TIME_WAIT" },
  { from: "CLOSE_WAIT", event: "CLOSE", to: "LAST_ACK" },
  { from: "CLOSING", event: "ACK", to: "TIME_WAIT" },
  { from: "LAST_ACK", event: "ACK", to: "CLOSED" },
  { from: "TIME_WAIT", event: "TIMEOUT", to: "CLOSED" },
];

export class TCPConnection {
  private _state: TCPState = "CLOSED";
  private history: Array<{ from: TCPState; event: TCPEvent; to: TCPState }> = [];

  get state(): TCPState {
    return this._state;
  }

  handle(event: TCPEvent): boolean {
    if (event === "RST") {
      const from = this._state;
      this._state = "CLOSED";
      this.history.push({ from, event, to: "CLOSED" });
      return true;
    }

    const t = transitions.find((t) => t.from === this._state && t.event === event);
    if (!t) return false;

    this.history.push({ from: t.from, event: t.event, to: t.to });
    this._state = t.to;
    return true;
  }

  getHistory(): Array<{ from: TCPState; event: TCPEvent; to: TCPState }> {
    return this.history.map((h) => ({ ...h }));
  }

  reset(): void {
    this._state = "CLOSED";
    this.history = [];
  }

  get isOpen(): boolean {
    return this._state === "ESTABLISHED";
  }

  get isClosed(): boolean {
    return this._state === "CLOSED";
  }

  get isClosing(): boolean {
    return ["FIN_WAIT_1", "FIN_WAIT_2", "CLOSING", "LAST_ACK", "TIME_WAIT", "CLOSE_WAIT"].includes(
      this._state
    );
  }
}

export function clientHandshake(): TCPConnection {
  const conn = new TCPConnection();
  conn.handle("ACTIVE_OPEN");
  conn.handle("SYN_ACK");
  return conn;
}

export function serverHandshake(): TCPConnection {
  const conn = new TCPConnection();
  conn.handle("PASSIVE_OPEN");
  conn.handle("SYN");
  conn.handle("ACK");
  return conn;
}

export function getValidEvents(state: TCPState): TCPEvent[] {
  return transitions.filter((t) => t.from === state).map((t) => t.event);
}
