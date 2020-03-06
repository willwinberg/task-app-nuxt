const router = require('express').Router()
const Task = require('../models/Task')

router
    .use('/tasks', router)
    .get('/', (req, res) => {
        const { _id } = req.user
        Task.find({ assignee: _id })
            .then((tasks) => {
                res.status(200).json(tasks)
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .get('/unassigned', (req, res) => {
        Task.find({ assignee: null })
            .then((tasks) => {
                res.status(200).json(tasks)
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .post('/', (req, res) => {
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

module.exports.router = router
