const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const User = require('../models/User')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret_key'
}

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id)
      return user ? done(null, user) : done(null, false)
    } catch (error) {
      return done(error, false)
    }
  }))
}
// check token