const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')
const Answer = require('../models/Answer')

const getAllAnswers = async (req, res) => {
  const answers = await Answer.find({}).populate('questions').sort('createdAt')
  res.status(StatusCodes.OK).json({ answers, count: answers.length })
}

const getAnswer = async (req, res) => {
  const { id } = req.params
  const answer = await Answer.findById({ _id: id }).populate('Question')

  if (!answer) {
    throw new NotFoundError('No answer found!')
  }

  res.status(StatusCodes.OK).json({ answer })
}

const createAnswer = async (req, res) => {
  const { name } = req.body

  if (name === '') {
    throw new BadRequestError("Answer name can't be empty")
  }

  const answer = await Answer.create(req.body)
  res.status(StatusCodes.CREATED).json({ answer })
}

const updateAnswer = async (req, res) => {
  const { name, id } = req.body

  if (name === '') {
    throw new BadRequestError("Answer name can't be empty")
  }

  const answer = await Answer.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true
  }).populate('questions')

  if (!answer) {
    throw new NotFoundError('No answer found!')
  }

  res.status(StatusCodes.OK).json({ answer })
}

const deleteAnswer = async (req, res) => {
  const { id } = req.body
  const answer = await Answer.findByIdAndRemove({ _id: id })

  if (!answer) {
    throw new NotFoundError('No answer found!')
  }

  res.status(StatusCodes.OK).json()
}

module.exports = {
  getAllAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer
}
