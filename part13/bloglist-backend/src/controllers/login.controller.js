const jwt = require('jsonwebtoken');
const { User, Session } = require('../models');
const { SECRET } = require('../utils/config');

const router = require('express').Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    // hardcode all user passwords to 'secret' for this project example
    const passwordCorrect = req.body.password === 'secret';

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'Invalid username or password',
      });
    }

    if (user.disabled) {
      return res.status(401).json({
        error: 'User account disabled',
      });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    // have not implemented expiry
    const token = jwt.sign(userForToken, SECRET);
    await Session.create({
      userId: user.id,
      token,
    });

    res.status(200).send({
      token,
      username: user.name,
      name: user.name,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
