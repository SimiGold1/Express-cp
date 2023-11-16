const express = require('express');
const app = express();
const PORT = 3000;
var path =require ('path');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const currentHour = currentDate.getHours();

  // Check if it's Monday to Friday and between 9 AM to 5 PM
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
  }
};
// Serve static files from the "Project" directory
app.use(express.static('Project'));

// Use the working hours middleware for all routes
app.use(workingHoursMiddleware);

// Set up routes
app.get('/', (req, res) => {
  res.render('home'); // You'll create the home.ejs file in the next step
});

app.get('/services', (req, res) => {
  res.render('services'); // You'll create the services.ejs file in the next step
});

app.get('/contact', (req, res) => {
  res.render('contact'); // You'll create the contact.ejs file in the next step
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
