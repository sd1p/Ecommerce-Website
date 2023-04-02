//middleware to catch errors in async functions
module.exports = (foo) => (req, res, next) => {
  Promise.resolve(foo(req, res, next)).catch(next);
};
