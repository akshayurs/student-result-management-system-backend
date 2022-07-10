const User = require('../Models/User')

// route to list user by admin
//
// req.query= {
//  type
//}
//
// returns -> { success: true, status, message, exists}
exports.listUsers = async (req, res) => {
  const { type } = req.query
  try {
    if (req.userType != 'admin') throw new Error('not authorized')
    const users = await User.find({ userType: type })
    return res.status(200).send({ success: true, status: 200, users })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}

// route to get user details
// req.query = {
//   usn
// }
// returns -> {success, user, message}
exports.getDetails = async (req, res) => {
  try {
    if (req.userType == 'student') throw new Error('Not Authorized')
    const user = await User.findOne({ username: req.query.usn }).select({
      username: 1,
      name: 1,
      email: 1,
      userType: 1,
    })
    if (!user) {
      res
        .status(404)
        .send({ success: false, status: 404, message: 'Not found' })
      return
    }
    res.send({ success: true, status: 200, message: 'Details Found', user })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}
