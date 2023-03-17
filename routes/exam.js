const express = require('express')
const {
  createExam,
  getAllExams,
  updateExam,
  deleteExam,
  getExam
} = require('../controllers/exam')
const verifyRoleUser = require('../middleware/verifyRoles')
const router = express.Router()

router
  .route('/')
  .post(verifyRoleUser, createExam)
  .put(verifyRoleUser, updateExam)
  .delete(verifyRoleUser, deleteExam)
  .get(getAllExams)

router.route('/:id').get(getExam)

module.exports = router
