import { describe, it, expect } from "vitest";
import {
  checkConfig,
  requiredField,
  allowedValues,
  numberRange,
  deprecatedField,
} from "../config-check.js";

describe("requiredField", () => {
  it("passes when field exists", () => {
    const result = checkConfig({ name: "test" }, [requiredField("name")]);
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("fails when field is missing", () => {
    const result = checkConfig({}, [requiredField("name")]);
    expect(result.valid).toBe(false);
    expect(result.issues[0].severity).toBe("error");
  });

  it("fails when field is empty string", () => {
    const result = checkConfig({ name: "" }, [requiredField("name")]);
    expect(result.valid).toBe(false);
  });

  it("fails when field is null", () => {
    const result = checkConfig({ name: null }, [requiredField("name")]);
    expect(result.valid).toBe(false);
  });

  it("supports nested dotted paths", () => {
    const result = checkConfig({ db: { host: "localhost" } }, [requiredField("db.host")]);
    expect(result.valid).toBe(true);
  });

  it("fails for missing nested paths", () => {
    const result = checkConfig({ db: {} }, [requiredField("db.host")]);
    expect(result.valid).toBe(false);
  });

  it("uses custom description", () => {
    const result = checkConfig({}, [requiredField("name", "Provide a name")]);
    expect(result.issues[0].message).toBe("Provide a name");
  });
});

describe("allowedValues", () => {
  it("passes when value is in the list", () => {
    const result = checkConfig({ env: "prod" }, [allowedValues("env", ["dev", "staging", "prod"])]);
    expect(result.valid).toBe(true);
  });

  it("fails when value is not in the list", () => {
    const result = checkConfig({ env: "test" }, [allowedValues("env", ["dev", "staging", "prod"])]);
    expect(result.valid).toBe(false);
    expect(result.issues[0].message).toContain("must be one of");
  });

  it("skips when field is missing", () => {
    const result = checkConfig({}, [allowedValues("env", ["dev", "prod"])]);
    expect(result.valid).toBe(true);
  });
});

describe("numberRange", () => {
  it("passes when in range", () => {
    const result = checkConfig({ port: 8080 }, [numberRange("port", 1, 65535)]);
    expect(result.valid).toBe(true);
  });

  it("fails when below range", () => {
    const result = checkConfig({ port: 0 }, [numberRange("port", 1, 65535)]);
    expect(result.valid).toBe(false);
  });

  it("fails when above range", () => {
    const result = checkConfig({ port: 70000 }, [numberRange("port", 1, 65535)]);
    expect(result.valid).toBe(false);
  });

  it("fails for non-numeric values", () => {
    const result = checkConfig({ port: "abc" }, [numberRange("port", 1, 65535)]);
    expect(result.valid).toBe(false);
  });

  it("skips when field is missing", () => {
    const result = checkConfig({}, [numberRange("port", 1, 65535)]);
    expect(result.valid).toBe(true);
  });
});

describe("deprecatedField", () => {
  it("warns when deprecated field is present", () => {
    const result = checkConfig({ old_key: "val" }, [deprecatedField("old_key", "new_key")]);
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0].severity).toBe("warning");
    expect(result.issues[0].message).toContain("deprecated");
  });

  it("provides an autofix that migrates the value", () => {
    const config: Record<string, unknown> = { old_key: "val" };
    const result = checkConfig(config, [deprecatedField("old_key", "new_key")]);
    result.issues[0].autofix!();
    expect(config.new_key).toBe("val");
    expect(config.old_key).toBeUndefined();
  });

  it("skips when deprecated field is absent", () => {
    const result = checkConfig({ new_key: "val" }, [deprecatedField("old_key", "new_key")]);
    expect(result.issues).toHaveLength(0);
  });
});

describe("checkConfig with multiple rules", () => {
  it("collects multiple issues", () => {
    const result = checkConfig(
      { env: "bad" },
      [
        requiredField("name"),
        allowedValues("env", ["dev", "prod"]),
        numberRange("port", 1, 65535),
      ],
    );
    expect(result.valid).toBe(false);
    expect(result.issues).toHaveLength(2);
  });

  it("reports valid when only warnings exist", () => {
    const result = checkConfig(
      { old_key: "val", name: "test" },
      [requiredField("name"), deprecatedField("old_key", "new_key")],
    );
    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(1);
  });
});
