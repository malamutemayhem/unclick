import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function eulerPath(args: Record<string, unknown>) {
  const vertices = Number(args.vertices);
  const edgeList = args.edges as [number, number][];
  const directed = Boolean(args.directed ?? false);

  if (!Number.isInteger(vertices) || vertices < 1) {
    throw new Error("vertices must be a positive integer");
  }
  if (vertices > 10_000) {
    throw new Error("vertices must be at most 10,000");
  }
  if (!Array.isArray(edgeList)) {
    throw new Error("edges must be an array of [u, v] pairs");
  }

  for (const [u, v] of edgeList) {
    if (u < 0 || u >= vertices || v < 0 || v >= vertices) {
      throw new Error(`edge [${u},${v}] references vertex out of range`);
    }
  }

  const inDeg = new Int32Array(vertices);
  const outDeg = new Int32Array(vertices);
  const deg = new Int32Array(vertices);

  if (directed) {
    for (const [u, v] of edgeList) {
      outDeg[u]++;
      inDeg[v]++;
    }
  } else {
    for (const [u, v] of edgeList) {
      deg[u]++;
      deg[v]++;
    }
  }

  let hasEulerCircuit = false;
  let hasEulerPath = false;
  let startVertex = -1;
  let endVertex = -1;

  if (directed) {
    let startCount = 0;
    let endCount = 0;
    let balanced = true;
    for (let i = 0; i < vertices; i++) {
      const diff = outDeg[i] - inDeg[i];
      if (diff === 1) {
        startCount++;
        startVertex = i;
      } else if (diff === -1) {
        endCount++;
        endVertex = i;
      } else if (diff !== 0) {
        balanced = false;
        break;
      }
    }
    if (balanced) {
      if (startCount === 0 && endCount === 0) {
        hasEulerCircuit = true;
        hasEulerPath = true;
      } else if (startCount === 1 && endCount === 1) {
        hasEulerPath = true;
      }
    }
  } else {
    let oddCount = 0;
    const oddVertices: number[] = [];
    for (let i = 0; i < vertices; i++) {
      if (deg[i] % 2 !== 0) {
        oddCount++;
        oddVertices.push(i);
      }
    }
    if (oddCount === 0) {
      hasEulerCircuit = true;
      hasEulerPath = true;
    } else if (oddCount === 2) {
      hasEulerPath = true;
      startVertex = oddVertices[0];
      endVertex = oddVertices[1];
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Euler path/circuit detection for route planning and graph traversal"],
  };

  const result: Record<string, unknown> = {
    vertex_count: vertices,
    edge_count: edgeList.length,
    directed,
    has_euler_circuit: hasEulerCircuit,
    has_euler_path: hasEulerPath,
  };

  if (hasEulerPath && !hasEulerCircuit) {
    result.start_vertex = startVertex;
    result.end_vertex = endVertex;
  }

  if (directed) {
    const degrees: Record<number, { in: number; out: number }> = {};
    for (let i = 0; i < vertices; i++) {
      if (inDeg[i] > 0 || outDeg[i] > 0) {
        degrees[i] = { in: inDeg[i], out: outDeg[i] };
      }
    }
    result.degree_summary = degrees;
  } else {
    const oddVerts: number[] = [];
    for (let i = 0; i < vertices; i++) {
      if (deg[i] % 2 !== 0) oddVerts.push(i);
    }
    result.odd_degree_vertices = oddVerts;
    result.odd_degree_count = oddVerts.length;
  }

  return stampMeta(result, meta);
}
