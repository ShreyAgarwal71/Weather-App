// src/routes/export.routes.ts
import { Router, Request, Response, NextFunction } from "express";
import WeatherRecord from "../models/WeatherRecords";
import { Parser as Json2csvParser } from "json2csv";
import PDFDocument from "pdfkit";

const router = Router();

router.get(
  "/export",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const format = ((req.query.format as string) || "json").toLowerCase();

    try {
      const records = await WeatherRecord.find({}).lean();

     if (format === "csv") {
        if (!records || records.length === 0) {
          res.setHeader("Content-Type", "text/csv");
          res.setHeader("Content-Disposition", "attachment; filename=export.csv");
          res.send("No records to export.");
        }
        const fields = ["_id", "location", "queryDate", "startDate", "endDate", "temperatureData"];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(records);
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=export.csv");
        res.send(csv);
      } else if (format === "pdf") {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=export.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);
        doc.fontSize(16).text("Weather Records Export", { align: "center" });
        doc.moveDown();
        records.forEach((record, index) => {
          doc.fontSize(12).text(`Record ${index + 1}:`);
          doc.fontSize(10).text(JSON.stringify(record, null, 2));
          doc.moveDown();
        });
        doc.end();
      } else {
        res.status(400).json({ error: "Unsupported export format" });
      }
    } catch (error) {
      next(error);
    }
  }
);


export default router;
