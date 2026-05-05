const express=require("express");

const {addTodo,getAllTask,getTaskById,getTaskBySearch,getTaskByFilter,updateTask,deleteTask}=require("./ALL_FUNCTION/functions");

//copy of express
const app=express();
const Port=3000;

app.use(express.json());

//homeroute
app.get("/",(req,res)=>{
    res.send("Hello,Start");
});


app.get("/",getAllTask);
app.post("/",addTodo);
app.get("/search",getTaskBySearch);
app.get("/filter/:status",getTaskByFilter);
app.get("/:id",getTaskById);
app.put("/:id",updateTask);
app.delete("/:id",deleteTask);


app.listen(Port,()=>{
    console.log(`Server running on http://localhost:${Port}`);
})