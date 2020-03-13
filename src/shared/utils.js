/* eslint-disable import/prefer-default-export */

/**
 * Calls a function, if it's defined, with specified arguments
 * @param {Function} fn
 * @param {Object} args
 */
export function callIfDefined(fn, ...args) {
  if (fn && typeof fn === 'function') {
    fn(...args);
  }
}
