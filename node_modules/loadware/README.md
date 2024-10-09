# loadware

Make sense of a bunch of middleware definitions and return an array of middleware:

```js
const loadware = require('loadware');

let router = require('express').Router();
router.get('/', (req, res) => { res.send('Hello there'); });

let middlewares = loadware(
  'body-parser',
  (req, res, next) => { next(); },
  './middle/whatever.js',
  router
);
```

The middleware can be a string, a function or an array of any of the previous.

This is part of another project which is WIP right now, but I think this is independently enough so it can be launched separately.
