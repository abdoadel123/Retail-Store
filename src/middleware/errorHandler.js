function errorHandling(err, req, res, next) {
  console.log(err);
  return res.status(err.output.statusCode).send({
    isSuccessed: false,
    data: null,
    error: err.output.payload.message,
  });
}

export { errorHandling };
