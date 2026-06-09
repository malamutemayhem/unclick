export interface DiskRequest {
  track: number;
  id: number;
}

export type DiskAlgorithm = "fcfs" | "sstf" | "scan" | "cscan" | "look" | "clook";

export class DiskScheduler {
  private maxTrack: number;
  private currentTrack: number;
  private direction: "up" | "down";

  constructor(maxTrack = 199, initialTrack = 0, direction: "up" | "down" = "up") {
    this.maxTrack = maxTrack;
    this.currentTrack = initialTrack;
    this.direction = direction;
  }

  schedule(requests: DiskRequest[], algorithm: DiskAlgorithm): { order: number[]; totalSeek: number } {
    if (requests.length === 0) return { order: [], totalSeek: 0 };
    switch (algorithm) {
      case "fcfs": return this.fcfs(requests);
      case "sstf": return this.sstf(requests);
      case "scan": return this.scan(requests);
      case "cscan": return this.cscan(requests);
      case "look": return this.look(requests);
      case "clook": return this.clook(requests);
    }
  }

  private fcfs(requests: DiskRequest[]): { order: number[]; totalSeek: number } {
    let seek = 0;
    let pos = this.currentTrack;
    const order = requests.map((r) => {
      seek += Math.abs(r.track - pos);
      pos = r.track;
      return r.id;
    });
    return { order, totalSeek: seek };
  }

  private sstf(requests: DiskRequest[]): { order: number[]; totalSeek: number } {
    const remaining = [...requests];
    const order: number[] = [];
    let seek = 0;
    let pos = this.currentTrack;

    while (remaining.length > 0) {
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < remaining.length; i++) {
        const dist = Math.abs(remaining[i].track - pos);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }
      seek += bestDist;
      pos = remaining[bestIdx].track;
      order.push(remaining[bestIdx].id);
      remaining.splice(bestIdx, 1);
    }
    return { order, totalSeek: seek };
  }

  private scan(requests: DiskRequest[]): { order: number[]; totalSeek: number } {
    const sorted = [...requests].sort((a, b) => a.track - b.track);
    const pos = this.currentTrack;
    const below = sorted.filter((r) => r.track < pos).reverse();
    const above = sorted.filter((r) => r.track >= pos);

    let sequence: DiskRequest[];
    if (this.direction === "up") {
      sequence = [...above, { track: this.maxTrack, id: -1 }, ...below];
    } else {
      sequence = [...below, { track: 0, id: -1 }, ...above];
    }

    let seek = 0;
    let cur = pos;
    const order: number[] = [];
    for (const r of sequence) {
      seek += Math.abs(r.track - cur);
      cur = r.track;
      if (r.id !== -1) order.push(r.id);
    }
    return { order, totalSeek: seek };
  }

  private cscan(requests: DiskRequest[]): { order: number[]; totalSeek: number } {
    const sorted = [...requests].sort((a, b) => a.track - b.track);
    const pos = this.currentTrack;
    const above = sorted.filter((r) => r.track >= pos);
    const below = sorted.filter((r) => r.track < pos);

    let seek = 0;
    let cur = pos;
    const order: number[] = [];

    for (const r of above) {
      seek += Math.abs(r.track - cur);
      cur = r.track;
      order.push(r.id);
    }
    if (below.length > 0) {
      seek += Math.abs(this.maxTrack - cur);
      seek += this.maxTrack;
      cur = 0;
      for (const r of below) {
        seek += Math.abs(r.track - cur);
        cur = r.track;
        order.push(r.id);
      }
    }
    return { order, totalSeek: seek };
  }

  private look(requests: DiskRequest[]): { order: number[]; totalSeek: number } {
    const sorted = [...requests].sort((a, b) => a.track - b.track);
    const pos = this.currentTrack;
    const below = sorted.filter((r) => r.track < pos).reverse();
    const above = sorted.filter((r) => r.track >= pos);

    const sequence = this.direction === "up" ? [...above, ...below] : [...below, ...above];

    let seek = 0;
    let cur = pos;
    const order: number[] = [];
    for (const r of sequence) {
      seek += Math.abs(r.track - cur);
      cur = r.track;
      order.push(r.id);
    }
    return { order, totalSeek: seek };
  }

  private clook(requests: DiskRequest[]): { order: number[]; totalSeek: number } {
    const sorted = [...requests].sort((a, b) => a.track - b.track);
    const pos = this.currentTrack;
    const above = sorted.filter((r) => r.track >= pos);
    const below = sorted.filter((r) => r.track < pos);

    const sequence = [...above, ...below];

    let seek = 0;
    let cur = pos;
    const order: number[] = [];
    for (const r of sequence) {
      seek += Math.abs(r.track - cur);
      cur = r.track;
      order.push(r.id);
    }
    return { order, totalSeek: seek };
  }

  setPosition(track: number): void {
    this.currentTrack = track;
  }

  setDirection(dir: "up" | "down"): void {
    this.direction = dir;
  }
}
