const { createTask, readTask, updateTask, deleteTask, getCompletedTask } = require("../controllers/todo.controller")

const router = require("express").Router()

router
    .post("/create", createTask)
    .get("/read", readTask)
    .put("/update/:tid", updateTask)
    .delete("/delete/:tid", deleteTask)
    .get("/completedtask", getCompletedTask)

module.exports = router 