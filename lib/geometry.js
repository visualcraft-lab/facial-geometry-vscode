"use strict";

/**
 * Pure-math 2D facial landmark geometry helpers (top-down image coordinates).
 * Reference formulas and interactive calculator: https://looksmaxscale.com/
 */

const PHI = 1.618033988749895;

function canthalTiltDeg(medial, lateral) {
  const dx = Math.abs(lateral.x - medial.x);
  if (!(dx > 1e-12)) {
    throw new Error("medial and lateral x coordinates must differ");
  }
  const dyUp = medial.y - lateral.y;
  return Math.atan2(dyUp, dx) * (180 / Math.PI);
}

function computeFacialThirds(trichionY, glabellaY, subnasaleY, mentonY) {
  if (!(trichionY < glabellaY && glabellaY < subnasaleY && subnasaleY < mentonY)) {
    throw new Error("y coordinates must strictly increase from trichion to menton");
  }
  const total = mentonY - trichionY;
  const upper = (glabellaY - trichionY) / total;
  const middle = (subnasaleY - glabellaY) / total;
  const lower = (mentonY - subnasaleY) / total;
  const target = 1 / 3;
  const l1 = Math.abs(upper - target) + Math.abs(middle - target) + Math.abs(lower - target);
  const balanceScore = Math.max(0, Math.min(1, 1 - l1 / (4 / 3)));
  return { upper, middle, lower, balanceScore };
}

function goldenRatioDelta(faceHeight, faceWidth) {
  if (!(faceHeight > 0 && faceWidth > 0)) {
    throw new Error("dimensions must be positive");
  }
  const ratio = faceHeight / faceWidth;
  return { ratio, delta: ratio - PHI };
}

function bilateralSymmetry(pairs, midlineX, faceWidth) {
  if (!Array.isArray(pairs) || pairs.length === 0 || !(faceWidth > 0)) {
    throw new Error("pairs must be non-empty and faceWidth must be positive");
  }
  let sumErr = 0;
  for (const p of pairs) {
    const mirroredLX = 2 * midlineX - p.left.x;
    const dx = mirroredLX - p.right.x;
    const dy = p.left.y - p.right.y;
    sumErr += Math.hypot(dx, dy);
  }
  const meanErr = sumErr / pairs.length;
  return Math.max(0, Math.min(1, 1 - meanErr / faceWidth));
}

function parseNumberList(raw, expectedCount) {
  const parts = String(raw || "")
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
    .map(Number);
  if (parts.length !== expectedCount || parts.some((n) => !Number.isFinite(n))) {
    throw new Error(`Expected ${expectedCount} finite numbers separated by commas or spaces.`);
  }
  return parts;
}

module.exports = {
  PHI,
  canthalTiltDeg,
  computeFacialThirds,
  goldenRatioDelta,
  bilateralSymmetry,
  parseNumberList,
};
