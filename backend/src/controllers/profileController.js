const User = require('../models/userModel');

const getProfile = async (req, res) => {
  try {
    const userName  = req.params.username;
    const user = await User.findOne({ username:userName });
    if (!user) return res.sendStatus(404);
    res.json({ username: user.username, email: user.email});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const username  = req.body.username;
    const user = await User.findOneAndUpdate(
      { username: username},
      { $set: {
        username: req.body.username, // Update username
        email: req.body.email      // Update email
      }
    },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getProfile, updateProfile };
