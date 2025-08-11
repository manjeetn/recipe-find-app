const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const spoonacularRoutes = require("./routes/spoonacular");
const authRoutes = require("./routes/auth");
const favoriteRoutes = require("./routes/favourites");
const recipeRoutes = require("./routes/recipe")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/spoonacular", spoonacularRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
