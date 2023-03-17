const express = require('express')
const {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestion
} = require('../controllers/question')
const verifyRoleUser = require('../middleware/verifyRoles')
const router = express.Router()

router
  .route('/')
  .post(verifyRoleUser, createQuestion)
  .put(verifyRoleUser, updateQuestion)
  .delete(verifyRoleUser, deleteQuestion)
  .get(getAllQuestions)

router.route('/:id').get(getQuestion)

module.exports = router
