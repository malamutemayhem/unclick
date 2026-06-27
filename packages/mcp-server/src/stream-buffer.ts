export class StreamBuffer<T> {
  private chunks: T[][] = [];
  private currentChunk: T[] = [];
  private readonly chunkSize: number;
  private flushed = 0;

  constructor(chunkSize = 100) {
    this.chunkSize = chunkSize;
  }

  write(item: T): void {
    this.currentChunk.push(item);
    if (this.currentChunk.length >= this.chunkSize) {
      this.flush();
    }
  }

  writeBatch(items: T[]): void {
    for (const item of items) this.write(item);
  }

  flush(): T[] {
    if (this.currentChunk.length === 0) return [];
    const chunk = this.currentChunk;
    this.chunks.push(chunk);
    this.currentChunk = [];
    this.flushed += chunk.length;
    return chunk;
  }

  get buffered(): number {
    return this.currentChunk.length;
  }

  get totalFlushed(): number {
    return this.flushed;
  }

  get chunkCount(): number {
    return this.chunks.length;
  }

  getChunk(index: number): T[] {
    return [...(this.chunks[index] ?? [])];
  }

  allChunks(): T[][] {
    return this.chunks.map((c) => [...c]);
  }

  drain(): T[] {
    this.flush();
    const all = this.chunks.flat();
    this.chunks = [];
    this.flushed = 0;
    return all;
  }
}
