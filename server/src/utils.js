module.exports.promised = (fn, thisCtx) =>
  (...args) => new Promise((resolve, reject) =>
    fn.call(thisCtx, ...args, (err, ...results) =>
      (err ? reject(err) : resolve(results))));
