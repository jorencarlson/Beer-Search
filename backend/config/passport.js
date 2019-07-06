const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const findUser = require('../pgHelpers').findUser;


this.configurePassport = (passport) => { 
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async(email, password, done) => {
    try {
      let user = await findUser(email);
      if (user) {
        bcrypt.compare(password, user.password, function(err, res) {
          if (res) {
            return done(null, {email: user.email,
                              firstname: user.firstname});
          } else if (!res) {
            return done(null, false, { message: 'Wrong password.'});
          } else if (err) {
            done(err);
          }
        });
      }
      else {
        return done(null, false, { message: 'No user.'});
      }
    } catch(error) {
      console.error(error.stack);
      return done(err);
    }
  }));
  
  passport.serializeUser((user, done) => {
    done(null, {email: user.email,
               firstname: user.firstname});
  });
  
  passport.deserializeUser(async(user, done) => {
    try {
      let user1 = await findUser(user.email);
      if (user1) {
        done(null, {email: user.email,
                    firstname: user.firstname});
      }
      else {
        done('Not in DB');
      }
    } catch(error) {
      done(error);
    }
  });
}