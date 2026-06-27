import { describe, it, expect } from "vitest";
import {
  tInt, tFloat, tBool, tString, tVoid, tAny, tNever,
  tFn, tArray, typeEqual, isAssignable, typeToString, TypeEnv,
} from "../type-checker.js";

describe("type constructors", () => {
  it("basic types", () => {
    expect(tInt().kind).toBe("int");
    expect(tFloat().kind).toBe("float");
    expect(tBool().kind).toBe("bool");
    expect(tString().kind).toBe("string");
    expect(tVoid().kind).toBe("void");
    expect(tAny().kind).toBe("any");
    expect(tNever().kind).toBe("never");
  });

  it("fn type", () => {
    const fn = tFn([tInt(), tString()], tBool());
    expect(fn.kind).toBe("fn");
    expect(fn.params).toHaveLength(2);
    expect(fn.returnType!.kind).toBe("bool");
  });

  it("array type", () => {
    const arr = tArray(tInt());
    expect(arr.kind).toBe("array");
    expect(arr.elementType!.kind).toBe("int");
  });
});

describe("typeEqual", () => {
  it("same primitive types are equal", () => {
    expect(typeEqual(tInt(), tInt())).toBe(true);
    expect(typeEqual(tBool(), tBool())).toBe(true);
  });

  it("different primitive types are not equal", () => {
    expect(typeEqual(tInt(), tFloat())).toBe(false);
  });

  it("fn types compared structurally", () => {
    expect(typeEqual(tFn([tInt()], tBool()), tFn([tInt()], tBool()))).toBe(true);
    expect(typeEqual(tFn([tInt()], tBool()), tFn([tFloat()], tBool()))).toBe(false);
  });

  it("array types compared structurally", () => {
    expect(typeEqual(tArray(tInt()), tArray(tInt()))).toBe(true);
    expect(typeEqual(tArray(tInt()), tArray(tFloat()))).toBe(false);
  });
});

describe("isAssignable", () => {
  it("same types are assignable", () => {
    expect(isAssignable(tInt(), tInt())).toBe(true);
  });

  it("int to float is assignable", () => {
    expect(isAssignable(tFloat(), tInt())).toBe(true);
  });

  it("float to int is not assignable", () => {
    expect(isAssignable(tInt(), tFloat())).toBe(false);
  });

  it("any accepts everything", () => {
    expect(isAssignable(tAny(), tInt())).toBe(true);
    expect(isAssignable(tString(), tAny())).toBe(true);
  });

  it("never is assignable to anything", () => {
    expect(isAssignable(tInt(), tNever())).toBe(true);
  });
});

describe("typeToString", () => {
  it("primitives", () => {
    expect(typeToString(tInt())).toBe("int");
    expect(typeToString(tBool())).toBe("bool");
  });

  it("function type", () => {
    expect(typeToString(tFn([tInt(), tString()], tVoid()))).toBe("(int, string) => void");
  });

  it("array type", () => {
    expect(typeToString(tArray(tFloat()))).toBe("float[]");
  });
});

describe("TypeEnv", () => {
  it("define and lookup", () => {
    const env = new TypeEnv();
    env.define("x", tInt());
    expect(env.lookup("x")).not.toBeNull();
    expect(env.lookup("x")!.kind).toBe("int");
  });

  it("lookup returns null for undefined", () => {
    const env = new TypeEnv();
    expect(env.lookup("unknown")).toBeNull();
  });

  it("scoping works", () => {
    const env = new TypeEnv();
    env.define("x", tInt());
    env.pushScope();
    env.define("y", tBool());
    expect(env.lookup("x")!.kind).toBe("int");
    expect(env.lookup("y")!.kind).toBe("bool");
    env.popScope();
    expect(env.lookup("y")).toBeNull();
    expect(env.lookup("x")!.kind).toBe("int");
  });

  it("checkAssignment succeeds for compatible", () => {
    const env = new TypeEnv();
    env.define("x", tFloat());
    expect(env.checkAssignment("x", tInt())).toBe(true);
  });

  it("checkAssignment fails for incompatible", () => {
    const env = new TypeEnv();
    env.define("x", tInt());
    expect(env.checkAssignment("x", tString())).toBe(false);
    expect(env.getErrors()).toHaveLength(1);
  });

  it("checkCall succeeds with correct args", () => {
    const env = new TypeEnv();
    env.define("add", tFn([tInt(), tInt()], tInt()));
    const ret = env.checkCall("add", [tInt(), tInt()]);
    expect(ret).not.toBeNull();
    expect(ret!.kind).toBe("int");
  });

  it("checkCall fails with wrong arg count", () => {
    const env = new TypeEnv();
    env.define("f", tFn([tInt()], tVoid()));
    expect(env.checkCall("f", [])).toBeNull();
    expect(env.getErrors().length).toBeGreaterThan(0);
  });

  it("checkCall fails for non-function", () => {
    const env = new TypeEnv();
    env.define("x", tInt());
    expect(env.checkCall("x", [])).toBeNull();
  });

  it("clearErrors resets", () => {
    const env = new TypeEnv();
    env.checkAssignment("missing", tInt());
    expect(env.getErrors().length).toBeGreaterThan(0);
    env.clearErrors();
    expect(env.getErrors()).toHaveLength(0);
  });

  it("scopeDepth", () => {
    const env = new TypeEnv();
    expect(env.scopeDepth).toBe(1);
    env.pushScope();
    expect(env.scopeDepth).toBe(2);
    env.popScope();
    expect(env.scopeDepth).toBe(1);
  });
});
