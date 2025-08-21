const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    const{name, ingredients, procedure} = req.body;

    if(!name || !ingredients || !procedure)
    {
        return res.status(400).json({ message:"All fields are Required."});
    }

    try {
        
        const newRecipe = new Recipe({
            name,
            ingredients,
            procedure,
            user: req.user.id,
        });
        const saveRecipe = await newRecipe.save();
        res.status(201).json(saveRecipe);
    } catch (error) {
       console.error(error);
       res.status(500).json({message:"Server Error. Failed to Save recipe."}); 
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