import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = Router();

// Create Employee
router.post("/", createEmployee);

// Get All Employees
router.get("/", getEmployees);

// Get Employee by ID
router.get("/:id", getEmployeeById);

// Update Employee
router.put("/:id", updateEmployee);

// Delete Employee
router.delete("/:id", deleteEmployee);

export default router;
