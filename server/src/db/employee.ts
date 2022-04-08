// import { query } from "./db";
import { EmployeeModel } from "./models/models";

// export const getEmployees = async () => {
//     const sqlQuery = `SELECT * FROM public.employees`;
//     return await query(sqlQuery);
// };

export const getEmployees = async () => {
    const employees = await EmployeeModel.find()
    return employees
}