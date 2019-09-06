const User = require('../models/user.model')

module.exports = {
    getAll(req, res) {
        User.find({}, 'name', (err, users) => {
            this._handleResponse(err, users, res)
        })
    },
    getById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({
                path: 'lists',
                select: ['title'],
                model: 'List',
                populate: {
                    path: 'cards',
                    select: ['title', 'body'],
                    model: 'Card'
                }
            })
            .exec((err, user) => {
                this._handleResponse(err, user, res)
            })
    },
    update(req, res) {
        User.findByIdAndUpdate(
            req.params.userId,
            { title: req.body.title },
            (err, user) => {
                this._handleResponse(err, user, res)
            }
        )
    },
    updateListsOrder(req, res) {
        User.findById(req.body.userId, (err, user) => {
            if (err) {
                res.status(400).end()
                return
            }

            user.lists = req.body.listIds
            user.save((err, savedUser) => {
                this._handleResponse(err, savedUser, res)
            })
        })
    },
    _handleResponse(err, data, res) {
        if (err) {
            res.status(400).end()
        } else {
            res.send(data)
        }
    }
}
