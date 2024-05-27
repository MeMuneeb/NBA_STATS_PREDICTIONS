require("dotenv").config({ path: "/Users/Muneeb1/Desktop/NBA_Stats/.env" });
const express = require("express");
const mongoose = require("mongoose");
const teamRoutes = require("./routes/teams");
const playerRoutes = require("./routes/players");
const predictionRoutes = require("./routes/predictions");
const standingRoutes = require("./routes/standings");

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
app.use("/api/predictions", predictionRoutes);
app.use("/api/standings", standingRoutes);

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
