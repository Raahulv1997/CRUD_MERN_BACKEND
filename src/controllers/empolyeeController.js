import employeeModel from "../model/employeeschema.js";
import { StatusCodes } from "http-status-codes";

export async function saveEmployee(req, res) {
  var data = req.body;

  if (
    !data.name ||
    !data.email ||
    !data.age ||
    !data.mobile ||
    !data.work ||
    !data.address ||
    !data.description
  ) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "please fill the data" });
  }

  try {
    const preEmployee = await employeeModel.findOne({ email: data.email });
    if (preEmployee) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "empolyee already exist" });
    } else {
      const employee = new employeeModel(data);
      const savedEmployee = await employee.save();
      res.status(StatusCodes.CREATED).json(savedEmployee);
    }
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
}

// get Employee

export async function getEmployee(req, res) {
  try {
    const findEmployee = await employeeModel.find();
    res.status(StatusCodes.OK).json(findEmployee);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Some thin went wrong" });
  }
}

// get employee by id

export async function getEmployeeById(req, res) {
  try {
    const { id } = req.params;
    const employeeById = await employeeModel.findById({ _id: id });

    if (employeeById) {
      res.status(StatusCodes.OK).json(employeeById);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Employee not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Some thin went wrong" });
  }
}

export async function updateEmployee(req, res) {
  try {
    const { id } = req.params;

    const updateduser = await employeeModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(StatusCodes.OK).json(updateduser);
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Some thin went wrong" });
  }
}

export async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const deleteUser = await employeeModel.findByIdAndDelete({ _id: id });
    res.status(StatusCodes.OK).json({ message: "delete successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Some thin went wrong" });
  }
}
