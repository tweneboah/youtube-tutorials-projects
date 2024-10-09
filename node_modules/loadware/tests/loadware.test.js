let pray = require('pray');
let express = require('express');
let loadware = require('../loadware');

pray.isFn = (el) => expect(el instanceof Function).toBe(true);
let allFn = arr => arr.forEach(pray.isFn);
let fn = ctx => {};
let throws = cb => {
  let error;
  try { cb(); } catch(err) { error = err; }
  if (typeof error === 'undefined') {
    throw new Error(cb + ' did not throw an error as expected.');
  }
}


describe('Initialization', () => {
  it('Can be used empty', () => {
    pray([])(loadware());
  });

  it('Ignores falsy values', () => {
    expect(loadware([], 0, "", false, null, undefined).length).toBe(0);
  });

  it('Rejects numbers', () => {
    throws(() => loadware(5));
  });

  it('Rejects different objects', () => {
    throws(() => loadware({ a: 'b' }));
    throws(() => loadware(new Date()));
    throws(() => loadware(new Promise(() => {})));
  });
});


describe('works with strings', () => {
  it('Can load from a string', () => {
    pray(allFn)(loadware('./tests/a'));
  });

  it('handles many arguments', () => {
    expect(loadware('./tests/a', './tests/b', './tests/c').length).toBe(3);
  });

  it('handles nested strings', () => {
    expect(loadware(['./tests/a'], ['./tests/b', './tests/c']).length).toBe(3);
  });

  it('handles deeply nested strings', () => {
    expect(loadware(['./tests/a', ['./tests/b', ['./tests/c']]]).length).toBe(3);
  });

  it('Throws an error when non-existing string', () => {
    throws(() => loadware('./tests/dsfs'));
  });
})



describe('works with functions', () => {

  it('Converts function to array', () => {
    pray([fn])(loadware(fn));
  });

  it('handles many arguments', () => {
    expect(loadware(fn, fn, fn, fn, fn, fn).length).toBe(6);
  });

  it('handles nested arrays', () => {
    expect(loadware([fn], [fn, fn], [fn, fn, fn]).length).toBe(6);
  });

  it('handles deeply nested arrays', () => {
    expect(loadware([fn, [fn, [fn, [fn, [fn, [fn]]]]]]).length).toBe(6);
  });

  // When passing Router() it only rendered the last one since it had some properties
  it('Treats a function as a function even if it has properties', () => {
    let fnA = function(){};
    let fnB = function(){};
    fnA.a = 'a';
    fnB.a = 'b';
    expect(loadware([fnA, fnB])).toHaveLength(2);
  });
});



describe('plays well with others', () => {
  it('works with express router USE', () => {
    let router = express.Router();
    router.use('/', fn);
    pray([router])(loadware(router));
  });

  it('works with express router GET', () => {
    let router = express.Router();
    router.get('/', fn);
    pray([router])(loadware(router));
  });

  it('works with express router POST', () => {
    let router = express.Router();
    router.post('/', fn);
    pray([router])(loadware(router));
  });
});
