const express = require('express')
// const passport = require('passport')
const Task = require('../models/taskModel')
const router = express.Router()

router
    // .all('*', passport.authenticate('bearer', { session: false }))
    .get('/', (req, res) => {
        const { _id } = req.user
        Task.find({ user: _id })
            .then((tasks) => {
                res.status(200).json(tasks)
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
        // } else {
        //   return res.status(400).json({ message: 'Must be logged in as either an employer or a seeker to view tasks.' })
    })
    .get('/browse', (req, res) => {
        // const { category } = req.user
        Task.find({ assignee: null })
            // .populate({ path: 'details', select: 'name description' })
            .then((tasks) => {
                res.status(200).json(tasks)
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .post('/', (req, res) => {
        // const user = req.user
        const data = req.body
        const task = new Task(data)
        task.save()
            .then((newTask) => {
                res.status(200).json(newTask)
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .put('/:task_id', (req, res) => {
        const { taskId } = req.params
        if (!req.user.tasks.includes(taskId)) {
            return res.status(401).json({ message: 'You dont own that task' })
        }
        Task.findByIdAndUpdate(taskId, req.body)
            .then((updatedTask) => {
                res.status(200).json(updatedTask)
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .delete('/:task_id', (req, res) => {
        const { taskId } = req.params
        if (!req.user.tasks.includes(taskId)) {
            return res.status(401).json({ message: 'You dont own that task' })
        }
        Task.findByIdAndRemove(taskId)
            .then((deletedTask) => {
                res.status(200).json({ taskId })
            })
            .catch((err) => {
                res.status(401).json({ message: err.message })
            })
    })

module.exports = router
