const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate JWT 
const generateToken = (id) =>{
 return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

// Register a new user
const registerUser = async (req, res) =>{
 const { name, email, password } = req.body;
 console.log('Request body:', req.body);
 try {
    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).json({message: 'User already exists'})
    }
    const user = await User.create({ name, email, password});

  if(user){
    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
    });
    console.log(user)
  }else{
    res.status(400).json({messgae: 'Invalid user data'})
  }

 } catch (error) {
    console.error('Error:', error.message);
    res.status(400).json({message: 'Invalid user data'});
 }
};



module.exports = {
 registerUser: registerUser,
}
