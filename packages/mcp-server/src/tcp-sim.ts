export type TCPState = "CLOSED" | "LISTEN" | "SYN_SENT" | "SYN_RECEIVED" | "ESTABLISHED" |
  "FIN_WAIT_1" | "FIN_WAIT_2" | "CLOSE_WAIT" | "CLOSING" | "LAST_ACK" | "TIME_WAIT";

export interface TCPSegment {
  srcPort: number;
  dstPort: number;
  seq: number;
  ack: number;
  flags: { syn?: boolean; ack?: boolean; fin?: boolean; rst?: boolean; psh?: boolean };
  data: number[];
  window: number;
}

export class TCPConnection {
  state: TCPState = "CLOSED";
  private sendSeq = 0;
  private recvSeq = 0;
  private sendBuffer: number[] = [];
  private recvBuffer: number[] = [];
  private window = 65535;
  localPort: number;
  remotePort: number;

  constructor(localPort: number, remotePort: number) {
    this.localPort = localPort;
    this.remotePort = remotePort;
  }

  initiateHandshake(): TCPSegment {
    this.sendSeq = Math.floor(Math.random() * 10000);
    this.state = "SYN_SENT";
    return this.makeSegment({ syn: true }, []);
  }

  handleSegment(seg: TCPSegment): TCPSegment | null {
    switch (this.state) {
      case "LISTEN":
        if (seg.flags.syn) {
          this.recvSeq = seg.seq + 1;
          this.sendSeq = Math.floor(Math.random() * 10000);
          this.state = "SYN_RECEIVED";
          return this.makeSegment({ syn: true, ack: true }, []);
        }
        break;

      case "SYN_SENT":
        if (seg.flags.syn && seg.flags.ack) {
          this.recvSeq = seg.seq + 1;
          this.sendSeq++;
          this.state = "ESTABLISHED";
          return this.makeSegment({ ack: true }, []);
        }
        break;

      case "SYN_RECEIVED":
        if (seg.flags.ack) {
          this.state = "ESTABLISHED";
          return null;
        }
        break;

      case "ESTABLISHED":
        if (seg.flags.fin) {
          this.recvSeq = seg.seq + 1;
          this.state = "CLOSE_WAIT";
          return this.makeSegment({ ack: true }, []);
        }
        if (seg.data.length > 0) {
          this.recvBuffer.push(...seg.data);
          this.recvSeq = seg.seq + seg.data.length;
          return this.makeSegment({ ack: true }, []);
        }
        break;

      case "FIN_WAIT_1":
        if (seg.flags.ack && seg.flags.fin) {
          this.recvSeq = seg.seq + 1;
          this.state = "TIME_WAIT";
          return this.makeSegment({ ack: true }, []);
        }
        if (seg.flags.ack) {
          this.state = "FIN_WAIT_2";
          return null;
        }
        if (seg.flags.fin) {
          this.recvSeq = seg.seq + 1;
          this.state = "CLOSING";
          return this.makeSegment({ ack: true }, []);
        }
        break;

      case "FIN_WAIT_2":
        if (seg.flags.fin) {
          this.recvSeq = seg.seq + 1;
          this.state = "TIME_WAIT";
          return this.makeSegment({ ack: true }, []);
        }
        break;

      case "CLOSING":
        if (seg.flags.ack) {
          this.state = "TIME_WAIT";
          return null;
        }
        break;

      case "LAST_ACK":
        if (seg.flags.ack) {
          this.state = "CLOSED";
          return null;
        }
        break;
    }
    return null;
  }

  send(data: number[]): TCPSegment {
    const seg = this.makeSegment({ ack: true, psh: true }, data);
    this.sendSeq += data.length;
    return seg;
  }

  close(): TCPSegment {
    if (this.state === "ESTABLISHED") {
      this.state = "FIN_WAIT_1";
    } else if (this.state === "CLOSE_WAIT") {
      this.state = "LAST_ACK";
    }
    return this.makeSegment({ fin: true, ack: true }, []);
  }

  listen(): void {
    this.state = "LISTEN";
  }

  read(): number[] {
    const data = [...this.recvBuffer];
    this.recvBuffer = [];
    return data;
  }

  private makeSegment(flags: TCPSegment["flags"], data: number[]): TCPSegment {
    return {
      srcPort: this.localPort,
      dstPort: this.remotePort,
      seq: this.sendSeq,
      ack: this.recvSeq,
      flags,
      data,
      window: this.window,
    };
  }
}

export class SlidingWindow {
  private windowSize: number;
  private base = 0;
  private nextSeq = 0;
  private acked = new Set<number>();
  sent: number[] = [];

  constructor(windowSize: number) {
    this.windowSize = windowSize;
  }

  canSend(): boolean {
    return this.nextSeq < this.base + this.windowSize;
  }

  send(): number | null {
    if (!this.canSend()) return null;
    const seq = this.nextSeq++;
    this.sent.push(seq);
    return seq;
  }

  acknowledge(seq: number): number[] {
    this.acked.add(seq);
    const advanced: number[] = [];
    while (this.acked.has(this.base)) {
      this.acked.delete(this.base);
      advanced.push(this.base);
      this.base++;
    }
    return advanced;
  }

  get currentBase(): number { return this.base; }
  get nextSequence(): number { return this.nextSeq; }
  get unackedCount(): number { return this.nextSeq - this.base; }
}
