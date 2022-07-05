let nodemailer = require('nodemailer')

exports.sendMail = async (to, subject, body) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  let info = await transporter.sendMail({
    from: '"USERNAME" example@gmail.com',
    to,
    subject,
    text: body,
    html: body,
  })
  return info
}
