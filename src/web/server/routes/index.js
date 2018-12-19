var express = require('express')
var router = express.Router()
var admin = require('firebase-admin')
var serviceAccount = require("./../../../web-quickstart-e2909-1896918629ac.json")

var registrationTokens = []

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://web-quickstart-e2909.firebaseio.com'
});

var message = {
  "notification":{
    "title":"Test Notification",
    "body":"Notification is delivered!",
  }
};

const sendMessage = (registrationToken) => {
  message.token = registrationToken

  admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response)
  })
  .catch((error) => {
    console.log('Error sending message:', error)
  });
}

router.get('/message_all', function(req, res, next) {
  registrationTokens.forEach((token) => {
    sendMessage(token)
  })
  res.json({ body: "message send" })
});

router.post('/new_user', function(req, res, next) {
  const regToken = req.body.registrationToken
  if (registrationTokens.indexOf(regToken) != -1) return res.json({message: "Already registered"})
  console.log(`new user registered with token: ${regToken}`)
  registrationTokens.push(regToken)
  res.json({message: "New token registered"})
})

module.exports = router;
