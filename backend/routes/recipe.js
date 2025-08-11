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
       res.status(500).json({message:"Server Error. Failed to Savae recipe."}); 
    }
});

module.exports = router;