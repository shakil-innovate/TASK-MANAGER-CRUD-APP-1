const express = require("express");

const {addTodo,getAllTask,getTaskById,getTaskBySearch,getTaskByFilter,updateTask,deleteTask}=require("../ALL_FUNCTION/functions");

const router=express.Router();

router.get("/",getAllTask);
router.post("/",addTodo);
router.get("/search",getTaskBySearch);
router.get("/filter/:status",getTaskByFilter);
router.get("/:id",getTaskById);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);

module.exports=router;