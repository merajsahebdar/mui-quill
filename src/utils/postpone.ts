// Postponed Function
type PostponedFunction = (value: void) => void;

/**
 * Small helper to execute a function in the next micro-tick.
 *
 * @param {PostponedFunction} fn
 */
export default function postpone(fn: PostponedFunction) {
  Promise.resolve().then(fn);
}
