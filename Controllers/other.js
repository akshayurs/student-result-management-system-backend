const User = require('../Models/User')

// route to list user by admin
//
// req.query= {
//  userType
//}
//
// returns -> { success: true, status, message, exists}
exports.listUsers = async (req, res) => {
  const { userType } = req.query
  try {
    if (req.userType != 'admin') throw new Error('not authorized')
    const users = await User.find({ userType })
    return res.status(200).send({ success: true, status: 200, users })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}

// route to list user by admin
//
// req.query= {
//  username
//}
//
// returns -> { success: true, status, message, exists}
exports.removeUser = async (req, res) => {
  const { username } = req.query
  try {
    if (req.userType != 'admin') throw new Error('not authorized')
    await User.findOneAndRemove({ username })
    return res
      .status(200)
      .send({ success: true, status: 200, message: 'user deleted' })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}
