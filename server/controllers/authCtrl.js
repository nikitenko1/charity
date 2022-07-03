const { User } = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('./../utils/generateToken');

const authCtrl = {
  register: async (req, res) => {
    try {
      const { username, name, password, role } = req.body;
      if (!username || !name || !password || !role)
        return res.status(400).json({ msg: 'Please provide every field.' });

      const findUsername = await User.findOne({ username });
      if (findUsername)
        return res
          .status(400)
          .json({ msg: 'Username has been registered before.' });

      if (password.length < 8)
        return res
          .status(400)
          .json({ msg: 'Password length should be at least 8 characters.' });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        name,
        password: passwordHash,
        role,
      });

      await newUser.save();
      const accessToken = generateAccessToken({ id: newUser._id });
      const refreshToken = generateRefreshToken({ id: newUser._id });

      res.cookie('learnify_rfToken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        msg: 'Registration successful.',
        accessToken,
        user: {
          ...newUser._doc,
          password: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(400).json({ msg: 'Please provide every field.' });

      const user = await User.findOne({ username });
      if (!user)
        return res.status(403).json({ msg: 'Invalid authentication.' });

      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword)
        return res.status(400).json({ msg: 'User not found.' });

      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      res.cookie('learnify_rfToken', refreshToken, {
        httpOnly: true,
        path: '/api/v1/auth/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        accessToken,
        user: {
          ...user._doc,
          kataSandi: '',
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('learnify_rfToken', {
        path: '/api/v1/auth/refresh_token',
      });

      return res.status(200).json({ msg: 'Logout successful.' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const rfToken = req.cookies.learnify_rfToken;
      if (!rfToken)
        return res.status(403).json({ msg: 'Invalid authentication.' });

      const decoded = jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET);
      if (!decoded.id) return res.status(403).json({ msg: 'Invalid token.' });

      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(403).json({ msg: 'User not found.' });

      const accessToken = generateAccessToken({ id: user._id });

      return res.status(200).json({
        accessToken,
        user,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { name, avatar } = req.body;

      if (!name)
        return res.status(400).json({ msg: "Name field can't be blank." });

      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          name,
          avatar,
        },
        { new: true }
      );
      if (!user) return res.status(404).json({ msg: 'User not found.' });

      return res.status(200).json({
        msg: 'User profile updated.',
        user,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authCtrl;
