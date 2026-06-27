export type Direction = "up" | "down";

export interface ElevatorResult {
  order: number[];
  totalMovement: number;
}

export class ElevatorAlgorithm {
  static scan(requests: number[], head: number, direction: Direction, maxTrack: number): ElevatorResult {
    if (requests.length === 0) return { order: [], totalMovement: 0 };

    const sorted = [...requests].sort((a, b) => a - b);
    const left = sorted.filter((r) => r < head);
    const right = sorted.filter((r) => r >= head);
    const order: number[] = [];
    let movement = 0;
    let pos = head;

    if (direction === "up") {
      for (const r of right) { order.push(r); movement += Math.abs(r - pos); pos = r; }
      for (let i = left.length - 1; i >= 0; i--) { order.push(left[i]); movement += Math.abs(left[i] - pos); pos = left[i]; }
    } else {
      for (let i = left.length - 1; i >= 0; i--) { order.push(left[i]); movement += Math.abs(left[i] - pos); pos = left[i]; }
      for (const r of right) { order.push(r); movement += Math.abs(r - pos); pos = r; }
    }

    return { order, totalMovement: movement };
  }

  static cscan(requests: number[], head: number, maxTrack: number): ElevatorResult {
    if (requests.length === 0) return { order: [], totalMovement: 0 };

    const sorted = [...requests].sort((a, b) => a - b);
    const right = sorted.filter((r) => r >= head);
    const left = sorted.filter((r) => r < head);
    const order: number[] = [];
    let movement = 0;
    let pos = head;

    for (const r of right) { order.push(r); movement += Math.abs(r - pos); pos = r; }
    if (left.length > 0) {
      movement += Math.abs(maxTrack - pos);
      pos = maxTrack;
      movement += maxTrack;
      pos = 0;
      for (const r of left) { order.push(r); movement += Math.abs(r - pos); pos = r; }
    }

    return { order, totalMovement: movement };
  }

  static sstf(requests: number[], head: number): ElevatorResult {
    if (requests.length === 0) return { order: [], totalMovement: 0 };

    const remaining = [...requests];
    const order: number[] = [];
    let movement = 0;
    let pos = head;

    while (remaining.length > 0) {
      let minDist = Infinity;
      let minIdx = 0;
      for (let i = 0; i < remaining.length; i++) {
        const dist = Math.abs(remaining[i] - pos);
        if (dist < minDist) { minDist = dist; minIdx = i; }
      }
      order.push(remaining[minIdx]);
      movement += minDist;
      pos = remaining[minIdx];
      remaining.splice(minIdx, 1);
    }

    return { order, totalMovement: movement };
  }

  static fcfs(requests: number[], head: number): ElevatorResult {
    if (requests.length === 0) return { order: [], totalMovement: 0 };

    let movement = 0;
    let pos = head;
    for (const r of requests) {
      movement += Math.abs(r - pos);
      pos = r;
    }

    return { order: [...requests], totalMovement: movement };
  }
}
