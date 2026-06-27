export interface PageResult {
  faults: number;
  hitRate: number;
  history: number[][];
}

export class PageReplacement {
  static fifo(pages: number[], frameCount: number): PageResult {
    const frames: number[] = [];
    let faults = 0;
    let pointer = 0;
    const history: number[][] = [];

    for (const page of pages) {
      if (!frames.includes(page)) {
        faults++;
        if (frames.length < frameCount) {
          frames.push(page);
        } else {
          frames[pointer] = page;
          pointer = (pointer + 1) % frameCount;
        }
      }
      history.push([...frames]);
    }

    return { faults, hitRate: pages.length > 0 ? 1 - faults / pages.length : 1, history };
  }

  static lru(pages: number[], frameCount: number): PageResult {
    const frames: number[] = [];
    let faults = 0;
    const history: number[][] = [];

    for (const page of pages) {
      const idx = frames.indexOf(page);
      if (idx === -1) {
        faults++;
        if (frames.length < frameCount) {
          frames.push(page);
        } else {
          frames.shift();
          frames.push(page);
        }
      } else {
        frames.splice(idx, 1);
        frames.push(page);
      }
      history.push([...frames]);
    }

    return { faults, hitRate: pages.length > 0 ? 1 - faults / pages.length : 1, history };
  }

  static optimal(pages: number[], frameCount: number): PageResult {
    const frames: number[] = [];
    let faults = 0;
    const history: number[][] = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (!frames.includes(page)) {
        faults++;
        if (frames.length < frameCount) {
          frames.push(page);
        } else {
          let farthest = -1;
          let victim = 0;
          for (let f = 0; f < frames.length; f++) {
            const nextUse = pages.indexOf(frames[f], i + 1);
            if (nextUse === -1) { victim = f; break; }
            if (nextUse > farthest) { farthest = nextUse; victim = f; }
          }
          frames[victim] = page;
        }
      }
      history.push([...frames]);
    }

    return { faults, hitRate: pages.length > 0 ? 1 - faults / pages.length : 1, history };
  }

  static clock(pages: number[], frameCount: number): PageResult {
    const frames: (number | null)[] = new Array(frameCount).fill(null);
    const refBits: boolean[] = new Array(frameCount).fill(false);
    let faults = 0;
    let hand = 0;
    const history: number[][] = [];

    for (const page of pages) {
      let found = false;
      for (let i = 0; i < frameCount; i++) {
        if (frames[i] === page) {
          refBits[i] = true;
          found = true;
          break;
        }
      }

      if (!found) {
        faults++;
        let emptySlot = frames.indexOf(null);
        if (emptySlot !== -1) {
          frames[emptySlot] = page;
          refBits[emptySlot] = true;
        } else {
          while (refBits[hand]) {
            refBits[hand] = false;
            hand = (hand + 1) % frameCount;
          }
          frames[hand] = page;
          refBits[hand] = true;
          hand = (hand + 1) % frameCount;
        }
      }
      history.push(frames.filter((f) => f !== null) as number[]);
    }

    return { faults, hitRate: pages.length > 0 ? 1 - faults / pages.length : 1, history };
  }
}
