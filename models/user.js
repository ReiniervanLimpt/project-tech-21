const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  preference: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("User", user)