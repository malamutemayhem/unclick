// wiring/taylor.ts
// Per-app MCP wiring for the taylor connector, split from additional-tools.ts
// and additional-handlers.ts (Stage 3b). Edit here; the indexes are assembled.
// category: Existing tools (previously unwired)

import { taylorExpand } from "../taylor-tool.js";
import { stringLcs } from "../lcs-tool.js";
import { topoSort } from "../toposort-tool.js";
import { convexHull } from "../convexhull-tool.js";
import { knapsackSolve } from "../knapsack-tool.js";
import { splineInterpolate } from "../spline-tool.js";
import { dijkstraPath } from "../dijkstra-tool.js";
import { matrixDecomp } from "../matrixdecomp-tool.js";
import { linearSolve } from "../linearsolve-tool.js";
import { numericalDiff } from "../numdiff-tool.js";
import { numericalIntegrate } from "../numintegrate-tool.js";
import { fftTransform } from "../fft-tool.js";
import { bezierCurve } from "../bezier-tool.js";
import { rootFind } from "../rootfind-tool.js";
import { matrixInverse } from "../matinverse-tool.js";
import { odeSolve } from "../ode-tool.js";
import { polynomialOps } from "../polynomial-tool.js";
import { hypothesisTest } from "../hypothesis-tool.js";
import { huffmanCode } from "../huffman-tool.js";
import { correlationCalc } from "../correlation-tool.js";
import { bitCount } from "../bitcount-tool.js";
import { runningStats } from "../runstats-tool.js";
import { graphAnalyze } from "../graph-tool.js";
import { convolution } from "../convolution-tool.js";
import { rleEncodeDecode } from "../rle2-tool.js";
import { descriptiveStats } from "../descriptive-tool.js";
import { bfsSearch } from "../bfs-tool.js";
import { monteCarloEstimate } from "../montecarlo-tool.js";
import { dfsSearch } from "../dfs-tool.js";
import { percentileCalc } from "../percentile-tool.js";
import { mstFind } from "../mst-tool.js";
import { pageRank } from "../pagerank-tool.js";
import { astarPath } from "../astar-tool.js";
import { simplexSolve } from "../simplex-tool.js";
import { hungarianAssign } from "../hungarian-tool.js";
import { kmeansCluster } from "../kmeans-tool.js";
import { bellmanFord } from "../bellmanford-tool.js";
import { floydWarshall } from "../floydwarshall-tool.js";
import { reservoirSample } from "../reservoir-tool.js";
import { bloomFilter } from "../bloomfilter-tool.js";
import { powerIteration } from "../poweriter-tool.js";
import { tspSolve } from "../tsp-tool.js";
import { lruSimulate } from "../lrucache-tool.js";
import { unionFindOps } from "../unionfind-tool.js";
import { tarjanScc } from "../tarjan-tool.js";
import { catalanCalc } from "../catalan-tool.js";
import { rabinKarpSearch } from "../rabinkarp-tool.js";
import { sieveOfEratosthenes } from "../sieve-tool.js";
import { suffixArrayBuild } from "../suffixarray-tool.js";
import { matChainOrder } from "../matchain-tool.js";
import { fenwickTree } from "../fenwick-tool.js";
import { segTree } from "../segtree-tool.js";
import { kmpSearch } from "../kmp-tool.js";
import { ahoCorasickSearch } from "../ahocorasick-tool.js";
import { zAlgorithm } from "../zalgo-tool.js";
import { trieOps } from "../trie-tool.js";
import { skipListSim } from "../skiplist-tool.js";
import { manacherPalindrome } from "../manacher-tool.js";
import { countingSort } from "../countingsort-tool.js";
import { radixSort } from "../radixsort-tool.js";
import { treapSim } from "../treap-tool.js";
import { longestIncreasingSubseq } from "../lis-tool.js";
import { kosarajuScc } from "../kosaraju-tool.js";
import { bucketSort } from "../bucketsort-tool.js";
import { edmondsKarp } from "../edmondskarp-tool.js";
import { avlTree } from "../avltree-tool.js";
import { bipartiteCheck } from "../bipartite-tool.js";
import { eulerPath } from "../eulerpath-tool.js";
import { sparseTable } from "../sparsetable-tool.js";
import { millerRabinTest } from "../millerrabin-tool.js";
import { rbTreeSim } from "../rbtree-tool.js";
import { heapSort } from "../heapsort-tool.js";
import { chineseRemainderTheorem } from "../crt-tool.js";
import { chineseRemainder } from "../chineseremainder-tool.js";
import { graphColoring } from "../graphcolor-tool.js";
import { extendedGcd } from "../extgcd-tool.js";
import { eulerTotient } from "../eulertotient-tool.js";
import { hopcroftKarp } from "../hopcroftcarp-tool.js";
import { intervalMerge } from "../intervalmerge-tool.js";
import { ternarySearch } from "../ternarysearch-tool.js";
import { shellSort } from "../shellsort-tool.js";
import { matrixExponentiation } from "../matexp-tool.js";
import { segmentIntersection } from "../segmentintersect-tool.js";
import { minVertexCover } from "../minvertexcover-tool.js";
import { suffixAutomaton } from "../suffixauto-tool.js";
import { gabowScc } from "../gabow-tool.js";
import { babyGiantStep } from "../babygiant-tool.js";
import { centroidDecomposition } from "../centroid-tool.js";
import { waveletTree } from "../wavelet-tool.js";
import { dinicMaxFlow } from "../dinic-tool.js";
import { lowestCommonAncestor } from "../lca-tool.js";
import { maxIndependentSet } from "../maxindepset-tool.js";
import { twoSat } from "../twosat-tool.js";
import { heavyLightDecomp } from "../hld-tool.js";
import { minCostMaxFlow } from "../mincostflow-tool.js";
import { persistentArray } from "../persistarray-tool.js";
import { suffixTree } from "../suffixtree-tool.js";
import { linkCutTree } from "../linkcut-tool.js";
import { graphCondensation } from "../condensation-tool.js";
import { mosAlgorithm } from "../mosalgo-tool.js";
import { cartesianTree } from "../cartesiantree-tool.js";
import { sternBrocotTree } from "../sternbrocot-tool.js";
import { chromaticNumber } from "../chromatic-tool.js";
import { eulerTour } from "../eulertour-tool.js";
import { gaussianElimination } from "../gausselim-tool.js";
import { eertree } from "../eertree-tool.js";
import { pollardRho } from "../pollardrho-tool.js";
import { ntt } from "../ntt-tool.js";
import { josephus } from "../josephus-tool.js";
import { berlekampMassey } from "../berlekamp-tool.js";
import { sosDp } from "../sos-tool.js";
import { xorBasis } from "../xorbase-tool.js";
import { moebiusFunction } from "../moebius-tool.js";
import { zFunction } from "../zfunction-tool.js";
import { lucasTheorem } from "../lucas-tool.js";
import { duvalFactorize } from "../duval-tool.js";
import { goertzel } from "../goertzel-tool.js";
import { burrowsWheeler } from "../bwt-tool.js";
import { ackermannFunction } from "../ackermann-tool.js";
import { deBruijn } from "../debruijn-tool.js";
import { shuntingYard } from "../shunting-tool.js";
import { fenwickRange } from "../fenwickrange-tool.js";
import { bitmaskOps } from "../bitmask-tool.js";
import { grayCode } from "../graycode-tool.js";
import { catmullRom } from "../catmullrom-tool.js";
import { rlEncode } from "../rlencode-tool.js";
import { topoCount } from "../topocount-tool.js";
import { boothRotation } from "../booth-tool.js";
import { prefixFunction } from "../prefixfn-tool.js";
import { matrixRank } from "../matrank-tool.js";
import { fenwick2D } from "../fenwick2d-tool.js";
import { continuedFraction } from "../contfrac-tool.js";
import { longestCommonPrefix } from "../lcprefix-tool.js";
import { lehmerCode } from "../lehmer-tool.js";
import { digitDp } from "../digitdp-tool.js";
import { coinChange } from "../coinchange-tool.js";
import { editDistance } from "../editdist-tool.js";
import { powerSet } from "../powerset-tool.js";
import { necklaceCount } from "../necklace-tool.js";
import { derangementCalc } from "../derangement-tool.js";
import { kmpAutomaton } from "../kmpautomaton-tool.js";
import { rmqSparse } from "../rmqsparse-tool.js";
import { partitionCount } from "../partition-tool.js";
import { stirlingNumbers } from "../stirling-tool.js";
import { haarWavelet } from "../waveletfn-tool.js";
import { convexHull3D } from "../convexhull3d-tool.js";
import { bezierClip } from "../bezierclip-tool.js";

export const taylorTools = [
  // ── taylor-tool.ts ────────────────────────────────────────────────────────────
  {
    name: "taylor_expand",
    description: "Taylor series approximation for exp, sin, cos, ln(1+x), and atan(x).",
    inputSchema: {
      type: "object" as const, additionalProperties: false, properties: {
        function: { type: "string" as const, description: "Function: exp, sin, cos, ln1p, or atan." },
        x: { type: "number" as const, description: "Point to evaluate at." },
        terms: { type: "number" as const, description: "Number of terms (default 10, max 50)." },
      }, required: ["function", "x"],
    },
  },
] as const;

export const taylorHandlers: Record<string, (args: Record<string, unknown>) => Promise<unknown>> = {
  // taylor-tool.ts
  taylor_expand:             (args) => taylorExpand(args),

  // batch 58: algorithms & data structures
  string_lcs:                (args) => stringLcs(args),
  topo_sort:                 (args) => topoSort(args),
  convex_hull:               (args) => convexHull(args),
  knapsack_solve:            (args) => knapsackSolve(args),
  spline_interpolate:        (args) => splineInterpolate(args),

  // batch 59: graphs, linear algebra, calculus
  dijkstra_path:             (args) => dijkstraPath(args),
  matrix_decomp:             (args) => matrixDecomp(args),
  linear_solve:              (args) => linearSolve(args),
  numerical_diff:            (args) => numericalDiff(args),
  numerical_integrate:       (args) => numericalIntegrate(args),

  // batch 60: signal processing, curves, root finding, matrix inverse
  fft_transform:             (args) => fftTransform(args),
  bezier_curve:              (args) => bezierCurve(args),
  root_find:                 (args) => rootFind(args),
  matrix_inverse:            (args) => matrixInverse(args),

  // batch 61: ODE solver, polynomial ops, hypothesis testing, Huffman coding
  ode_solve:                 (args) => odeSolve(args),
  polynomial_ops:            (args) => polynomialOps(args),
  hypothesis_test:           (args) => hypothesisTest(args),
  huffman_code:              (args) => huffmanCode(args),

  // batch 62: correlation, bit count, running stats, graph analysis
  correlation_calc:          (args) => correlationCalc(args),
  bit_count:                 (args) => bitCount(args),
  running_stats:             (args) => runningStats(args),
  graph_analyze:             (args) => graphAnalyze(args),

  // batch 63: convolution, RLE encode/decode, descriptive stats, BFS
  convolution:               (args) => convolution(args),
  rle_encode_decode:         (args) => rleEncodeDecode(args),
  descriptive_stats:         (args) => descriptiveStats(args),
  bfs_search:                (args) => bfsSearch(args),

  // batch 64: Monte Carlo, DFS, percentile, MST
  monte_carlo_estimate:      (args) => monteCarloEstimate(args),
  dfs_search:                (args) => dfsSearch(args),
  percentile_calc:           (args) => percentileCalc(args),
  mst_find:                  (args) => mstFind(args),

  // batch 65: PageRank, A*, simplex, Hungarian
  page_rank:                 (args) => pageRank(args),
  astar_path:                (args) => astarPath(args),
  simplex_solve:             (args) => simplexSolve(args),
  hungarian_assign:          (args) => hungarianAssign(args),

  // batch 66: k-means, Bellman-Ford, Floyd-Warshall, reservoir sampling
  kmeans_cluster:            (args) => kmeansCluster(args),
  bellman_ford:              (args) => bellmanFord(args),
  floyd_warshall:            (args) => floydWarshall(args),
  reservoir_sample:          (args) => reservoirSample(args),

  // batch 67: Bloom filter, power iteration, TSP, LRU cache
  bloom_filter:              (args) => bloomFilter(args),
  power_iteration:           (args) => powerIteration(args),
  tsp_solve:                 (args) => tspSolve(args),
  lru_simulate:              (args) => lruSimulate(args),

  // batch 68: Union-Find, Tarjan SCC, Catalan, Rabin-Karp
  union_find:                (args) => unionFindOps(args),
  tarjan_scc:                (args) => tarjanScc(args),
  catalan_calc:              (args) => catalanCalc(args),
  rabin_karp_search:         (args) => rabinKarpSearch(args),

  // batch 69: Sieve, Suffix Array, Matrix Chain, Fenwick Tree
  sieve_of_eratosthenes:     (args) => sieveOfEratosthenes(args),
  suffix_array_build:        (args) => suffixArrayBuild(args),
  matrix_chain_order:        (args) => matChainOrder(args),
  fenwick_tree:              (args) => fenwickTree(args),

  // batch 70: Segment Tree, KMP, Aho-Corasick, Z-Algorithm
  segment_tree:              (args) => segTree(args),
  kmp_search:                (args) => kmpSearch(args),
  aho_corasick_search:       (args) => ahoCorasickSearch(args),
  z_algorithm:               (args) => zAlgorithm(args),

  // batch 71: Trie, Skip List, Manacher, Counting Sort
  trie_ops:                  (args) => trieOps(args),
  skip_list_sim:             (args) => skipListSim(args),
  manacher_palindrome:       (args) => manacherPalindrome(args),
  counting_sort:             (args) => countingSort(args),

  // batch 72: Radix Sort, Treap, LIS, Kosaraju SCC
  radix_sort:                (args) => radixSort(args),
  treap_sim:                 (args) => treapSim(args),
  longest_increasing_subsequence: (args) => longestIncreasingSubseq(args),
  kosaraju_scc:              (args) => kosarajuScc(args),

  // batch 73: Bucket Sort, Edmonds-Karp, AVL Tree, Bipartite Check
  bucket_sort:               (args) => bucketSort(args),
  edmonds_karp:              (args) => edmondsKarp(args),
  avl_tree:                  (args) => avlTree(args),
  bipartite_check:           (args) => bipartiteCheck(args),

  // batch 74: Euler Path, Sparse Table, Miller-Rabin, Red-Black Tree
  euler_path:                (args) => eulerPath(args),
  sparse_table:              (args) => sparseTable(args),
  miller_rabin_test:         (args) => millerRabinTest(args),
  rb_tree_sim:               (args) => rbTreeSim(args),

  // batch 75: Heap Sort, CRT, Graph Coloring, Extended GCD
  heap_sort:                 (args) => heapSort(args),
  chinese_remainder_theorem: (args) => chineseRemainderTheorem(args),
  graph_coloring:            (args) => graphColoring(args),
  extended_gcd:              (args) => extendedGcd(args),

  // batch 76: Euler Totient, Hopcroft-Karp, Interval Merge, Ternary Search
  euler_totient:             (args) => eulerTotient(args),
  hopcroft_karp:             (args) => hopcroftKarp(args),
  interval_merge:            (args) => intervalMerge(args),
  ternary_search:            (args) => ternarySearch(args),

  // batch 77: Shell Sort, Matrix Exponentiation, Segment Intersection, Min Vertex Cover
  shell_sort:                (args) => shellSort(args),
  matrix_exponentiation:     (args) => matrixExponentiation(args),
  segment_intersection:      (args) => segmentIntersection(args),
  min_vertex_cover:          (args) => minVertexCover(args),

  // batch 78: Suffix Automaton, Gabow SCC, Baby-step Giant-step, Centroid Decomposition
  suffix_automaton:          (args) => suffixAutomaton(args),
  gabow_scc:                 (args) => gabowScc(args),
  baby_giant_step:           (args) => babyGiantStep(args),
  centroid_decomposition:    (args) => centroidDecomposition(args),

  // batch 79: Wavelet Tree, Dinic Max Flow, LCA, Max Independent Set
  wavelet_tree:              (args) => waveletTree(args),
  dinic_max_flow:            (args) => dinicMaxFlow(args),
  lowest_common_ancestor:    (args) => lowestCommonAncestor(args),
  max_independent_set:       (args) => maxIndependentSet(args),

  // batch 80: 2-SAT, HLD, Min Cost Max Flow, Persistent Array
  two_sat:                       (args) => twoSat(args),
  heavy_light_decomposition:     (args) => heavyLightDecomp(args),
  min_cost_max_flow:             (args) => minCostMaxFlow(args),
  persistent_array:              (args) => persistentArray(args),

  // batch 81: Suffix Tree, Link-Cut Tree, Graph Condensation, Mo's Algorithm
  suffix_tree:                   (args) => suffixTree(args),
  link_cut_tree:                 (args) => linkCutTree(args),
  graph_condensation:            (args) => graphCondensation(args),
  mos_algorithm:                 (args) => mosAlgorithm(args),

  // batch 82: Cartesian Tree, Stern-Brocot Tree, Chromatic Number, Euler Tour
  cartesian_tree:                (args) => cartesianTree(args),
  stern_brocot_tree:             (args) => sternBrocotTree(args),
  chromatic_number:              (args) => chromaticNumber(args),
  euler_tour:                    (args) => eulerTour(args),

  // batch 83: Gaussian Elimination, Eertree, Pollard's Rho, NTT
  gaussian_elimination:          (args) => gaussianElimination(args),
  eertree:                       (args) => eertree(args),
  pollard_rho:                   (args) => pollardRho(args),
  ntt:                           (args) => ntt(args),

  // batch 84: Josephus, Berlekamp-Massey, SOS DP, XOR Basis
  josephus:                      (args) => josephus(args),
  berlekamp_massey:              (args) => berlekampMassey(args),
  sos_dp:                        (args) => sosDp(args),
  xor_basis:                     (args) => xorBasis(args),

  // batch 85: Moebius Function, Z-Function, Chinese Remainder, Lucas' Theorem
  moebius_function:              (args) => moebiusFunction(args),
  z_function:                    (args) => zFunction(args),
  chinese_remainder:             (args) => chineseRemainder(args),
  lucas_theorem:                 (args) => lucasTheorem(args),

  // batch 86: Duval, Goertzel, Burrows-Wheeler, Ackermann
  duval_factorize:               (args) => duvalFactorize(args),
  goertzel:                      (args) => goertzel(args),
  burrows_wheeler:               (args) => burrowsWheeler(args),
  ackermann:                     (args) => ackermannFunction(args),

  // batch 87: de Bruijn, Shunting-Yard, Fenwick Range, Bitmask Ops
  de_bruijn:                     (args) => deBruijn(args),
  shunting_yard:                 (args) => shuntingYard(args),
  fenwick_range:                 (args) => fenwickRange(args),
  bitmask_ops:                   (args) => bitmaskOps(args),

  // batch 88: Gray Code, Catmull-Rom, Run-Length Encoding, Topo Count
  gray_code:                     (args) => grayCode(args),
  catmull_rom:                   (args) => catmullRom(args),
  rl_encode:                     (args) => rlEncode(args),
  topo_count:                    (args) => topoCount(args),

  // batch 89: Booth, Prefix Function, Matrix Rank, Fenwick 2D
  booth_rotation:                (args) => boothRotation(args),
  prefix_function:               (args) => prefixFunction(args),
  matrix_rank:                   (args) => matrixRank(args),
  fenwick_2d:                    (args) => fenwick2D(args),

  // batch 90: Continued Fractions, Longest Common Prefix, Lehmer Code, Digit DP
  continued_fraction:            (args) => continuedFraction(args),
  longest_common_prefix:         (args) => longestCommonPrefix(args),
  lehmer_code:                   (args) => lehmerCode(args),
  digit_dp:                      (args) => digitDp(args),

  // batch 91: Coin Change, Edit Distance, Power Set, Necklace Count
  coin_change:                   (args) => coinChange(args),
  edit_distance:                 (args) => editDistance(args),
  power_set:                     (args) => powerSet(args),
  necklace_count:                (args) => necklaceCount(args),

  // batch 92: Derangement, KMP Automaton, RMQ Sparse, Partition
  derangement_calc:              (args) => derangementCalc(args),
  kmp_automaton:                 (args) => kmpAutomaton(args),
  rmq_sparse:                    (args) => rmqSparse(args),
  partition_count:               (args) => partitionCount(args),

  // batch 93: Stirling Numbers, Haar Wavelet, 3D Convex Hull, Bezier Clip
  stirling_numbers:              (args) => stirlingNumbers(args),
  haar_wavelet:                  (args) => haarWavelet(args),
  convex_hull_3d:                (args) => convexHull3D(args),
  bezier_clip:                   (args) => bezierClip(args),
};
