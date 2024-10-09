// loadware.js - Turn different middleware descriptors into an array of middleware
require('app-module-path').addPath(process.cwd());

// Put it all into a single array of non-arrays recursively
// ['a', ['b', ['c', ...]]] => ['a', 'b', 'c', ...]
let flat = arr => arr.reduce((good, one) => {
  let flatten = Array.isArray(one) ? flat(one) : one || [];
  return good.concat(flatten)
}, []);

// Fetches the absolute path from the root
// ['a', 'b'] => [require('a'), require('b')]
// Note: this doesn't work: 'require(mid)'
let include = mid => typeof mid === 'string'
  ? require(require('path').resolve(mid))
  : mid;

// Throw an error if there's something that is not a function anymore
// [{ a: 'b' }] => throw new Error();
let others = mid => {
  if (mid instanceof Function) return mid;
  throw new Error("Only boolean, string, array or function can be middleware");
}

// The actual glue for them all
module.exports = (...middle) => flat(middle).map(include).filter(others);
