const { addUser, getUsersEvents } = require("../controllers/user.controller");

const userRouter = require("express").Router();

userRouter.post("/", addUser); 

userRouter.get("/:user_id", getUsersEvents);

module.exports = userRouter; 