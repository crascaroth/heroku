import express from "express";
import {ReportController} from "../Controller/reportController";

export const reportRouter = express.Router();
const reportController = new ReportController();

reportRouter.post("/create", reportController.createReport)
reportRouter.post("/create/model", reportController.createReportModel)
reportRouter.post("/create/relation", reportController.createReportRelation)