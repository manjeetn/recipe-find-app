const express = require("express");;
const router = express.Router();
const axios = require("axios")

const API_KEY = process.env.SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

router.get("/complexSearch", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/complexSearch`, {
            params: {
                ...req.query,
                apiKey: API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ 
            message: "Error fetching from Spoonacular", 
            details: error.response?.data 
        });
    }
});

router.get("/:id/information", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/${req.params.id}/information`, {
      params: { apiKey: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: "Error fetching details" });
  }
});

router.get("/:id/nutrition", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/${req.params.id}/nutritionWidget.json`, {
      params: { apiKey: API_KEY },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: "Error fetching nutrition" });
  }
});

module.exports = router;