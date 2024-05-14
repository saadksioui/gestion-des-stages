const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const SignUp = asyncHandler(async (req, res) => {
  const {nom , email, password} = req.body;
  const takenEmail = await User.findOne({ email });

  if ( takenEmail) {
    return res.status(200).json({ message: "Email has already been taken" });
  } else {

    //* Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    //todo : check the stg collection for the insciption code 
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
        role:user.type_utilisateur,
        img_url:user.img_url,
        token: generateToken(user._id)
      })
    } else {
      res.status(200)
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
      img_url:user.img_url,
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
    expiresIn: "24h",
  })
}

//* get user by id 
const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update user 

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images_cv');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
}).fields([{ name: 'img', maxCount: 1 }, { name: 'cv', maxCount: 1 }]);





const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { telephone } = req.body;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const oldImgFilename = user.img_url;
    const oldCvFilename = user.cv_url;

    const imgFilename = req.files.img[0].filename;
    const cvFilename = req.files.cv[0].filename;

    const updateData = {
      img_url: imgFilename,
      cv_url: cvFilename,
      telephone
    };

    const updatedUser = await User.updateOne({ _id: id }, { $set: updateData });
    if (updatedUser) {
      // Delete old image and CV files using fs.promises.unlink
      if (oldImgFilename && oldImgFilename !== imgFilename) {
        try {
          const oldImgFilePath = path.join(__dirname, '../../frontend/public/images_cv', oldImgFilename);
          await fs.unlink(oldImgFilePath); // Use fs.promises.unlink
        } catch (error) {
          console.error('Error deleting old image file:', error);
        }
      }
      
      if (oldCvFilename && oldCvFilename !== cvFilename) {
        try {
          const oldCvFilePath = path.join(__dirname, '../../frontend/public/images_cv', oldCvFilename);
          await fs.unlink(oldCvFilePath); // Use fs.promises.unlink
        } catch (error) {
          console.error('Error deleting old CV file:', error);
        }
      }
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






module.exports = {
  SignUp,
  Login,
  getUserById,
  updateUser,upload
}