const { User, Session } = require('../models');

const userAuthenticator = async (req, res, next) => {
  const auth = req.get('authorization');

  try {
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7);

      const session = await Session.findOne({
        where: {
          token,
        },
      });

      if (!session) {
        // throw Error('invalid session')
        return res.sendStatus(401);
      }
    }

    // check if user is disabled
    // probably do this by fetching the session AND the user?
    const user = await User.findByPk(req.decodedToken.id);

    if (user.disabled) {
      await Session.destroy({
        where: {
          token: req.decodedToken,
        },
      });
      // throw Error('User account disabled');
      next(err);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = userAuthenticator;
