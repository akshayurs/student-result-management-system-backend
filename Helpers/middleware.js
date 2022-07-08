const jwt = require('jsonwebtoken')
exports.isAuthorized = (req, res, next) => {
  let token = null
  req.headers.authorization = req.headers.authorization?.replaceAll('"', '')
  req.headers.authorization = req.headers.authorization?.replaceAll("'", '')
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    if (req.cookies.token) {
      token = req.cookies.token.trim()
    }
    if (token == null || token == '') {
      return res
        .status(401)
        .send({ success: false, status: 401, message: 'Not Authorized' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = decoded.id
    req.username = decoded.username?.toUpperCase()
    req.userType = decoded.userType
  } catch (e) {
    return res
      .status(401)
      .send({ success: false, status: 401, message: 'Invalid Token' })
  }
  next()
}

exports.getUserId = (req, res, next) => {
  let token = null
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.token) {
      token = req.cookies.token
    }
    if (token != null && token != '') {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = decoded.id
      req.userType = decoded.userType
    }
  } catch (e) {
    req.userId = null
  }
  next()
}
