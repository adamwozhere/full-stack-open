const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const { Session } = require('../models');

const tokenExtractor = async (req, res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(auth.substring(7), SECRET);
    } catch {
      // destroy token if exists in session
      await Session.destroy({
        where: {
          token: req.decodedToken,
        },
      });
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  next();
};

module.exports = tokenExtractor;
