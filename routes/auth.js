const jwt = require("jsonwebtoken");
module.exports = async function auth(req, res, next) {
  //Check for the token
  const insideHeader = req.header("authorization");
  if (!insideHeader) return res.sendStatus(403);
  const token = insideHeader.split(" ")[1];
  if (!token) return res.sendStatus(403);
  let data = await jwt.verify(token, process.env.JWT);
  if (!data) return res.sendStatus(403);

  //got the data
  req.id = data.id;
  next();
};
