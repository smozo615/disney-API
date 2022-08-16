const passport = require('passport');

const JwtStrategy = require('./strategies/jwt.strategy');

passport.use(JwtStrategy);
