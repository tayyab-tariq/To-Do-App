const Task = require("../models/taskModel");

module.exports.addTask = async (req, res, next) => {
    try {
        const { task, isCompleted, completionTime } = req.body;

        const createTask = await Task.create({
        task,
        isCompleted,
        completionTime, 
        });

        return res.json({ status : 'success', createTask });   
    } catch (error) {
        next(error);
    }
};


module.exports.updateTask = async (req, res, next) => {
    try {
        const taskId = req.headers.id;
        const task = req.body.task;
        const taskCompleted = req.body.isCompleted;
        const completionTime = taskCompleted ? Date.now() : null;       
        const taskData = await Task.findByIdAndUpdate(taskId, {
            task: task,
            isCompleted: taskCompleted,
            completionTime: completionTime,
        }, { new: true });

        return res.json({
            status : 'success',
            isCompleted: taskData.isCompleted,
        });
        
    } catch (error) {
        next(error);
    }
};

module.exports.deleteTask = async (req, res, next) => {
    try {
        const deletedRecord = await Task.findByIdAndDelete(req.headers.id);
        if (!deletedRecord) {
            return res.status(404).json({ status : 'error', message: 'Record not found' });
        }
            res.json({ status : 'success', message: 'Record deleted successfully' });
            

    } catch (error) {
        next(error);
    }
};


module.exports.getTasks = async (req, res, next) => {

    try {
        const tasks = await Task.find().select([
            "task",
            "isCompleted",
            "completionTime",
            "createdAt",
          ]).sort({ createdAt: -1 });;
        return res.json(tasks);
        
    } catch (error) {
        next(error);
    }
};