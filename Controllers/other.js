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
