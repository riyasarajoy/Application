/*
File name = RiyaJoy_Assignment1
Name = Riya Sara Joy
Id = 301276056
Date = 05/-6/2023
*/
const express = require('express');
const app = express();
//const path = require('path');
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const User = require("./model/User");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb+srv://Riyajoy:Riyajoy@cluster0.pqbrs1p.mongodb.net/assignment2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: 'Rusty is a dog',
    resave: false,
    saveUninitialized: false
}));

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Showing secret page
app.get('/about', isLoggedIn, function (req, res) {
    res.render('about');
});

// Showing register form
app.get('/register', function (req, res) {
    res.render('register');
});

// Handling user signup
app.post('/register', async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    });

    return res.status(200).json(user);
});


// Showing login form
app.get('/login', function (req, res) {
    res.render('login');
});

app.post("/login", async function (req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        const result = req.body.password === user.password;
        if (result) {
          res.render("contact");
        } else {
          res.send('<script>alert("Password doesn\'t match"); window.history.back();</script>');
        }
      } else {
        res.send('<script>alert("User doesn\'t exist"); window.history.back();</script>');
      }
    } catch (error) {
      res.send(`<script>alert("${error.message}"); window.history.back();</script>`);
    }
  });

  app.get("/logout", function (req, res) {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/about');
    });
  });
  
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
  }

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

// Showing home page
app.get('/', function (req, res) {
    res.render('home');
});



// Handling user login
app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

/*
// Handling user logout
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}*/






// Handling user signup
app.post('/register', async (req, res) => {
    const newUser = new User({ username: req.body.username });
    await User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/register'); // Redirect back to the registration page in case of an error
        }
        // Authenticate the user after successful registration
        passport.authenticate('local')(req, res, () => {
            res.redirect('/home'); // Redirect to the home page after successful registration
        });
    });
});


// Start the server
//const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


