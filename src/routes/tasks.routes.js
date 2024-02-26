import { Router } from "express";
import {authRequired} from "../middlewares/validateToken.js";
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/tasks.schema.js";


const router = Router();
router.get('/tasks', authRequired, getTasks );
//VISUALIZAR
router.get('/tasks/:id', authRequired, getTask );
//CREAR    
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask );
//ELIMINAR
router.delete('/tasks/:id', authRequired, deleteTask );
//EDITAR
router.put('/tasks/:id', authRequired, updateTask );

export default router;