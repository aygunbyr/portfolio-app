const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  message: String,
  date: Date,
});

// If the Message model is not defined yet, it creates a new model
const Message =
  mongoose.models.Message ?? mongoose.model('Message', MessageSchema);

module.exports = Message;
