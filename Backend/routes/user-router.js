const { addUser, getUsersEvents, getUsersRole } = require("../controllers/user.controller");
const verifyFirebaseToken = require("../VerifyFirebaseToken");

const userRouter = require("express").Router();

userRouter.post("/", addUser); 

userRouter.get("/get-role", verifyFirebaseToken, getUsersRole);

userRouter.get("/:user_id", getUsersEvents);

module.exports = userRouter; 