const requestIp = require("request-ip");
const geoip = require("geoip-country");

function ipMiddleware(req, res, next) {
  const clientIp = requestIp.getClientIp(req);
  //nigeria i.p
  const geo = geoip.lookup("197.211.63.255");
  req.country = geo;
  next();
}

module.exports = ipMiddleware;
