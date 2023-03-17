const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const ExamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    questions: []
  },
  schemaOptions
)

module.exports = mongoose.model('Exam', ExamSchema)
