const mongoose = require('mongoose');
const User = require('../models/User');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://gauthierlou20:JD00y0548InrbCvb@cluster0.hvqejah.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Insert a document
const newUser = new User({
  username: 'admin',
  password: 'admin'
});

newUser.save()
  .then(() => {
    console.log('User inserted successfully');
  })
  .catch((error) => {
    console.error('Error inserting user:', error);
  });
