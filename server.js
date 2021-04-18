const http = require("http");
const debug = require("debug")("node-angular");

const express = require("./backend/appExpress");

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //named pipi
    return val;
  }

  if (port >= 0) {
    //port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;

  switch (error.code) {
    case "EACCES":
      Console.error(bind + "requieres elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      Console.error(bind + "is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.Port | 3001);
express.set("port", port);
express.set("json spaces", 2);

const server = http.createServer(express);
server.on("error= ", onError);
server.on("listening= ", onListening);
server.listen(port, () => {
  console.log("App listening on http://localhost:", port);
});
