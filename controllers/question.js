const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')
const Question = require('../models/Question')
const Answer = require('../models/Answer')

const getAllQuestions = async (req, res) => {
  const questions = await Question.find({}).sort('createdAt')
  res.status(StatusCodes.OK).json({ questions, count: questions.length })
}

const getQuestion = async (req, res) => {
  const { id } = req.params
  const question = await Question.findById({ _id: id }).populate('Answer')

  if (!question) {
    throw new NotFoundError('No question found!')
  }

  res.status(StatusCodes.OK).json({ question })
}

const createQuestion = async (req, res) => {
  const { name, answers } = req.body

  if (name === '') {
    throw new BadRequestError("Question name can't be empty")
  }

  if (answers.length === 0) {
    throw new BadRequestError('Question must have answer')
  }
  const question = await Question.create(req.body)

  res.status(StatusCodes.CREATED).json({ question })
}

const updateQuestion = async (req, res) => {
  const { name, id, answers } = req.body

  if (name === '') {
    throw new BadRequestError("Question name can't be empty")
  }

  if (answers.length === 0) {
    throw new BadRequestError('Question must have answer')
  }

  const question = await Question.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true
  })

  if (!question) {
    throw new NotFoundError('No question found!')
  }

  res.status(StatusCodes.OK).json({ question })
}

const deleteQuestion = async (req, res) => {
  const { id } = req.body
  const question = await Question.findByIdAndRemove({ _id: id })

  if (!question) {
    throw new NotFoundError('No question found!')
  }

  res.status(StatusCodes.OK).json()
}

module.exports = {
  getAllQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
}
