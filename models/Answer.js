const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const AnswerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    isTrue: {
      type: Boolean,
      default: false
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'Question'
      }
    ]
  },
  schemaOptions
)

module.exports = mongoose.model('Answer', AnswerSchema)
