const AsyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((error) => {
    // console.log("ASYNCHANDLER ERROR: ", error);
    next(error);
  });

export default AsyncHandler;
