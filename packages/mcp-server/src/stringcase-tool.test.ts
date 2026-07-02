import { describe, it, expect } from "vitest";
import { stringCase } from "./stringcase-tool.js";

describe("stringcase-tool", () => {
  it("converts camelCase input", async () => {
    const r = await stringCase({ text: "helloWorld" }) as Record<string, unknown>;
    expect(r.snake_case).toBe("hello_world");
    expect(r.kebab_case).toBe("hello-world");
    expect(r.PascalCase).toBe("HelloWorld");
    expect(r.unclick_meta).toBeDefined();
  });

  it("converts snake_case input", async () => {
    const r = await stringCase({ text: "my_variable_name" }) as Record<string, unknown>;
    expect(r.camelCase).toBe("myVariableName");
    expect(r.SCREAMING_SNAKE).toBe("MY_VARIABLE_NAME");
    expect(r["Title Case"]).toBe("My Variable Name");
  });

  it("converts kebab-case input", async () => {
    const r = await stringCase({ text: "some-css-class" }) as Record<string, unknown>;
    expect(r.PascalCase).toBe("SomeCssClass");
    expect(r.dot_case).toBe("some.css.class");
  });

  it("rejects empty input", async () => {
    const r = await stringCase({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
