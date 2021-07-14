const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user')

const mongoose = require('mongoose');
const db = "mongodb+srv://sara:1XoI2meLL7HY4V1a@cluster0.cstcg.mongodb.net/eventsdb?retryWrites=true&w=majority";



mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  if (err) {
    console.error('Error!' + err)
  } else {
    console.log('Connected to mongodb');
  }
})

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.tatus(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.tatus(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.tatus(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}


router.get('/', (req, res) => {
  res.send('From Api route')
})

// registration API


router.post("/register", (req, res) => {
  var user = new User(req.body);
  user.save()
    .then(registeredUser => {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({token})
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post("/login", (req, res) => {
  var userData = new User(req.body);

  User.findOne({ email: userData.email }, (error, user) => {
    if (error) {
      console.log(error);
    } else if (!user) {
      res.status(401).send('Invalid email');
    } else if (user.password !== userData.password) {
      res.status(401).send('Invalid password')
    } else {
      let payload = { subject: user._id};
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({token})
    }
  })
});

router.get('/events', (req, res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})

router.post("/enroll", (req, res) => {
  console.log(req.body)
  res.status(401).send({"message": "Data recieved!"})
})


module.exports = router;