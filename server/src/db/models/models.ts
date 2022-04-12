import mongoose from "mongoose";
import { Setting } from "../setting";
import { TimeReportType, TransactionType } from "../../types";

export interface EmployeeType {
    email: string,
    firstname: string,
    lastname: string,
    fullname: string
}

export interface ProjectType {
    email?: string,
    customer_name: string,
    project_name: string,
    agreement_ref: string,
    active: boolean
}

const employeeschema = new mongoose.Schema<EmployeeType>({
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullname: { type: String, required: true }
})

const timereportschema = new mongoose.Schema<TimeReportType>({
    email: { type: String, required: true},
    time: { type: Date, required: true},
    description: {type: String, required: true},
    hours: { type: Number, required: true},
    project_id: { type: String, required: true}
})

const transactionschema = new mongoose.Schema<TransactionType>({
    email: { type: String, required: true},
    time: { type: Date, required: true},
    amount: { type: Number, required: true},
    description: {type: String, required: true}
    // sum?: number;
    // sourceReference?: string;
    // status?: TransactionStatus;
})

const projectschema = new mongoose.Schema<ProjectType>({
    customer_name: {type: String, required: true},
    project_name: {type: String, required: true},
    agreement_ref: {type: String, required: true},
    active: {type: Boolean, required: true}
})

const settingschema = new mongoose.Schema<Setting>({
    _id: {type: String, required: true},
    key: {type: String, required: true},
    value: {type: String, required: true},
})

export const EmployeeModel = mongoose.model<EmployeeType>('employee', employeeschema)
export const TimeReportModel = mongoose.model<TimeReportType>('timereport', timereportschema)
export const TransactionModel = mongoose.model<TransactionType>('transaction', transactionschema)
export const ProjectModel = mongoose.model<ProjectType>('project', projectschema)
export const SettingModel = mongoose.model<Setting>('setting', settingschema)



// export default EmployeeModel