/*File name = RiyaJoy_Assignment1
Name = Riya Sara Joy
Id = 301276056
Date = 05/06/2023
*/

const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./model/User");

// Set the view engine to EJS
app.set('views', './views');
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/pdf'));

mongoose.connect('mongodb+srv://Riyajoy:Riyajoy@cluster0.pqbrs1p.mongodb.net/assignment2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
  secret: "Rusty is a dog",
  resave: false,
  saveUninitialized: false
}));

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret');
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  return res.status(200).json(user);
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const result = req.body.password === user.password;
      if (result) {
        res.redirect("contact");
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


// Routes 
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/projects', (req, res) => {
  res.render('projects');
});

app.get('/services', (req, res) => {
res.render('services');
});

app.get('/contactme', (req, res) => {
res.render('contactme');
});
app.get('/login', (req, res) => {
  res.render('login');
  });
  app.get('/register', (req, res) => {
    res.render('register');
    });

app.post('/submit', (req, res) => {
  // Handle form submission
  // This code will capture the form data and redirect back to the home page
  // You can implement the actual functionality to store the form data or send an email here
  res.redirect('/');
});

const Contact = mongoose.model('Contact', {
  name: String,
  phoneNumber: String,
  email: String,
 
});

app.get('/contact', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.render('contact', { contacts: contacts });
  } catch (err) {
    console.error('Error retrieving contacts:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/update/:id", function (req, res) {
  const contactId = req.params.id;
  res.render("update", { contactId });
});

app.post('/update/:id', (req, res) => {
  const contactId = req.params.id;

  const updatedContact = {
    name: req.body.name,
    phoneNumber: req.body.number,
    email: req.body.email
  };

  Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: updatedContact },
    { new: true }
  )
    .then(updatedContact => {
      res.redirect('/contact');
    })
    .catch(error => {
      console.error('Error updating contact:', error);
      res.status(500).json({ error: 'Failed to update the contact' });
    });
});

app.get('/js/update.js', (req, res) => {
  res.sendFile(__dirname + '/update.js');
});

app.delete('/delete/:id', (req, res) => {
  const contactId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).send('Invalid contact ID');
  }

  Contact.findOneAndRemove({ _id: contactId })
    .then((deletedContact) => {
      if (!deletedContact) {
        return res.status(404).send('Contact not found');
      }
      res.sendStatus(204); // No content (successful deletion)
    })
    .catch((err) => {
      console.error('Error deleting contact:', err);
      res.status(500).send('Error deleting contact');
    });
});

// Start the server, localhost:3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});