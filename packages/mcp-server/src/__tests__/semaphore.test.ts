import { describe, it, expect, beforeEach } from "vitest";
import { Semaphore, getSemaphore, resetSemaphores } from "../semaphore.js";

function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

describe("Semaphore", () => {
  it("allows up to maxPermits concurrent access", async () => {
    const sem = new Semaphore(2);
    let concurrent = 0;
    let maxConcurrent = 0;

    const task = async () => {
      await sem.acquire();
      concurrent++;
      maxConcurrent = Math.max(maxConcurrent, concurrent);
      await delay(20);
      concurrent--;
      sem.release();
    };

    await Promise.all([task(), task(), task(), task()]);
    expect(maxConcurrent).toBe(2);
  });

  it("tracks available permits", () => {
    const sem = new Semaphore(3);
    expect(sem.available).toBe(3);
  });

  it("decrements on acquire", async () => {
    const sem = new Semaphore(2);
    await sem.acquire();
    expect(sem.available).toBe(1);
  });

  it("increments on release", async () => {
    const sem = new Semaphore(2);
    await sem.acquire();
    sem.release();
    expect(sem.available).toBe(2);
  });

  it("tracks waiting count", async () => {
    const sem = new Semaphore(1);
    await sem.acquire();
    const p = sem.acquire();
    expect(sem.waiting).toBe(1);
    sem.release();
    await p;
    expect(sem.waiting).toBe(0);
  });

  it("withPermit auto-releases on success", async () => {
    const sem = new Semaphore(1);
    const result = await sem.withPermit(async () => "done");
    expect(result).toBe("done");
    expect(sem.available).toBe(1);
  });

  it("withPermit auto-releases on error", async () => {
    const sem = new Semaphore(1);
    await expect(
      sem.withPermit(async () => { throw new Error("oops"); }),
    ).rejects.toThrow("oops");
    expect(sem.available).toBe(1);
  });
});

describe("getSemaphore registry", () => {
  beforeEach(() => resetSemaphores());

  it("returns same semaphore for same name", () => {
    expect(getSemaphore("db")).toBe(getSemaphore("db"));
  });

  it("returns different semaphores for different names", () => {
    expect(getSemaphore("a")).not.toBe(getSemaphore("b"));
  });
});
