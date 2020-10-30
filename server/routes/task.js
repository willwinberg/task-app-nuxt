const router = require('express').Router()
const Task = require('../models/Task')

router
    .use('/tasks', router)
    .get('/', (req, res) => {
        const { _id } = req.session.user
        Task.find({ assignee: _id, archived: null })
            .then((tasks) => {
                res.status(200).json(tasks)
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })
    .get('/unassigned', (req, res) => {
        Task.find({ assignee: null, archived: null })
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
    .put('/move', async (req, res) => {
        const { originalTask, update } = req.body
        let fromColumnTasks
        let toColumnTasks
        let updatedTask

        try {
            // updated the moved task
            await Task.findByIdAndUpdate(originalTask._id, update, {
                new: true
            })
                .then((task) => {
                    updatedTask = task
                })
                .catch((err) => {
                    res.status(500).json({ message: err.message })
                })
            // change all toColumn tasks
            await Task.find(
                {
                    assignee: req.session.user._id,
                    status: update.status
                },
                (err, tasks) => {
                    if (err) {
                        res.status(500).json({ message: err.message })
                    }

                    tasks.sort((a, b) => a.index > b.index)
                    tasks.splice(updatedTask.index, 0, updatedTask)
                    tasks.forEach((task, i) => {
                        task.index = i
                        Task.update({ _id: task._id }, { index: i })
                    })

                    toColumnTasks = tasks
                }
            )
            // change all fromColumn tasks
            await Task.find(
                {
                    assignee: req.session.user._id,
                    status: originalTask.status
                },
                (err, tasks) => {
                    if (err) {
                        res.status(500).json({ message: err.message })
                    }

                    tasks.sort((a, b) => a.index > b.index)
                    tasks.forEach((task, i) => {
                        task.index = 1
                        Task.update({ _id: task._id }, { index: i })
                    })

                    fromColumnTasks = tasks
                }
            )
        } catch (err) {
            res.status(500).json({ message: err.message })
        } finally {
            if (fromColumnTasks && toColumnTasks) {
                res.status(200).json({
                    fromColumnTasks,
                    toColumnTasks,
                    fromColName: originalTask.status,
                    toColName: update.status
                })
            } else {
                res.status(500).json({
                    message: 'fromColumnTasks or toColumnTasks undefined'
                })
            }
        }
    })
    .post('/archive', (req, res) => {
        const { taskId } = req.body
        // res.status(201).json({ taskId })
        // if (!req.user.tasks.includes(taskId)) {
        //     return res.status(401).json({ message: 'You dont own that task' })
        // }
        Task.findByIdAndUpdate(taskId, { archived: true }, { new: true })
            .then((archivedTask) => {
                res.status(200).json({ archivedTask })
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
    })

module.exports.router = router
