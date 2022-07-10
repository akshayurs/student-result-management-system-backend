const Result = require('../Models/Result')
const User = require('../Models/User')
const mongodb = require('mongodb')
//route to Update Result
// for teachers
// req.body = {
//  usn,
//  sem,
//  year,
//  result: [{code,subject,credit,grade}]
// }
//
// returns -> {success:Boolean,message}
exports.updateResult = async (req, res) => {
  const { usn, sem, result, year } = req.body
  try {
    if (req.userType == 'student') throw new Error('Not authorized')
    const user = await User.findOne({ username: usn })
    console.log(user)
    if (!user || user.userType != 'student') {
      return res
        .status(401)
        .send({ success: false, status: 401, message: 'Invalid student' })
    }
    await Result.findOneAndUpdate(
      { usn },
      { usn, sem: parseInt(sem), result, year, name: user.name },
      { upsert: true }
    )
    res
      .status(200)
      .send({ success: true, status: 200, message: 'student result updated' })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}

// route to view result
// req.query = {
//   usn,
//   sem,
// }
exports.viewResultByUSN = async (req, res) => {
  try {
    if (req.userType == 'student') throw new Error('not authorized')
    const { usn, sem } = req.query
    const result = await Result.findOne({
      usn,
      sem: parseInt(sem),
    })
    if (!result) {
      return res
        .status(404)
        .send({ success: false, status: 404, message: 'result not found' })
    }
    res.status(200).send({ success: true, status: 200, result })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}

// route to view student's result
// req.query = {
//   sem
// }
exports.viewMyResult = async (req, res) => {
  try {
    const { sem } = req.query
    const result = await Result.findOne({
      usn: req.username,
      sem: parseInt(sem),
      published: true,
    })
    if (!result) {
      return res
        .status(404)
        .send({ success: false, status: 404, message: 'result not found' })
    }
    res.status(200).send({ success: true, status: 200, result })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}

// route to publish result for admin
// req.query = {
// sem,year
// pause: true (optional)
// }
exports.publishResult = async (req, res) => {
  try {
    if (req.userType != 'admin') throw new Error('Not authorized')
    const { sem, year, pause } = req.query
    const result = await Result.updateMany(
      {
        sem: parseInt(sem),
        year,
      },
      {
        published: pause ? false : true,
      }
    )
    console.log(result)
    if (!result) {
      return res
        .status(404)
        .send({ success: false, status: 404, message: 'result not found' })
    }
    res.status(200).send({ success: true, status: 200, result })
  } catch (err) {
    res.status(500).send({ success: false, status: 500, message: err.message })
  }
}
