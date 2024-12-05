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

// Login a user 
const loginUser = async (req,res)=>{
const {email, password} = req.body;
try {
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            message: "Login successful",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    }else{
        res.status(401).json({message: 'Invalid email or password'})
    }
} catch (error) {
    res.status(500).json({message: error.message});
}
};

const getUserProfile = async (req, res)=>{
 try {
    const user = await User.findById(req.user.id).select('-password');
    if(user){
        res.json(user);
    }else{
        res.status(404).json({ message: 'User not found'})
    }
 } catch (error) {
    res.status(500).json({ message: error.message }); 
 }
};


module.exports = {
 registerUser,
 loginUser,
 getUserProfile
}
