const { todo } = require("node:test");
const todoModel=require("../models/todoModel");

const createTodo=(req,res)=>{
    try{
        console.log("POST/tasks hit");
        console.log("req.body=",req.body);

        //extract title
        const {title}=req.body;

        if(!title){
            return res.status(400).json({message:"Title is required"});
        }

        //passes the entire body
        const task=todoModel.createTodo(req.body);

        return res.status(201).json({
            message:"Task created successfully",
            task
        });
    }catch(error){
        console.error("createTask error",error);
        //send back the error message

        return res.status(500).json({
            message:error.message
        });
    }

}

const getAllTask=(req,res)=>{
    try{
        const tasks=todoModel.getAllTask();
        res.json(tasks);
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
};

const getTaskById=(req,res)=>{
    try{
        //convert string into int
        const task=todoModel.getTaskById(parseInt(req.params.id));

        if(!task){
            return res.status(404).json({message : "Task not found"});
        }

        return res.json(task);

    }catch(error){
        return res.status(500).json({message: "Server error"});
    }
};

const getTaskBySearch=(req,res)=>{
    try{
        const query=req.query.q?.toLowerCase() || "";
        const result=todoModel.getTaskBySearch(query);

        return res.json(result);
    }catch(error){
        return res.status(500).json({message: "server error"});
    }
};

const getTaskByFilter=(req,res)=>{
    try{
        const result=todoModel.getTaskByFilter(req.param.status);
        return res.json(result);
    }catch(error){
        return res.status(500).json({message: "server error"});
    }
}

const updateTask=(req,res)=>{
    try{
        const updated=todoModel.updateTask(parseInt(req.params.id),req.body);

        if(!updated){
           return res.status(404).json({message : "Task not found"});
        }

        return res.json({
            message:"updated successfully",
            task: updated
        });

    }catch(error){
        return res.status(500).json({message: "server error"});
    }
}

const deleteTask=(req,res)=>{
    try{
    const task=todoModel.deleteTask(parseInt(req.params.id));

    if(!task){
        return res.status(404).json({message: "task not found"});
    }

    res.json({message: "message is deleted"});
    }catch(error){
        return res.status(500).json({message: "server error"});
    }
};

module.exports={
    createTodo,
    getAllTask,
    getTaskById,
    getTaskBySearch,
    getTaskByFilter,
    updateTask,
    deleteTask
};
