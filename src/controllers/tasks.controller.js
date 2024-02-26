import Task from "../models/task.model.js";

//TABLE TASKS
export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user', 'username email');
    res.json(tasks);
};

//CREAR 
export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
};

//VISUALIZAR
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user', 'username email');
    if(!task) return res.status(404).json({message: 'Task not found'})
    res.json(task);
};

//EDITAR
export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    if(!task) return res.status(404).json({message: 'Tarea no encontrada'})
    res.json(task);
};

//ELIMINAR
export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id); 
    if(!task) return res.status(404).json({message: 'Tarea no encontrada'})
    return res.sendStatus(204);
};



