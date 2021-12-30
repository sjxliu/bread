function errorHandler(err, req, res, next) {
  console.log(err.name);
  console.log(err.message);
  for (key in err) {
    console.log(`${key}: ${err[key]}`);
  }
  res.send(err.message ?? "ERROR");
}

module.exports = errorHandler;
