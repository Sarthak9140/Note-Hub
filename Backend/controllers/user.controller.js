const userModel = require('../Model/user.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const user = new userModel({
      ...req.body,
      password: hash,
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).send('something went wrong');
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    const { password, ...info } = user._doc;
    res
      .cookie('accesstoken', token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    res.status(500).send('something went wrong');
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('accesstoken', {
      sameSite: 'none',
      secure: true,
    });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).send('something went wrong');
  }
};

module.exports = { register, login, logout };
