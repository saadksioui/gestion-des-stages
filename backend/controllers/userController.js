const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const SignUp = asyncHandler(async (req, res) => {
  const {nom , email, password} = req.body;
  const takenEmail = await User.findOne({ email });

  if ( takenEmail) {
    return res.status(400).json({ message: "Email has already been taken" });
  } else {

    //* Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)

    //* Create User
    const user = await User.create(
      {
        nom,
        email,
        password: hashedPassword
      }
    );

    if (user) {
      res.status(201).json({
        _id: user._id,
        nom: user.nom,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
});


//* Login
const Login = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  //* Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      nom: user.nom,
      role:user.type_utilisateur,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    return res.json({
      message: "Invalid Email or Password"
    });
  }

});


//* Generate token
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}


module.exports = {
  SignUp,
  Login
}