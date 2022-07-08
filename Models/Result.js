const mongoose = require('mongoose')
const ResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: 30,
    minLength: 3,
  },
  usn: {
    type: String,
    required: [true, 'usn number is required'],
    minLength: 5,
    maxLength: 15,
  },
  published: {
    type: Boolean,
    default: false,
  },
  sem: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
  },
  year: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 10,
  },
  result: {
    required: true,
    maxItems: 10,
    type: [
      {
        code: {
          type: String,
          required: true,
        },
        subject: {
          type: String,
          required: true,
        },
        credit: {
          type: Number,
          required: true,
          min: 0,
          max: 8,
        },
        grade: {
          type: String,
          required: true,
          minLength: 1,
          maxLength: 1,
        },
      },
    ],
  },
})

module.exports = mongoose.model('Result', ResultSchema)
