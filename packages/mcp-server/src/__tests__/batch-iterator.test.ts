import { describe, it, expect } from "vitest";
import { batchSync, collectBatches, processBatches } from "../batch-iterator.js";

describe("batch-iterator", () => {
  it("batchSync splits into chunks", () => {
    const batches = [...batchSync([1, 2, 3, 4, 5], 2)];
    expect(batches).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("batchSync handles exact multiple", () => {
    const batches = [...batchSync([1, 2, 3, 4], 2)];
    expect(batches).toEqual([[1, 2], [3, 4]]);
  });

  it("batchSync handles empty input", () => {
    const batches = [...batchSync([], 5)];
    expect(batches).toEqual([]);
  });

  it("collectBatches from sync iterable", async () => {
    const batches = await collectBatches([1, 2, 3, 4, 5], 3);
    expect(batches).toEqual([[1, 2, 3], [4, 5]]);
  });

  it("collectBatches from async iterable", async () => {
    async function* gen() {
      yield 1; yield 2; yield 3; yield 4;
    }
    const batches = await collectBatches(gen(), 2);
    expect(batches).toEqual([[1, 2], [3, 4]]);
  });

  it("processBatches applies function to each batch", async () => {
    const results = await processBatches([1, 2, 3, 4, 5], 2, (batch) => batch.reduce((a, b) => a + b, 0));
    expect(results).toEqual([3, 7, 5]);
  });

  it("processBatches handles async fn", async () => {
    const results = await processBatches([10, 20, 30], 2, async (batch) => batch.length);
    expect(results).toEqual([2, 1]);
  });
});
