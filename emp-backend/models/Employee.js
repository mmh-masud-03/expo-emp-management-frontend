import { Schema, model } from "mongoose";

const employeeSchema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Employee = model("Employee", employeeSchema);

export default Employee;
