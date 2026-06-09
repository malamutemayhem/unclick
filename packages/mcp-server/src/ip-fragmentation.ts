export interface IPFragment {
  id: number;
  offset: number;
  moreFragments: boolean;
  data: number[];
  srcIp: string;
  dstIp: string;
  protocol: number;
  ttl: number;
}

export function fragment(
  data: number[],
  mtu: number,
  id: number,
  srcIp = "0.0.0.0",
  dstIp = "0.0.0.0",
  protocol = 6,
  ttl = 64
): IPFragment[] {
  const headerSize = 20;
  const maxPayload = mtu - headerSize;
  const alignedPayload = maxPayload - (maxPayload % 8);

  if (data.length <= maxPayload) {
    return [{
      id,
      offset: 0,
      moreFragments: false,
      data: [...data],
      srcIp,
      dstIp,
      protocol,
      ttl,
    }];
  }

  const fragments: IPFragment[] = [];
  let pos = 0;
  while (pos < data.length) {
    const remaining = data.length - pos;
    const chunkSize = remaining > alignedPayload ? alignedPayload : remaining;
    const isLast = pos + chunkSize >= data.length;

    fragments.push({
      id,
      offset: pos,
      moreFragments: !isLast,
      data: data.slice(pos, pos + chunkSize),
      srcIp,
      dstIp,
      protocol,
      ttl,
    });
    pos += chunkSize;
  }

  return fragments;
}

export class FragmentReassembler {
  private buffers = new Map<string, Map<number, IPFragment>>();
  private completed = new Set<string>();

  receive(frag: IPFragment): number[] | null {
    const key = `${frag.srcIp}:${frag.dstIp}:${frag.id}:${frag.protocol}`;

    if (this.completed.has(key)) return null;

    if (!this.buffers.has(key)) {
      this.buffers.set(key, new Map());
    }
    const buf = this.buffers.get(key)!;
    buf.set(frag.offset, frag);

    let totalSize = -1;
    for (const f of buf.values()) {
      if (!f.moreFragments) {
        totalSize = f.offset + f.data.length;
        break;
      }
    }
    if (totalSize === -1) return null;

    const sorted = [...buf.values()].sort((a, b) => a.offset - b.offset);
    let expected = 0;
    for (const f of sorted) {
      if (f.offset !== expected) return null;
      expected += f.data.length;
    }
    if (expected !== totalSize) return null;

    const result: number[] = [];
    for (const f of sorted) {
      result.push(...f.data);
    }

    this.buffers.delete(key);
    this.completed.add(key);
    return result;
  }

  get pendingCount(): number {
    return this.buffers.size;
  }

  get completedCount(): number {
    return this.completed.size;
  }

  clear(): void {
    this.buffers.clear();
    this.completed.clear();
  }

  hasPending(srcIp: string, dstIp: string, id: number, protocol = 6): boolean {
    return this.buffers.has(`${srcIp}:${dstIp}:${id}:${protocol}`);
  }
}
