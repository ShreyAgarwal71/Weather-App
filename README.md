# Weather App

## Overview

This Weather App is a full-stack application built with React, Next.js, Node.js (Express), MongoDB, and integrates with external weather APIs. Users can retrieve current weather conditions and a 5-day weather forecast based on input location or device geolocation, store these records in a MongoDB database, and export saved records in various formats (JSON, CSV, XML, PDF).

## Features

### Frontend

- Search weather by city name, ZIP code, or other location identifiers.
- Display current weather conditions (temperature, humidity, description).
- Retrieve and display a 5-day weather forecast.
- Use browser geolocation to fetch local weather.
- Save fetched weather and forecast data to the database.
- Export stored data in CSV format.

### Backend

- RESTful API to handle CRUD operations for weather records.
- MongoDB integration for persistent storage.
- Export stored weather records in JSON, XML, CSV, and PDF formats.

## Technologies

- **Frontend:** React, Next.js
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **APIs:** OpenWeatherMap
- **Data Exporting:** json2csv, pdfkit

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB Community Edition

### Backend Setup

```bash
cd weather-backend
npm install

#For MongoDB
brew tap mongodb/brew
brew install mongodb-community@6.0

# Ensure MongoDB service is running
brew services start mongodb-community@6.0

# Set up environment variables (create a `.env` file)
MONGODB_URI="mongodb://localhost:27017/weatherapp"
PORT=3000

npx ts-node src/server.ts
```

### Frontend Setup

```bash
cd weather-frontend
npm install

# Create a `.env.local` file
NEXT_PUBLIC_WEATHER_API_KEY="YOUR_OPENWEATHERMAP_API_KEY"

npm run dev
```

Frontend will start on `http://localhost:3000` or `http://localhost:3001` (or another available port).

## Usage

- Open `http://localhost:3000` in a browser.
- Input location and select actions to get current weather or forecast.
- Use "Save Weather & Forecast Record" button to store data.
- Export data using the provided export button.

## API Endpoints

### Weather Records

- `GET /api/weather-records`: Retrieve all stored records.
- `POST /api/weather-records`: Store new weather or forecast records.
- `PUT /api/weather-records/:id`: Update existing record.
- `DELETE /api/weather-records/:id`: Delete record.

### Data Export

- `GET /api/export?format=[csv]`: Export data in the specified format.

## Project Structure

```
weather-app/
├── weather-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
└── weather-frontend/
    ├── src/app
    │   ├── globals.tsx
    │   ├── layout.tsx
    │   └── page.tsx
    ├── package.json
    └── tsconfig.json
```

## Author

**Shrey Agarwal**

---

Feel free to customize this README further to match your project's specific details!
