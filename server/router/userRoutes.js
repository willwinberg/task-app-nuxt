const User = require('../models/User')

module.exports = function(path, router) {
    router.use(path, router)
    router.get('/', function(req, res, next) {
        User.find(function(err, products) {
            if (err) return next(err)
            res.json(products)
        })
    })
    router.get('/:id', function(req, res, next) {
        User.findById(req.params.id, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
    router.post('/', function(req, res, next) {
        User.create(req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
    router.put('/:id', function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
    router.delete('/:id', function(req, res, next) {
        User.findByIdAndRemove(req.params.id, req.body, function(err, post) {
            if (err) return next(err)
            res.json(post)
        })
    })
}
