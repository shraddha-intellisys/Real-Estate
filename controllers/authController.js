const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register user
const registerUser = async (req, res) => {
    const { firstName, lastName, username, email, phone, password } = req.body;
  
    // Log the incoming data for debugging
    console.log('Received data:', req.body);
  
    try {
      // Example check if fields are missing
      if (!firstName || !lastName || !email || !password) {
        console.error('Required fields missing');
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const userExists = await User.findOne({ email });
  
      if (userExists) {
        console.error('User already exists');
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      const user = new User({
        firstName,
        lastName,
        username,
        email,
        phone,
        password
      });
  
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
      // Log success before sending response
      console.log('User registered successfully:', user);
  
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email: username }, { username }] });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
