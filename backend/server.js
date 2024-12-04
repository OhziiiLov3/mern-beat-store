require('dotenv').config();
require('./config/database');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3001;






app.listen(PORT,()=>{
    console.log(`Express app running on port ${PORT}`);  
});