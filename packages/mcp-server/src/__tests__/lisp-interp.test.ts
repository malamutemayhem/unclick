import { describe, it, expect } from "vitest";
import { LispInterpreter } from "../lisp-interp.js";

describe("LispInterpreter", () => {
  it("evaluates numbers", () => {
    const lisp = new LispInterpreter();
    expect(lisp.eval("42")).toBe(42);
  });

  it("evaluates arithmetic", () => {
    const lisp = new LispInterpreter();
    expect(lisp.eval("(+ 1 2 3)")).toBe(6);
    expect(lisp.eval("(- 10 3)")).toBe(7);
    expect(lisp.eval("(* 4 5)")).toBe(20);
  });

  it("evaluates nested expressions", () => {
    const lisp = new LispInterpreter();
    expect(lisp.eval("(+ (* 2 3) (- 10 4))")).toBe(12);
  });

  it("defines variables", () => {
    const lisp = new LispInterpreter();
    lisp.eval("(define x 10)");
    expect(lisp.eval("x")).toBe(10);
  });

  it("evaluates if expressions", () => {
    const lisp = new LispInterpreter();
    expect(lisp.eval("(if (= 1 1) 42 0)")).toBe(42);
    expect(lisp.eval("(if (= 1 2) 42 0)")).toBe(0);
  });

  it("defines and calls lambdas", () => {
    const lisp = new LispInterpreter();
    lisp.eval("(define square (lambda (x) (* x x)))");
    expect(lisp.eval("(square 5)")).toBe(25);
  });

  it("list operations", () => {
    const lisp = new LispInterpreter();
    expect(lisp.eval("(car (list 1 2 3))")).toBe(1);
    expect(lisp.eval("(length (list 1 2 3))")).toBe(3);
  });

  it("comparison operators", () => {
    const lisp = new LispInterpreter();
    expect(lisp.eval("(< 1 2)")).toBe(true);
    expect(lisp.eval("(> 5 3)")).toBe(true);
  });

  it("begin evaluates sequence", () => {
    const lisp = new LispInterpreter();
    expect(lisp.eval("(begin (define a 1) (define b 2) (+ a b))")).toBe(3);
  });

  it("throws on undefined variable", () => {
    const lisp = new LispInterpreter();
    expect(() => lisp.eval("undefined_var")).toThrow("Undefined variable");
  });
});
