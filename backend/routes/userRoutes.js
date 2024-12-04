const express = require('express');;
const router = express.Router();
const { registerUser, loginUser, getUserProfile} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware');

// Test-> route
// router.get('/', (req, res) => {
//     res.send('User routes placeholder');
//   });

// POST -> /api/users
router.post('/', registerUser);
// POST -> /api/users/login
router.post('/login', loginUser);
// GET -> /api/user/profile
router.get('/profile', protect, getUserProfile);


  module.exports = router;