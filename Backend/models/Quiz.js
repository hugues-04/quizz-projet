const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
}, {
  timestamps: true,
  collection: 'Kouiz'
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
