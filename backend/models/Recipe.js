const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
    name:{
         type: String,
         required: true,
},
    ingredients:{
         type: [String],
         required: true,
    },
    procedure:{ 
        type: [String],
        required: true,
    },
    image: {
  type: String,
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},
{timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);