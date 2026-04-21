# React Mart

React Mart is a full-stack e-commerce demo project with a React frontend and an Express + MongoDB backend.

It demonstrates:
- Product browsing and filtering
- Product details using route params
- Cart management with Redux Toolkit
- Checkout flow with backend order persistence
- Query-parameter based search and filtering

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Frontend Routes](#frontend-routes)
- [Backend API](#backend-api)
- [Data Model](#data-model)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Frontend-Backend Integration](#frontend-backend-integration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Project Overview

The app has two parts:
- Frontend: React SPA for catalog, cart, and checkout UI
- Backend: Express API for health checks and saving orders to MongoDB

In development, the frontend runs on Create React App dev server and proxies API requests to the backend.

## Tech Stack

### Frontend
- React 18
- React Router DOM 6
- Redux Toolkit + React Redux
- Create React App (`react-scripts`)
- Plain CSS

### Backend
- Node.js + Express
- Mongoose
- MongoDB
- dotenv
- cors
- nodemon

## Architecture

1. User browses products from in-memory product data.
2. User adds products to cart (Redux global state).
3. User fills checkout form in cart page.
4. Frontend sends `POST /api/orders`.
5. Backend validates payload and stores it in MongoDB.
6. Backend responds with `orderId`.
7. Frontend shows success message and clears cart.

## Project Structure

```text
react-mart/
├── public/                  # Static public files
├── src/
│   ├── components/          # Reusable UI components
│   ├── data/                # Product mock data
│   ├── pages/               # Route-level pages
│   ├── redux/               # Store + cart slice
│   └── styles/              # App styling
├── server/
│   ├── config/              # DB connection config
│   ├── models/              # Mongoose models
│   ├── routes/              # Express route handlers
│   └── server.js            # Backend entry point
├── build/                   # Frontend production build output
└── package.json             # Root scripts (frontend + orchestration)
```

## Frontend Routes

Defined in `src/App.js`:

- `/` - Home page with featured products
- `/products` - Product listing with query-based filters
- `/products/:id` - Product details page (path param)
- `/cart` - Cart management and checkout form
- `/about` - Project/about information
- `/search` - Dedicated search page (`?name=<query>`)

Note: The app uses `HashRouter`, so URLs in browser may appear as `/#/products`.

## Backend API

Base URL in development: `http://localhost:5000`

### `GET /api/health`

Health check endpoint.

Response (`200`):

```json
{
  "ok": true,
  "message": "React Mart API is running"
}
```

### `POST /api/orders`

Creates a new order document.

Request body:

```json
{
  "customerName": "Ashman Raut",
  "email": "ashman@example.com",
  "address": "Mumbai, India",
  "items": [
    {
      "productId": "1",
      "name": "Smartphone",
      "price": 699,
      "quantity": 1
    }
  ],
  "totalItems": 1,
  "totalAmount": 699
}
```

Success response (`201`):

```json
{
  "message": "Order saved successfully",
  "orderId": "<mongodb_object_id>"
}
```

Error responses:
- `400`: required fields missing or no order items
- `500`: server/database error

## Data Model

Order schema (`server/models/Order.js`) includes:
- `customerName` (String, required)
- `email` (String, required)
- `address` (String, required)
- `items` (Array of objects, non-empty)
- `totalItems` (Number, required, min 1)
- `totalAmount` (Number, required, min 0)
- `createdAt` / `updatedAt` (timestamps)

Each `items[]` entry contains:
- `productId` (String)
- `name` (String)
- `price` (Number)
- `quantity` (Number, min 1)

## Environment Variables

Backend environment file: `server/.env`

Required values:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/react_mart
```

You can also use a MongoDB Atlas URI for `MONGO_URI`.

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB local instance or MongoDB Atlas cluster

### 1. Install root dependencies

From project root:

```bash
npm install
```

### 2. Install backend dependencies

```bash
cd server
npm install
cp .env.example .env
```

Then update `server/.env` with your actual `MONGO_URI`.

### 3. Run in development

From project root:

```bash
npm run dev
```

This starts:
- Frontend dev server (CRA)
- Backend server (nodemon)

## Available Scripts

### Root scripts (`react-mart/package.json`)

- `npm start` - start frontend only
- `npm run client` - start frontend only (alias)
- `npm run server` - start backend via `server` folder
- `npm run dev` - run frontend + backend concurrently
- `npm run build` - build frontend for production
- `npm test` - run frontend tests
- `npm run deploy` - deploy frontend `build` to GitHub Pages

### Backend scripts (`react-mart/server/package.json`)

- `npm run dev` - start backend with nodemon
- `npm start` - start backend with node

## Frontend-Backend Integration

- Root `package.json` contains:

```json
"proxy": "http://localhost:5050"
```

- Backend defaults to port `5000` (`server/server.js`).

Important: If you run both services with current defaults, API calls from frontend may fail because proxy is set to `5050` while backend runs on `5000`.

To align ports, choose one approach:
- Update root `proxy` to `http://localhost:5000`, or
- Set backend `PORT=5050` in `server/.env`

## Deployment

Frontend is configured for GitHub Pages:
- `homepage` in root `package.json`: `https://rautashman.github.io/FSDexp3`
- Deploy command: `npm run deploy`

Notes:
- GitHub Pages hosts only static frontend files.
- Backend + MongoDB must be deployed separately (for example Render/Railway/Fly.io/etc.).
- For production, configure frontend to call your deployed backend URL instead of relying on dev proxy.

## Troubleshooting

- Backend exits on startup:
  - Check `MONGO_URI` in `server/.env`
  - Ensure MongoDB is reachable

- Checkout fails with `400`:
  - Verify checkout fields are filled
  - Verify cart is not empty

- Checkout fails with `500`:
  - Check backend terminal logs
  - Verify MongoDB connectivity and permissions

- Frontend cannot call API:
  - Ensure backend is running
  - Ensure frontend proxy and backend port match

- Cart resets on refresh:
  - Current cart state is in-memory Redux state (no persistence layer enabled)

## Learning Coverage

This project demonstrates practical use of:
- React functional components and hooks
- Route params and query params
- Shared state via Redux Toolkit
- API integration with async form submission
- MongoDB schema design and validation with Mongoose