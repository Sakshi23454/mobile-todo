const mongoose = require("mongoose")
module.exports = mongoose.model("task", new mongoose.Schema({
    task: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    user_id: { type: Number, required: true },
    complete: { type: Boolean, default: false },
}, { timestamps: true }))