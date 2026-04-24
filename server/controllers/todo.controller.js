const Task = require("../models/Task")

exports.createTask = async (req, res) => {
    try {
        const { task, description, priority, user_id } = req.body
        if (!task || !description || !priority || !user_id) {
            return res.status(400).json({ message: "all fields required" })
        }
        await Task.create({ task, description, priority, user_id })
        res.status(200).json({ message: "task create success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to create task" })
    }
}

exports.readTask = async (req, res) => {
    try {
        const result = await Task.find()
        res.status(200).json({ message: "task read success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to read task" })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { tid } = req.params
        const { task, description, priority, user_id, due } = req.body
        const obj = {}
        if (task) obj.task = task
        if (description) obj.description = description
        if (priority) obj.priority = priority
        if (user_id) obj.user_id = user_id
        await Task.findByIdAndUpdate(tid, obj, { runValidators: true })
        res.status(200).json({ message: "task update success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to update task" })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { tid } = req.params
        await Task.findByIdAndDelete(tid)
        res.status(200).json({ message: "task delete success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to delete task" })
    }
}