const boom = require('@hapi/boom');

function checkRole(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden('permissions required'));
    }
  };
}

module.exports = { checkRole };
