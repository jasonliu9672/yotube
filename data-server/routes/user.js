const express = require('express')
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const middlewares = require('./middlewares')
const cryptoRandomString = require('crypto-random-string');
const router = express.Router()

router.post('/register', [
], async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  let account, result;
  try {
    account = await User.find({ username: username });
  } catch (err) {
    res.status(500).json({ error: err })
  }
  if (account.length) {
    res.json({
      success: false,
      message: 'Register failed. username already existed',
      account: account
    })
  } else {
    let flag = true;
    while (flag) {
      const streamId = cryptoRandomString({length: 10, type: 'base64'});
      try {
        result = await User.find({streamId: streamId})
      } catch (err) {
        res.status(500).json({ error: err })
      }
      if (result.length === 0) {
        flag = false;
        console.log("id: ", streamId);
        User.create({
          username: username,
          password: password,
          streamId: streamId
        })
        res.json({
          success: true,
          message: 'Register success'
        })
      }
    }
  }

})
  // User.find({ username: username }, function (err, account) {
  //   if (err) {
  //     res.status(500).json({ error: err })
  //   }
  //   if (account.length) {
  //     res.json({
  //       success: false,
  //       message: 'Register failed. username already existed',
  //       account: account
  //     })
  //   } else {
  //     // TODO: set time out
  //     let flag = true;
  //     while (flag) {
  //       const streamId = cryptoRandomString({length: 10, type: 'base64'});
  //       //console.log(streamId);
  //       User.find({streamId: streamId}).then(result => {
  //         if (err) {
  //           res.status(500).json({ error: err })
  //         }
  //         console.log(result)
  //         if (result.length !== 0) {
  //           flag = false;
  //           console.log("id: ", streamId);
  //           User.create({
  //             username: username,
  //             password: password,
  //             streamId: streamId
  //           })
  //           res.json({
  //             success: true,
  //             message: 'Register success'
  //           })
  //         }
  //       })
  //     }     

router.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
    if (!user) {
      res.json({
        success: false,
        message: 'Login failed. account does not exist',
        token: ''
      })
    } else if (user) {
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) { throw (err) }
        if (!isMatch) {
          res.json({
            success: false,
            message: 'Login failed. password not match',
            token: ''
          })
        } else {
          var token = jwt.sign({ id: user.username }, process.env.PRIVATE_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_EXPIRE_SECONDS
          })
          res.json({
            success: true,
            message: 'Login success',
            token: token,
            username: username
          })
        }
      })
    }
  })
})
router.get('/list', middlewares.auth, (req, res) => {
  User.find({}, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      res.json({
        success: true,
        userList: result
      })
    }
  })
})

router.get('/user/:id', async (req, res) => {
  const username = req.params.id;
  const user = await User.findOne({ username: username});
  if (!user) {
    res.sendStatus(404);
  } else {
    res.status(200).send({user:user});
  }
})

router.get('/getStreamId/:id', (req, res) => {
  const username = req.params.id;
  User.findOne({ username: username }, (err, result) => {
    if (err) {
      res.status(500).json({ error: err })
    }
    if (!result || result.length === 0) {
      res.sendStatus(404);
    }
    else {
      console.log(result, result.streamId);
      res.status(200).send({
        streamId: result.streamId
      });
    }
  })
})

module.exports = router