/*
 * page.tsx
 *
 * This file contains the main component for the weather application.
 * It allows users to fetch current weather and forecast data,
 * save records, and export data in CSV format.
 *
 * Deveoped by Shrey Agarwal, April 12, 2025
 */

"use client";
import React, { useState } from "react";

interface WeatherData {
  name: string;
  weather: { description: string }[];
  main: { temp: number; humidity: number };
}

interface ForecastItem {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string }[];
}

interface ForecastData {
  list: ForecastItem[];
}

export default function HomePage() {
  const [location, setLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>("");

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const flattenForecast = (forecastData: ForecastData): string => {
    return forecastData.list
      .map(
        (item) =>
          `${item.dt_txt}: ${item.main.temp}°C, ${item.weather[0].description}`
      )
      .join(" | ");
  };

  const fetchWeather = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setWeatherData(null);
    setForecastData(null);
    if (!location) {
      setError("Please enter a location.");
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("City not found, please check the spelling.");
      }
      const data: WeatherData = await res.json();
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchForecast = async () => {
    setError("");
    if (!location) {
      setError("Please enter a location.");
      return;
    }
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error("Forecast data not found.");
      }
      const data: ForecastData = await res.json();
      setForecastData(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchWeatherByGeolocation = () => {
    setError("");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            if (!res.ok) {
              throw new Error("Unable to fetch weather for your location.");
            }
            const data: WeatherData = await res.json();
            setWeatherData(data);
          } catch (err: any) {
            setError(err.message);
          }
        },
        (geoError) => {
          setError(geoError.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const saveAllRecords = async () => {
    if (!location) {
      setError("Location is required to save records.");
      return;
    }
    try {
      const payload: any = {
        location: location,
        queryDate: new Date(),
      };
      if (weatherData) {
        payload.temperatureData = [weatherData.main.temp];
      }
      if (forecastData) {
        payload.forecastSummary = flattenForecast(forecastData);
      }
      const response = await fetch(
        "http://localhost:3000/api/weather-records",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save weather/forecast record");
      }
      console.log("Record saved:", payload);
    } catch (err: any) {
      console.error("Error saving record:", err);
      setError(err.message);
    }
  };

  const handleExport = (format: string) => {
    window.location.href = `http://localhost:3000/api/export?format=${format}`;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h1>Weather App</h1>
      <form
        onSubmit={fetchWeather}
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
      >
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city, zip code, etc."
          style={{ flex: "1 1 200px", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Get Weather
        </button>
      </form>
      <button
        onClick={fetchForecast}
        style={{ marginTop: "0.5rem", padding: "0.5rem 1rem" }}
      >
        5-Day Forecast
      </button>
      <button
        onClick={fetchWeatherByGeolocation}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Use My Location
      </button>
      <button
        onClick={() => handleExport("csv")}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Export Data (CSV)
      </button>
      <button
        onClick={saveAllRecords}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Save Weather & Forecast Record
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {weatherData && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Weather in {weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
      {forecastData && (
        <div style={{ marginTop: "1rem" }}>
          <h2>5-Day Forecast</h2>
          {forecastData.list.map((item, index) => (
            <div
              key={index}
              style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 0" }}
            >
              <p>
                <strong>{item.dt_txt}</strong>
              </p>
              <p>Temp: {item.main.temp}°C</p>
              <p>{item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
