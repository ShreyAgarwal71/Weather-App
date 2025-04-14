/*
 * weatherRecord.routes.ts
 * 
 * This file defines the routes for handling weather records.
 * 
 * Developed by Shrey Agarwal, April 9, 2025
 */

import { Router } from 'express';
import * as WeatherRecordService from '../services/weatherRecord.service';
import * as WeatherRecordController from '../controllers/weatherRecord.controller';
import { Request, Response, NextFunction } from 'express';


const router = Router();

router.post('/', WeatherRecordController.createRecord);
router.get('/', WeatherRecordController.getRecords);
export const updateRecord = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedRecord = await WeatherRecordService.updateWeatherRecord(id, req.body);
      if (!updatedRecord) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json(updatedRecord);
      }
    } catch (error: any) {
      next(error);
    }
  };
  
  export const deleteRecord = async (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedRecord = await WeatherRecordService.deleteWeatherRecord(id);
      if (!deletedRecord) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.json({ message: 'Record deleted successfully' });
      }
    } catch (error: any) {
      next(error);
    }
  };

export default router;
