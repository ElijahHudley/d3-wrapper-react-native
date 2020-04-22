// @flow

import React from 'react';
import { Animated } from 'react-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import * as d3 from 'd3';
import moment from 'moment';
import _ from 'lodash';

import { PathPropUtils, NiceTicks } from './GraphUtils';

// copied from d3v3 library, updated for es6 / lint
// used to round graph step values
d3.round = (x, n) => {
  let decimalPlace = n;

  const roundedValue = (decimalPlace ?
    Math.round(x * (decimalPlace = (10 ** decimalPlace))) / decimalPlace : Math.round(x));

  return roundedValue;
};

d3.roundUp = (x, n) => {
  let decimalPlace = n;

  const roundedValue = (decimalPlace ?
    Math.ceil(x * (decimalPlace = (10 ** decimalPlace))) / decimalPlace : Math.ceil(x));

  return roundedValue;
};

d3.roundDown = (x, n) => {
  let decimalPlace = n;

  const roundedValue = (decimalPlace ?
    Math.floor(x * (decimalPlace = (10 ** decimalPlace))) / decimalPlace : Math.floor(x));

  return roundedValue;
};

// D3 should only be called from this file,
// So created function to get extents for Linechart
const getExtentsFromArray = array =>
  ((array.length > 0) ? d3.extent(array) : array);

// function to created an animated element using Animated,
// so as to not import animated into every file for one line of code
const createAnimatedElement = element =>
  Animated.createAnimatedComponent(element);

const convertStringToDate = item => moment(item).toDate();

const getDistanceBetweenPoint = (pointA, pointB) => {
  const pow1 = (pointB.x - pointA.x) ** 2;
  const pow2 = (pointB.y - pointA.y) ** 2;
  return Math.sqrt(pow1 + pow2);
};

// create scales as needed,
// extra function to create a linear X scale if not using time
const createScaleXTime = (minValue, maxValue, chartTheme, padRight = false) => {
  const padding = (padRight) ? chartTheme.chartMargins.right * 2 : 0;

  return d3.scaleTime()
    .domain([minValue, maxValue])
    .range([0, chartTheme.width - padding]);
};

const createScaleXLinear = (minValue, maxValue, chartTheme) => d3.scaleLinear()
  .domain([minValue, maxValue]).nice()
  .range([0, chartTheme.width]);

const createScaleYLinear = (minValue, maxValue, chartTheme, bottomBorderMargin = true) =>
  ((bottomBorderMargin) ?
    d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([chartTheme.height, 0]) :
    d3.scaleLinear()
      .domain([minValue, maxValue])
      .range([chartTheme.height + chartTheme.bottomBorderMargin, 0]));

const createScaleYLinearNetworth = (minValue, maxValue, chartTheme) => {
  const maxValueRounded = d3.roundUp(maxValue, -3);
  const minValueRounded = d3.roundDown(minValue, -3);

  return d3.scaleLinear()
    .domain([minValueRounded, maxValueRounded])
    .range([chartTheme.height-(chartTheme.height/4), 0]);
};


const getDaysInMonthforXScale = (date: Date) => {
  const daysInMonth = [];

  // change to a date in the month of interest
  const monthDate = moment(date).startOf('month');

  _.times(monthDate.daysInMonth(), (n) => {
    daysInMonth.push(moment(monthDate).toDate());
    monthDate.add(1, 'day');
  });

  return daysInMonth;
};

// This function handles the logic that was previously been done by the graph components themselves,
// however, this prevents all of the duplicate code that was being done initially
const createScalesForGraph = (arrayOfData, chartTheme, budgetLimit, useNiceValues, padRight) => {
  const placeholder = { x: moment().toDate(), y: 0 };

  const splitAxesData = arrayOfData.reduce((result, d) => ({
    y: result.y.concat(d.y),
  }), { y: [] });

  const extentsY = getExtentsFromArray(splitAxesData.y);
  const daysInMonth = getDaysInMonthforXScale(_.first(arrayOfData).x || placeholder);

  const maxValueX = Math.max(...daysInMonth);
  const minValueX = Math.min(...daysInMonth);

  const xScale = createScaleXTime(
    minValueX,
    maxValueX,
    chartTheme,
    padRight,
  );

  xScale.daysInMonth = daysInMonth;

  const limitToUse = (budgetLimit > extentsY[1]) ? budgetLimit : extentsY[1];

  const yScale = createScaleYLinear(
    -10,
    limitToUse + 10,
    chartTheme,
    useNiceValues);

  return {
    xScale,
    yScale,
  };
};

// accepts an array of lines made using createLineProps and animates them on a staggered timer
// delaytime it the time before the animation starts
// animationtime is the time it takes for that animation to finish after start
const animateLines = (delayTime, animationTime, lines) => {
  const animations = lines.map((line, index) => (
    Animated.timing(line.strokeDashoffset, {
      toValue: 0,
      duration: animationTime,
      delay: delayTime,
    })
  ));

  Animated.sequence(animations).start();
};

// Animates the points so they grow in scale
// have to modify props of svg element to accept string for r prop
const animatePoints = (delayTime, radius, animationTime, points) => {
  const animations = points.map((point, index) => (
    Animated.timing(point.props.children[1].props.r, {
      toValue: radius,
      duration: animationTime,
    })
  ));

  Animated.stagger(delayTime, animations).start();
};

// creates a more detailed line with props for animation
const createLineProps = (path) => {
  const length = PathPropUtils.getPathLength(path);

  return {
    d: path,
    strokeDashoffset: new Animated.Value(length),
    strokeDasharray: [length, length],
  };
};

// based on data given, generates the plot information for each point
// returns an array with the all information for points
const getTickValues = (data, scales) =>
  data.map((item, index) => {
    const { x, y } = item;

    return {
      x: scales.x(x),
      y: scales.y(y),
      item,
    };
  });

const makeGraphValues = (data, scales) => data.reduce((result, item) => {
  const { x, y } = item;
  return {
    ticks: result.ticks.concat({ x: scales.x(x), y: scales.y(y), item }),
    valuesX: result.valuesX.concat(x),
    valuesY: result.valuesY.concat(y),
  };
}, { ticks: [], valuesX: [], valuesY: [] });

// renders the x gridLines
const composeXAxis = (ticks, lineCount, chartTheme, scales) => {
  const min = scales.y.domain()[0];
  const max = scales.y.domain()[1];

  const stepValue = d3.roundUp((max - min) / (lineCount), -3);
  const tickValues = d3.range(min, (max + stepValue), stepValue);
  const maxTickValues = new Array(lineCount);

  tickValues.forEach((item, index) => {
    if (index < lineCount) {
      maxTickValues[index] = item;
    }
  });

  return {
    ticks: maxTickValues,
    scaleY: scales.y,
    values: ticks.map(tick => tick.item),
  };
};

// renders the y gridLines
const composeYAxis = (ticks, lineCount, chartTheme, scales, yLimit) => {
  const ticksX = ticks.map(tick => tick.x);

  // use x axis to use tick position for drawing tiny circles
  const extentsX = getExtentsFromArray(ticksX);
  const lineYTickValues = d3.ticks(extentsX[0], extentsX[1], lineCount);

  // Keep the budget line onscreen if its too low
  const limitToUse = (scales.y(yLimit) > chartTheme.height) ?
    chartTheme.height : scales.y(yLimit);

  return {
    ticks: lineYTickValues,
    limit: yLimit,
    limitToUse,
    values: ticks.map(tick => tick.item),
  };
};


// creates and renders the area line for a given plot of data
const composeAreaAbove = (data, scales, chartTheme, yLimit) => {
  const firstItem = _.first(data);
  const lineMargin = (scales.y(yLimit) > scales.y(firstItem.y)) ? 0 : chartTheme.incomeLineMargin;

  const area = d3.area()
    .x(d => scales.x(d.x))
    .y1(d => scales.y(d.y))
    .y0(scales.y(yLimit) + lineMargin)
    .curve(d3.curveLinear);

  return createLineProps(area(data));
};


// creates and renders the area line for a given plot of data
const composeAreaBelow = (data, scales, chartTheme) => {
  const area = d3.area()
    .x(d => scales.x(d.x))
    .y1(d => scales.y(d.y))
    .y0(chartTheme.height)
    .curve(d3.curveLinear);

  return createLineProps(area(data));
};


// creates and renders and regular line for give plot of data
const composeLine = (data, scales) => {
  const line = d3.line()
    .x(d => scales.x(d.x))
    .y(d => scales.y(d.y))
    .curve(d3.curveLinear);

  return createLineProps(line(data));
};

// needs RNSVG, creates an svg definition with an id
// the def needs to be rendered in the id called in the fill/stroke prop
const createGradient = (startColor, stopColor, startOpacity, stopOpacity) => {
  const colorID = startColor + stopColor;

  return {
    def: (
      <Defs>
        <LinearGradient id={colorID} x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="2%" stopColor={startColor} stopOpacity={startOpacity}/>
          <Stop offset="100%" stopColor={stopColor} stopOpacity={stopOpacity}/>
        </LinearGradient>
      </Defs>
    ),
    colorID: `url(#${colorID})`,
  };
};

// creates a donut chart
const composeArcGraph = (data, chartTheme) => {
  const { arcStyle } = chartTheme;
  const arcs = d3.pie().value(d => d)(data);

  const arcScale = d3.scaleLinear()
    .domain([0, data[1]])
    .range([0, Math.PI * 2]);

  const radius = arcStyle.ringSize;
  const inner = radius + arcStyle.arcMargin + (arcStyle.arcWidth * (0.5));
  const outer = inner / (1.5);

  // add a small offset to offset for correct position
  const angleOffset = (-90);
  const angleBeginOffset = arcScale(data[1] + 5) + angleOffset;
  const angleEndOffset = arcScale(data[0] + 4.5) + angleOffset;

  // calculate the path for the pie's arc information (object)
  const paths = arcs.map((arc, index) => {
    const arcPath = d3.arc()
      .outerRadius(outer)
      .startAngle(arcScale(0))
      .endAngle(arcScale(data[index]))
      .innerRadius(inner)(arc);

    return createLineProps(arcPath);
  });

  const arcStartEndPos = {
    sX: (chartTheme.width / 2) + (radius * Math.cos(angleBeginOffset)),
    sY: (chartTheme.height / 2) + (radius * Math.sin(angleBeginOffset)),
    eX: (chartTheme.width / 2) + (radius * Math.cos(angleEndOffset)),
    eY: (chartTheme.height / 2) + (radius * Math.sin(angleEndOffset)),
  };

  return {
    paths,
    arcs,
    pos: arcStartEndPos,
    radius,
  };
};

export default {
  animateLines,
  animatePoints,
  createAnimatedElement,
  getExtentsFromArray,
  composeLine,
  composeAreaAbove,
  composeAreaBelow,
  getTickValues,
  makeGraphValues,
  composeXAxis,
  composeYAxis,
  createGradient,
  createScaleXTime,
  createScaleXLinear,
  createScaleYLinear,
  createScaleYLinearNetworth,
  composeArcGraph,
  getDistanceBetweenPoint,
  createScalesForGraph,
};

