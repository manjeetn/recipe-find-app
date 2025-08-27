const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if(ext && mime){
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};
const upload = multer({ storage, fileFilter });

router.post(
  "/", 
  auth, 
  upload.single("image"),  
  async (req, res) => {
    const { name, ingredients, procedure } = req.body;
    if (!name || !ingredients || !procedure)
      return res.status(400).json({ message: "All fields are required." });

    try {
      let ingredientsArray = Array.isArray(ingredients) ? ingredients : ingredients.split('\n').filter(line => line.trim() !== '');

      const imagePath = req.file ? `/uploads/${req.file.filename}` : ""; 

      const newRecipe = new Recipe({
        name,
        ingredients: ingredientsArray,
        procedure: Array.isArray(procedure) ? procedure : [procedure],
        user: req.user.id,
        image: imagePath
      });

      const saveRecipe = await newRecipe.save();
      res.status(201).json(saveRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error. Failed to save recipe." });
    }
});


router.get("/my", auth, async (req, res) => {
    try {

        const recipe = await Recipe.find({user: req.user.id});
        res.json(recipe);
        
    } catch (error) {
        console.error("Failed to fetch user recipes:", error);
        res.status(500).json({message:"Server error. try again after some time"});
    }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Failed to delete recipe." });
  }
});

module.exports = router;