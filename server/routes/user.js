const router = require('express').Router()
const User = require('../models/User')

router
    .use('/users', router)
    .get('/', function(req, res, next) {
        User.find(function(err, products) {
            if (err) return next(err)
            res.json(products)
        })
    })
    .get('/:id', function(req, res, next) {
        User.findById(req.params.id, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
    .post('/', function(req, res, next) {
        res.json(req)
        User.create(req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
    .put('/:id', function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
    .delete('/:id', function(req, res, next) {
        User.findByIdAndRemove(req.params.id, req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })

module.exports.router = router
