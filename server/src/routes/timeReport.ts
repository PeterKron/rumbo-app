import express from 'express';
import { getTimeReport, addTimeReport, updateTimeReport, getTimeReportById, deleteTimeReportById } from "../db/timereport";
import { validationResult } from "express-validator";
import { TimeReportType } from '../types';

const router = express.Router();

router.get('/project/:id/timereport', async (req, res) => {
  const timereports = await getTimeReport(req.body);
  res.status(200).json(timereports);
})

router.get('/project/:id/timereport', (req, res) => {
  if (!req["isAdmin"]) {
    res.send(401).end();
  }
  else {
    let filter: any = {
      project: req.params.id
    }
    if (req.query.year) {
      filter.year = req.query.year;
    }
    if (req.query.month) {
      filter.month = req.query.month;
    }
    getTimeReport(filter).then((timereport) => res.json(timereport));
  }
});

router.post("/timereport", async (req, res) => {
  if (req.body.email != req["user"] && !req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTimeReport = await addTimeReport({
      email: req.body.email,
      time: req.body.time,
      description: req.body.description,
      hours: req.body.hours,
      project_id: req.body.project_id
    }) as TimeReportType;
    
    // const newTimeReport = await addTimeReport(req.body) 
    let timeReportArr = []
    timeReportArr.push(newTimeReport)
    
    const mapTimeReportData = { ...timeReportArr[0], hours: Number(timeReportArr[0].hours) };
    delete mapTimeReportData.created_at;
    res.json(mapTimeReportData['_doc']);
    // res.json(mapTimeReportData[0]);

    // const mapTimeReportData = { ...timeReportArr[0], hours: Number(timeReportArr[0].hours) };
    // console.log(mapTimeReportData);
    
    // delete mapTimeReportData.created_at;
    // res.json(mapTimeReportData);
  }
});

router.put("/:email/timereport/:id", async (req, res) => {

  if (req.body.email != req["user"] && !req["isAdmin"]) {
    res.sendStatus(401).end();
  } else {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedTimeReport = await updateTimeReport(req.params.id, {
      email: req.body.email,
      time: req.body.time,
      hours: req.body.hours,
      description: req.body.description,
      project_id: req.body.project_id,
      _id: req.body.id
    });

    res.json(updatedTimeReport);
  }
});

router.delete("/:email/timereport/:timeReportId", async (req, res) => {
  if (req.params.email != req["user"] && !req["isAdmin"]) {
    res.sendStatus(401).end();
    console.log("Loggar params", req.params);
  } else {

    const timeReportId = req.params.timeReportId;
    console.log(timeReportId);

    if (!timeReportId) {
      return res.sendStatus(400);
    } else {
      const timeReport = await getTimeReportById(timeReportId);
      if (!timeReport) {
        res.sendStatus(404);
      } else {
        await deleteTimeReportById(timeReportId);
        res.json(timeReport);
      }
    }
    res.json();
  }
});

export default router;