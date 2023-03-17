const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')
const Exam = require('../models/Exam')

const getAllExams = async (req, res) => {
  const exams = await Exam.find({}).sort('createdAt')
  res.status(StatusCodes.OK).json({ exams, count: exams.length })
}

const getExam = async (req, res) => {
  const { id } = req.params
  const exam = await Exam.findById({ _id: id }).populate('Answer')

  if (!exam) {
    throw new NotFoundError('No exam found!')
  }

  res.status(StatusCodes.OK).json({ exam })
}

const createExam = async (req, res) => {
  const { name, questions } = req.body

  if (name === '') {
    throw new BadRequestError("Exam name can't be empty")
  }

  if (questions.length === 0) {
    throw new BadRequestError('Exam must have question')
  }
  const exam = await Exam.create(req.body)

  res.status(StatusCodes.CREATED).json({ exam })
}

const updateExam = async (req, res) => {
  const { name, id, questions } = req.body

  if (name === '') {
    throw new BadRequestError("Exam name can't be empty")
  }

  if (questions.length === 0) {
    throw new BadRequestError('Exam must have question')
  }

  const exam = await Exam.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true
  })

  if (!exam) {
    throw new NotFoundError('No exam found!')
  }

  res.status(StatusCodes.OK).json({ exam })
}

const deleteExam = async (req, res) => {
  const { id } = req.body
  const exam = await Exam.findByIdAndRemove({ _id: id })

  if (!exam) {
    throw new NotFoundError('No exam found!')
  }

  res.status(StatusCodes.OK).json()
}

module.exports = {
  getAllExams,
  getExam,
  createExam,
  updateExam,
  deleteExam
}
