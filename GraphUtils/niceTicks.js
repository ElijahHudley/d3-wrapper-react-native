// @flow
/**
 * Adapted from a set of C utils by Paul Heckbert-
 * http://www.realtimerendering.com/resources/GraphicsGems/gems/Label.c
 */
/**
 * expt
 * Raise a number by an exponent.
 * @param a {number} Base value.
 * @param n {number} Exponent.
 */

function expt(a: number, n: number = 1) : number {
  return a ** n;
}
/**
 * niceNum
 *
 * Find a  number approximately equal to `targetValue`.
 * For any given number (targetValue), this method returns a loose approximation of that value, but
 * rounded to a whole-number of that value's most significant digit (hundreds, thousands, etc).
 * e.g.-
 * Passing in 716, we get 1000 back. Passing in 8872, we get 10000. For 53,298 we get 50,000.
 *
 * Any number returned from this should be used to approximate rounded step sizes, or other
 * incremental values, and NOT used to clamp or otherwise re-assign graphed data.
 *
 * @param numberToApproximate {number} Any number to get a rounded version of.
 */

function niceNum(numberToApproximate: number): number {
  let niceF = 0; // nice rounded fraction

  // rounded base-10 logarithm of targetValue
  const expv = Math.floor(Math.log10(numberToApproximate));
  const exptValue = expt(10, expv);

  // fractional part of target, between 1 and 10
  const f = parseFloat(numberToApproximate / exptValue)
  if (f < 1.5) {
    niceF = 1.0;
  } else if (f < 3.0) {
    niceF = 3.0;
  } else if (f < 7.0) {
    niceF = 5.0;
  } else {
    niceF = 10.0;
  }
  return niceF * expt(10, expv);
}

/**
 * axisTickValues
 * Return an array of tick values, whose length will be as close to the target number of ticks
 * as possible, BUT prioritizing well-rounded step sizes for the given range over hitting
 * the exact number of ticks requested.
 * @param min {number} The min value of a dataset.
 * @param max {number} The max value of a dataset.
 * @param targetNumTicks {number} The desired number of tick values to return.
 */

function axisTickValues(
  min: number = 1, max: number, targetNumTicks: number = 2,
): Array < number > {
  // tick values to return
  let tickValues = [];
  // graph range, rounded to even multiple of most significant digit
  const range = niceNum(max - min);
  const tickDelta = niceNum(range / (targetNumTicks - 1)); // rounded tick mark spacing
  const graphMin = Math.floor(min / tickDelta) * tickDelta; // graph range min
  const graphMax = Math.ceil(max / tickDelta) * tickDelta; // graph range max
  for (let i = graphMin; i < graphMax + (0.5 * tickDelta); i += tickDelta) {
    tickValues.push(i);
  }

  tickValues = tickValues.reverse();

  return tickValues;
}

export default axisTickValues;
