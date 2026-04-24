require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.use(cors({ origin: true }))
app.use("/api/todo", require("./routes/todo.routes"))

app.use("/", (req, res) => {
    res.status(404).json({ message: `resource not found ${req.method} ${req.path}` })
})
mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT, () => {
        console.log("server running")
        console.log(`mode: ${process.env.NODE_ENV}`)
    })
})

module.exports = app
