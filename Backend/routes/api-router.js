const apiRouter = require("express").Router();

apiRouter.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = apiRouter; 