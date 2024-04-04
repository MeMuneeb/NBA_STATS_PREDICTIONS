require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const teamRoutes = require("./routes/teams");
const playerRoutes = require("./routes/players");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to database...");
      console.log(`Listening on port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
