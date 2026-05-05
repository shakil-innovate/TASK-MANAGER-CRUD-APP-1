const express=require("express");

// routes
const routes=require("./Routes/CRUD_Routes");

const app=express();
const Port=3000;

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello,Start");
});


app.use("/tasks",routes);

app.listen(Port,()=>{
    console.log(`Server running on http://localhost:${Port}`);
})