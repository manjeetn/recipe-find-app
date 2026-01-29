const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
     type: String, 
    required: true,
  },
  email: { 
    type: String, 
    required: true,
     unique: true
     },
  password: { 
    type: String, 
    required: true 
},

isVerified: {
    type:Boolean,
    default: false,
},

verificationToken: String,

resetPasswordToken: String,

resetPasswordExpires: Date,

favorites: [{
      id:{ type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true },
    }],
});

module.exports = mongoose.model("User", userSchema);

