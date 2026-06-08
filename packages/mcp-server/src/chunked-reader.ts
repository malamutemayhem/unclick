export function chunkString(input: string, size: number): string[] {
  if (size < 1) throw new Error("Chunk size must be at least 1");
  const chunks: string[] = [];
  for (let i = 0; i < input.length; i += size) {
    chunks.push(input.slice(i, i + size));
  }
  return chunks;
}

export function chunkArray<T>(input: T[], size: number): T[][] {
  if (size < 1) throw new Error("Chunk size must be at least 1");
  const chunks: T[][] = [];
  for (let i = 0; i < input.length; i += size) {
    chunks.push(input.slice(i, i + size));
  }
  return chunks;
}

export function* chunkIterable<T>(iterable: Iterable<T>, size: number): Generator<T[]> {
  if (size < 1) throw new Error("Chunk size must be at least 1");
  let chunk: T[] = [];
  for (const item of iterable) {
    chunk.push(item);
    if (chunk.length === size) {
      yield chunk;
      chunk = [];
    }
  }
  if (chunk.length > 0) yield chunk;
}

export async function processChunked<T, R>(
  items: T[],
  chunkSize: number,
  fn: (chunk: T[]) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(await fn(chunk));
  }
  return results;
}
