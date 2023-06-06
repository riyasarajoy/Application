/*
File name = RiyaJoy_Assignment1
Name = Riya Sara Joy
Id = 301276056
Date = 05/06/2023
*/

const express = require('express');
const app = express();
const port = 3001;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/pdf'));

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

app.get('/contact', (req, res) => {
res.render('contact');
});

app.post('/submit', (req, res) => {
  // Handle form submission
  // This code will capture the form data and redirect back to the home page
  // You can implement the actual functionality to store the form data or send an email here
  res.redirect('/');
});

// Start the server, localhost:3001
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});