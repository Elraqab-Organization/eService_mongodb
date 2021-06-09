require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri =
  process.env.MONGO_DB_URI ||
  "mongodb+srv://Ulan:123@cluster1.qcpvo.mongodb.net/Students?retryWrites=true&w=majority";
// const uri = "mongodb://localhost/playground";

mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers");
const usersRouter = require("./routes/user");
const ordersRouter = require("./routes/order");
const postsRouter = require("./routes/posts");

app.use("/subscribers", subscribersRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/posts", postsRouter);

app.listen(3000, () => console.log("Server Started"));
