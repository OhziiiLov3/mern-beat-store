const express = require('express');;
const router = express.Router();
const { registerUser} = require('../controllers/userController')


// Test-> route
// router.get('/', (req, res) => {
//     res.send('User routes placeholder');
//   });

// POST -> /api/users
router.post('/', registerUser);


  module.exports = router;