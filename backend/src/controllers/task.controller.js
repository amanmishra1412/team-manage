const taskModel = require("../models/task.model");

const createTask = async (req, res) => {
    try {
        const { title, description, project, assignedTo, deadline, priority } = req.body;

        const createdBy = req.user.id;

        if (!title || !project || !assignedTo) {
            return res.status(400).json({
                status: false,
                msg: "Required fields missing",
            });
        }

        const isExist = await taskModel.findOne({ title, project });

        if (isExist) {
            return res.status(400).json({
                status: false,
                msg: "Task already exists in this project",
            });
        }

        const task = await taskModel.create({
            title,
            description,
            project,
            assignedTo,
            createdBy,
            deadline,
            priority,
        });

        return res.status(201).json({
            status: true,
            msg: "Task created successfully",
            task,
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            msg: "Server error",
            err: err.message,
        });
    }
};

const getTasks = async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user.id;

        let tasks;

        if (role === "admin") {
            tasks = await taskModel.find();
        }

        else if (role === "manager") {
            tasks = await taskModel.find({ createdBy: userId });
        }

        else {
            tasks = await taskModel.find({ assignedTo: userId });
        }

        res.status(200).json(tasks);

    } catch (err) {
        return res.status(500).json({
            status: false,
            msg: "Server error",
            err: err.message,
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const {
            title,
            description,
            assignedTo,
            deadline,
            priority,
            status
        } = req.body;

        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                status: false,
                msg: "Task not found"
            });
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            taskId,
            {
                title,
                description,
                assignedTo,
                deadline,
                priority,
                status
            },
            { new: true }
        );

        return res.json({
            status: true,
            msg: "Task updated successfully",
            task: updatedTask
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            msg: "Server error"
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                status: false,
                msg: "Task not found"
            });
        }

        await taskModel.findByIdAndDelete(taskId);

        return res.json({
            status: true,
            msg: "Task deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            msg: "Server error"
        });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        const task = await taskModel.findById(taskId);

        if (!task) {
            return res.status(404).json({
                status: false,
                msg: "Task not found"
            });
        }

        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({
                status: false,
                msg: "You can only update your assigned task"
            });
        }

        task.status = status;

        await task.save();

        return res.json({
            status: true,
            msg: "Task status updated",
            task
        });

    } catch (err) {
        return res.status(500).json({
            status: false,
            msg: "Server error"
        });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, updateTaskStatus };