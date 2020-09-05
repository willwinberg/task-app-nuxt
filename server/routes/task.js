const router = require('express').Router()
const Task = require('../models/Task')

router
    .use('/tasks', router)
    .get('/', (req, res) => {
        const { _id } = req.session.user
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
                res.status(202).json(tasks)
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
                res.status(200).json({ newTask })
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .put('/', (req, res) => {
        const { taskId, update } = req.body
        // if (!req.user.tasks.includes(taskId)) {
        //     return res.status(401).json({ message: 'You dont own that task' })
        // }
        Task.findByIdAndUpdate(taskId, update, { new: true })
            .then((updatedTask) => {
                res.status(200).json({ updatedTask })
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .put('/move', (req, res) => {
        const { taskId, update, fromColumn } = req.body
        let fromColumnTasks, toColumnTasks

        try {
            // change all fromColumn tasks
            Task.find(
                {
                    assignee: req.session.user._id,
                    status: fromColumn.title
                },
                (err, tasks) => {
                    if (err) {
                        res.status(500).json({ message: err.message })
                    }
                    tasks.sort((a, b) => a.index > b.index)

                    tasks.forEach((task, i) => {
                        task.index = i
                    })
                    fromColumnTasks = tasks
                }
            )

            // change all toColumn tasks
            Task.find(
                {
                    assignee: req.session.user._id,
                    status: update.status
                },
                (err, tasks) => {
                    if (err) {
                        res.status(500).json({ message: err.message })
                    }
                    tasks.sort((a, b) => a.index > b.index)

                    const movedTask = Task.findByIdAndUpdate(taskId, update, {
                        new: true
                    })

                    tasks.splice(update.index, 0, movedTask)

                    tasks.forEach((task, i) => {
                        task.index = i
                    })

                    toColumnTasks = tasks
                }
            )
            res.status(200).json({
                fromColumnTasks,
                fromColumnTitle: fromColumn.title,
                toColumnTasks
            })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })
    .post('/delete', (req, res) => {
        const { taskId } = req.body
        // res.status(201).json({ taskId })
        // if (!req.user.tasks.includes(taskId)) {
        //     return res.status(401).json({ message: 'You dont own that task' })
        // }
        Task.findByIdAndDelete(taskId)
            .then((deletedTask) => {
                res.status(200).json({ taskId })
            })
            .catch((err) => {
                res.status(401).json({ message: err.message })
            })
    })

module.exports.router = router
