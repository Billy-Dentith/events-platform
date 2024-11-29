require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api-router");
const eventRouter = require("./routes/event-router");
const userRouter = require("./routes/user-router");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { dbName: "eventsDB" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error: ", error));

app.use("/api", apiRouter);

apiRouter.use("/events", eventRouter); 

apiRouter.use("/users", userRouter); 

module.exports = app;
