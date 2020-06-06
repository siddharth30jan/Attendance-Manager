const route = require("express").Router();

route.use("/students", require("./students"));
route.use("/teachers", require("./teachers"));

module.exports = route;
