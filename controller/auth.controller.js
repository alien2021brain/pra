const User = require('../Modal/user.modal.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const register = async (req, res) => {
  console.log('register controller');
  const myPlaintextPassword = req.body.password;
  // post data comes in body

  const username = await User.findOne({ username: req.body.username });
  console.log('plane', username);
  if (username) {
    res.status(500).send('user already exits');
  } else {
    try {
      bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
        const user = new User({ ...req.body, password: hash });
        await user.save();

        res.status(200).send('User added successfully');
      });
    } catch (error) {
      res.status(500).send('Error', error);
    }
  }
};
// login
const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) res.status(404).send('user not found');
  console.log('login', user);
  const password = req.body.password;
  const hash = user.password;
  console.log(hash, 'hash');
  console.log('user', user);
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.jwtSecretKey
      );
      console.log('user2,', result);
      const { password, ...data } = user._doc;
      return res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .send(data);
    }
    response.status(500).send('login failed', err);
  });

  if (!user) res.status(404).send('user not found');
  // Load hash from your password DB.
};
module.exports = { register, login };
