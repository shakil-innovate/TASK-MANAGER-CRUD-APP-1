const { error } = require("node:console");

let task=[];

let c_id=1;

const valid_status=["Pending","on-going", "Completed"];

//arrow function
const getAllTask=()=>{
    return task;
}

const getTaskById=(id)=>{
    //function buildin
    //standard function
    return task.find(function(t){
        return t.id==id;
    });
};

const createTodo=(data)=>{
    if(!valid_status.includes(data.status || "Pending")){
        throw new Error("Invalid status value");
    }


    const newTask={
        id:c_id,
        title:data.title,
        description:data.description || "",
        status:data.status || "Pending"
    };

    task.push(newTask);
    c_id++;
    return newTask;
};

const updateTask=(id,data)=>{
    const taskk=task.find(function(t){
        return t.id==id;
    });

    if(!taskk){
        return null;
    }

    //check valid status
    if(data.status && !valid_status.includes(data.status)){
        throw new Error("invalid status value");
    }

    if(data.title!=undefined)taskk.title=data.title;
    if(data.description!=undefined)taskk.description=data.description;
    if(data.status!=undefined)taskk.status=data.status;

    return taskk;
};

const deleteTask=(id)=>{
    const index=task.findIndex(function(t){
        return t.id==id;
    })

    if(index==-1)return false;

    task.splice(index,1);
    return true;
};

const getTaskByFilter=(status)=>{
    if(!valid_status.includes(status)){
        throw new Error("Invalid status value");
    }

    return task.filter(function(t){
        return t.status==status
    });
}

const getTaskBySearch=(query)=>{
    return task.filter(function(t){
        const searchTerm = query.toLowerCase();
        const taskContent = `${t.title} ${t.description}`.toLowerCase();

        return taskContent.includes(searchTerm);
    });
};

module.exports={
    getAllTask,
    getTaskById,
    createTodo,
    updateTask,
    deleteTask,
    getTaskByFilter,
    getTaskBySearch,
    valid_status
};
