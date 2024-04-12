const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Result = require('../models/Result');
const User = require('../models/User');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://gauthierlou20:JD00y0548InrbCvb@cluster0.hvqejah.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Function to seed a single quiz result for the user created in seedUser script
const seedResult = async () => {
  try {
    // Find the user with the username 'admin'
    const user = await User.findOne({ username: 'admin' });
    if (!user) {
      console.error('User with username "admin" not found');
      return;
    }

    // Create a new quiz result for the found user
    const newResult = new Result({
      userId: user._id,
      score: 8, // Example score
    });

    // Save the new quiz result to the database
    await newResult.save();
    console.log('Quiz result seeded successfully');
  } catch (error) {
    console.error('Error seeding quiz result:', error);
  }
};

// Seed a single quiz result
seedResult();
