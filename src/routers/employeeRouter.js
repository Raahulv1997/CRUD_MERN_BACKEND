import express from 'express';
import { deleteEmployee, getEmployee, getEmployeeById, saveEmployee, updateEmployee } from '../controllers/empolyeeController.js';

const employeeRouter=express.Router();
employeeRouter.post('/register',saveEmployee);
employeeRouter.get('/employee',getEmployee)
employeeRouter.get('/employee/:id',getEmployeeById)
employeeRouter.patch('/updateuser/:id',updateEmployee)
employeeRouter.delete('/deleteEmployee/:id',deleteEmployee);



export default employeeRouter;