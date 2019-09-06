// const express = require('express')
// const User = require('../models/userModel')

// const router = require('express').Router()
//
// router
// .get('/user', (req, res) => {
//   User.find()
//     .then((users) => {
//       res.status(200).json(users)
//     })
//     .catch((err) => res.status(500).json({ message: err.message }))
// })
// .post('/login', (req, res, next) => {
//     // user: { url: '/userinfo', method: 'get', propertyName: false }
//     res.json({
//         // Let everyone in:
//         token: 'example-token'
//     })
//     // const { id } = req.body
//     console.log(req)
//     // next()
//     // User.findById(id)
//     //   .then((user) => {
//     //     res.status(200).json(user)
//     //   })
//     //   .catch((err) => res.status(500).json({ message: err.message }))
// })
// .post('/logout', (req, res) => {
//   User.find()
//     .then((users) => {
//       res.status(200).json(users)
//     })
//     .catch((err) => res.status(500).json({ message: err.message }))
// })

module.exports = function(router) {
    router.post('/auth/login', (req, res, next) => {
        // user: { url: '/userinfo', method: 'get', propertyName: false }
        res.json({
            // Let everyone in:
            token: 'example-token'
        })
        // const { id } = req.body
        console.log(req)
        // next()
        // User.findById(id)
        //   .then((user) => {
        //     res.status(200).json(user)
        //   })
        //   .catch((err) => res.status(500).json({ message: err.message }))
    })
}
