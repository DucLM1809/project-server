const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const QuestionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    answers: []
  },
  schemaOptions
)

module.exports = mongoose.model('Question', QuestionSchema)
