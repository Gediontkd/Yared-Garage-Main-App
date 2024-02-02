// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
	// Check if employee email already exists in the database
	const employeeExists = await employeeService.checkIfEmployeeExists(
		req.body.employee_email
	);
	// If employee exists, send a response to the client
	if (employeeExists) {
		res.status(400).json({
			error: "This email address is already associated with another employee!",
		});
	} else {
		try {
			const employeeData = req.body;
			// Create the employee
			const employee = await employeeService.createEmployee(employeeData);
			if (!employee) {
				console.log(employee);
				res.status(400).json({
					error: "Failed to add the employee!",
				});
			} else {
				res.status(200).json({
					status: "true",
				});
			}
		} catch (error) {
			console.log(err);
			res.status(400).json({
				error: "Something went wrong!",
			});
		}
	}
}

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
	// Call the getAllEmployees method from the employee service
	const employees = await employeeService.getAllEmployees();
	// console.log(employees);
	if (!employees) {
		res.status(400).json({
			error: "Failed to get all employees!",
		});
	} else {
		res.status(200).json({
			status: "success",
			data: employees,
		});
	}
}

// Create the getSingleEmployee controller
async function getSingleEmployee(req, res, next) {
	const employeeId = req.params.id;
	// Call the getSingleEmployee method from the employee service
	const employee = await employeeService.getSingleEmployee(employeeId);
	// console.log(employees);
	if (!employee) {
		res.status(400).json({
			error: "Failed to get single employee!",
		});
	} else {
		res.status(200).json({
			status: "success",
			data: employee,
		});
	}
}
// Export the createEmployee controller
module.exports = {
	createEmployee,
	getAllEmployees,
	getSingleEmployee,
};
