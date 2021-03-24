const sgMail = require('@sendgrid/mail')
const apiKey = "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"

sgMail.setApiKey(apiKey)

const sendWelcomeEmail = (email,name) => { 
    sgMail
  .send({
     to: email,
     from: 'asmitah19945@gmail.com',
     subject:'Thanks for joning in',
     text: `Welcome to app ${name}, Hope this app works great` 
  })
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

const sendCancelEmail = (email,name) => { 
    sgMail
  .send({
     to: email,
     from: 'asmitah19945@gmail.com',
     subject:'Sorry to see you go',
     text: `Dear ${name} Sorry to see you go!!!. Let us know what we can do better` 
  })
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}