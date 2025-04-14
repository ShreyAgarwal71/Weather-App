/*
 * WeatherRecord model for storing weather data
 */

import mongoose, { Document, Schema } from "mongoose";

export interface IWeatherRecord extends Document {
  location?: string;
  queryDate: Date;
  temperatureData?: number[];
  forecastSummary?: string;
}

const WeatherRecordSchema: Schema = new Schema({
  location: { type: String }, 
  queryDate: { type: Date, default: Date.now },
  temperatureData: { type: [Number], default: [] },
  forecastSummary: { type: String } 
});

export default mongoose.model<IWeatherRecord>("WeatherRecord", WeatherRecordSchema);


