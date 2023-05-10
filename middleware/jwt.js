const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) res.status(403).send('you are not allowed to access');
  try {
    jwt.verify(token, process.env.jwtSecretKey, function (err, data) {
      req.id = data.id;
      req.username = data.username;
      next();
    });
  } catch (error) {
    res.status(403).send(error);
  }
};

module.exports = authorization;
