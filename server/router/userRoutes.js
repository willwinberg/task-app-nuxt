// const express = require('express')
const User = require('../models/User')
// const Board = require('../models/boardModel')
// const Task = require('../models/taskModel')

module.exports = function(path, router) {
    router.use(path, router)
    /* GET ALL USERS */
    router.get('/', function(req, res, next) {
        User.find(function(err, products) {
            if (err) return next(err)
            res.json(products)
        })
    })

    /* GET SINGLE USER BY ID */
    router.get('/:id', function(req, res, next) {
        User.findById(req.params.id, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })

    /* ADD USER */
    router.post('/', function(req, res, next) {
        User.create(req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })

    /* UPDATE USER */
    router.put('/:id', function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })

    /* DELETE USER */
    router.delete('/:id', function(req, res, next) {
        User.findByIdAndRemove(req.params.id, req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
}
