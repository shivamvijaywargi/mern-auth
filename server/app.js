require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const app = express();

// Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third party middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Importing routes
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", userRoutes);

module.exports = app;
