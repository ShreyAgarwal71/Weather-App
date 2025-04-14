/*
 * WeatherRecord Service
 *
 * This service handles the business logic for weather records.
 * 
 * Developed Shrey Agarwal, April 9, 2025
 */

import WeatherRecord, { IWeatherRecord } from '../models/WeatherRecords';

export const createWeatherRecord = async (recordData: Partial<IWeatherRecord>): Promise<IWeatherRecord> => {
  const record = new WeatherRecord(recordData);
  return record.save();
};

export const getAllWeatherRecords = async (): Promise<IWeatherRecord[]> => {
  return WeatherRecord.find({});
};

export const updateWeatherRecord = async (id: string, updateData: Partial<IWeatherRecord>): Promise<IWeatherRecord | null> => {
  return WeatherRecord.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteWeatherRecord = async (id: string): Promise<IWeatherRecord | null> => {
  return WeatherRecord.findByIdAndDelete(id);
};
