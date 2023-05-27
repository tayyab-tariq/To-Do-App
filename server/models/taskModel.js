const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        min: 3,
        max: 300,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    completionTime: {
        type: Date,
    },
}, {
    timestamps: true,
    get: time => time.toDateString()
});

module.exports = mongoose.model("Tasks", taskSchema);