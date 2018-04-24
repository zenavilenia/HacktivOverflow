const nodemailer = require("nodemailer");

const User = require('../models/user.model')

const user = process.env.EMAIL
const pass = process.env.PASS

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${user}`,
    pass: `${pass}`
  }
});

module.exports = {
  sendNotification: (req, res) => {
    User.find({
      sendWelcomeMessage: true
    })
      .then(response => {
        response.forEach(iniuser => {
          let mailOptions = {
            from: `${user}`,
            to: `${iniuser.email}`,
            subject: 'Thankyou for signing up!',
            text: 'Thankyou for signing up----'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })

          User.findByIdAndUpdate({
            _id: iniuser.id
          }, {
            sendWelcomeMessage: false
          })
            .then(response => {
              res.status(200).send({
                message: 'Update post success',
                data: response
              })
            })
            .catch(err => {
              res.status(400).send({
                message: 'Update post failed',
                err: err.message
              })
            })
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Query send welcome message failed',
          err: err.message
        })
      })
  }
}