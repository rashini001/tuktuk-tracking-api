# 🛺 Real-Time Tuk-Tuk Tracking & Movement Logging System

A centralized, RESTful API platform built for **Sri Lanka Police** to track registered three-wheelers (tuk-tuks) in real time, log movement history, and support law enforcement investigations across provinces and districts.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Simulation Data](#simulation-data)
- [Deployment](#deployment)
- [Branch Guide](#branch-guide)
- [Author](#author)

---

## Overview

Sri Lanka Police requires operational visibility into registered tuk-tuk movements across all **9 provinces** and **25 districts**. This system provides:

- 📍 **Live location tracking** – last-known GPS position per vehicle
- 🗂️ **Historical movement logs** – time-window based querying
- 🏛️ **Province/district filtering** – for station-level operational use
- 🔐 **Role-based secure access** – HQ, Provincial offices, District/Station level

---

## Features

| Feature | Description |
|---|---|
| Vehicle Registration | Register and manage tuk-tuk identities |
| Driver / Device Management | Link drivers and GPS devices to vehicles |
| Live Location Updates | Devices push GPS pings to the API |
| Location History | Query movement logs by time window |
| Province & District Filtering | Filter vehicles by administrative boundary |
| Role-based Auth (JWT) | HQ Admin, Provincial Officer, Station Officer, Device |
| Swagger Docs | Auto-generated API specification |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES6+) |
| Framework | Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| API Docs | Swagger  |
| Simulation | Custom Node.js / Bash scripts |
| Deployment | Render / Railway / Heroku |
| Version Control | GitHub |

---

## Project Structure

```
tuk-tuk-tracking-api/
├── src/
│   ├── config/           # DB connection, environment config
│   ├── controllers/      # Route handler logic
│   ├── middleware/        # Auth, error handling, logging
│   ├── models/           # Data models (Vehicle, Driver, Location, etc.)
│   ├── routes/           # API route definitions
│   ├── services/         # Business logic layer
│   └── utils/            # Helper functions
├── simulation/
│   ├── seed.js           # Seed script for provinces, districts, stations
│   ├── vehicles.js       # Generate 200+ tuk-tuks
│   └── location-ping.js  # Simulate GPS pings over 1 week
├── docs/
│   └── swagger.yaml      # OpenAPI specification
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/tuk-tuk-tracking-api.git

# 2. Navigate into the project
cd tuk-tuk-tracking-api

# 3. Install dependencies
npm install

# 4. Copy the environment file and fill in your values
cp .env.example .env

# 5. Seed the simulation data
node simulation/seed.js

# 6. Start the development server
npm run dev
```

The API will be available at: `http://localhost:3000`

Swagger docs at: `http://localhost:3000/api-docs`

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/tuktuk_db

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# Admin Seed
ADMIN_EMAIL=admin@police.lk
ADMIN_PASSWORD=Admin@1234
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login and receive JWT |
| POST | `/api/auth/register` | Register a new user (Admin only) |

### Vehicles
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/vehicles` | List all registered tuk-tuks |
| POST | `/api/vehicles` | Register a new vehicle |
| GET | `/api/vehicles/:id` | Get vehicle details |
| PUT | `/api/vehicles/:id` | Update vehicle info |
| DELETE | `/api/vehicles/:id` | Remove a vehicle |

### Location
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/location/ping` | Submit a GPS location update (device) |
| GET | `/api/location/:vehicleId/live` | Get last known location |
| GET | `/api/location/:vehicleId/history` | Get movement history (with `?from=&to=`) |

### Administrative Boundaries
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/provinces` | List all provinces |
| GET | `/api/districts` | List all districts |
| GET | `/api/stations` | List all police stations |

### Filtering
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/vehicles?province=Western` | Filter by province |
| GET | `/api/vehicles?district=Colombo` | Filter by district |
| GET | `/api/vehicles?station=Wellawatte` | Filter by station |

> Full specification available via Swagger at `/api-docs`

---

## Simulation Data

The `simulation/` folder contains scripts to populate realistic test data:

```bash
# Seed master data (provinces, districts, stations, users)
node simulation/seed.js

# Seed 200+ tuk-tuks with driver/device assignment
node simulation/vehicles.js

# Simulate 1 week of GPS pings for all vehicles
node simulation/location-ping.js
```

**Data summary:**
- ✅ All 9 provinces of Sri Lanka
- ✅ 25 districts
- ✅ 20+ police stations (mapped to districts)
- ✅ 200+ registered tuk-tuks

---

## Deployment

The API is deployed and accessible at:

> 🔗 **Live API URL:** `https://your-api-url.onrender.com`  
> 📄 **Swagger Docs:** `https://your-api-url.onrender.com/api-docs`

---

## Branch Guide

### How to Create a New Branch

```bash
# Step 1: Make sure you are on the main branch and up to date
git checkout main
git pull origin main

# Step 2: Create and switch to a new branch
git checkout -b feature/your-feature-name

# Examples:
git checkout -b feature/auth-middleware
git checkout -b feature/location-endpoints
git checkout -b fix/jwt-expiry-bug
git checkout -b docs/update-readme
```

```bash
# Step 3: Do your work, then stage and commit
git add .
git commit -m "feat: add JWT authentication middleware"

# Step 4: Push the branch to GitHub
git push origin feature/your-feature-name
```

```bash
# Step 5: Open a Pull Request on GitHub
# Go to your repo → Click "Compare & pull request" → Merge into main
```

### Branch Naming Conventions

| Prefix | Use Case | Example |
|---|---|---|
| `feature/` | New functionality | `feature/location-history` |
| `fix/` | Bug fixes | `fix/token-validation` |
| `docs/` | Documentation updates | `docs/swagger-spec` |
| `data/` | Simulation / seed data | `data/seed-vehicles` |
| `refactor/` | Code improvements | `refactor/controller-logic` |

### Useful Branch Commands

```bash
# List all local branches
git branch

# List all branches (including remote)
git branch -a

# Switch to an existing branch
git checkout branch-name

# Delete a local branch (after merging)
git branch -d feature/your-feature-name

# Delete a remote branch
git push origin --delete feature/your-feature-name
```

---

## Author

| Field | Info |
|---|---|
| **Student ID** | COBSCCOMP24.2P-056 |
| **Module** | NB6007CEM – Web API Development |
| **Batch** | 24.2P |
| **Institution** | NIBM × Coventry University |
| **Lecturer** | Niranga Dharmaratna |

---
