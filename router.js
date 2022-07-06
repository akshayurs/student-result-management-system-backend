const express = require('express')
const router = express.Router()
const { isAuthorized } = require('./Helpers/middleware')

const {
  signin,
  signup,
  signout,
  changePassword,
  userExists,
  resetPasswordReq,
  checkResetToken,
  resetPassword,
  checkToken,
  myDetails,
} = require('./Controllers/auth')

const {
  updateResult,
  viewResultByUSN,
  viewMyResult,
  publishResult,
} = require('./Controllers/result')

router.get('/', (req, res) => {
  res
    .status(200)
    .send({ success: true, status: 200, message: 'server running' })
})

router.post('/signin', signin)
router.post('/signup', isAuthorized, signup)
router.get('/signout', signout)
router.get('/userexists/:username', userExists)
router.post('/changepassword', isAuthorized, changePassword)
router.post('/resetPasswordReq', resetPasswordReq)
router.get('/resetpassword/:token', checkResetToken)
router.post('/resetpassword', resetPassword)
router.get('/mydetails', isAuthorized, myDetails)
router.get('/checktoken', isAuthorized, checkToken)

router.post('/updateresult', isAuthorized, updateResult)
router.get('/viewresultbyusn', isAuthorized, viewResultByUSN)
router.get('/viewmyresult', isAuthorized, viewMyResult)
router.get('/publishresult', isAuthorized, publishResult)

module.exports = router
