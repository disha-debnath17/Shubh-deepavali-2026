/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Scene anchors in natural photo viewBox units (1376 x 768)
// Photo: /images/diwali_home_exterior.webp (1376x768)

export interface DecorPoint {
  point: number;
  x: number;
  y: number;
}

export interface DecorStep {
  step: number;
  x1: number;
  x2: number;
  y: number;
}

export interface DecorDiyaSlot {
  slot: number;
  label: string;
  x: number;
  y: number;
  scale?: number;
}

export interface DecorLayout {
  fairyLights: {
    roofLightPath: DecorPoint[];
  };
  marigoldToran: {
    lintelLeft: { x: number; y: number };
    lintelRight: { x: number; y: number };
    sideStrings: { left: number; right: number; top: number; bottom: number };
    doorFrame: { x: number; y: number; width: number; height: number };
  };
  alpona: {
    center: { x: number; y: number };
    radius: number;
  };
  choddoProdip: {
    diyaSlots: DecorDiyaSlot[];
    steps: DecorStep[];
  };
}

export interface SvgAnchors {
  width: number;
  height: number;
  doorFrame: { x: number; y: number; width: number; height: number };
  lintelLeft: { x: number; y: number };
  lintelRight: { x: number; y: number };
  sideStrings: { left: number; right: number; yTop: number; yBottom: number };
  steps: Array<{ x1: number; x2: number; y: number }>;
  roofLightPath: Array<{ x: number; y: number }>;
  rangoliCenter: { cx: number; cy: number };
  rangoliRadius: number;
  diyaSlots: Array<{ x: number; y: number; label: string }>;
  hotspots: {
    roof: { x: number; y: number };
    door: { x: number; y: number };
    floor: { x: number; y: number };
    steps: { x: number; y: number };
  };
}

/**
 * Single source of truth for all decoration positions (Percentages 0..100 relative to the image wrapper)
 */
export const INITIAL_DECOR_LAYOUT: DecorLayout = {
  fairyLights: {
    roofLightPath: [
      { point: 1, x: 2.18, y: 7.16 },
      { point: 2, x: 11.63, y: 6.51 },
      { point: 3, x: 21.08, y: 6.25 },
      { point: 4, x: 30.52, y: 6.51 },
      { point: 5, x: 40.7, y: 11.72 },
      { point: 6, x: 51.6, y: 22.14 },
      { point: 7, x: 62.5, y: 32.55 },
      { point: 8, x: 73.4, y: 42.32 },
      { point: 9, x: 82.85, y: 48.18 },
    ],
  },
  marigoldToran: {
    lintelLeft: { x: 17.08, y: 28.65 },
    lintelRight: { x: 34.88, y: 28.65 },
    sideStrings: { left: 17.08, right: 34.88, top: 28.65, bottom: 76.82 },
    doorFrame: { x: 15.63, y: 24.74, width: 20.71, height: 55.34 },
  },
  alpona: {
    center: { x: 49.42, y: 89.84 },
    radius: 7.63,
  },
  choddoProdip: {
    diyaSlots: [
      { slot: 1, label: 'Door Left', x: 15.63, y: 79.43, scale: 1.05 },
      { slot: 2, label: 'Door Right', x: 36.34, y: 79.43, scale: 1.05 },
      { slot: 3, label: 'Step 1 Left', x: 15.99, y: 83.33, scale: 1.15 },
      { slot: 4, label: 'Step 1 Mid', x: 30.52, y: 83.33, scale: 1.15 },
      { slot: 5, label: 'Step 2 Left', x: 19.62, y: 89.19, scale: 1.15 },
      { slot: 6, label: 'Step 2 Mid', x: 37.06, y: 89.19, scale: 1.15 },
      { slot: 7, label: 'Step 3 Left', x: 24.71, y: 94.79, scale: 1.15 },
      { slot: 8, label: 'Step 3 Mid', x: 43.6, y: 94.79, scale: 1.15 },
    ],
    steps: [
      { step: 1, x1: 12.35, x2: 46.51, y: 83.33 },
      { step: 2, x1: 13.08, x2: 50.87, y: 89.19 },
      { step: 3, x1: 14.53, x2: 56.69, y: 94.79 },
    ],
  },
};

/**
 * Converts decorLayout percentages to natural 1376x768 SVG coordinates
 */
export function decorLayoutToSvgAnchors(layout: DecorLayout): SvgAnchors {
  const toX = (pct: number) => Math.round((pct / 100) * 1376);
  const toY = (pct: number) => Math.round((pct / 100) * 768);

  return {
    width: 1376,
    height: 768,
    doorFrame: {
      x: toX(layout.marigoldToran.doorFrame.x),
      y: toY(layout.marigoldToran.doorFrame.y),
      width: toX(layout.marigoldToran.doorFrame.width),
      height: toY(layout.marigoldToran.doorFrame.height),
    },
    lintelLeft: {
      x: toX(layout.marigoldToran.lintelLeft.x),
      y: toY(layout.marigoldToran.lintelLeft.y),
    },
    lintelRight: {
      x: toX(layout.marigoldToran.lintelRight.x),
      y: toY(layout.marigoldToran.lintelRight.y),
    },
    sideStrings: {
      left: toX(layout.marigoldToran.sideStrings.left),
      right: toX(layout.marigoldToran.sideStrings.right),
      yTop: toY(layout.marigoldToran.sideStrings.top),
      yBottom: toY(layout.marigoldToran.sideStrings.bottom),
    },
    steps: layout.choddoProdip.steps.map((st) => ({
      x1: toX(st.x1),
      x2: toX(st.x2),
      y: toY(st.y),
    })),
    roofLightPath: layout.fairyLights.roofLightPath.map((pt) => ({
      x: toX(pt.x),
      y: toY(pt.y),
    })),
    rangoliCenter: {
      cx: toX(layout.alpona.center.x),
      cy: toY(layout.alpona.center.y),
    },
    rangoliRadius: toX(layout.alpona.radius),
    diyaSlots: layout.choddoProdip.diyaSlots.map((ds) => ({
      x: toX(ds.x),
      y: toY(ds.y),
      label: ds.label,
    })),
    hotspots: {
      roof: { x: toX(27.6), y: toY(11.7) },
      door: { x: toX(25.8), y: toY(35.1) },
      floor: { x: toX(49.4), y: toY(88.5) },
      steps: { x: toX(26.2), y: toY(86.6) },
    },
  };
}

export const DEFAULT_SCENE_ANCHORS: SvgAnchors = decorLayoutToSvgAnchors(INITIAL_DECOR_LAYOUT);

export function getSceneAnchors(): SvgAnchors {
  return { ...DEFAULT_SCENE_ANCHORS };
}

export function resetSceneAnchors(): SvgAnchors {
  return { ...DEFAULT_SCENE_ANCHORS };
}
