import Task from "../models/task.model.js";


export const createTask=async(req,res)=>{
    const [title,description,assignedTo,status,priority,deadline]=req.body;
    if(!title || !assignedTo || !deadline){
        return res.status(400).json({message:"Please fill all required fields"});
    }
    try{
        const task = await Task.create({
            title,
            description,
            assignedTo,
            status,
            priority,
            deadline
        })
        res.status(201).json({message: "Task Created", task});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const updateTask=async(req,res)=>{
    const {id} = req.params;
    const status = req.body.status;
    try{
        const task = await Task.findByIdAndUpdate(id, {status}, {new: true});
        res.status(200).json({message: "Task Updated", task});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

