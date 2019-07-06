const express = require('express');
const cors = require('cors');
const app = express();
const helpers = require('./helpers');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');
const pgHelpers = require('./pgHelpers');

// Passport configuration
passportConfig.configurePassport(passport);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

app.use(cors(corsOptions));
app.use(express.urlencoded());
app.use(express.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.json({
      loggedIn: false
    })
  }
}

app.get('/loggedin', checkAuthentication, (req, res) => {
  res.json({
    loggedIn: true,
    firstname: req.user.firstname
  });
});

app.post('/signup', async(req, res) => {
  try {
    let user = await pgHelpers.findUser(req.body.email);
    if (!user) {
      bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
        if (err) {
          res.json({
            statusCode: 0,
            message: 'A server error occurred.'
          });
        }
        else {
          let newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
          };
          let successful = await pgHelpers.signUp(newUser);
          if (successful) {
            res.json({
              statusCode: 1,
              message: 'Success'
            });
          }
          else {
            res.json({
              statusCode: 0,
              message: 'A server error occurred.'
            })
          }
        }
      }) 
    } else {
      res.json({
        statusCode: 0,
        message: 'That email is already in use.'
      });
    }
  } catch(error) {
    console.error(error.stack);
    res.json({
      statusCode: 0,
      message: 'A server error occurred.'
    });
  }
});

app.post('/login', passport.authenticate('local'), async(req, res) => {
    try {
      let rows = await pgHelpers.beersInDB(req.body.email);
      if (rows.length === 0) {
        res.json({
          statusCode: 1,
          message: 'Success',
          beerIDs: rows,
          firstname: req.user.firstname,
        });
      }
      else {
        res.json({
          statusCode: 1,
          message: 'Success',
          beerIDs: rows.map((row) => row.beerid),
          firstname: req.user.firstname, 
        });
      }
    } catch(error) {
      console.error(error.stack);
      res.json({
        statusCode: 0,
        message: 'An error occurred.'
      })
    }
});

app.post('/signout', async(req, res) => {
  req.logout();
  res.sendStatus(200);
});

app.put('/favorites', async(req, res) => {
  let beersToAddToDB = [];
  for (let i = 0; i < req.body.favoriteList.length; i++) {
    let beerFound = req.body.favoriteListDB.find((beerID) => {
      return beerID === req.body.favoriteList[i];
    })
    if (!beerFound) {
      beersToAddToDB.push(req.body.favoriteList[i]);
    }
  }
  if (beersToAddToDB.length === 0) {
    res.sendStatus(200);
  } else {
    try {
      let success = await pgHelpers.addFavoritesToDB(beersToAddToDB, req.user.email);
      if (success) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(500);
      }
    } catch(error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
});

app.delete('/favorites', async(req, res) => {
  let beersToDeleteFromDB = [];
  for (let i = 0; i < req.body.favoriteListDB.length; i++) {
    let beerFound = req.body.favoriteList.find((beerID) => {
      return beerID === req.body.favoriteListDB[i];
    })
    if (!beerFound) {
      beersToDeleteFromDB.push(req.body.favoriteListDB[i]);
    }
  }
  if (beersToDeleteFromDB.length === 0) {
    res.sendStatus(200);
  } else {
    try {
      let success = await pgHelpers.deleteFavoritesFromDB(beersToDeleteFromDB, req.user.email);
      if (success) {
        res.sendStatus(200);
      }
      else {
        res.sendStatus(500);
      }
    } catch(error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
});

app.listen(5000, () => console.log('Listening on port 5000...'));