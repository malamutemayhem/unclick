import { describe, it, expect } from "vitest";
import {
  lens, prop, index, at, prism, head, last,
  each, filtered, view, set, over, path, path3
} from "../lens.js";

describe("Lens", () => {
  interface Person { name: string; age: number; address: { city: string; zip: string } }

  const person: Person = { name: "Alice", age: 30, address: { city: "NYC", zip: "10001" } };

  it("prop lens gets value", () => {
    const nameLens = prop<Person, "name">("name");
    expect(nameLens.get(person)).toBe("Alice");
  });

  it("prop lens sets value immutably", () => {
    const nameLens = prop<Person, "name">("name");
    const updated = nameLens.set(person, "Bob");
    expect(updated.name).toBe("Bob");
    expect(person.name).toBe("Alice");
  });

  it("prop lens modifies value", () => {
    const ageLens = prop<Person, "age">("age");
    const updated = ageLens.modify(person, (a) => a + 1);
    expect(updated.age).toBe(31);
  });

  it("composes lenses", () => {
    const addressLens = prop<Person, "address">("address");
    const cityLens = prop<Person["address"], "city">("city");
    const composed = addressLens.compose(cityLens);
    expect(composed.get(person)).toBe("NYC");
    const updated = composed.set(person, "LA");
    expect(updated.address.city).toBe("LA");
  });

  it("index lens for arrays", () => {
    const arr = [10, 20, 30];
    const secondLens = index<number>(1);
    expect(secondLens.get(arr)).toBe(20);
    const updated = secondLens.set(arr, 99);
    expect(updated).toEqual([10, 99, 30]);
  });

  it("at lens for records", () => {
    const record: Record<string, number> = { a: 1, b: 2 };
    const aLens = at<number>("a");
    expect(aLens.get(record)).toBe(1);
    const updated = aLens.set(record, 99);
    expect(updated.a).toBe(99);
  });

  it("head prism", () => {
    const h = head<number>();
    expect(h.getOption([1, 2, 3])).toBe(1);
    expect(h.getOption([])).toBeUndefined();
    expect(h.set([1, 2, 3], 10)).toEqual([10, 2, 3]);
  });

  it("last prism", () => {
    const l = last<number>();
    expect(l.getOption([1, 2, 3])).toBe(3);
    expect(l.modify([1, 2, 3], (x) => x * 10)).toEqual([1, 2, 30]);
  });

  it("each traversal", () => {
    const t = each<number>();
    expect(t.getAll([1, 2, 3])).toEqual([1, 2, 3]);
    expect(t.modify([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6]);
  });

  it("filtered traversal", () => {
    const evens = filtered<number>((n) => n % 2 === 0);
    expect(evens.getAll([1, 2, 3, 4])).toEqual([2, 4]);
    expect(evens.modify([1, 2, 3, 4], (x) => x * 10)).toEqual([1, 20, 3, 40]);
  });

  it("view/set/over helpers", () => {
    const ageLens = prop<Person, "age">("age");
    expect(view(ageLens, person)).toBe(30);
    expect(set(ageLens, 25, person).age).toBe(25);
    expect(over(ageLens, (a) => a * 2, person).age).toBe(60);
  });

  it("path composes two lenses", () => {
    const deep = path(
      prop<Person, "address">("address"),
      prop<Person["address"], "city">("city")
    );
    expect(deep.get(person)).toBe("NYC");
  });

  it("path3 composes three lenses", () => {
    interface Nested { a: { b: { c: number } } }
    const obj: Nested = { a: { b: { c: 42 } } };
    const deep = path3(
      prop<Nested, "a">("a"),
      prop<Nested["a"], "b">("b"),
      prop<Nested["a"]["b"], "c">("c")
    );
    expect(deep.get(obj)).toBe(42);
    expect(deep.set(obj, 99).a.b.c).toBe(99);
  });
});
