import { describe, it, expect } from "vitest";
import { NavMesh } from "../nav-mesh.js";

describe("NavMesh", () => {
  it("addNode and getNode", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    const node = mesh.getNode("a");
    expect(node).not.toBeNull();
    expect(node!.x).toBe(0);
  });

  it("addEdge creates bidirectional connection", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    mesh.addNode("b", 3, 4);
    mesh.addEdge("a", "b");
    expect(mesh.getNeighbors("a")).toContain("b");
    expect(mesh.getNeighbors("b")).toContain("a");
  });

  it("findPath finds shortest path", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    mesh.addNode("b", 1, 0);
    mesh.addNode("c", 2, 0);
    mesh.addEdge("a", "b");
    mesh.addEdge("b", "c");
    const result = mesh.findPath("a", "c");
    expect(result).not.toBeNull();
    expect(result!.path).toEqual(["a", "b", "c"]);
  });

  it("findPath returns null for disconnected nodes", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    mesh.addNode("b", 10, 10);
    expect(mesh.findPath("a", "b")).toBeNull();
  });

  it("findPath uses custom cost", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    mesh.addNode("b", 1, 0);
    mesh.addNode("c", 2, 0);
    mesh.addNode("d", 1, 1);
    mesh.addEdge("a", "b", 10);
    mesh.addEdge("b", "c", 10);
    mesh.addEdge("a", "d", 1);
    mesh.addEdge("d", "c", 1);
    const result = mesh.findPath("a", "c");
    expect(result).not.toBeNull();
    expect(result!.path).toContain("d");
    expect(result!.cost).toBe(2);
  });

  it("nodeCount and edgeCount", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    mesh.addNode("b", 1, 0);
    mesh.addNode("c", 2, 0);
    mesh.addEdge("a", "b");
    mesh.addEdge("b", "c");
    expect(mesh.nodeCount).toBe(3);
    expect(mesh.edgeCount).toBe(2);
  });

  it("removeNode", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    mesh.addNode("b", 1, 0);
    mesh.addEdge("a", "b");
    mesh.removeNode("b");
    expect(mesh.nodeCount).toBe(1);
    expect(mesh.getNeighbors("a")).toHaveLength(0);
  });

  it("clear empties mesh", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    mesh.addNode("b", 1, 0);
    mesh.clear();
    expect(mesh.nodeCount).toBe(0);
  });

  it("findPath with unknown nodes returns null", () => {
    const mesh = new NavMesh();
    expect(mesh.findPath("x", "y")).toBeNull();
  });

  it("same start and goal", () => {
    const mesh = new NavMesh();
    mesh.addNode("a", 0, 0);
    const result = mesh.findPath("a", "a");
    expect(result).not.toBeNull();
    expect(result!.path).toEqual(["a"]);
    expect(result!.cost).toBe(0);
  });
});
