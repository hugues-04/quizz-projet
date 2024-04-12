const mongoose = require('mongoose');
const cors = require('cors'); // Add this line to import CORS middleware
const bcrypt = require('bcrypt');
const Quiz = require('./models/Quiz');
const User = require('./models/User'); // Import the User model
const Result = require('./models/Result')
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://gauthierlou20:JD00y0548InrbCvb@cluster0.hvqejah.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Add CORS middleware to allow requests from all origins
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = new User({
      username,
      password
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ username: user.username }, 'secret_key');
  res.json({ token });
});

// Route to get the latest quiz result
app.get('/latest-quiz-result', async (req, res) => {
  try {
    const latestResult = await Result.findOne().sort({ createdAt: -1 });
    if (!latestResult) {
      return res.status(404).json({ message: 'No quiz result found' });
    }
    res.json(latestResult);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch latest quiz result', error: error.message });
  }
});

app.post('/save-results', async (req, res) => {
  const { userId, score } = req.body;
  try {
    const newResult = new Result({
      userId,
      score,
    });
    await newResult.save();
    res.status(201).json({ message: 'Quiz results saved successfully' });
  } catch (error) {
    console.error('Error saving quiz results:', error);
    res.status(500).json({ message: 'Failed to save quiz results' });
  }
});

// Get all quizzes
app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get a random question
app.get('/random-question', async (req, res) => {
  try {
    const count = await Quiz.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomQuestion = await Quiz.findOne().skip(randomIndex);
    res.json(randomQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
