const formidable = require("formidable");

module.exports = function (options = {}) {
  return function (req, res, next) {
    // These cannot have a body at all, so don't even attempt it
    if (req.method === "GET" || req.method === "DELETE") return next();

    // If the form is not of the right type, we skip parsing it
    if (
      !req.headers ||
      !req.headers["content-type"] ||
      !req.headers["content-type"].includes("multipart/form-data")
    ) {
      return next();
    }

    // Extensions by default are nice
    if (typeof options.keepExtensions === "undefined") {
      options.keepExtensions = true;
    }

    if (options.hash) {
      options.hashAlgorithm = options.hash;
    }

    const form = formidable(options);

    form.parse(req, function (err, fields, files) {
      if (err) return next(err);
      req.body = fields;
      req.files = {};
      for (let file in files) {
        req.files[file] = {
          path: files[file].filepath,
          name: files[file].originalFilename,
          type: files[file].mimetype,
          size: files[file].size,
          modified: files[file].lastModifiedDate,
        };
      }
      next();
    });
  };
};
