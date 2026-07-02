import { describe, it, expect } from "vitest";
import { camelsnakeConvert } from "./camelsnake-tool.js";

describe("camelsnake-tool", () => {
  it("converts to all cases when no target specified", async () => {
    const r = await camelsnakeConvert({ text: "hello world" }) as Record<string, unknown>;
    const c = r.conversions as Record<string, string>;
    expect(c.camel).toBe("helloWorld");
    expect(c.pascal).toBe("HelloWorld");
    expect(c.snake).toBe("hello_world");
    expect(c.kebab).toBe("hello-world");
    expect(c.constant).toBe("HELLO_WORLD");
    expect(r.unclick_meta).toBeDefined();
  });

  it("converts camelCase input to snake_case", async () => {
    const r = await camelsnakeConvert({ text: "myVariableName", target: "snake" }) as Record<string, unknown>;
    expect(r.output).toBe("my_variable_name");
  });

  it("converts snake_case to camelCase", async () => {
    const r = await camelsnakeConvert({ text: "my_variable_name", target: "camel" }) as Record<string, unknown>;
    expect(r.output).toBe("myVariableName");
  });

  it("handles kebab-case input", async () => {
    const r = await camelsnakeConvert({ text: "my-component-name", target: "pascal" }) as Record<string, unknown>;
    expect(r.output).toBe("MyComponentName");
  });

  it("rejects empty input", async () => {
    const r = await camelsnakeConvert({}) as Record<string, unknown>;
    expect(r.error).toMatch(/text/i);
  });
});
