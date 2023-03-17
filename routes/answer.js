const express = require('express')
const {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswer,
  getAllAnswers
} = require('../controllers/answer')
const verifyRoleUser = require('../middleware/verifyRoles')
const router = express.Router()

router
  .route('/')
  .post(verifyRoleUser, createAnswer)
  .put(verifyRoleUser, updateAnswer)
  .delete(verifyRoleUser, deleteAnswer)
  .get(getAllAnswers)

router.route('/:id').get(getAnswer)

module.exports = router
