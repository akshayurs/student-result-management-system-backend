const mongoose = require('mongoose')
const ResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  published: {
    type: Boolean,
  },
  sem: {
    type: Number,
    required: true,
    min: 1,
    max: 8,
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
