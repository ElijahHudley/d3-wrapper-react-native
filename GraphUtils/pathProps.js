// @flow

import { svgPathProperties } from 'svg-path-properties';
import isString from 'lodash/isString';

type PathProps = {
  getTotalLength: Function,
  getPointAtLength: Function,
  getTangentAtLength: Function,
  getPropertiesAtLength: Function,
  getParts: Function,
};

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians)),
  };
}

export const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return [
    `M${start.x}`, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ');
};

/**
 * getPathProps
 * Return a path properties object.
 * @param d {string} Svg path data.
 * @returns {PathProps} Path properties object.
 */
export const getPathProps = (d: string): PathProps => svgPathProperties(d) || {};

/**
 * getPathLength
 * Get the total length of a path.
 * @param d {string} Svg path data.
 * @returns {number} Length of the path.
 */
export const getPathLength = (d: string): number => {
  if (d && isString(d)) {
    const props = svgPathProperties(d);
    if (props) {
      return props.getTotalLength();
    }
  }
  return 0;
};

/**
 * getPointAtLength
 * Return {x, y} for a point at specified length on a path.
 * @param d {string} Svg path data.
 * @param len {number} Length to find point for.
 * @returns {PointXY}
 */
export const getPointAtLength = (d: string, len: number): PointXY => {
  if (d && isString(d)) {
    const props = svgPathProperties(d);
    if (props) return props.getPointAtLength(len);
  }

  return { x: 0, y: 0 };
};

/**
 * getPointAtLengthPercent
 * Return {x, y} for a point at specified percentage (0 - 1) of total length of a path.
 * @param d
 * @param percent
 * @returns {PointXY}
 */
export const getPointAtLengthPercent = (d: string, percent: number): number => {
  if (d && isString(d)) {
    const props = svgPathProperties(d);
    if (props) {
      const len = svgPathProperties(d).getTotalLength();
      if (len) {
        return svgPathProperties(d).getPointAtLength(len * percent);
      }
    }
  }

  return { x: 0, y: 0 };
};
