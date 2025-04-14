/*
 * WeatherRecordController.ts
 *
 * This file contains the controller functions for managing weather records.
 * It includes functions for creating, retrieving, updating, and deleting weather records.
 * 
 * Developed by Shrey Agarwal, April 9, 2025
 */

import { Request, Response } from 'express';
import * as WeatherRecordService from '../services/weatherRecord.service';

export const createRecord = async (req: Request, res: Response) => {
  try {
    const newRecord = await WeatherRecordService.createWeatherRecord(req.body);
    res.status(201).json(newRecord);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getRecords = async (_req: Request, res: Response) => {
  try {
    const records = await WeatherRecordService.getAllWeatherRecords();
    res.json(records);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedRecord = await WeatherRecordService.updateWeatherRecord(id, req.body);
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRecord = await WeatherRecordService.deleteWeatherRecord(id);
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
