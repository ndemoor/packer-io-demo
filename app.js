// Dependencies
var Express = require("express"),
    Routes  = require(__dirname + "/routes"),
    Models  = require(__dirname + "/models"),
    _       = require("underscore");

// Initialization
GLOBAL.app = new Express();

// Get configuration
var config = require("config");

if (typeof config === "undefined") {
  config = {};
}

if (typeof config.AWS === "undefined") {
  config.AWS = {};
}

if (typeof config.S3 === "undefined") {
  config.S3 = {};
}

// Override with env variables
if (_.has(process.env, "ACCESS_KEY_ID")) {
  config.AWS.accessKeyId = process.env.ACCESS_KEY_ID;
}

if (_.has(process.env, "SECRET_ACCESS_KEY")) {
  config.AWS.secretAccessKey = process.env.SECRET_ACCESS_KEY;
}

if (_.has(process.env, "REGION")) {
  config.AWS.region = process.env.REGION;
}

if (_.has(process.env, "BUCKET")) {
  config.S3.bucket = process.env.BUCKET;
}

// Configure
app.set("config", config);
app.set("port", process.env.PORT || 3000);
app.set("models", Models);

// Middle ware
app.use(Express.logger("dev"));
app.use(Express.static(__dirname + "/public"));
app.use(app.router);

// Development only
if ("development" == app.get("env")) {
  app.use(Express.errorHandler());
}

// Routing
app.get("/photos", Routes.Photos.index);

// Start listening
app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});