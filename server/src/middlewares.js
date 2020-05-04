const notFound = (req, res, next) => {
  //creating error, setting the 404 status code, and passing it on to the error handler
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    //only show stack if we are in development bc it is a potential vulnerability to display code in production
    stack: process.env.NODE_ENV === "production" ? ":-(" : error.stack,
  });
};

//exporting error handlers
module.exports = {
  notFound,
  errorHandler,
};
