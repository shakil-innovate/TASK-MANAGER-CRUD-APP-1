const db = require("../MODELS/todoModel");

const addTodo =(req, res)=>{
    try {
        const { title, description, status }=req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please provide a title"
            });
        }

        const newTask = db.createTodo({ title, description, status });

        return res.status(201).json({
            success: true,
            message: "New task added!",
            data: newTask
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getAllTask = (req, res) => {
    try {
        const allTasks = db.getAllTask();

        return res.status(200).json({
            success: true,
            count: allTasks.length,
            data: allTasks
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const getTaskById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const found = db.getTaskById(id);

        if (!found) {
            return res.status(404).json({
                success: false,
                message: `No task found with id ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            data: found
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const getTaskBySearch = (req, res) => {
    try {
        const keyword = req.query.q?.trim().toLowerCase() || "";
        const matches = db.getTaskBySearch(keyword);

        return res.status(200).json({
            success: true,
            count: matches.length,
            data: matches
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};


const getTaskByFilter = (req, res) => {
    try {
        const { status } = req.params;
        const filtered = db.getTaskByFilter(status);

        return res.status(200).json({
            success: true,
            count: filtered.length,
            data: filtered
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const updateTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const changes = req.body;
        const result = db.updateTask(id, changes);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: `No task found with id ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: "Task updated!",
            data: result
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


const deleteTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const removed = db.deleteTask(id);

        if (!removed) {
            return res.status(404).json({
                success: false,
                message: `No task found with id ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: `Task ${id} deleted successfully`
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

module.exports = {
    addTodo,
    getAllTask,
    getTaskById,
    getTaskBySearch,
    getTaskByFilter,
    updateTask,
    deleteTask
};