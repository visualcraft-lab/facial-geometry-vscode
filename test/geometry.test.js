"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  PHI,
  canthalTiltDeg,
  computeFacialThirds,
  goldenRatioDelta,
  bilateralSymmetry,
  parseNumberList,
} = require("../lib/geometry");

test("canthalTiltDeg computes positive upward angle", () => {
  const deg = canthalTiltDeg({ x: 100, y: 200 }, { x: 140, y: 193 });
  assert.ok(deg > 9.0 && deg < 10.5, `unexpected deg: ${deg}`);
});

test("canthalTiltDeg throws on degenerate horizontal span", () => {
  assert.throws(() => canthalTiltDeg({ x: 100, y: 200 }, { x: 100, y: 195 }));
});

test("computeFacialThirds returns balanced thirds", () => {
  const res = computeFacialThirds(100, 200, 300, 400);
  assert.ok(Math.abs(res.upper - 1 / 3) < 1e-9);
  assert.ok(Math.abs(res.balanceScore - 1) < 1e-9);
});

test("goldenRatioDelta returns zero delta for exact phi", () => {
  const res = goldenRatioDelta(PHI, 1);
  assert.ok(Math.abs(res.delta) < 1e-9);
});

test("bilateralSymmetry returns 1 for mirrored pairs", () => {
  const score = bilateralSymmetry(
    [
      { left: { x: 160, y: 200 }, right: { x: 240, y: 200 } },
      { left: { x: 170, y: 260 }, right: { x: 230, y: 260 } },
    ],
    200,
    160
  );
  assert.ok(Math.abs(score - 1) < 1e-9);
});

test("parseNumberList parses comma and space separated values", () => {
  assert.deepEqual(parseNumberList("100, 200 300,400", 4), [100, 200, 300, 400]);
  assert.throws(() => parseNumberList("100, abc", 2));
});
