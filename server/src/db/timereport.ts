// import { query } from "./db";
import { TimeReportType } from "../types";
import { TimeReportModel } from "./models/models"

type getTimeReportFilter = {
    email?: string;
    year?: number;
    month?: number;
    project?: string;
};

export const getTimeReport = async ({email,year,month,project}: getTimeReportFilter) => {
    let params = {};
    if (email) {
        params['email'] = email ;
    }
    if (year && !month) {
        params['time'] = {$gt: new Date(year, 0, 1), $lt: new Date(year+1, 0, 1)} 
    }
    if (month && year) {
        params['time'] = {$gt: new Date(year, month-1, 1), $lt: new Date(year, month, 1)}
    }
    if (project) {
        params['project'] = project;
    }
    const timereports = await TimeReportModel.find(params)
    return timereports
}

export const getTimeReportById = async (timeReportId: string) => {
    const result = await TimeReportModel.find({_id: timeReportId})    
	return result["length"] === 0 ? null : result[0];
};

export const deleteTimeReportById = async (timeReportId: string) => {
	await TimeReportModel.deleteOne({ _id: timeReportId });
};

export const getTimeReportMeta = async (email: string) => {
    const res = await TimeReportModel.aggregate([ {$match: {'email': email}}, {$group: { _id: {year: {$year: "$time" }, month: {$month: "$time"}}}}])
    return (res).map(meta => ({year: Number(meta._id.year), month: Number(meta._id.month)}))
}

export const addTimeReport = async (tidsrapport: TimeReportType) => {
        const timeReport = new TimeReportModel(tidsrapport)
        await timeReport.save()
        return timeReport
}

export const updateTimeReport = async (timeReportId, tidsrapport: TimeReportType) => {
    await TimeReportModel.findByIdAndUpdate(timeReportId, tidsrapport)
    return await getTimeReportById(timeReportId)
}
