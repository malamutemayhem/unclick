import { describe, expect, it } from "vitest";
import { nextTopFactLimit } from "./MemoryActivityTab";

describe("Recall Check top-of-mind paging", () => {
  it("loads the next hundred facts by default", () => {
    expect(nextTopFactLimit(10, 250)).toBe(110);
  });

  it("does not step past the available fact count", () => {
    expect(nextTopFactLimit(110, 145)).toBe(145);
  });

  it("caps very large memory sets", () => {
    expect(nextTopFactLimit(210, 800)).toBe(250);
  });
});
