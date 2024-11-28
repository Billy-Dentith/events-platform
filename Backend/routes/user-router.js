const { addUser } = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.post("/", addUser); 

module.exports = userRouter; 