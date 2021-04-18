module.exports = function (req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type",
                "Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
                "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
}
