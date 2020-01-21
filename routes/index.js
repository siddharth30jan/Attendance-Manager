const route = require("express").Router();

route.use("/students", require("./students"));
route.use("/Teachers", require("./Teachers"));

module.exports = route;
