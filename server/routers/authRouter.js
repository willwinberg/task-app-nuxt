const express = require('express')
const User = require('../models/userModel')

const router = express.Router()

router.get('/', function(req, res) {
  res.send('Birds home page')
})

router
  .get('/user', (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json(users)
      })
      .catch((err) => res.status(500).json({ message: err.message }))
  })
  .post('/login', (req, res) => {
    const { id } = req.body
    // console.log(req)
    User.findById(id)
      .then((user) => {
        res.status(200).json(user)
      })
      .catch((err) => res.status(500).json({ message: err.message }))
  })
  .post('/logout', (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json(users)
      })
      .catch((err) => res.status(500).json({ message: err.message }))
  })

module.exports = router
