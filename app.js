/*
File name = RiyaJoy_Assignment1
Name = Riya Sara Joy
Id = 301276056
Date = 05/-6/2023

*/
const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define routes
const indexRoute = require('./routes/index');
app.use('/', indexRoute);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});